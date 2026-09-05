import { get, list, put } from "@vercel/blob";

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
  galleryImages?: string[];
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
const RECORDS_PREFIX = "luxury-rentals/records/";

function clean(value: unknown, maxLength = 5000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizeRentalVilla(value: unknown): RentalVilla | null {
  if (!value || typeof value !== "object") return null;
  const villa = value as RentalVilla;
  if (!villa.id || !villa.reference || !villa.title || !villa.image) return null;

  const galleryImages = Array.from(
    new Set(
      [
        villa.image,
        villa.secondaryImage,
        villa.thirdImage,
        villa.fourthImage,
        ...(Array.isArray(villa.galleryImages) ? villa.galleryImages : []),
      ]
        .map((image) => clean(image, 1000))
        .filter(Boolean),
    ),
  ).slice(0, 8);

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
    galleryImages,
    status: villa.status === "published" ? "published" : "draft",
    approvalStatus:
      villa.approvalStatus === "approved" ||
      villa.approvalStatus === "changes-requested"
        ? villa.approvalStatus
        : "pending-review",
  };
}

export async function readRentalVillas(): Promise<RentalVilla[]> {
  const villasById = new Map<string, RentalVilla>();

  try {
    let cursor: string | undefined;

    do {
      const result = await list({
        prefix: RECORDS_PREFIX,
        cursor,
        limit: 1000,
      });

      const records = await Promise.all(
        result.blobs.map(async (blob) => {
          try {
            const stored = await get(blob.url, { access: "public" });
            if (!stored || stored.statusCode !== 200) return null;
            return normalizeRentalVilla(await new Response(stored.stream).json());
          } catch (error) {
            console.error("rental-villa-record-read-failed", blob.pathname, error);
            return null;
          }
        }),
      );

      for (const villa of records) {
        if (!villa) continue;
        const current = villasById.get(villa.id);
        if (!current || Date.parse(villa.updatedAt) > Date.parse(current.updatedAt)) {
          villasById.set(villa.id, villa);
        }
      }

      cursor = result.cursor;
    } while (cursor);
  } catch (error) {
    console.error("rental-villa-record-index-read-failed", error);
  }

  try {
    const result = await get(CATALOGUE_PATH, {
      access: "public",
    });
    if (result && result.statusCode === 200) {
      const parsed = await new Response(result.stream).json();
      if (Array.isArray(parsed)) {
        for (const value of parsed) {
          const villa = normalizeRentalVilla(value);
          if (!villa) continue;
          const current = villasById.get(villa.id);
          if (!current || Date.parse(villa.updatedAt) > Date.parse(current.updatedAt)) {
            villasById.set(villa.id, villa);
          }
        }
      }
    }
  } catch (error) {
    console.error("rental-villa-catalogue-read-failed", error);
  }

  return Array.from(villasById.values());
}

export async function writeRentalVillas(villas: RentalVilla[]) {
  await Promise.all(
    villas.map((villa) =>
      put(
        `${RECORDS_PREFIX}${villa.id}/${encodeURIComponent(villa.updatedAt)}.json`,
        JSON.stringify(villa, null, 2),
        {
          access: "public",
          addRandomSuffix: false,
          allowOverwrite: true,
          cacheControlMaxAge: 60,
          contentType: "application/json",
        },
      ),
    ),
  );

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
