import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import { createPrivateClientChallenge } from "../../../../lib/portfolioAuth";
import {
  findPrivateClientByEmail,
  normalizeClientEmail,
} from "../../../../lib/privateClientStore";

function maskEmail(email: string) {
  return email.replace(/^(.{2}).*(@.*)$/, "$1••••$2");
}

function notificationAddress() {
  const configured = process.env.ENQUIRY_NOTIFICATION_FROM || "enquiries@pfeuroasia.com";
  const match = configured.match(/<([^>]+)>/);
  return (match?.[1] || configured).trim();
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = normalizeClientEmail(body?.email);

  if (!email.includes("@")) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const client = await findPrivateClientByEmail(email);
  if (!client || client.status !== "approved") {
    return NextResponse.json(
      {
        error:
          "This email address does not currently have approved Private Collection access. Please register or contact PF EuroAsia.",
      },
      { status: 401 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Secure email access is not configured." },
      { status: 503 },
    );
  }

  const code = String(randomInt(100000, 1000000));
  const challenge = createPrivateClientChallenge(
    {
      clientId: client.id,
      fullName: client.fullName,
      email: client.email,
    },
    code,
  );

  const text = [
    `Dear ${client.fullName},`,
    "",
    "Your secure PF EuroAsia Private Collection access code is:",
    "",
    code,
    "",
    "The code expires in 10 minutes.",
    "",
    "After verification, this device will remain signed in for up to 30 days unless your access is revoked.",
    "",
    "Property Facilitators EuroAsia",
    "enquiry@pfeuroasia.com",
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `PF EuroAsia Private Collection <${notificationAddress()}>`,
      to: [client.email],
      subject: "Your PF EuroAsia Private Collection access code",
      text,
      reply_to: "enquiry@pfeuroasia.com",
    }),
  });

  if (!response.ok) {
    console.error("private-client-login-email-failed", {
      status: response.status,
      response: await response.text(),
      to: maskEmail(client.email),
    });
    return NextResponse.json(
      { error: "The access code email could not be sent. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    success: true,
    challenge,
    maskedEmail: maskEmail(client.email),
    expiresInMinutes: 10,
  });
}
