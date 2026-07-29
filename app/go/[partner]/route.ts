import { NextRequest, NextResponse } from "next/server";

const PARTNERS: Record<string, { name: string; url: string }> = {
  aylesford: {
    name: "Aylesford Spain",
    url: "https://www.aylesfordspain.com/",
  },
  pfiberia: {
    name: "Property Facilitators Iberia",
    url: "https://pfiberia.com/",
  },
};

function safeHeader(value: string | null, fallback = "Not available") {
  return value?.slice(0, 500) || fallback;
}

async function sendNotification(details: {
  partner: string;
  timestamp: string;
  country: string;
  city: string;
  referrer: string;
  userAgent: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient =
    process.env.PARTNER_NOTIFICATION_EMAIL ||
    "partner-notifications@pfeuroasia.com";
  const sender =
    process.env.PARTNER_NOTIFICATION_FROM ||
    "PF EuroAsia <notifications@pfeuroasia.com>";

  if (!apiKey) return;

  const text = [
    "A collaboration partner link was clicked.",
    "",
    `Partner: ${details.partner}`,
    `Date and time: ${details.timestamp}`,
    `Country: ${details.country}`,
    `City: ${details.city}`,
    `Referrer: ${details.referrer}`,
    `Device/browser: ${details.userAgent}`,
  ].join("\n");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      subject: `Partner link clicked: ${details.partner}`,
      text,
    }),
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ partner: string }> },
) {
  const { partner: slug } = await context.params;
  const partner = PARTNERS[slug.toLowerCase()];

  if (!partner) {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }

  const details = {
    partner: partner.name,
    timestamp: new Date().toISOString(),
    country: safeHeader(request.headers.get("x-vercel-ip-country")),
    city: safeHeader(request.headers.get("x-vercel-ip-city")),
    referrer: safeHeader(request.headers.get("referer")),
    userAgent: safeHeader(request.headers.get("user-agent")),
  };

  console.info("partner-link-click", details);

  try {
    await sendNotification(details);
  } catch (error) {
    console.error("partner-link-notification-failed", error);
  }

  return NextResponse.redirect(partner.url, 302);
}
