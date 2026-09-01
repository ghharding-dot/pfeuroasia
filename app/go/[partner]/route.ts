import { NextRequest, NextResponse } from "next/server";
import { getPartnerReferral } from "../../lib/partner-referrals";
import { recordPartnerClick } from "../../lib/partner-clicks";

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
      await recordPartnerClick(details);
    } catch (error) {
      console.error("partner-enquiry-open-recording-failed", error);
    }
  }

  const destination = new URL("/enquire", request.url);
  destination.searchParams.set("partner", slug.toLowerCase());
  return NextResponse.redirect(destination, 302);
}
