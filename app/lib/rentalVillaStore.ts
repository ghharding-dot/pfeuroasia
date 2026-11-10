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
    currency:
      villa.listingPartnerCode === "LVC"
        ? "GBP"
        : villa.currency === "EUR" || villa.currency === "USD"
          ? villa.currency
          : "GBP",
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


// Curated LVC partner showcase listing. Enquiries stay within PF EuroAsia.
const villaAlunaShowcase: RentalVilla = {
  id: "lvc-villa-aluna",
  reference: "LVC26-ALUNA",
  title: "Villa Aluna",
  location: "Hacienda Las Chapas, Marbella East",
  bedrooms: 7,
  bathrooms: 7,
  guests: 14,
  priceFrom: "15800",
  currency: "GBP",
  description:
    "Contemporary seven-suite private villa set among mature pines in Hacienda Las Chapas. Highlights include a sunken lounge, landscaped pool gardens, outdoor kitchen and dining, private cinema, Technogym fitness room, yoga studio and garden spa with sauna, Japanese hot bath and cold plunge. Daily housekeeping and concierge support included. Weekly rates and availability are subject to confirmation.",
  amenities:
    "Private swimming pool, 7 en-suite bedrooms, Landscaped gardens, Garden sauna, Japanese hot bath, Cold plunge, Private cinema, Technogym gym, Yoga and meditation studio, Outdoor kitchen and BBQ, EV charger, Daily housekeeping, Concierge service, High-speed Wi-Fi",
  image: "https://theluxuryvillacollection.com/wp-content/uploads/2026/08/2-Villa-Aluna-Private-Luxury-Villa-Marbella-Entrance-and-TV-Snug-528x400.jpg",
  secondaryImage: "https://theluxuryvillacollection.com/wp-content/uploads/2026/08/1-Villa-Aluna-Luxury-Designer-Villa-Marbella-Outdoor-Spa-Circuit-528x400.jpg",
  thirdImage: "https://theluxuryvillacollection.com/wp-content/uploads/2026/08/6-Villa-Aluna-Private-Luxury-Villa-Marbella-Bedroom-1A-528x400.jpg",
  fourthImage: "",
  galleryImages: [],
  listingPartnerCode: "LVC",
  listingPartnerName: "The Luxury Villa Collection",
  submittedBy: "admin",
  approvalStatus: "approved",
  status: "published",
  createdAt: "2026-11-10T12:00:00.000Z",
  updatedAt: "2026-11-10T12:00:00.000Z",
};


const villaMariviShowcase: RentalVilla = {
  id: "lvc-villa-marivi",
  reference: "LVC26-MARIVI",
  title: "Villa Marivi",
  location: "Beachfront, Marbella Golden Mile",
  bedrooms: 10,
  bathrooms: 10,
  guests: 16,
  priceFrom: "68000",
  currency: "GBP",
  description:
    "An exceptional private beachfront estate on Marbella's Golden Mile, beside Marbella Club. Approximately 2,400 m² of living space is set within 6,000 m² of gardens, with sea-view terraces and direct access to the beach. Facilities include an outdoor pool, heated indoor spa pool, sauna, hot tub, gym, floodlit tennis court, private cinema, piano cocktail lounge and games room. Daily housekeeping and dedicated villa concierge support. Occupancy, rates, event permissions and availability require confirmation.",
  amenities:
    "Direct beachfront access, 6,000 m² private estate, 2,400 m² living accommodation, Outdoor swimming pool, Heated indoor swimming pool, Children's pool, Sauna and hot tub, Gym, Floodlit tennis court, Private cinema, Games room, Piano cocktail bar, Lift, Daily housekeeping, Dedicated concierge, Sea-view terraces, Events on request",
  image: "https://theluxuryvillacollection.com/wp-content/uploads/2023/03/1-Villa-Marivi-Marbella-beach-front-villa.jpg",
  secondaryImage: "https://theluxuryvillacollection.com/wp-content/uploads/2023/03/1-Villa-Marivi-Marbella-villa-with-private-tennis-court-1024x682.jpg",
  thirdImage: "",
  fourthImage: "",
  galleryImages: [],
  listingPartnerCode: "LVC",
  listingPartnerName: "The Luxury Villa Collection",
  submittedBy: "admin",
  approvalStatus: "approved",
  status: "published",
  createdAt: "2026-11-10T12:05:00.000Z",
  updatedAt: "2026-11-10T12:05:00.000Z",
};


const villaTulaShowcase: RentalVilla = {
  id: "lvc-villa-tula",
  reference: "LVC26-TULA",
  title: "Villa Tula",
  location: "Sierra Blanca Country Club, Istán, Marbella",
  bedrooms: 4,
  bathrooms: 5,
  guests: 8,
  priceFrom: "13520",
  currency: "GBP",
  description:
    "A distinctive four-bedroom designer villa by architect Carlos Lamas, in Sierra Blanca Country Club near Istán. Panoramic views extend across Lake Istán, the Marbella coastline and the Mediterranean. Enjoy a private 8 x 4 m pool, scenic terraces, a cinema and games room, gym, study and stylish indoor-outdoor dining. The rental includes a weekly full clean and linen change plus one additional light housekeeping visit. Rates and availability are subject to confirmation.",
  amenities:
    "Panoramic lake and sea views, Private 8 x 4 m swimming pool, Four bedrooms, Five bathrooms, Private gym, Cinema and games room, Pool table, Cocktail bar, Office, Outdoor terraces, Outdoor dining, Gas BBQ, Sonos sound system, Fast Wi-Fi, Four parking spaces, Weekly housekeeping and linen change, Additional light housekeeping visit",
  image: "https://theluxuryvillacollection.com/wp-content/uploads/2023/07/1-Villa-Tula-in-Istan-villa-with-pool.jpg",
  secondaryImage: "https://theluxuryvillacollection.com/wp-content/uploads/2023/07/2-Villa-Tula-designer-villa-living-room-528x400.jpg",
  thirdImage: "https://theluxuryvillacollection.com/wp-content/uploads/2023/07/8-Villa-Tula-games-room-and-bar-600x399.jpg",
  fourthImage: "",
  galleryImages: [],
  listingPartnerCode: "LVC",
  listingPartnerName: "The Luxury Villa Collection",
  submittedBy: "admin",
  approvalStatus: "approved",
  status: "published",
  createdAt: "2026-11-10T14:10:00.000Z",
  updatedAt: "2026-11-10T14:10:00.000Z",
};


const villaAcquaShowcase: RentalVilla = {
  id: "lvc-villa-acqua",
  reference: "LVC26-ACQUA",
  title: "Villa Acqua",
  location: "Marbella Golden Mile, 300 m from Playa Casablanca",
  bedrooms: 4,
  bathrooms: 6,
  guests: 10,
  priceFrom: "11750",
  currency: "GBP",
  description:
    "An architect-designed four-bedroom villa just 300 metres from Playa Casablanca on Marbella's Golden Mile. Distinctive features include vertical living walls, a circular glass lift, a glass-sided deep aquarium pool with counter-current swimming, a sea-view roof terrace with hot tub, designer Bulthaup kitchen and a small fitness area. Sleeps eight in four en-suite bedrooms plus two using the sofa bed. Seasonal winter spa and pool heating by advance arrangement, with possible supplements. Light housekeeping included. Rates and availability subject to confirmation.",
  amenities:
    "300 m to Playa Casablanca, Glass-sided aquarium swimming pool, Counter-current swimming, Pool heating on request, Rooftop hot tub, Sea-view roof terrace, Four en-suite bedrooms, Six bathrooms, Circular glass lift, Vertical living walls, Bulthaup kitchen, Fitness area, Seasonal winter spa by advance booking, Sauna, Steam room, BBQ and fire-pit terrace, Smart home automation, Light housekeeping, Dog considered on request",
  image: "https://theluxuryvillacollection.com/wp-content/uploads/2023/05/1-Villa-Acqua-infinity-pool-terrace-528x400.jpg",
  secondaryImage: "https://theluxuryvillacollection.com/wp-content/uploads/2023/05/2-Villa-Acqua-open-plan-living-space-528x400.jpg",
  thirdImage: "https://theluxuryvillacollection.com/wp-content/uploads/2023/05/9-Villa-Acqua-Rooftop-hot-tub-600x401.jpg",
  fourthImage: "",
  galleryImages: [],
  listingPartnerCode: "LVC",
  listingPartnerName: "The Luxury Villa Collection",
  submittedBy: "admin",
  approvalStatus: "approved",
  status: "published",
  createdAt: "2026-11-10T14:15:00.000Z",
  updatedAt: "2026-11-10T14:15:00.000Z",
};

export const RENTAL_CAROUSEL_LIMIT = 15;

export function selectRentalCarouselVillas(villas: RentalVilla[]): RentalVilla[] {
  const hasVillaAluna = villas.some((villa) =>
    villa.id === villaAlunaShowcase.id ||
    villa.reference === villaAlunaShowcase.reference ||
    villa.title.trim().toLowerCase() === "villa aluna",
  );
  const candidatesWithAluna = hasVillaAluna ? villas : [villaAlunaShowcase, ...villas];
  const hasVillaMarivi = candidatesWithAluna.some((villa) =>
    villa.id === villaMariviShowcase.id ||
    villa.reference === villaMariviShowcase.reference ||
    villa.title.trim().toLowerCase() === "villa marivi",
  );
  const candidates = hasVillaMarivi ? candidatesWithAluna : [villaMariviShowcase, ...candidatesWithAluna];
  const hasVillaTula = candidates.some((villa) =>
    villa.id === villaTulaShowcase.id ||
    villa.reference === villaTulaShowcase.reference ||
    villa.title.trim().toLowerCase() === "villa tula",
  );
  const showcaseCandidates = hasVillaTula ? candidates : [villaTulaShowcase, ...candidates];
  const hasVillaAcqua = showcaseCandidates.some((villa) =>
    villa.id === villaAcquaShowcase.id ||
    villa.reference === villaAcquaShowcase.reference ||
    villa.title.trim().toLowerCase() === "villa acqua",
  );
  const finalCandidates = hasVillaAcqua ? showcaseCandidates : [villaAcquaShowcase, ...showcaseCandidates];
  return finalCandidates
    .filter((villa) => villa.status === "published" && villa.approvalStatus === "approved")
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    .slice(0, RENTAL_CAROUSEL_LIMIT);
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
