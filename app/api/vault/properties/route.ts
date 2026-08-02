import { NextResponse } from "next/server";
import { hasVaultAccess } from "../../../lib/vaultSession";
import { readProperties, writeProperties, type VaultProperty } from "../../../lib/propertyStore";

export async function GET() {
  if (!(await hasVaultAccess())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await readProperties());
}

export async function POST(request: Request) {
  if (!(await hasVaultAccess())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const now = new Date().toISOString();
  const property: VaultProperty = {
    id: crypto.randomUUID(),
    reference: String(body.reference || "").trim(),
    title: String(body.title || "").trim(),
    location: String(body.location || "").trim(),
    price: String(body.price || "").trim(),
    bedrooms: Number(body.bedrooms || 0),
    bathrooms: Number(body.bathrooms || 0),
    plotSize: String(body.plotSize || "").trim(),
    builtSize: String(body.builtSize || "").trim(),
    terraces: String(body.terraces || "").trim(),
    description: String(body.description || "").trim(),
    image: String(body.image || "").trim(),
    secondaryImage: String(body.secondaryImage || "").trim(),
    brochure: String(body.brochure || "").trim(),
    status: body.status === "published" ? "published" : "draft",
    createdAt: now,
    updatedAt: now,
  };

  if (!property.reference || !property.title || !property.location || !property.image) {
    return NextResponse.json({ error: "Reference, title, location and main image are required." }, { status: 400 });
  }

  const properties = await readProperties();
  properties.unshift(property);
  await writeProperties(properties);
  return NextResponse.json(property, { status: 201 });
}
