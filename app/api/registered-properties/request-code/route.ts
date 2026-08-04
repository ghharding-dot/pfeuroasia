import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import { readProperties } from "../../../lib/propertyStore";
import { createRegisteredPropertyChallenge } from "../../../lib/registeredPropertyAuth";

export const runtime = "nodejs";

function clean(value: unknown, maxLength = 320) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function maskEmail(email: string) {
  return email.replace(/^(.{2}).*(@.*)$/, "$1••••$2");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "The registration could not be read." }, { status: 400 });
  }

  if (clean(body.companyWebsite, 200)) {
    return NextResponse.json({ success: true, challenge: "received" });
  }

  const propertyId = clean(body.propertyId, 120);
  const fullName = clean(body.fullName, 160);
  const email = clean(body.email, 320).toLowerCase();
  const telephone = clean(body.telephone, 120);

  if (!fullName || !email.includes("@") || !telephone) {
    return NextResponse.json(
      { error: "Enter your full name, email address and telephone number." },
      { status: 400 },
    );
  }

  const properties = await readProperties();
  const property = properties.find(
    (item) =>
      item.id === propertyId &&
      item.status === "published" &&
      item.accessLevel === "registered",
  );

  if (!property) {
    return NextResponse.json(
      { error: "This property is not available through registered listing access." },
      { status: 404 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email verification is not configured." }, { status: 503 });
  }

  const code = String(randomInt(100000, 1000000));
  const challenge = createRegisteredPropertyChallenge(
    { fullName, email, telephone },
    property.id,
    code,
  );

  const text = [
    `Dear ${fullName},`,
    "",
    `Your PF EuroAsia access code for ${property.publicTitle || property.title} is:`,
    "",
    code,
    "",
    "The code expires in 10 minutes.",
    "",
    "After verification, you may view full details of our registered listings for 30 days on this device. Private off-market opportunities remain subject to separate approval.",
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
      from: "PF EuroAsia Property Access <enquiries@pfeuroasia.com>",
      to: [email],
      subject: `Your access code — ${property.publicTitle || property.title}`,
      text,
      reply_to: "enquiry@pfeuroasia.com",
    }),
  });

  if (!response.ok) {
    console.error("registered-property-code-email-failed", {
      status: response.status,
      response: await response.text(),
      propertyId,
      to: maskEmail(email),
    });
    return NextResponse.json(
      { error: "The verification email could not be sent. Please check the address and try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    success: true,
    challenge,
    maskedEmail: maskEmail(email),
  });
}
