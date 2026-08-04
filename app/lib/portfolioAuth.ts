import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const PORTFOLIO_COOKIE_NAME = "pfea_private_client_session";

export type PrivateClientIdentity = {
  clientId: string;
  fullName: string;
  email: string;
};

type PrivateClientChallenge = PrivateClientIdentity & {
  type: "private-client-challenge";
  codeHash: string;
  nonce: string;
  expiresAt: number;
};

type PrivateClientSession = PrivateClientIdentity & {
  type: "private-client-session";
  issuedAt: number;
  expiresAt: number;
};

function signingSecret() {
  const secret =
    process.env.PRIVATE_CLIENT_ACCESS_SECRET ||
    process.env.BROCHURE_ACCESS_SECRET ||
    process.env.PRIVATE_PORTFOLIO_PASSWORD ||
    process.env.RESEND_API_KEY;

  if (!secret) throw new Error("Private client access is not configured.");
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

  const supplied = Buffer.from(suppliedSignature);
  const expected = Buffer.from(signature(encoded));
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return null;
  }

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

export function createPrivateClientChallenge(
  identity: PrivateClientIdentity,
  code: string,
) {
  const nonce = randomUUID();
  const payload: PrivateClientChallenge = {
    ...identity,
    type: "private-client-challenge",
    codeHash: hashCode(code, nonce),
    nonce,
    expiresAt: Date.now() + 10 * 60 * 1000,
  };
  return signPayload(payload);
}

export function verifyPrivateClientChallenge(token: string, code: string) {
  const payload = readPayload<PrivateClientChallenge>(token);
  if (
    !payload ||
    payload.type !== "private-client-challenge" ||
    payload.expiresAt < Date.now()
  ) {
    return null;
  }

  const supplied = Buffer.from(hashCode(code, payload.nonce));
  const expected = Buffer.from(payload.codeHash);
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return null;
  }

  return {
    clientId: payload.clientId,
    fullName: payload.fullName,
    email: payload.email,
  } satisfies PrivateClientIdentity;
}

export function createPrivateClientSession(identity: PrivateClientIdentity) {
  const now = Date.now();
  const payload: PrivateClientSession = {
    ...identity,
    type: "private-client-session",
    issuedAt: now,
    expiresAt: now + 30 * 24 * 60 * 60 * 1000,
  };
  return signPayload(payload);
}

export function verifyPrivateClientSession(token?: string | null) {
  if (!token) return null;
  const payload = readPayload<PrivateClientSession>(token);
  if (
    !payload ||
    payload.type !== "private-client-session" ||
    payload.expiresAt < Date.now()
  ) {
    return null;
  }

  return {
    clientId: payload.clientId,
    fullName: payload.fullName,
    email: payload.email,
  } satisfies PrivateClientIdentity;
}
