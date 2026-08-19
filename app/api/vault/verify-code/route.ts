import { NextResponse } from "next/server";
import { verifyCollaboratorChallenge } from "../../../lib/collaboratorAuth";
import { createVaultToken, getVaultPassword, VAULT_COOKIE_NAME } from "../../../lib/vaultAuth";

function adminEmail() {
  return (process.env.VAULT_ADMIN_EMAIL || "enquiry@pfeuroasia.com").trim().toLowerCase();
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const challenge = String(body?.challenge || "");
  const code = String(body?.code || "").trim();
  const identity = verifyCollaboratorChallenge(challenge, code);
  const password = getVaultPassword();

  if (!identity || identity.email !== adminEmail() || !password) {
    return NextResponse.json({ error: "The login code is incorrect or has expired." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: VAULT_COOKIE_NAME,
    value: createVaultToken(password),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });
  return response;
}
