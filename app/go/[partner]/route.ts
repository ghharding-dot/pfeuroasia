import { NextRequest, NextResponse } from "next/server";
import { getPartnerReferral } from "../../lib/partner-referrals";

function safeHeader(value: string | null, fallback = "Not available") {
  return value?.slice(0, 500) || fallback;
}

function isAutomatedRequest(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const purpose = [
    request.headers.get("purpose"),
    request.headers.get("sec-purpose"),
    request.headers.get("x-purpose"),
  ]
    .filter(Boolean)
    .join(" ");

  const botPattern =
    /bot|crawler|spider|slurp|facebookexternalhit|whatsapp|telegrambot|discordbot|linkedinbot|pinterest|preview|fetcher|monitor|lighthouse|headless|gptbot|chatgpt-user|claudebot|anthropic-ai|perplexitybot|googleother|bingpreview/i;

  return botPattern.test(userAgent) || /prefetch|prerender|preview/i.test(purpose);
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
    "A visitor opened a collaboration partner enquiry page.",
    "",
    "Important: this is a page-open notification only. No enquiry form has been submitted yet.",
    "A completed enquiry will arrive separately with the subject 'New confidential property enquiry'.",
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
      subject: `Partner page opened — no enquiry submitted: ${details.partner}`,
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

  if (isAutomatedRequest(request)) {
    console.info("partner-route-automated-visit-ignored", details);
  } else {
    console.info("partner-enquiry-opened", details);

    try {
      await sendClickNotification(details);
    } catch (error) {
      console.error("partner-enquiry-open-notification-failed", error);
    }
  }

  const destination = new URL("/enquire", request.url);
  destination.searchParams.set("partner", slug.toLowerCase());
  return NextResponse.redirect(destination, 302);
}
