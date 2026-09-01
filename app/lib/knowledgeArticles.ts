export const knowledgeCategories = [
  "All",
  "Residency & relocation",
  "Company & structuring",
  "Property & living",
  "Spain & cross-border",
] as const;

export type KnowledgeCategory = Exclude<(typeof knowledgeCategories)[number], "All">;

export type KnowledgeArticle = {
  title: string;
  summary: string;
  href: string;
  category: KnowledgeCategory;
  region: string;
  featured?: boolean;
};

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    title: "Malaysia residency options for foreigners",
    summary: "Compare MM2H, DE Rantau, employment passes and business-led pathways before choosing how to establish a Malaysian base.",
    href: "/guides/malaysia-residency-options",
    category: "Residency & relocation",
    region: "Malaysia",
    featured: true,
  },
  {
    title: "Malaysia tax residency for foreigners",
    summary: "Understand the statutory residence tests, the role of day counts and why immigration status and tax residence are separate.",
    href: "/guides/malaysia-tax-residency-for-foreigners",
    category: "Residency & relocation",
    region: "Malaysia",
  },
  {
    title: "Moving from Spain to Malaysia",
    summary: "Coordinate Spanish departure, Malaysian immigration, tax residence, housing and family arrangements as one cross-border plan.",
    href: "/guides/moving-from-spain-to-malaysia",
    category: "Residency & relocation",
    region: "Spain → Malaysia",
    featured: true,
  },
  {
    title: "Malaysia vs Dubai for tax residency",
    summary: "Compare residence pathways, business environment, lifestyle and practical relocation considerations in Malaysia and Dubai.",
    href: "/guides/malaysia-vs-dubai-tax-residency",
    category: "Spain & cross-border",
    region: "Malaysia · UAE",
  },
  {
    title: "Malaysia company formation for foreigners",
    summary: "A practical introduction to mainland Malaysian, foreign-company and Labuan structures and the decisions required before setup.",
    href: "/services/malaysia-company-formation",
    category: "Company & structuring",
    region: "Malaysia",
    featured: true,
  },
  {
    title: "Malaysia company vs Labuan company",
    summary: "Choose between the structures by customers, operations, regulation, substance and banking—not the headline tax rate alone.",
    href: "/guides/malaysia-company-vs-labuan-company",
    category: "Company & structuring",
    region: "Malaysia · Labuan",
  },
  {
    title: "Labuan company setup costs",
    summary: "Separate official regulatory fees from trust-company, compliance, substance, audit, banking and immigration costs.",
    href: "/guides/labuan-company-setup-costs",
    category: "Company & structuring",
    region: "Labuan",
  },
  {
    title: "Labuan company and Malaysia residency",
    summary: "Explore the coordinated company, work-permit and family-residency pathway delivered with established Malaysian specialists.",
    href: "/services/labuan-company-residency",
    category: "Company & structuring",
    region: "Labuan · Malaysia",
  },
  {
    title: "Company formation in Asia",
    summary: "Compare the starting considerations for Malaysia, Labuan, Singapore and Hong Kong through the PF EuroAsia adviser network.",
    href: "/asia-gateway/company-residency",
    category: "Company & structuring",
    region: "Asia",
  },
  {
    title: "Buying property in Malaysia as a foreigner",
    summary: "Understand state approval, foreign-buyer thresholds, title restrictions, legal due diligence, finance and residency separation.",
    href: "/guides/buying-property-in-malaysia-as-a-foreigner",
    category: "Property & living",
    region: "Malaysia",
    featured: true,
  },
  {
    title: "Cost of living in Malaysia vs Spain",
    summary: "Build a household-specific comparison across housing, transport, healthcare, schooling, tax and long-haul travel.",
    href: "/guides/cost-of-living-malaysia-vs-spain",
    category: "Property & living",
    region: "Malaysia · Spain",
  },
  {
    title: "Marbella property for international buyers",
    summary: "A decision-led guide to locations, representation, due diligence and the acquisition process in Marbella and Benahavís.",
    href: "/guides/marbella-property-international-buyers",
    category: "Spain & cross-border",
    region: "Marbella · Spain",
  },
  {
    title: "Spain Golden Visa alternatives after 2025",
    summary: "Compare current residence routes after the closure of Spain's property-investor pathway to new applicants.",
    href: "/guides/spain-golden-visa-alternatives",
    category: "Spain & cross-border",
    region: "Spain",
  },
];
