import { NextResponse } from "next/server";
import { hasVaultAccess } from "../../../../lib/vaultSession";
import {
  normalizeImagePosition,
  normalizePropertyAccessLevel,
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

  const hasAccessUpdate =
    typeof body.visibility === "string" || typeof body.accessLevel === "string";
  const requestedVisibility = hasAccessUpdate
    ? normalizePropertyVisibility(body.visibility)
    : existing.visibility || "confidential";
  const accessLevel = hasAccessUpdate
    ? normalizePropertyAccessLevel(body.accessLevel, requestedVisibility)
    : normalizePropertyAccessLevel(existing.accessLevel, existing.visibility);
  const visibility: VaultProperty["visibility"] =
    accessLevel === "registered"
      ? "public"
      : requestedVisibility === "public"
        ? "teaser"
        : requestedVisibility;

  const updated: VaultProperty = {
    ...existing,
    status,
    accessLevel,
    visibility,
    publicTitle: hasAccessUpdate
      ? clean(body.publicTitle, 120)
      : existing.publicTitle || "",
    publicLocation: hasAccessUpdate
      ? clean(body.publicLocation, 120)
      : existing.publicLocation || "",
    publicImageApproved: hasAccessUpdate
      ? visibility === "confidential"
        ? false
        : body.publicImageApproved === true
      : existing.publicImageApproved || false,
    imagePosition: hasAccessUpdate
      ? normalizeImagePosition(body.imagePosition)
      : existing.imagePosition || "center",
    approvalStatus: status === "published" ? "approved" : existing.approvalStatus,
    updatedAt: new Date().toISOString(),
  };

  properties[index] = updated;
  await writeProperties(properties);

  return NextResponse.json(updated);
}
