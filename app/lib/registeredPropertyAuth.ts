import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const REGISTERED_PROPERTY_COOKIE_NAME = "pfea_registered_property_session";

export type RegisteredPropertyIdentity = {
  fullName: string;
  email: string;
  telephone: string;
};

type RegisteredPropertyChallenge = RegisteredPropertyIdentity & {
  type: "registered-property-challenge";
  propertyId: string;
  codeHash: string;
  nonce: string;
  expiresAt: number;
};

type RegisteredPropertySession = RegisteredPropertyIdentity & {
  type: "registered-property-session";
  issuedAt: number;
  expiresAt: number;
};

function signingSecret() {
  const secret =
    process.env.REGISTERED_PROPERTY_ACCESS_SECRET ||
    process.env.PRIVATE_CLIENT_ACCESS_SECRET ||
    process.env.BROCHURE_ACCESS_SECRET ||
    process.env.PRIVATE_PORTFOLIO_PASSWORD ||
    process.env.RESEND_API_KEY;

  if (!secret) throw new Error("Registered property access is not configured.");
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

export function createRegisteredPropertyChallenge(
  identity: RegisteredPropertyIdentity,
  propertyId: string,
  code: string,
) {
  const nonce = randomUUID();
  const payload: RegisteredPropertyChallenge = {
    ...identity,
    type: "registered-property-challenge",
    propertyId,
    codeHash: hashCode(code, nonce),
    nonce,
    expiresAt: Date.now() + 10 * 60 * 1000,
  };
  return signPayload(payload);
}

export function verifyRegisteredPropertyChallenge(token: string, code: string) {
  const payload = readPayload<RegisteredPropertyChallenge>(token);
  if (
    !payload ||
    payload.type !== "registered-property-challenge" ||
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
    identity: {
      fullName: payload.fullName,
      email: payload.email,
      telephone: payload.telephone,
    } satisfies RegisteredPropertyIdentity,
    propertyId: payload.propertyId,
  };
}

export function createRegisteredPropertySession(identity: RegisteredPropertyIdentity) {
  const now = Date.now();
  const payload: RegisteredPropertySession = {
    ...identity,
    type: "registered-property-session",
    issuedAt: now,
    expiresAt: now + 30 * 24 * 60 * 60 * 1000,
  };
  return signPayload(payload);
}

export function verifyRegisteredPropertySession(token?: string | null) {
  if (!token) return null;
  const payload = readPayload<RegisteredPropertySession>(token);
  if (
    !payload ||
    payload.type !== "registered-property-session" ||
    payload.expiresAt < Date.now()
  ) {
    return null;
  }

  return {
    fullName: payload.fullName,
    email: payload.email,
    telephone: payload.telephone,
  } satisfies RegisteredPropertyIdentity;
}
