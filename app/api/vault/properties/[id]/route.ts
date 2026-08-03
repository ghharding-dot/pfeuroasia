import { NextResponse } from "next/server";
import { hasVaultAccess } from "../../../../lib/vaultSession";
import {
  readProperties,
  writeProperties,
  type VaultProperty,
} from "../../../../lib/propertyStore";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await hasVaultAccess())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const status: VaultProperty["status"] =
    body.status === "published" ? "published" : "draft";
  const properties = await readProperties();
  const index = properties.findIndex((property) => property.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Property not found." }, { status: 404 });
  }

  const existing = properties[index];
  if (status === "published" && !existing.brochure) {
    return NextResponse.json(
      { error: "Attach one sales brochure PDF before publishing this property." },
      { status: 400 },
    );
  }

  const updated: VaultProperty = {
    ...existing,
    status,
    updatedAt: new Date().toISOString(),
  };
  properties[index] = updated;
  await writeProperties(properties);

  return NextResponse.json(updated);
}
