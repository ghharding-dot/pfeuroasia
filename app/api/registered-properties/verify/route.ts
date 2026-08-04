import { NextResponse } from "next/server";
import { readProperties } from "../../../lib/propertyStore";
import {
  createRegisteredPropertySession,
  REGISTERED_PROPERTY_COOKIE_NAME,
  verifyRegisteredPropertyChallenge,
} from "../../../lib/registeredPropertyAuth";
import { recordRegisteredListingLead } from "../../../lib/registeredLeadStore";

export const runtime = "nodejs";

async function notifyRegistration(args: {
  propertyTitle: string;
  propertyReference: string;
  fullName: string;
  email: string;
  telephone: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const recipient = process.env.ENQUIRY_EMAIL || "enquiry@pfeuroasia.com";
  const text = [
    "A visitor has verified their contact details to access a registered carousel listing.",
    "",
    `Property: ${args.propertyTitle}`,
    `Reference: ${args.propertyReference}`,
    `Name: ${args.fullName}`,
    `Email: ${args.email}`,
    `Telephone / WhatsApp: ${args.telephone}`,
    "",
    "This access was granted automatically after email verification. It does not grant access to private off-market opportunities.",
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "PF EuroAsia Registered Listings <enquiries@pfeuroasia.com>",
      to: [recipient],
      subject: `Verified listing lead — ${args.propertyReference} — ${args.fullName}`,
      text,
      reply_to: args.email,
    }),
  });

  if (!response.ok) {
    console.error("registered-property-lead-email-failed", await response.text());
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const challenge = typeof body?.challenge === "string" ? body.challenge : "";
  const code = typeof body?.code === "string" ? body.code.trim() : "";

  if (!challenge || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: "Enter the six-digit verification code." }, { status: 400 });
  }

  const verified = verifyRegisteredPropertyChallenge(challenge, code);
  if (!verified) {
    return NextResponse.json(
      { error: "The verification code is incorrect or has expired." },
      { status: 401 },
    );
  }

  const properties = await readProperties();
  const property = properties.find(
    (item) =>
      item.id === verified.propertyId &&
      item.status === "published" &&
      item.accessLevel === "registered",
  );

  if (!property) {
    return NextResponse.json(
      { error: "This registered listing is no longer available." },
      { status: 404 },
    );
  }

  try {
    await recordRegisteredListingLead({
      ...verified.identity,
      propertyId: property.id,
    });
  } catch (error) {
    console.error("registered-property-lead-storage-failed", error);
  }

  try {
    await notifyRegistration({
      propertyTitle: property.title,
      propertyReference: property.reference,
      ...verified.identity,
    });
  } catch (error) {
    console.error("registered-property-lead-notification-failed", error);
  }

  const response = NextResponse.json({
    success: true,
    propertyPath: `/properties/${property.id}`,
  });

  response.cookies.set({
    name: REGISTERED_PROPERTY_COOKIE_NAME,
    value: createRegisteredPropertySession(verified.identity),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });

  return response;
}
