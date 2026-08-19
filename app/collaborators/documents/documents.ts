import type { CollaboratorDocumentRecord } from "../../lib/collaboratorDocumentStore";

export type CollaboratorDocumentMarket = {
  id: "spain" | "malaysia";
  name: string;
  introduction: string;
  documents: CollaboratorDocumentRecord[];
};

/**
 * Add non-property collaborator PDFs to public/collaborator-documents/<market>/
 * and list them here. Property brochures must remain in the property portfolio.
 */
export function collaboratorDocumentMarkets(documents: CollaboratorDocumentRecord[]): CollaboratorDocumentMarket[] { return [
  {
    id: "spain",
    name: "Spain",
    introduction:
      "Residency pathways, practical guidance, company information and application paperwork for clients considering Spain.",
    documents: documents.filter((document) => document.market === "spain"),
  },
  {
    id: "malaysia",
    name: "Malaysia",
    introduction:
      "Malaysia and Labuan residency, company formation, tax-structure guidance and application paperwork for international clients.",
    documents: documents.filter((document) => document.market === "malaysia"),
  },
]; }

export const documentCategories = [
  "Residency",
  "Company formation",
  "Guidance",
  "Application forms",
] as const;
