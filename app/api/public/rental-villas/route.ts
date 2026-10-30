import { NextResponse } from "next/server";
import { readRentalVillas, selectRentalCarouselVillas } from "../../../lib/rentalVillaStore";

export const dynamic = "force-dynamic";

/**
 * Public, read-only rental selection shared with the Madronal Villas website.
 * Only approved and published villas are returned. Internal collaborator
 * contact details, submission metadata and unpublished records stay private.
 */
export async function GET() {
  try {
    const villas = selectRentalCarouselVillas(await readRentalVillas()).map((villa) => ({
      reference: villa.reference,
      title: villa.title,
      location: villa.location,
      bedrooms: villa.bedrooms,
      bathrooms: villa.bathrooms,
      guests: villa.guests,
      priceFrom: villa.priceFrom || "",
      priceTo: villa.priceTo || "",
      currency: villa.currency || "GBP",
      description: villa.description,
      amenities: villa.amenities || "",
      image: villa.image,
      galleryImages: Array.from(
        new Set(
          [
            ...(villa.galleryImages || []),
            villa.image,
            villa.secondaryImage,
            villa.thirdImage,
            villa.fourthImage,
          ].filter(Boolean),
        ),
      ).slice(0, 8),
    }));

    return NextResponse.json(
      { villas, count: villas.length, maximum: 15 },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("public-rental-carousel-feed-failed", error);
    return NextResponse.json(
      { error: "The villa selection is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
