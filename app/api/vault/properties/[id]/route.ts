import { NextResponse } from "next/server";
import { hasVaultAccess } from "../../../../lib/vaultSession";
import {
  normalizeImagePosition,
  normalizePropertyVisibility,
  readProperties,
  writeProperties,
  type VaultProperty,
} from "../../../../lib/propertyStore";

function clean(value: unknown, maxLength = 5000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await hasVaultAccess())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid property update." }, { status: 400 });
  }

  const properties = await readProperties();
  const index = properties.findIndex((property) => property.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Property not found." }, { status: 404 });
  }

  const existing = properties[index];
  const hasStatusUpdate = body.status === "published" || body.status === "draft";
  const status: VaultProperty["status"] = hasStatusUpdate
    ? body.status === "published"
      ? "published"
      : "draft"
    : existing.status;

  if (status === "published" && !existing.brochure) {
    return NextResponse.json(
      { error: "Attach one sales brochure PDF before publishing this property." },
      { status: 400 },
    );
  }

  const hasVisibilityUpdate = typeof body.visibility === "string";
  const visibility = hasVisibilityUpdate
    ? normalizePropertyVisibility(body.visibility)
    : existing.visibility || "confidential";

  const updated: VaultProperty = {
    ...existing,
    status,
    visibility,
    publicTitle: hasVisibilityUpdate
      ? clean(body.publicTitle, 120)
      : existing.publicTitle || "",
    publicLocation: hasVisibilityUpdate
      ? clean(body.publicLocation, 120)
      : existing.publicLocation || "",
    publicImageApproved: hasVisibilityUpdate
      ? visibility === "confidential"
        ? false
        : body.publicImageApproved === true
      : existing.publicImageApproved || false,
    imagePosition: hasVisibilityUpdate
      ? normalizeImagePosition(body.imagePosition)
      : existing.imagePosition || "center",
    approvalStatus: status === "published" ? "approved" : existing.approvalStatus,
    updatedAt: new Date().toISOString(),
  };

  properties[index] = updated;
  await writeProperties(properties);

  return NextResponse.json(updated);
}
