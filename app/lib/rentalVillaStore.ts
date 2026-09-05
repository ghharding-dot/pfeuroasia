import { get, put } from "@vercel/blob";

export type RentalVillaStatus = "draft" | "published";
export type RentalVillaApprovalStatus =
  | "approved"
  | "pending-review"
  | "changes-requested";

export type RentalVilla = {
  id: string;
  reference: string;
  title: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  priceFrom?: string;
  priceTo?: string;
  currency?: "EUR" | "GBP" | "USD";
  description: string;
  amenities?: string;
  image: string;
  secondaryImage: string;
  thirdImage: string;
  fourthImage: string;
  listingPartnerCode: string;
  listingPartnerName: string;
  submittedBy: "admin" | "collaborator";
  submittedByEmail?: string;
  approvalStatus: RentalVillaApprovalStatus;
  status: RentalVillaStatus;
  createdAt: string;
  updatedAt: string;
};

const CATALOGUE_PATH = "luxury-rentals/catalogue.json";

function clean(value: unknown, maxLength = 5000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizeRentalVilla(value: unknown): RentalVilla | null {
  if (!value || typeof value !== "object") return null;
  const villa = value as RentalVilla;
  if (!villa.id || !villa.reference || !villa.title || !villa.image) return null;

  return {
    ...villa,
    title: clean(villa.title, 160),
    location: clean(villa.location, 160),
    bedrooms: Math.max(0, Number(villa.bedrooms) || 0),
    bathrooms: Math.max(0, Number(villa.bathrooms) || 0),
    guests: Math.max(0, Number(villa.guests) || 0),
    priceFrom: clean(villa.priceFrom, 80),
    priceTo: clean(villa.priceTo, 80),
    description: clean(villa.description, 1800),
    amenities: clean(villa.amenities, 1200),
    status: villa.status === "published" ? "published" : "draft",
    approvalStatus:
      villa.approvalStatus === "approved" ||
      villa.approvalStatus === "changes-requested"
        ? villa.approvalStatus
        : "pending-review",
  };
}

export async function readRentalVillas(): Promise<RentalVilla[]> {
  try {
    const result = await get(CATALOGUE_PATH, {
      access: "public",
      useCache: false,
    });
    if (!result || result.statusCode !== 200) return [];

    const parsed = await new Response(result.stream).json();
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map(normalizeRentalVilla)
      .filter((villa): villa is RentalVilla => Boolean(villa));
  } catch (error) {
    console.error("rental-villa-catalogue-read-failed", error);
    return [];
  }
}

export async function writeRentalVillas(villas: RentalVilla[]) {
  await put(CATALOGUE_PATH, JSON.stringify(villas, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    contentType: "application/json",
  });
}

export function generateRentalReference(villas: RentalVilla[]) {
  const year = new Date().getFullYear().toString().slice(-2);
  const prefix = "LVC" + year + "-";
  const highest = villas.reduce((maximum, villa) => {
    if (!villa.reference.startsWith(prefix)) return maximum;
    const sequence = Number(villa.reference.slice(prefix.length));
    return Number.isFinite(sequence) ? Math.max(maximum, sequence) : maximum;
  }, 0);

  return prefix + String(highest + 1).padStart(3, "0");
}
