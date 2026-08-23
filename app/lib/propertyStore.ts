import { list, put } from "@vercel/blob";
import {
  formatPropertyCurrency,
  inferLegacyCurrency,
  normalizePriceAmount,
  normalizePropertyCurrency,
  type PropertyCurrency,
} from "./propertyPrice";

export type PropertyVisibility = "confidential" | "teaser" | "public";
export type PropertyAccessLevel = "registered" | "private";
export type PropertyImagePosition = "center" | "top" | "bottom" | "left" | "right";
export type PropertyListingType = "resale" | "new-development";
export type PropertyType =
  | "villa"
  | "plot"
  | "new-construction"
  | "apartment"
  | "townhouse"
  | "new-build";

export type VaultProperty = {
  id: string;
  reference: string;
  title: string;
  location: string;
  approximateLocation?: string;
  /** Formatted compatibility value generated from the canonical numeric fields. */
  price?: string;
  /** Canonical numeric listing price used for all new and migrated records. */
  priceAmount?: number;
  /** Optional upper price for new-development ranges. */
  priceTo?: string;
  /** Canonical numeric upper price for new-development ranges. */
  priceToAmount?: number;
  /** ISO-style base currency code for the canonical listing price. */
  priceCurrency?: PropertyCurrency;
  bedrooms: number;
  bathrooms: number;
  plotSize: string;
  builtSize: string;
  terraces?: string;
  annualCosts?: string;
  description: string;
  image: string;
  secondaryImage?: string;
  thirdImage?: string;
  fourthImage?: string;
  brochure?: string;
  unbrandedBrochure?: string;
  adviserName?: string;
  adviserWhatsApp?: string;
  lastVerifiedAt?: string;
  visibility?: PropertyVisibility;
  accessLevel?: PropertyAccessLevel;
  publicTitle?: string;
  publicLocation?: string;
  publicImageApproved?: boolean;
  imagePosition?: PropertyImagePosition;
  listingType?: PropertyListingType;
  propertyType?: PropertyType;
  listingPartnerCode?: string;
  listingPartnerName?: string;
  submittedBy?: "admin" | "collaborator";
  submittedByEmail?: string;
  approvalStatus?: "approved" | "pending-review" | "changes-requested";
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
};

const CATALOGUE_PATH = "private-portfolio/catalogue.json";

export function normalizePropertyVisibility(value: unknown): PropertyVisibility {
  return value === "teaser" || value === "public" ? value : "confidential";
}

export function normalizePropertyListingType(value: unknown): PropertyListingType {
  return value === "new-development" ? "new-development" : "resale";
}

export function normalizePropertyType(
  value: unknown,
  listingType: PropertyListingType,
): PropertyType {
  if (listingType === "new-development") {
    return value === "apartment" || value === "townhouse" || value === "villa"
      ? value
      : "new-build";
  }

  return value === "plot" || value === "new-construction" ? value : "villa";
}

export function propertyTypeLabel(value?: PropertyType) {
  switch (value) {
    case "plot": return "Plot";
    case "new-construction": return "New construction";
    case "apartment": return "Apartment";
    case "townhouse": return "Townhouse";
    case "new-build": return "New build";
    default: return "Villa";
  }
}

export function normalizePropertyAccessLevel(
  value: unknown,
  visibility?: PropertyVisibility,
): PropertyAccessLevel {
  if (value === "registered") return "registered";
  if (value === "private") return "private";
  return visibility === "public" ? "registered" : "private";
}

export function normalizeImagePosition(value: unknown): PropertyImagePosition {
  return value === "top" || value === "bottom" || value === "left" || value === "right"
    ? value
    : "center";
}

export function imageObjectPosition(position?: PropertyImagePosition) {
  switch (position) {
    case "top":
      return "center top";
    case "bottom":
      return "center bottom";
    case "left":
      return "left center";
    case "right":
      return "right center";
    default:
      return "center center";
  }
}

export function generatePropertyReference(properties: VaultProperty[]) {
  const year = new Date().getFullYear().toString().slice(-2);
  const prefix = `PFEA00${year}`;
  const highest = properties.reduce((max, property) => {
    if (!property.reference.startsWith(prefix)) return max;
    const sequence = Number(property.reference.slice(prefix.length));
    return Number.isFinite(sequence) ? Math.max(max, sequence) : max;
  }, 0);

  return `${prefix}${String(highest + 1).padStart(2, "0")}`;
}

function normalizeStoredProperty(value: unknown): VaultProperty | null {
  if (!value || typeof value !== "object") return null;
  const property = value as VaultProperty;

  const priceAmount = normalizePriceAmount(property.priceAmount ?? property.price);
  const priceCurrency = property.priceCurrency
    ? normalizePropertyCurrency(property.priceCurrency)
    : inferLegacyCurrency(property.price);
  const price = priceAmount
    ? formatPropertyCurrency(priceAmount, priceCurrency)
    : property.price || undefined;
  const priceToAmount = normalizePriceAmount(property.priceToAmount ?? property.priceTo);
  const priceTo = priceToAmount
    ? formatPropertyCurrency(priceToAmount, priceCurrency)
    : property.priceTo || undefined;

  const listingType = normalizePropertyListingType(property.listingType);

  return {
    ...property,
    price,
    priceAmount,
    priceCurrency,
    priceTo,
    priceToAmount,
    listingType,
    propertyType: normalizePropertyType(property.propertyType, listingType),
  };
}

export async function readProperties(): Promise<VaultProperty[]> {
  const result = await list({ prefix: CATALOGUE_PATH, limit: 1 });
  const blob = result.blobs.find((item) => item.pathname === CATALOGUE_PATH);
  if (!blob) return [];

  const response = await fetch(blob.url, { cache: "no-store" });
  if (!response.ok) return [];
  const parsed = await response.json();
  if (!Array.isArray(parsed)) return [];

  return parsed
    .map(normalizeStoredProperty)
    .filter((property): property is VaultProperty => Boolean(property));
}

export async function writeProperties(properties: VaultProperty[]) {
  await put(CATALOGUE_PATH, JSON.stringify(properties, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
