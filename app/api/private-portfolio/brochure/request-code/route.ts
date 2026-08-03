import { randomInt } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createBrochureChallenge } from "../../../../lib/brochureAccess";
import { findPublishedPrivateProperty } from "../../../../lib/privatePropertyLookup";
import { hasPrivatePortfolioRequestAccess } from "../../../../lib/privatePortfolioRequest";

function clean(value: unknown, maxLength = 320) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: NextRequest) {
  if (!hasPrivatePortfolioRequestAccess(request)) {
    return NextResponse.json({ error: "Private Collection access has expired." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || clean(body.companyWebsite)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const propertyReference = clean(body.propertyReference, 80).toUpperCase();
  const fullName = clean(body.fullName, 160);
  const email = clean(body.email, 320).toLowerCase();
  const telephone = clean(body.telephone, 120);
  const consent = body.consent === true;

  if (!propertyReference || !fullName || !email.includes("@") || !consent) {
    return NextResponse.json(
      { error: "Enter your name and email, and confirm the disclosure consent." },
      { status: 400 },
    );
  }

  const property = await findPublishedPrivateProperty(propertyReference);
  if (!property?.brochure) {
    return NextResponse.json({ error: "This brochure is not currently available." }, { status: 404 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email verification is not configured." }, { status: 503 });
  }

  const code = String(randomInt(100000, 1000000));
  const challenge = createBrochureChallenge(
    { propertyReference, fullName, email, telephone, consent },
    code,
  );

  const emailText = [
    `Dear ${fullName},`,
    "",
    `Your verification code for the confidential brochure for ${property.title} is:`,
    "",
    code,
    "",
    "The code expires in 10 minutes.",
    "",
    `Property reference: ${property.reference}`,
    `Listing collaborator: ${property.listingPartnerName || "Property Facilitators EuroAsia"}`,
    "",
    "Once verified, your personalised brochure copy will be watermarked with your email address and the download will be recorded.",
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
      from: "PF EuroAsia Private Collection <enquiries@pfeuroasia.com>",
      to: [email],
      subject: `Your Private Collection verification code — ${property.title}`,
      text: emailText,
      reply_to: "enquiry@pfeuroasia.com",
    }),
  });

  if (!response.ok) {
    console.error("brochure-verification-email-failed", await response.text());
    return NextResponse.json({ error: "The verification email could not be sent." }, { status: 502 });
  }

  return NextResponse.json({
    success: true,
    challenge,
    maskedEmail: email.replace(/^(.{2}).*(@.*)$/, "$1••••$2"),
    expiresInMinutes: 10,
  });
}
