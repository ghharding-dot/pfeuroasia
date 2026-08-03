import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const COLLABORATOR_COOKIE_NAME = "pfea_collaborator_session";

export type CollaboratorIdentity = {
  partnerCode: string;
  partnerName: string;
  email: string;
};

type CollaboratorChallenge = CollaboratorIdentity & {
  type: "collaborator-challenge";
  codeHash: string;
  nonce: string;
  expiresAt: number;
};

type CollaboratorSession = CollaboratorIdentity & {
  type: "collaborator-session";
  issuedAt: number;
  expiresAt: number;
};

function signingSecret() {
  const secret =
    process.env.COLLABORATOR_ACCESS_SECRET ||
    process.env.BROCHURE_ACCESS_SECRET ||
    process.env.PRIVATE_PORTFOLIO_PASSWORD ||
    process.env.RESEND_API_KEY;

  if (!secret) throw new Error("Collaborator access is not configured.");
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

export function createCollaboratorChallenge(identity: CollaboratorIdentity, code: string) {
  const nonce = randomUUID();
  const payload: CollaboratorChallenge = {
    ...identity,
    type: "collaborator-challenge",
    codeHash: hashCode(code, nonce),
    nonce,
    expiresAt: Date.now() + 10 * 60 * 1000,
  };
  return signPayload(payload);
}

export function verifyCollaboratorChallenge(token: string, code: string) {
  const payload = readPayload<CollaboratorChallenge>(token);
  if (!payload || payload.type !== "collaborator-challenge" || payload.expiresAt < Date.now()) {
    return null;
  }

  const supplied = Buffer.from(hashCode(code, payload.nonce));
  const expected = Buffer.from(payload.codeHash);
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null;

  return {
    partnerCode: payload.partnerCode,
    partnerName: payload.partnerName,
    email: payload.email,
  } satisfies CollaboratorIdentity;
}

export function createCollaboratorSession(identity: CollaboratorIdentity) {
  const now = Date.now();
  const payload: CollaboratorSession = {
    ...identity,
    type: "collaborator-session",
    issuedAt: now,
    expiresAt: now + 30 * 24 * 60 * 60 * 1000,
  };
  return signPayload(payload);
}

export function verifyCollaboratorSession(token?: string | null) {
  if (!token) return null;
  const payload = readPayload<CollaboratorSession>(token);
  if (!payload || payload.type !== "collaborator-session" || payload.expiresAt < Date.now()) {
    return null;
  }

  return {
    partnerCode: payload.partnerCode,
    partnerName: payload.partnerName,
    email: payload.email,
  } satisfies CollaboratorIdentity;
}
