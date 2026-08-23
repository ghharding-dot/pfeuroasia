export const PARTNER_REFERRALS = {
  pfiberia: {
    code: "PFI",
    name: "Property Facilitators Iberia",
    category: "Property representation partner",
  },
  aylesford: {
    code: "AYL",
    name: "Aylesford Spain",
    category: "Property representation partner",
  },
  "house-country": {
    code: "HOU",
    name: "House and Country Real Estate",
    category: "Property representation partner",
  },
  luxoestates: {
    code: "LUX",
    name: "LuxoEstates",
    category: "Property representation partner",
  },
  "the-fixer": {
    code: "FIX",
    name: "The Fixer",
    category: "Property representation partner",
  },
  rent2holiday: {
    code: "R2H",
    name: "Rent2Holiday",
    category: "Holiday rental and property management partner",
  },
  legal10: {
    code: "LEG",
    name: "Legal 10 Abogados Marbella",
    category: "Legal representation partner",
  },
  lawbird: {
    code: "LAW",
    name: "Lawbird Legal Services",
    category: "Legal representation partner",
  },
  martinezechevarria: {
    code: "MEC",
    name: "Martinez-Echevarria Lawyers",
    category: "Legal representation partner",
  },
} as const;

export type PartnerSlug = keyof typeof PARTNER_REFERRALS;
export type PartnerReferral = (typeof PARTNER_REFERRALS)[PartnerSlug];

export function getPartnerReferral(slug?: string | null) {
  if (!slug) return null;
  const normalized = slug.toLowerCase() as PartnerSlug;
  return PARTNER_REFERRALS[normalized] ?? null;
}
