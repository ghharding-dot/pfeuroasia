export type CollaboratorDocument = {
  title: string;
  description: string;
  category: "Residency" | "Company formation" | "Guidance" | "Application forms";
  href: string;
  fileType: "PDF";
  updated: string;
};

export type CollaboratorDocumentMarket = {
  id: "spain" | "malaysia";
  name: string;
  introduction: string;
  documents: CollaboratorDocument[];
};

/**
 * Add non-property collaborator PDFs to public/collaborator-documents/<market>/
 * and list them here. Property brochures must remain in the property portfolio.
 */
export const collaboratorDocumentMarkets: CollaboratorDocumentMarket[] = [
  {
    id: "spain",
    name: "Spain",
    introduction:
      "Residency pathways, practical guidance, company information and application paperwork for clients considering Spain.",
    documents: [],
  },
  {
    id: "malaysia",
    name: "Malaysia",
    introduction:
      "Malaysia and Labuan residency, company formation, tax-structure guidance and application paperwork for international clients.",
    documents: [],
  },
];

export const documentCategories = [
  "Residency",
  "Company formation",
  "Guidance",
  "Application forms",
] as const;
