import { NextResponse } from "next/server";
import { getPartnerContact } from "../../../lib/partnerContacts";
import { hasVaultAccess } from "../../../lib/vaultSession";
import {
  generatePropertyReference,
  normalizeImagePosition,
  normalizePropertyVisibility,
  readProperties,
  writeProperties,
  type VaultProperty,
} from "../../../lib/propertyStore";

export async function GET() {
  if (!(await hasVaultAccess())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await readProperties());
}

export async function POST(request: Request) {
  if (!(await hasVaultAccess())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const properties = await readProperties();
  const now = new Date().toISOString();
  const status: VaultProperty["status"] = body.status === "published" ? "published" : "draft";
  const listingPartner = getPartnerContact(String(body.listingPartnerCode || "DIRECT"));
  const visibility = normalizePropertyVisibility(body.visibility);
  const property: VaultProperty = {
    id: crypto.randomUUID(),
    reference: generatePropertyReference(properties),
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
    visibility,
    publicTitle: String(body.publicTitle || "").trim().slice(0, 120),
    publicLocation: String(body.publicLocation || "").trim().slice(0, 120),
    publicImageApproved: visibility === "confidential" ? false : body.publicImageApproved === true,
    imagePosition: normalizeImagePosition(body.imagePosition),
    listingPartnerCode: listingPartner.code,
    listingPartnerName: listingPartner.name,
    submittedBy: "admin",
    approvalStatus: "approved",
    status,
    createdAt: now,
    updatedAt: now,
  };

  if (!property.title || !property.location || !property.image) {
    return NextResponse.json({ error: "Title, location and main image are required." }, { status: 400 });
  }

  if (property.status === "published" && !property.brochure) {
    return NextResponse.json(
      { error: "Attach one sales brochure PDF before publishing. Save as Draft if the brochure is not ready." },
      { status: 400 },
    );
  }

  properties.unshift(property);
  await writeProperties(properties);
  return NextResponse.json(property, { status: 201 });
}
