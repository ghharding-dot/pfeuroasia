import { NextResponse } from "next/server";
import { getCollaboratorSession } from "../../lib/collaboratorSession";
import { getPartnerContact } from "../../lib/partnerContacts";
import {
  generateRentalReference,
  readRentalVillas,
  writeRentalVillas,
  type RentalVilla,
} from "../../lib/rentalVillaStore";
import { hasVaultAccess } from "../../lib/vaultSession";

export const dynamic = "force-dynamic";

function clean(value: unknown, maxLength = 5000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function conciseDescription(value: unknown) {
  return clean(value, 1800).split(/\s+/).filter(Boolean).slice(0, 150).join(" ");
}

export async function POST(request: Request) {
  const [vaultAccess, collaborator] = await Promise.all([
    hasVaultAccess(),
    getCollaboratorSession(),
  ]);

  if (!vaultAccess && !collaborator) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid villa submission." }, { status: 400 });
  }

  const villas = await readRentalVillas();
  const now = new Date().toISOString();
  const listingPartner = collaborator
    ? {
        code: collaborator.partnerCode,
        name: collaborator.partnerName,
        email: collaborator.email,
      }
    : getPartnerContact(clean(body.listingPartnerCode, 30) || "LVC");
  const status: RentalVilla["status"] =
    vaultAccess && body.status === "published" ? "published" : "draft";
  const galleryImages = Array.isArray(body.galleryImages)
    ? body.galleryImages.map((image: unknown) => clean(image, 1000)).filter(Boolean).slice(0, 8)
    : [];

  const villa: RentalVilla = {
    id: crypto.randomUUID(),
    reference: generateRentalReference(villas),
    title: clean(body.title, 160),
    location: clean(body.location, 160),
    bedrooms: Math.max(0, Number(body.bedrooms) || 0),
    bathrooms: Math.max(0, Number(body.bathrooms) || 0),
    guests: Math.max(0, Number(body.guests) || 0),
    priceFrom: clean(body.priceFrom, 80),
    priceTo: clean(body.priceTo, 80),
    currency:
      body.currency === "GBP" || body.currency === "USD" ? body.currency : "EUR",
    description: conciseDescription(body.description),
    amenities: clean(body.amenities, 1200),
    image: clean(body.image, 1000),
    secondaryImage: clean(body.secondaryImage, 1000),
    thirdImage: clean(body.thirdImage, 1000),
    fourthImage: clean(body.fourthImage, 1000),
    galleryImages,
    listingPartnerCode: listingPartner.code,
    listingPartnerName: listingPartner.name,
    submittedBy: collaborator && !vaultAccess ? "collaborator" : "admin",
    submittedByEmail: collaborator?.email,
    approvalStatus: status === "published" ? "approved" : "pending-review",
    status,
    createdAt: now,
    updatedAt: now,
  };

  if (
    !villa.title ||
    !villa.location ||
    !villa.description ||
    !villa.image ||
    !villa.secondaryImage ||
    !villa.thirdImage ||
    !villa.fourthImage
  ) {
    return NextResponse.json(
      { error: "Title, location, description and four photographs are required." },
      { status: 400 },
    );
  }

  villas.unshift(villa);
  await writeRentalVillas(villas);
  return NextResponse.json(villa, { status: 201 });
}
