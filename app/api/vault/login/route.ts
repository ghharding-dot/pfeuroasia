import { NextResponse } from "next/server";
import {
  createVaultToken,
  getVaultPassword,
  VAULT_COOKIE_NAME,
  vaultSecretsMatch,
} from "../../../lib/vaultAuth";

export async function POST(request: Request) {
  const configuredPassword = getVaultPassword();
  if (!configuredPassword) {
    return NextResponse.json({ error: "Vault password is not configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === "string" ? body.password : "";

  if (!password || !vaultSecretsMatch(password, configuredPassword)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(VAULT_COOKIE_NAME, createVaultToken(configuredPassword), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
