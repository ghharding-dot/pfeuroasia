import { NextRequest, NextResponse } from "next/server";
import { getPartnerReferral } from "../../lib/partner-referrals";

function safeHeader(value: string | null, fallback = "Not available") {
  return value?.slice(0, 500) || fallback;
}

async function sendClickNotification(details: {
  partner: string;
  code: string;
  timestamp: string;
  country: string;
  city: string;
  referrer: string;
  userAgent: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient =
    process.env.PARTNER_NOTIFICATION_EMAIL || "enquiry@pfeuroasia.com";
  const sender =
    process.env.PARTNER_NOTIFICATION_FROM ||
    "PF EuroAsia <notifications@pfeuroasia.com>";

  if (!apiKey) return;

  const text = [
    "A collaboration partner enquiry route was opened.",
    "",
    `Partner: ${details.partner}`,
    `Partner code: ${details.code}`,
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
      subject: `Partner enquiry opened: ${details.partner}`,
      text,
    }),
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ partner: string }> },
) {
  const { partner: slug } = await context.params;
  const partner = getPartnerReferral(slug);

  if (!partner) {
    return NextResponse.redirect(new URL("/enquire", request.url), 302);
  }

  const details = {
    partner: partner.name,
    code: partner.code,
    timestamp: new Date().toISOString(),
    country: safeHeader(request.headers.get("x-vercel-ip-country")),
    city: safeHeader(request.headers.get("x-vercel-ip-city")),
    referrer: safeHeader(request.headers.get("referer")),
    userAgent: safeHeader(request.headers.get("user-agent")),
  };

  console.info("partner-enquiry-opened", details);

  try {
    await sendClickNotification(details);
  } catch (error) {
    console.error("partner-enquiry-open-notification-failed", error);
  }

  const destination = new URL("/enquire", request.url);
  destination.searchParams.set("partner", slug.toLowerCase());
  return NextResponse.redirect(destination, 302);
}
