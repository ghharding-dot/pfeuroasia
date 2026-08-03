export type PartnerContact = {
  code: string;
  name: string;
  email?: string;
};

const PARTNER_CONTACTS: Record<string, PartnerContact> = {
  DIRECT: {
    code: "DIRECT",
    name: "Property Facilitators EuroAsia",
    email: "enquiry@pfeuroasia.com",
  },
  PFI: {
    code: "PFI",
    name: "Property Facilitators Iberia",
    email: "ghh@pfiberia.com",
  },
  AYL: {
    code: "AYL",
    name: "Aylesford Spain",
    email: "michael@aylesfordspain.com",
  },
  HOU: {
    code: "HOU",
    name: "House and Country Real Estate",
    email: "jaime@houseandcountry.com",
  },
  LUX: {
    code: "LUX",
    name: "LuxoEstates",
    email: process.env.PARTNER_EMAIL_LUX,
  },
  FIX: {
    code: "FIX",
    name: "The Fixer",
    email: "robert@bazothefixer.com",
  },
  LEG: {
    code: "LEG",
    name: "Legal 10 Abogados Marbella",
    email: "juanlopez@legal10abogadosmarbella.com",
  },
  LAW: {
    code: "LAW",
    name: "Lawbird Legal Services",
    email: "aflores@lawbird.com",
  },
  MEC: {
    code: "MEC",
    name: "Martinez-Echevarria Lawyers",
    email: "luis.recio@martinezechevarria.com",
  },
};

export function getPartnerContact(code?: string | null) {
  if (!code) return PARTNER_CONTACTS.DIRECT;
  return PARTNER_CONTACTS[code.toUpperCase()] || PARTNER_CONTACTS.DIRECT;
}

export const PROPERTY_LISTING_PARTNERS = [
  PARTNER_CONTACTS.DIRECT,
  PARTNER_CONTACTS.PFI,
  PARTNER_CONTACTS.AYL,
  PARTNER_CONTACTS.HOU,
  PARTNER_CONTACTS.LUX,
  PARTNER_CONTACTS.FIX,
] as const;
