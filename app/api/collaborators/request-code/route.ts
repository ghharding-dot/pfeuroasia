import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import { createCollaboratorChallenge } from "../../../lib/collaboratorAuth";
import { getCollaboratorByEmail } from "../../../lib/partnerContacts";

function cleanEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase().slice(0, 320) : "";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = cleanEmail(body?.email);
  const partner = getCollaboratorByEmail(email);

  if (!email.includes("@") || !partner?.email) {
    return NextResponse.json(
      { error: "This email address is not registered as an approved PF EuroAsia collaborator." },
      { status: 401 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Collaborator email access is not configured." }, { status: 503 });
  }

  const code = String(randomInt(100000, 1000000));
  const challenge = createCollaboratorChallenge(
    {
      partnerCode: partner.code,
      partnerName: partner.name,
      email: partner.email.toLowerCase(),
    },
    code,
  );

  const text = [
    `Dear ${partner.name},`,
    "",
    "Your secure PF EuroAsia collaborator login code is:",
    "",
    code,
    "",
    "The code expires in 10 minutes.",
    "",
    "This portal allows you to submit your own properties for PF EuroAsia review. Submitted properties cannot be published without PF EuroAsia approval.",
    "",
    "Property Facilitators EuroAsia",
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "PF EuroAsia Collaborator Portal <enquiries@pfeuroasia.com>",
      to: [partner.email],
      subject: "Your PF EuroAsia collaborator login code",
      text,
      reply_to: "enquiry@pfeuroasia.com",
    }),
  });

  if (!response.ok) {
    console.error("collaborator-login-email-failed", await response.text());
    return NextResponse.json({ error: "The login email could not be sent." }, { status: 502 });
  }

  return NextResponse.json({
    success: true,
    challenge,
    partnerName: partner.name,
    maskedEmail: email.replace(/^(.{2}).*(@.*)$/, "$1••••$2"),
  });
}
