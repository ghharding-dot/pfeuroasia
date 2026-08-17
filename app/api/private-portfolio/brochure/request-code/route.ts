import { randomInt } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createBrochureChallenge } from "../../../../lib/brochureAccess";
import { findPublishedPrivateProperty } from "../../../../lib/privatePropertyLookup";
import { hasPrivatePortfolioRequestAccess } from "../../../../lib/privatePortfolioRequest";

function clean(value: unknown, maxLength = 320) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function maskedEmail(email: string) {
  return email.replace(/^(.{2}).*(@.*)$/, "$1••••$2");
}

export async function POST(request: NextRequest) {
  if (!(await hasPrivatePortfolioRequestAccess(request))) {
    console.warn("brochure-verification-rejected", { reason: "portfolio-access-expired" });
    return NextResponse.json({ error: "Private Collection access has expired. Please sign in again." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    console.warn("brochure-verification-rejected", { reason: "invalid-json" });
    return NextResponse.json({ error: "The verification request could not be read. Please try again." }, { status: 400 });
  }

  const propertyReference = clean(body.propertyReference, 80).toUpperCase();
  const edition = body.edition === "partner" ? "partner" : "branded";
  const fullName = clean(body.fullName, 160);
  const email = clean(body.email, 320).toLowerCase();
  const telephone = clean(body.telephone, 120);
  const consent = body.consent === true;

  if (!propertyReference) {
    console.warn("brochure-verification-rejected", { reason: "missing-property-reference" });
    return NextResponse.json({ error: "The property reference is missing. Please close the window and try again." }, { status: 400 });
  }
  if (!fullName) {
    console.warn("brochure-verification-rejected", { reason: "missing-name", propertyReference });
    return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  }
  if (!email.includes("@") || email.startsWith("@") || email.endsWith("@")) {
    console.warn("brochure-verification-rejected", { reason: "invalid-email", propertyReference });
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!consent) {
    console.warn("brochure-verification-rejected", { reason: "consent-not-confirmed", propertyReference, email: maskedEmail(email) });
    return NextResponse.json({ error: "Please confirm the document-access consent." }, { status: 400 });
  }

  const property = await findPublishedPrivateProperty(propertyReference);
  if (!property) {
    console.warn("brochure-verification-rejected", { reason: "property-unavailable", propertyReference });
    return NextResponse.json({ error: "This property is not currently available." }, { status: 404 });
  }
  const selectedBrochure = edition === "partner" ? property.unbrandedBrochure : property.brochure;
  if (!selectedBrochure) {
    console.warn("brochure-verification-rejected", { reason: "brochure-unavailable", propertyReference });
    return NextResponse.json({ error: "This brochure is not currently available." }, { status: 404 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("brochure-verification-email-failed", { reason: "resend-not-configured" });
    return NextResponse.json({ error: "Email verification is not configured." }, { status: 503 });
  }

  const code = String(randomInt(100000, 1000000));
  const challenge = createBrochureChallenge(
    { propertyReference, edition, fullName, email, telephone, consent },
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
    console.error("brochure-verification-email-failed", {
      status: response.status,
      response: await response.text(),
      propertyReference,
      to: maskedEmail(email),
    });
    return NextResponse.json({ error: "The verification email could not be sent. Please check the address and try again." }, { status: 502 });
  }

  const accepted = await response.json().catch(() => ({}));
  console.info("brochure-verification-email-accepted", {
    resendEmailId: accepted?.id || "unknown",
    propertyReference,
    to: maskedEmail(email),
  });

  return NextResponse.json({
    success: true,
    challenge,
    maskedEmail: maskedEmail(email),
    expiresInMinutes: 10,
  });
}
