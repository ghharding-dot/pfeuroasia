import { list, put } from "@vercel/blob";

export type VaultProperty = {
  id: string;
  reference: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  plotSize: string;
  builtSize: string;
  terraces?: string;
  description: string;
  image: string;
  secondaryImage?: string;
  brochure?: string;
  listingPartnerCode?: string;
  listingPartnerName?: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
};

const CATALOGUE_PATH = "private-portfolio/catalogue.json";

export async function readProperties(): Promise<VaultProperty[]> {
  const result = await list({ prefix: CATALOGUE_PATH, limit: 1 });
  const blob = result.blobs.find((item) => item.pathname === CATALOGUE_PATH);
  if (!blob) return [];

  const response = await fetch(blob.url, { cache: "no-store" });
  if (!response.ok) return [];
  const parsed = await response.json();
  return Array.isArray(parsed) ? parsed : [];
}

export async function writeProperties(properties: VaultProperty[]) {
  await put(CATALOGUE_PATH, JSON.stringify(properties, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
