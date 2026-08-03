import { NextResponse } from "next/server";
import {
  COLLABORATOR_COOKIE_NAME,
  createCollaboratorSession,
  verifyCollaboratorChallenge,
} from "../../../lib/collaboratorAuth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const challenge = typeof body?.challenge === "string" ? body.challenge : "";
  const code = typeof body?.code === "string" ? body.code.trim() : "";
  const identity = verifyCollaboratorChallenge(challenge, code);

  if (!identity) {
    return NextResponse.json({ error: "The login code is incorrect or has expired." }, { status: 401 });
  }

  const response = NextResponse.json({
    success: true,
    partnerCode: identity.partnerCode,
    partnerName: identity.partnerName,
  });

  response.cookies.set({
    name: COLLABORATOR_COOKIE_NAME,
    value: createCollaboratorSession(identity),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });

  return response;
}
