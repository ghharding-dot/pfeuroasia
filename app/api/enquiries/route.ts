import { NextRequest, NextResponse } from "next/server";
import { getPartnerReferral } from "../../lib/partner-referrals";

export const runtime = "nodejs";

type EnquiryPayload = {
  enquiry_type?: unknown;
  preferred_area_or_property?: unknown;
  indicative_budget_or_value?: unknown;
  requirements?: unknown;
  full_name?: unknown;
  email?: unknown;
  contact_desk?: unknown;
  preferred_channel?: unknown;
  telephone_or_whatsapp?: unknown;
  wechat_id?: unknown;
  current_location?: unknown;
  partner_slug?: unknown;
  language?: unknown;
  website_region?: unknown;
  website_journey?: unknown;
  company_website?: unknown;
};

function clean(value: unknown, maxLength = 2000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function decodeHeader(value: string | null) {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function maskIp(value: string | null) {
  const ip = value?.split(",")[0]?.trim() || "";
  if (!ip) return "";

  if (ip.includes(".")) {
    const parts = ip.split(".");
    return parts.length === 4 ? `${parts[0]}.${parts[1]}.${parts[2]}.xxx` : "Masked";
  }

  if (ip.includes(":")) {
    const parts = ip.split(":").filter(Boolean);
    return parts.length ? `${parts.slice(0, 3).join(":")}:…` : "Masked";
  }

  return "Masked";
}

function countryName(countryCode: string) {
  if (!countryCode) return "";
  try {
    return (
      new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode.toUpperCase()) ||
      countryCode.toUpperCase()
    );
  } catch {
    return countryCode.toUpperCase();
  }
}

function detectRequestLocation(request: NextRequest) {
  const countryCode = decodeHeader(request.headers.get("x-vercel-ip-country")).toUpperCase();
  const country = countryName(countryCode);
  const city = decodeHeader(request.headers.get("x-vercel-ip-city"));
  const region = decodeHeader(request.headers.get("x-vercel-ip-country-region"));
  const timezone = decodeHeader(request.headers.get("x-vercel-ip-timezone"));
  const continent = decodeHeader(request.headers.get("x-vercel-ip-continent"));
  const maskedIp = maskIp(
    request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
  );
  const summary = [city, region, country].filter(Boolean).join(", ") || "Unavailable";

  return {
    summary,
    country,
    countryCode,
    city,
    region,
    timezone,
    continent,
    maskedIp,
  };
}

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

async function redisCommand(command: Array<string | number>) {
  const config = redisConfig();
  if (!config) return null;

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Redis command failed: ${response.status}`);
  return (await response.json()) as { result?: unknown };
}

async function createReference() {
  const year = new Date().getUTCFullYear();

  try {
    const result = await redisCommand(["INCR", `pfe:enquiry-sequence:${year}`]);
    if (typeof result?.result === "number") {
      return `PFE-${year}-${String(result.result).padStart(6, "0")}`;
    }
  } catch (error) {
    console.error("enquiry-reference-sequence-failed", error);
  }

  const numericFallback = String(
    (Date.now() % 900000) + 100000 + Math.floor(Math.random() * 97),
  ).slice(-6);
  return `PFE-${year}-${numericFallback}`;
}

function partnerEmail(code?: string) {
  const emails: Record<string, string | undefined> = {
    PFI: process.env.PARTNER_EMAIL_PFI || "ghh@pfiberia.com",
    AYL: process.env.PARTNER_EMAIL_AYL || "michael@aylesfordspain.com",
    HOU: process.env.PARTNER_EMAIL_HOU || "jaime@houseandcountry.com",
    LUX: process.env.PARTNER_EMAIL_LUX,
    FIX: process.env.PARTNER_EMAIL_FIXER || "robert@bazothefixer.com",
    R2H: process.env.PARTNER_EMAIL_R2H || "jorge@rent2holiday.es",
    LEG:
      process.env.PARTNER_EMAIL_LEG ||
      "juanlopez@legal10abogadosmarbella.com",
    LAW: process.env.PARTNER_EMAIL_LAW || "aflores@lawbird.com",
    MEC:
      process.env.PARTNER_EMAIL_MEC ||
      "luis.recio@martinezechevarria.com",
  };
  return code ? emails[code] : undefined;
}

function notificationAddress() {
  const configured =
    process.env.ENQUIRY_NOTIFICATION_FROM ||
    process.env.PARTNER_NOTIFICATION_FROM ||
    "PF EuroAsia <notifications@pfeuroasia.com>";
  const match = configured.match(/<([^>]+)>/);
  return (match?.[1] || configured).trim();
}

async function sendWithResend(args: {
  to: string[];
  subject: string;
  text: string;
  replyTo?: string;
  fromName?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${args.fromName || "PF EuroAsia"} <${notificationAddress()}>`,
      to: args.to,
      subject: args.subject,
      text: args.text,
      reply_to: args.replyTo,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend failed: ${response.status} ${detail}`);
  }
  return true;
}

function enquirySubjectType(record: Record<string, string>) {
  return record.website_journey === "asia" ? "Asia enquiry" : "property enquiry";
}

async function sendFormSubmitFallback(recipient: string, record: Record<string, string>) {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...record,
        _subject: `New confidential ${enquirySubjectType(record)} via ${record.partner_name}`,
        _template: "table",
      }),
    },
  );

  if (!response.ok) throw new Error(`FormSubmit failed: ${response.status}`);
}

async function storeRecord(reference: string, record: Record<string, string>) {
  const tasks: Promise<unknown>[] = [];

  if (redisConfig()) {
    tasks.push(
      redisCommand(["SET", `pfe:enquiry:${reference}`, JSON.stringify(record)]),
      redisCommand(["LPUSH", "pfe:enquiries", reference]),
    );
  }

  const webhook = process.env.ENQUIRY_CRM_WEBHOOK_URL;
  if (webhook) {
    tasks.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      }).then((response) => {
        if (!response.ok) throw new Error(`CRM webhook failed: ${response.status}`);
      }),
    );
  }

  if (tasks.length) await Promise.all(tasks);
  console.info("enquiry-record", record);
}

export async function POST(request: NextRequest) {
  let payload: EnquiryPayload;

  try {
    payload = (await request.json()) as EnquiryPayload;
  } catch {
    return NextResponse.json({ error: "Invalid enquiry payload." }, { status: 400 });
  }

  if (clean(payload.company_website)) {
    return NextResponse.json({ ok: true, reference: "PFE-RECEIVED" });
  }

  const fullName = clean(payload.full_name, 160);
  const email = clean(payload.email, 320).toLowerCase();
  const enquiryType = clean(payload.enquiry_type, 80);

  if (!fullName || !email || !enquiryType || !email.includes("@")) {
    return NextResponse.json(
      { error: "Please provide your name, email address and enquiry type." },
      { status: 400 },
    );
  }

  const partnerSlug = clean(payload.partner_slug, 80).toLowerCase();
  const partner = getPartnerReferral(partnerSlug);
  const reference = await createReference();
  const submittedAt = new Date().toISOString();
  const detected = detectRequestLocation(request);
  const websiteJourney = clean(payload.website_journey, 20) === "asia" ? "asia" : "spain";

  const record: Record<string, string> = {
    reference,
    submitted_at: submittedAt,
    status: "New",
    priority: "Unqualified",
    partner_code: partner?.code || "DIRECT",
    partner_name: partner?.name || "Direct website enquiry",
    partner_slug: partnerSlug || "direct",
    website_region: clean(payload.website_region, 80) || "International",
    website_journey: websiteJourney,
    language: clean(payload.language, 40) || "English",
    enquiry_type: enquiryType,
    preferred_area_or_property: clean(payload.preferred_area_or_property),
    indicative_budget_or_value: clean(payload.indicative_budget_or_value, 120),
    requirements: clean(payload.requirements, 5000),
    full_name: fullName,
    email,
    contact_desk: clean(payload.contact_desk, 120),
    preferred_channel: clean(payload.preferred_channel, 80),
    telephone_or_whatsapp: clean(payload.telephone_or_whatsapp, 120),
    wechat_id: clean(payload.wechat_id, 120),
    current_location: clean(payload.current_location, 160),
    detected_location: detected.summary,
    detected_country: detected.country,
    detected_country_code: detected.countryCode,
    detected_city: detected.city,
    detected_region: detected.region,
    detected_timezone: detected.timezone,
    detected_continent: detected.continent,
    detected_ip_masked: detected.maskedIp,
  };

  try {
    await storeRecord(reference, record);
  } catch (error) {
    console.error("enquiry-record-storage-failed", error);
  }

  const mainRecipient = process.env.ENQUIRY_EMAIL || "enquiry@pfeuroasia.com";
  const routedPartnerEmail = partnerEmail(partner?.code);
  const recipients = Array.from(
    new Set([mainRecipient, routedPartnerEmail].filter(Boolean) as string[]),
  );

  const internalText = [
    `Enquiry reference: ${reference}`,
    `Submitted: ${submittedAt}`,
    `Source partner: ${record.partner_name} (${record.partner_code})`,
    `Website journey: ${record.website_journey}`,
    `Website region: ${record.website_region}`,
    `Language: ${record.language}`,
    "",
    `Enquiry type: ${record.enquiry_type}`,
    `Preferred area/property: ${record.preferred_area_or_property || "Not provided"}`,
    `Budget/value: ${record.indicative_budget_or_value || "Not provided"}`,
    `Requirements: ${record.requirements || "Not provided"}`,
    "",
    `Name: ${record.full_name}`,
    `Email: ${record.email}`,
    `Telephone/WhatsApp: ${record.telephone_or_whatsapp || "Not provided"}`,
    `WeChat: ${record.wechat_id || "Not provided"}`,
    `Preferred channel: ${record.preferred_channel || "Not provided"}`,
    `Contact desk: ${record.contact_desk || "Not provided"}`,
    `Location entered by client: ${record.current_location || "Not provided"}`,
    "",
    `Detected location (approximate): ${record.detected_location}`,
    `Detected country: ${record.detected_country || "Unavailable"}${
      record.detected_country_code ? ` (${record.detected_country_code})` : ""
    }`,
    `Detected region: ${record.detected_region || "Unavailable"}`,
    `Detected time zone: ${record.detected_timezone || "Unavailable"}`,
    `Detected IP address: ${record.detected_ip_masked || "Unavailable"}`,
    "Detection may be affected by VPNs, mobile networks or corporate routing.",
  ].join("\n");

  const clientText = [
    `Dear ${fullName},`,
    "",
    "Thank you for contacting Property Facilitators EuroAsia.",
    `Your confidential enquiry reference is ${reference}.`,
    partner ? `Your enquiry has been routed through ${partner.name}.` : "",
    "A representative will contact you personally using your preferred contact method.",
    "",
    "Property Facilitators EuroAsia",
    "enquiry@pfeuroasia.com",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const sentWithResend = await sendWithResend({
      to: recipients,
      subject: `New confidential ${enquirySubjectType(record)} via ${
        partner ? partner.name : "PF EuroAsia website"
      }`,
      text: internalText,
      replyTo: email,
      fromName:
        websiteJourney === "asia"
          ? "PF EuroAsia Asia Enquiries"
          : "PF EuroAsia Partner Enquiries",
    });

    if (sentWithResend) {
      try {
        await sendWithResend({
          to: [email],
          subject: `Your PF EuroAsia enquiry ${reference}`,
          text: clientText,
          replyTo: mainRecipient,
        });
      } catch (error) {
        console.error("enquiry-client-confirmation-failed", error);
      }
    } else {
      await Promise.all(recipients.map((recipient) => sendFormSubmitFallback(recipient, record)));
    }
  } catch (error) {
    console.error("enquiry-email-routing-failed", error);
    return NextResponse.json(
      {
        ok: true,
        reference,
        delivery: "browser-fallback",
        partner: partner ? { code: partner.code, name: partner.name } : null,
      },
      { status: 202 },
    );
  }

  return NextResponse.json({
    ok: true,
    reference,
    delivery: "sent",
    partner: partner ? { code: partner.code, name: partner.name } : null,
  });
}
