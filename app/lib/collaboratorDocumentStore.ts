import { del, list, put } from "@vercel/blob";

export const COLLABORATOR_DOCUMENT_MARKETS = ["spain", "malaysia"] as const;
export const COLLABORATOR_DOCUMENT_CATEGORIES = [
  "Residency",
  "Company formation",
  "Guidance",
  "Application forms",
  "Collaboration agreements",
] as const;

export type CollaboratorDocumentMarket = (typeof COLLABORATOR_DOCUMENT_MARKETS)[number];
export type CollaboratorDocumentCategory = (typeof COLLABORATOR_DOCUMENT_CATEGORIES)[number];

export type CollaboratorDocumentRecord = {
  id: string;
  market: CollaboratorDocumentMarket;
  category: CollaboratorDocumentCategory;
  title: string;
  description: string;
  url: string;
  fileName: string;
  createdAt: string;
  updatedAt: string;
};

const CATALOGUE_PATH = "collaborator-documents/catalogue.json";

export function isCollaboratorDocumentMarket(value: unknown): value is CollaboratorDocumentMarket {
  return COLLABORATOR_DOCUMENT_MARKETS.includes(value as CollaboratorDocumentMarket);
}

export function isCollaboratorDocumentCategory(value: unknown): value is CollaboratorDocumentCategory {
  return COLLABORATOR_DOCUMENT_CATEGORIES.includes(value as CollaboratorDocumentCategory);
}

function normalizeDocument(value: unknown): CollaboratorDocumentRecord | null {
  if (!value || typeof value !== "object") return null;
  const document = value as CollaboratorDocumentRecord;
  if (
    !document.id ||
    !document.title ||
    !document.url ||
    !isCollaboratorDocumentMarket(document.market) ||
    !isCollaboratorDocumentCategory(document.category)
  ) return null;
  return document;
}

export async function readCollaboratorDocuments(): Promise<CollaboratorDocumentRecord[]> {
  const result = await list({ prefix: CATALOGUE_PATH, limit: 1 });
  const blob = result.blobs.find((item) => item.pathname === CATALOGUE_PATH);
  if (!blob) return [];

  const response = await fetch(blob.url, { cache: "no-store" });
  if (!response.ok) return [];
  const parsed = await response.json();
  if (!Array.isArray(parsed)) return [];

  return parsed
    .map(normalizeDocument)
    .filter((document): document is CollaboratorDocumentRecord => Boolean(document));
}

export async function writeCollaboratorDocuments(documents: CollaboratorDocumentRecord[]) {
  await put(CATALOGUE_PATH, JSON.stringify(documents, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function removeCollaboratorDocument(document: CollaboratorDocumentRecord) {
  await del(document.url);
}
