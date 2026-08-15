import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  randomUUID,
} from "node:crypto";
import { list, put } from "@vercel/blob";

export type MalaysiaAdviserQuestion = {
  id: string;
  question: string;
  askedAt: string;
  status: "pending" | "answered";
  answer?: string;
  source?: string;
  answeredAt?: string;
  answerMode?: "controlled" | "hybrid-ai";
  topic?: string;
  knowledgeIds?: string[];
  model?: string;
};

export type MalaysiaAdviserLead = {
  id: string;
  fullName: string;
  email: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  lastAccessAt: string;
  accessCount: number;
  questions: MalaysiaAdviserQuestion[];
};

const REGISTRY_PATH = "adviser/malaysia-lead-registry.pfea";
const REGISTRY_PREFIX = "pfea-malaysia-adviser-leads-v1";

function registrySecret() {
  const secret =
    process.env.REGISTERED_PROPERTY_ACCESS_SECRET ||
    process.env.PRIVATE_CLIENT_ACCESS_SECRET ||
    process.env.BROCHURE_STORAGE_SECRET ||
    process.env.BROCHURE_ACCESS_SECRET ||
    process.env.PRIVATE_PORTFOLIO_PASSWORD ||
    process.env.RESEND_API_KEY;

  if (!secret) throw new Error("Malaysia adviser lead storage is not configured.");
  return secret;
}

function encryptionKey() {
  return createHash("sha256").update(registrySecret()).digest();
}

function encryptRegistry(leads: MalaysiaAdviserLead[]) {
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

function decryptRegistry(value: string): MalaysiaAdviserLead[] {
  const [prefix, ivValue, tagValue, encryptedValue] = value.trim().split(".");
  if (prefix !== REGISTRY_PREFIX || !ivValue || !tagValue || !encryptedValue) return [];

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
    return Array.isArray(parsed) ? (parsed as MalaysiaAdviserLead[]) : [];
  } catch (error) {
    console.error("malaysia-adviser-registry-decryption-failed", error);
    return [];
  }
}

export function normalizeMalaysiaAdviserEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase().slice(0, 320) : "";
}

export async function readMalaysiaAdviserLeads(): Promise<MalaysiaAdviserLead[]> {
  const result = await list({ prefix: REGISTRY_PATH, limit: 1 });
  const blob = result.blobs.find((item) => item.pathname === REGISTRY_PATH);
  if (!blob) return [];

  const response = await fetch(blob.url, { cache: "no-store" });
  if (!response.ok) return [];
  return decryptRegistry(await response.text());
}

async function writeMalaysiaAdviserLeads(leads: MalaysiaAdviserLead[]) {
  await put(REGISTRY_PATH, encryptRegistry(leads), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/octet-stream",
  });
}

function ensureLead(
  leads: MalaysiaAdviserLead[],
  args: { fullName: string; email: string; source: string },
) {
  const email = normalizeMalaysiaAdviserEmail(args.email);
  const now = new Date().toISOString();
  let index = leads.findIndex((lead) => normalizeMalaysiaAdviserEmail(lead.email) === email);

  if (index < 0) {
    leads.push({
      id: randomUUID(),
      fullName: args.fullName,
      email,
      source: args.source,
      createdAt: now,
      updatedAt: now,
      lastAccessAt: now,
      accessCount: 1,
      questions: [],
    });
    index = leads.length - 1;
  }

  return { index, email, now };
}

export async function recordMalaysiaAdviserAccess(args: {
  fullName: string;
  email: string;
  source: string;
}) {
  const leads = await readMalaysiaAdviserLeads();
  const email = normalizeMalaysiaAdviserEmail(args.email);
  const now = new Date().toISOString();
  const index = leads.findIndex((lead) => normalizeMalaysiaAdviserEmail(lead.email) === email);

  if (index >= 0) {
    const current = leads[index];
    const updated: MalaysiaAdviserLead = {
      ...current,
      fullName: args.fullName,
      email,
      source: args.source,
      updatedAt: now,
      lastAccessAt: now,
      accessCount: (current.accessCount || 0) + 1,
    };
    leads[index] = updated;
    await writeMalaysiaAdviserLeads(leads);
    return updated;
  }

  const lead: MalaysiaAdviserLead = {
    id: randomUUID(),
    fullName: args.fullName,
    email,
    source: args.source,
    createdAt: now,
    updatedAt: now,
    lastAccessAt: now,
    accessCount: 1,
    questions: [],
  };
  leads.push(lead);
  await writeMalaysiaAdviserLeads(leads);
  return lead;
}

export async function recordMalaysiaAdviserQuestion(args: {
  fullName: string;
  email: string;
  question: string;
  source?: string;
}) {
  const leads = await readMalaysiaAdviserLeads();
  const { index, email, now } = ensureLead(leads, {
    fullName: args.fullName,
    email: args.email,
    source: args.source || "Malaysia adviser unanswered question",
  });

  const question: MalaysiaAdviserQuestion = {
    id: randomUUID(),
    question: args.question.trim().slice(0, 3000),
    askedAt: now,
    status: "pending",
  };

  const current = leads[index];
  leads[index] = {
    ...current,
    fullName: args.fullName,
    email,
    updatedAt: now,
    questions: [...(current.questions || []), question],
  };

  await writeMalaysiaAdviserLeads(leads);
  return question;
}

export async function recordMalaysiaAdviserAnswer(args: {
  fullName: string;
  email: string;
  question: string;
  answer: string;
  answerSource?: string;
  answerMode?: "controlled" | "hybrid-ai";
  topic?: string;
  knowledgeIds?: string[];
  model?: string;
}) {
  const leads = await readMalaysiaAdviserLeads();
  const { index, email, now } = ensureLead(leads, {
    fullName: args.fullName,
    email: args.email,
    source: "Ask EuroAsia — Malaysia Adviser",
  });

  const question: MalaysiaAdviserQuestion = {
    id: randomUUID(),
    question: args.question.trim().slice(0, 3000),
    askedAt: now,
    status: "answered",
    answer: args.answer.trim().slice(0, 8000),
    source: args.answerSource?.trim().slice(0, 1000),
    answeredAt: now,
    answerMode: args.answerMode,
    topic: args.topic?.trim().slice(0, 80),
    knowledgeIds: args.knowledgeIds?.slice(0, 12).map((item) => item.slice(0, 120)),
    model: args.model?.trim().slice(0, 120),
  };

  const current = leads[index];
  leads[index] = {
    ...current,
    fullName: args.fullName,
    email,
    updatedAt: now,
    questions: [...(current.questions || []), question],
  };

  await writeMalaysiaAdviserLeads(leads);
  return question;
}
