import { NextResponse } from "next/server";
import {
  createPrivateClientSession,
  PORTFOLIO_COOKIE_NAME,
  verifyPrivateClientChallenge,
} from "../../../../lib/portfolioAuth";
import {
  findPrivateClientById,
  recordPrivateClientLogin,
} from "../../../../lib/privateClientStore";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const challenge = typeof body?.challenge === "string" ? body.challenge : "";
  const code = typeof body?.code === "string" ? body.code.trim() : "";

  if (!challenge || !/^\d{6}$/.test(code)) {
    return NextResponse.json(
      { error: "Enter the six-digit access code." },
      { status: 400 },
    );
  }

  const identity = verifyPrivateClientChallenge(challenge, code);
  if (!identity) {
    return NextResponse.json(
      { error: "The access code is incorrect or has expired." },
      { status: 401 },
    );
  }

  const client = await findPrivateClientById(identity.clientId);
  if (!client || client.status !== "approved" || client.email !== identity.email) {
    return NextResponse.json(
      { error: "Private Collection access is no longer approved." },
      { status: 401 },
    );
  }

  await recordPrivateClientLogin(client.id);

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: PORTFOLIO_COOKIE_NAME,
    value: createPrivateClientSession(identity),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });

  return response;
}
