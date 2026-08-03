import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export type BrochureClient = {
  propertyReference: string;
  fullName: string;
  email: string;
  telephone: string;
  consent: boolean;
};

type ChallengePayload = BrochureClient & {
  type: "brochure-challenge";
  codeHash: string;
  nonce: string;
  expiresAt: number;
};

export type DownloadPayload = BrochureClient & {
  type: "brochure-download";
  nonce: string;
  issuedAt: number;
  expiresAt: number;
};

function signingSecret() {
  const secret =
    process.env.BROCHURE_ACCESS_SECRET ||
    process.env.PRIVATE_PORTFOLIO_PASSWORD ||
    process.env.RESEND_API_KEY;

  if (!secret) throw new Error("Brochure verification is not configured.");
  return secret;
}

function signature(value: string) {
  return createHmac("sha256", signingSecret()).update(value).digest("base64url");
}

function signPayload(payload: object) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${signature(encoded)}`;
}

function readPayload<T>(token: string): T | null {
  const [encoded, suppliedSignature] = token.split(".");
  if (!encoded || !suppliedSignature) return null;

  const expectedSignature = signature(encoded);
  const supplied = Buffer.from(suppliedSignature);
  const expected = Buffer.from(expectedSignature);
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null;

  try {
    return JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

function hashCode(code: string, nonce: string) {
  return createHmac("sha256", signingSecret())
    .update(`${nonce}:${code}`)
    .digest("hex");
}

export function createBrochureChallenge(client: BrochureClient, code: string) {
  const nonce = randomUUID();
  const payload: ChallengePayload = {
    ...client,
    type: "brochure-challenge",
    codeHash: hashCode(code, nonce),
    nonce,
    expiresAt: Date.now() + 10 * 60 * 1000,
  };
  return signPayload(payload);
}

export function verifyBrochureChallenge(token: string, code: string) {
  const payload = readPayload<ChallengePayload>(token);
  if (!payload || payload.type !== "brochure-challenge" || payload.expiresAt < Date.now()) return null;

  const supplied = Buffer.from(hashCode(code, payload.nonce));
  const expected = Buffer.from(payload.codeHash);
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null;

  const client: BrochureClient = {
    propertyReference: payload.propertyReference,
    fullName: payload.fullName,
    email: payload.email,
    telephone: payload.telephone,
    consent: payload.consent,
  };
  return client;
}

export function createBrochureDownloadToken(client: BrochureClient) {
  const now = Date.now();
  const payload: DownloadPayload = {
    ...client,
    type: "brochure-download",
    nonce: randomUUID(),
    issuedAt: now,
    expiresAt: now + 15 * 60 * 1000,
  };
  return signPayload(payload);
}

export function verifyBrochureDownloadToken(token: string) {
  const payload = readPayload<DownloadPayload>(token);
  if (!payload || payload.type !== "brochure-download" || payload.expiresAt < Date.now()) return null;
  return payload;
}
