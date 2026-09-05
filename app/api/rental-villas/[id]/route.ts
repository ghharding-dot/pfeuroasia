import { NextResponse } from "next/server";
import {
  readRentalVillas,
  writeRentalVillas,
  type RentalVilla,
} from "../../../lib/rentalVillaStore";
import { getCollaboratorSession } from "../../../lib/collaboratorSession";
import { hasVaultAccess } from "../../../lib/vaultSession";

export const dynamic = "force-dynamic";

function clean(value: unknown, maxLength = 5000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function conciseDescription(value: unknown) {
  return clean(value, 1800).split(/\s+/).filter(Boolean).slice(0, 150).join(" ");
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const [vaultAccess, collaborator] = await Promise.all([
    hasVaultAccess(),
    getCollaboratorSession(),
  ]);
  if (!vaultAccess && !collaborator) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid villa update." }, { status: 400 });
  }

  const villas = await readRentalVillas();
  const index = villas.findIndex((villa) => villa.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Villa not found." }, { status: 404 });
  }

  const existing = villas[index];
  if (!vaultAccess && existing.listingPartnerCode !== collaborator?.partnerCode) {
    return NextResponse.json({ error: "Villa not found." }, { status: 404 });
  }

  const statusOnly = Object.keys(body).every((key) => key === "status");
  if (statusOnly) {
    if (!vaultAccess || (body.status !== "published" && body.status !== "draft")) {
      return NextResponse.json({ error: "Choose a valid publication status." }, { status: 400 });
    }

    const status: RentalVilla["status"] = body.status;
    const updated: RentalVilla = {
      ...existing,
      status,
      approvalStatus: status === "published" ? "approved" : existing.approvalStatus,
      updatedAt: new Date().toISOString(),
    };

    villas[index] = updated;
    await writeRentalVillas(villas);
    return NextResponse.json(updated);
  }

  const status: RentalVilla["status"] =
    vaultAccess && body.status === "published" ? "published" : "draft";
  const galleryImages = Array.isArray(body.galleryImages)
    ? body.galleryImages.map((image: unknown) => clean(image, 1000)).filter(Boolean).slice(0, 8)
    : existing.galleryImages;
  const updated: RentalVilla = {
    ...existing,
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
    image: clean(body.image, 1000) || existing.image,
    secondaryImage: clean(body.secondaryImage, 1000) || existing.secondaryImage,
    thirdImage: clean(body.thirdImage, 1000) || existing.thirdImage,
    fourthImage: clean(body.fourthImage, 1000) || existing.fourthImage,
    galleryImages,
    status,
    approvalStatus: status === "published" ? "approved" : "pending-review",
    updatedAt: new Date().toISOString(),
  };

  if (
    !updated.title ||
    !updated.location ||
    !updated.description ||
    !updated.image ||
    !updated.secondaryImage ||
    !updated.thirdImage ||
    !updated.fourthImage
  ) {
    return NextResponse.json(
      { error: "Title, location, description and four photographs are required." },
      { status: 400 },
    );
  }

  villas[index] = updated;
  await writeRentalVillas(villas);
  return NextResponse.json(updated);
}
