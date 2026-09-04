import type { CollaboratorDocumentRecord } from "../../lib/collaboratorDocumentStore";

export type CollaboratorDocumentMarket = {
  id: "spain" | "malaysia";
  name: string;
  introduction: string;
  documents: CollaboratorDocumentRecord[];
};

const coreCollaborationDocuments: CollaboratorDocumentRecord[] = [
  {
    id: "pf-euroasia-international-developer-collaboration-agreement",
    market: "malaysia",
    category: "Collaboration agreements",
    title: "International Developer Collaboration Agreement",
    description:
      "Malaysia-based commercial template for approved Asian property-developer collaborations. Complete all schedules and obtain project-country legal review before signature.",
    url: "/collaborator-documents/asia/PF_EuroAsia_International_Developer_Collaboration_Agreement.pdf",
    fileName: "PF_EuroAsia_International_Developer_Collaboration_Agreement.pdf",
    createdAt: "2026-09-04T00:00:00.000Z",
    updatedAt: "2026-09-04T00:00:00.000Z",
  },
];

/**
 * Core approved templates are bundled with the site. Additional non-property
 * collaborator PDFs are supplied through the Document Manager catalogue.
 * Property brochures must remain in the property portfolio.
 */
export function collaboratorDocumentMarkets(documents: CollaboratorDocumentRecord[]): CollaboratorDocumentMarket[] {
  const coreIds = new Set(coreCollaborationDocuments.map((document) => document.id));
  const availableDocuments = [
    ...coreCollaborationDocuments,
    ...documents.filter((document) => !coreIds.has(document.id)),
  ];

  return [
    {
      id: "spain",
      name: "Spain",
      introduction:
        "Residency pathways, practical guidance, company information and application paperwork for clients considering Spain.",
      documents: availableDocuments.filter((document) => document.market === "spain"),
    },
    {
      id: "malaysia",
      name: "Malaysia & Asia",
      introduction:
        "Malaysia and wider-Asia residency, company formation, guidance, application paperwork and approved partner collaboration templates.",
      documents: availableDocuments.filter((document) => document.market === "malaysia"),
    },
  ];
}

export const documentCategories = [
  "Residency",
  "Company formation",
  "Guidance",
  "Application forms",
  "Collaboration agreements",
] as const;
