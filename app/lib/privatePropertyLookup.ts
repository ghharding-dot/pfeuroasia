import { readProperties, type VaultProperty } from "./propertyStore";
import { privateProperties } from "../private-portfolio/collection/properties";

export type PrivatePropertyRecord = Pick<
  VaultProperty,
  | "reference"
  | "location"
  | "price"
  | "title"
  | "bedrooms"
  | "bathrooms"
  | "plotSize"
  | "builtSize"
  | "terraces"
  | "description"
  | "image"
  | "secondaryImage"
  | "brochure"
  | "unbrandedBrochure"
  | "listingPartnerCode"
  | "listingPartnerName"
>;

export async function findPublishedPrivateProperty(reference: string) {
  const normalized = reference.trim().toUpperCase();
  const vaultProperties = await readProperties();
  const vaultProperty = vaultProperties.find(
    (property) =>
      property.status === "published" && property.reference.toUpperCase() === normalized,
  );

  if (vaultProperty) return vaultProperty as PrivatePropertyRecord;

  const staticProperty = privateProperties.find(
    (property) => property.reference.toUpperCase() === normalized,
  );
  return staticProperty ? (staticProperty as PrivatePropertyRecord) : null;
}
