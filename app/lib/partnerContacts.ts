import { createHash } from "node:crypto";

export type PartnerContact = {
  code: string;
  name: string;
  email?: string;
  loginEmails?: readonly string[];
  loginEmailHashes?: readonly string[];
};

export type CollaboratorLogin = PartnerContact & {
  loginEmail: string;
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
    loginEmails: [
      "michael@aylesfordspain.com",
      "david.neeson@me.com",
    ],
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
  LVC: {
    code: "LVC",
    name: "The Luxury Villa Collection",
    email: "villas@theluxuryvillacollection.com",
    loginEmails: ["villas@theluxuryvillacollection.com"],
  },
  FIX: {
    code: "FIX",
    name: "The Fixer",
    email: "robert@bazothefixer.com",
    loginEmails: [
      "robert@bazothefixer.com",
      "bazo.estate@gmail.com",
    ],
  },
  R2H: {
    code: "R2H",
    name: "Rent2Holiday",
    loginEmails: [
      "jorge@rent2holiday.es",
    ],
  },
  DEV: {
    code: "DEV",
    name: "Developments.es",
    loginEmailHashes: [
      "00dd2f50ef2de4601f30c5a022bd85b300556c0bfaaf17c51026724c9c7cff43",
    ],
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
  AIMS: {
    code: "AIMS",
    name: "AIMS Trust Group",
    email: process.env.PARTNER_EMAIL_AIMS || "abid@aimsconsulting.my",
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
  PARTNER_CONTACTS.LVC,
  PARTNER_CONTACTS.FIX,
  PARTNER_CONTACTS.R2H,
  PARTNER_CONTACTS.DEV,
] as const;

export const COLLABORATOR_LOGIN_PARTNERS = PROPERTY_LISTING_PARTNERS.filter(
  (partner) =>
    partner.code !== "DIRECT" &&
    (Boolean(partner.email) ||
      Boolean(partner.loginEmails?.length) ||
      Boolean(partner.loginEmailHashes?.length)),
);

function collaboratorEmailHash(email: string) {
  return createHash("sha256")
    .update(`pfea-dev-access-2026:${email}`)
    .digest("hex");
}

export function getCollaboratorByEmail(email?: string | null): CollaboratorLogin | null {
  const normalized = String(email || "").trim().toLowerCase();
  if (!normalized) return null;

  for (const partner of COLLABORATOR_LOGIN_PARTNERS) {
    const approvedEmails = new Set(
      [partner.email, ...(partner.loginEmails || [])]
        .filter(Boolean)
        .map((value) => String(value).trim().toLowerCase()),
    );
    const approvedEmailHashes = new Set(partner.loginEmailHashes || []);

    if (approvedEmails.has(normalized) || approvedEmailHashes.has(collaboratorEmailHash(normalized))) {
      return { ...partner, loginEmail: normalized };
    }
  }

  return null;
}
