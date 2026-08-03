import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
  randomUUID,
} from "node:crypto";

export const ENCRYPTED_BROCHURE_PREFIX = "pfea-brochure-v1.";

export type EncryptedBrochureDescriptor = {
  v: 1;
  url: string;
  iv: string;
  keyId: string;
  ownerCode: string;
  name?: string;
  originalSize?: number;
};

function storageSecret() {
  const secret =
    process.env.BROCHURE_STORAGE_SECRET ||
    process.env.BROCHURE_ACCESS_SECRET ||
    process.env.PRIVATE_PORTFOLIO_PASSWORD ||
    process.env.RESEND_API_KEY;

  if (!secret) throw new Error("Protected brochure storage is not configured.");
  return secret;
}

export function deriveBrochureStorageKey(ownerCode: string, keyId: string) {
  return createHmac("sha256", storageSecret())
    .update(`pf-euroasia-brochure:v1:${ownerCode.toUpperCase()}:${keyId}`)
    .digest();
}

export function encryptBrochureBytes(
  source: Uint8Array,
  ownerCode: string,
  name?: string,
) {
  const keyId = randomUUID();
  const iv = randomBytes(12);
  const key = deriveBrochureStorageKey(ownerCode, keyId);
  const cipher = createCipheriv("aes-256-gcm", key, iv, {
    authTagLength: 16,
  });
  const ciphertext = Buffer.concat([
    cipher.update(Buffer.from(source)),
    cipher.final(),
  ]);
  const payload = Buffer.concat([ciphertext, cipher.getAuthTag()]);

  return {
    payload,
    keyId,
    iv: iv.toString("base64url"),
    ownerCode: ownerCode.toUpperCase(),
    name,
    originalSize: source.byteLength,
  };
}

export function createEncryptedBrochureReference(
  descriptor: EncryptedBrochureDescriptor,
) {
  return `${ENCRYPTED_BROCHURE_PREFIX}${Buffer.from(
    JSON.stringify(descriptor),
    "utf8",
  ).toString("base64url")}`;
}

export function parseEncryptedBrochure(value: string) {
  if (!value.startsWith(ENCRYPTED_BROCHURE_PREFIX)) return null;

  try {
    const encoded = value.slice(ENCRYPTED_BROCHURE_PREFIX.length);
    const parsed = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as EncryptedBrochureDescriptor;
    if (
      parsed.v !== 1 ||
      !parsed.url ||
      !parsed.iv ||
      !parsed.keyId ||
      !parsed.ownerCode
    ) {
      return null;
    }

    const url = new URL(parsed.url);
    if (
      url.protocol !== "https:" ||
      !url.hostname.endsWith(".blob.vercel-storage.com")
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function decryptStoredBrochure(value: string) {
  const descriptor = parseEncryptedBrochure(value);
  if (!descriptor) throw new Error("Encrypted brochure descriptor is invalid.");

  const response = await fetch(descriptor.url, { cache: "no-store" });
  if (!response.ok) throw new Error("Encrypted brochure could not be retrieved.");

  const payload = Buffer.from(await response.arrayBuffer());
  if (payload.length <= 16) {
    throw new Error("Encrypted brochure payload is incomplete.");
  }

  const iv = Buffer.from(descriptor.iv, "base64url");
  const authenticationTag = payload.subarray(payload.length - 16);
  const ciphertext = payload.subarray(0, payload.length - 16);
  const key = deriveBrochureStorageKey(descriptor.ownerCode, descriptor.keyId);
  const decipher = createDecipheriv("aes-256-gcm", key, iv, {
    authTagLength: 16,
  });
  decipher.setAuthTag(authenticationTag);

  return new Uint8Array(
    Buffer.concat([decipher.update(ciphertext), decipher.final()]),
  );
}

export function encryptPrivateRecord(
  record: Record<string, unknown>,
  context: string,
) {
  const iv = randomBytes(12);
  const key = createHmac("sha256", storageSecret())
    .update(`pf-euroasia-private-record:v1:${context}`)
    .digest();
  const cipher = createCipheriv("aes-256-gcm", key, iv, {
    authTagLength: 16,
  });
  const plaintext = Buffer.from(JSON.stringify(record, null, 2), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  return Buffer.concat([iv, ciphertext, cipher.getAuthTag()]);
}
