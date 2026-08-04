import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  randomUUID,
} from "node:crypto";
import { list, put } from "@vercel/blob";

export type RegisteredListingLead = {
  id: string;
  fullName: string;
  email: string;
  telephone: string;
  viewedPropertyIds: string[];
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
};

const REGISTRY_PATH = "registered-listings/lead-registry.pfea";
const REGISTRY_PREFIX = "pfea-registered-leads-v1";

function registrySecret() {
  const secret =
    process.env.REGISTERED_PROPERTY_ACCESS_SECRET ||
    process.env.PRIVATE_CLIENT_ACCESS_SECRET ||
    process.env.BROCHURE_STORAGE_SECRET ||
    process.env.BROCHURE_ACCESS_SECRET ||
    process.env.PRIVATE_PORTFOLIO_PASSWORD ||
    process.env.RESEND_API_KEY;

  if (!secret) throw new Error("Registered listing lead storage is not configured.");
  return secret;
}

function encryptionKey() {
  return createHash("sha256").update(registrySecret()).digest();
}

function encryptRegistry(leads: RegisteredListingLead[]) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const plaintext = Buffer.from(JSON.stringify(leads), "utf8");
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [
    REGISTRY_PREFIX,
    iv.toString("base64url"),
    tag.toString("base64url"),
    encrypted.toString("base64url"),
  ].join(".");
}

function decryptRegistry(value: string): RegisteredListingLead[] {
  const [prefix, ivValue, tagValue, encryptedValue] = value.trim().split(".");
  if (prefix !== REGISTRY_PREFIX || !ivValue || !tagValue || !encryptedValue) {
    return [];
  }

  try {
    const decipher = createDecipheriv(
      "aes-256-gcm",
      encryptionKey(),
      Buffer.from(ivValue, "base64url"),
    );
    decipher.setAuthTag(Buffer.from(tagValue, "base64url"));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedValue, "base64url")),
      decipher.final(),
    ]);
    const parsed = JSON.parse(decrypted.toString("utf8"));
    return Array.isArray(parsed) ? (parsed as RegisteredListingLead[]) : [];
  } catch (error) {
    console.error("registered-lead-registry-decryption-failed", error);
    return [];
  }
}

export function normalizeRegisteredEmail(value: unknown) {
  return typeof value === "string"
    ? value.trim().toLowerCase().slice(0, 320)
    : "";
}

export async function readRegisteredListingLeads(): Promise<RegisteredListingLead[]> {
  const result = await list({ prefix: REGISTRY_PATH, limit: 1 });
  const blob = result.blobs.find((item) => item.pathname === REGISTRY_PATH);
  if (!blob) return [];

  const response = await fetch(blob.url, { cache: "no-store" });
  if (!response.ok) return [];
  return decryptRegistry(await response.text());
}

async function writeRegisteredListingLeads(leads: RegisteredListingLead[]) {
  await put(REGISTRY_PATH, encryptRegistry(leads), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/octet-stream",
  });
}

export async function recordRegisteredListingLead(args: {
  fullName: string;
  email: string;
  telephone: string;
  propertyId: string;
}) {
  const leads = await readRegisteredListingLeads();
  const email = normalizeRegisteredEmail(args.email);
  const now = new Date().toISOString();
  const index = leads.findIndex((lead) => normalizeRegisteredEmail(lead.email) === email);

  if (index >= 0) {
    const current = leads[index];
    const updated: RegisteredListingLead = {
      ...current,
      fullName: args.fullName,
      email,
      telephone: args.telephone,
      viewedPropertyIds: Array.from(new Set([...current.viewedPropertyIds, args.propertyId])),
      updatedAt: now,
      lastLoginAt: now,
    };
    leads[index] = updated;
    await writeRegisteredListingLeads(leads);
    return updated;
  }

  const lead: RegisteredListingLead = {
    id: randomUUID(),
    fullName: args.fullName,
    email,
    telephone: args.telephone,
    viewedPropertyIds: [args.propertyId],
    createdAt: now,
    updatedAt: now,
    lastLoginAt: now,
  };
  leads.push(lead);
  await writeRegisteredListingLeads(leads);
  return lead;
}
