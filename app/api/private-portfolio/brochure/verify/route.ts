import { NextRequest, NextResponse } from "next/server";
import {
  createBrochureDownloadToken,
  verifyBrochureChallenge,
} from "../../../../lib/brochureAccess";
import { findPublishedPrivateProperty } from "../../../../lib/privatePropertyLookup";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const challenge = typeof body?.challenge === "string" ? body.challenge : "";
  const code = typeof body?.code === "string" ? body.code.trim() : "";

  if (!challenge || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: "Enter the six-digit verification code." }, { status: 400 });
  }

  const client = verifyBrochureChallenge(challenge, code);
  if (!client) {
    return NextResponse.json(
      { error: "The verification code is incorrect or has expired." },
      { status: 401 },
    );
  }

  const property = await findPublishedPrivateProperty(client.propertyReference);
  if (!property) {
    return NextResponse.json({ error: "This property is not currently available." }, { status: 404 });
  }
  const selectedBrochure = client.edition === "partner" ? property.unbrandedBrochure : property.brochure;
  if (!selectedBrochure) {
    return NextResponse.json({ error: "This brochure is not currently available." }, { status: 404 });
  }

  const token = createBrochureDownloadToken(client);
  return NextResponse.json({
    success: true,
    downloadUrl: `/api/private-portfolio/brochure/download?token=${encodeURIComponent(token)}`,
    expiresInMinutes: 15,
  });
}
