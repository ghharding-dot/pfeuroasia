import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  randomUUID,
} from "node:crypto";
import { list, put } from "@vercel/blob";

export type PrivateClientStatus = "pending" | "approved" | "revoked";

export type PrivateClient = {
  id: string;
  status: PrivateClientStatus;
  fullName: string;
  email: string;
  telephone: string;
  nationality: string;
  countryOfResidence: string;
  residentialAddress: string;
  wechatId?: string;
  preferredLanguage: string;
  companyName?: string;
  occupation?: string;
  propertyType: string;
  preferredLocation: string;
  indicativeBudget: string;
  purchaseTimeframe: string;
  referralSource?: string;
  additionalRequirements?: string;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  revokedAt?: string;
  lastLoginAt?: string;
};

export type PrivateClientRegistration = Omit<
  PrivateClient,
  | "id"
  | "status"
  | "createdAt"
  | "updatedAt"
  | "approvedAt"
  | "revokedAt"
  | "lastLoginAt"
>;

const REGISTRY_PATH = "private-access/client-registry.pfea";
const REGISTRY_PREFIX = "pfea-private-clients-v1";

function registrySecret() {
  const secret =
    process.env.PRIVATE_CLIENT_ACCESS_SECRET ||
    process.env.BROCHURE_STORAGE_SECRET ||
    process.env.BROCHURE_ACCESS_SECRET ||
    process.env.PRIVATE_PORTFOLIO_PASSWORD ||
    process.env.RESEND_API_KEY;

  if (!secret) throw new Error("Private client access is not configured.");
  return secret;
}

function encryptionKey() {
  return createHash("sha256").update(registrySecret()).digest();
}

function encryptRegistry(clients: PrivateClient[]) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const plaintext = Buffer.from(JSON.stringify(clients), "utf8");
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [
    REGISTRY_PREFIX,
    iv.toString("base64url"),
    tag.toString("base64url"),
    encrypted.toString("base64url"),
  ].join(".");
}

function decryptRegistry(value: string): PrivateClient[] {
  const [prefix, ivValue, tagValue, encryptedValue] = value.trim().split(".");
  if (
    prefix !== REGISTRY_PREFIX ||
    !ivValue ||
    !tagValue ||
    !encryptedValue
  ) {
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
    return Array.isArray(parsed) ? (parsed as PrivateClient[]) : [];
  } catch (error) {
    console.error("private-client-registry-decryption-failed", error);
    return [];
  }
}

export function normalizeClientEmail(value: unknown) {
  return typeof value === "string"
    ? value.trim().toLowerCase().slice(0, 320)
    : "";
}

export async function readPrivateClients(): Promise<PrivateClient[]> {
  const result = await list({ prefix: REGISTRY_PATH, limit: 1 });
  const blob = result.blobs.find((item) => item.pathname === REGISTRY_PATH);
  if (!blob) return [];

  const response = await fetch(blob.url, { cache: "no-store" });
  if (!response.ok) return [];
  return decryptRegistry(await response.text());
}

export async function writePrivateClients(clients: PrivateClient[]) {
  await put(REGISTRY_PATH, encryptRegistry(clients), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/octet-stream",
  });
}

export async function registerPrivateClient(
  registration: PrivateClientRegistration,
): Promise<PrivateClient> {
  const clients = await readPrivateClients();
  const now = new Date().toISOString();
  const email = normalizeClientEmail(registration.email);
  const existingIndex = clients.findIndex(
    (client) => normalizeClientEmail(client.email) === email,
  );

  if (existingIndex >= 0) {
    const existing = clients[existingIndex];
    const updated: PrivateClient = {
      ...existing,
      ...registration,
      email,
      status: existing.status === "approved" ? "approved" : "pending",
      updatedAt: now,
      revokedAt: undefined,
    };
    clients[existingIndex] = updated;
    await writePrivateClients(clients);
    return updated;
  }

  const client: PrivateClient = {
    id: randomUUID(),
    status: "pending",
    ...registration,
    email,
    createdAt: now,
    updatedAt: now,
  };
  clients.push(client);
  await writePrivateClients(clients);
  return client;
}

export async function findPrivateClientByEmail(email: string) {
  const normalized = normalizeClientEmail(email);
  const clients = await readPrivateClients();
  return clients.find(
    (client) => normalizeClientEmail(client.email) === normalized,
  ) || null;
}

export async function findPrivateClientById(id: string) {
  const clients = await readPrivateClients();
  return clients.find((client) => client.id === id) || null;
}

export async function updatePrivateClientStatus(
  id: string,
  status: PrivateClientStatus,
) {
  const clients = await readPrivateClients();
  const index = clients.findIndex((client) => client.id === id);
  if (index < 0) return null;

  const now = new Date().toISOString();
  const updated: PrivateClient = {
    ...clients[index],
    status,
    updatedAt: now,
    approvedAt: status === "approved" ? now : clients[index].approvedAt,
    revokedAt: status === "revoked" ? now : undefined,
  };
  clients[index] = updated;
  await writePrivateClients(clients);
  return updated;
}

export async function recordPrivateClientLogin(id: string) {
  const clients = await readPrivateClients();
  const index = clients.findIndex((client) => client.id === id);
  if (index < 0) return;
  clients[index] = {
    ...clients[index],
    lastLoginAt: new Date().toISOString(),
  };
  await writePrivateClients(clients);
}
