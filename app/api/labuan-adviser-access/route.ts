import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type AccessPayload = {
  full_name?: unknown;
  email?: unknown;
  source?: unknown;
  company_website?: unknown;
};

function clean(value: unknown, maxLength = 1000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
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
  return response.json();
}

function notificationAddress() {
  const configured =
    process.env.ENQUIRY_NOTIFICATION_FROM ||
    process.env.PARTNER_NOTIFICATION_FROM ||
    "PF EuroAsia <notifications@pfeuroasia.com>";
  const match = configured.match(/<([^>]+)>/);
  return (match?.[1] || configured).trim();
}

async function sendNotification(fullName: string, email: string, source: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const recipient = process.env.ENQUIRY_EMAIL || "enquiry@pfeuroasia.com";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `PF EuroAsia Adviser <${notificationAddress()}>`,
      to: [recipient],
      reply_to: email,
      subject: "New Malaysia & Labuan adviser access",
      text: [
        "A visitor has unlocked the Malaysia & Labuan Q&A adviser.",
        "",
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Source: ${source}`,
        `Accessed: ${new Date().toISOString()}`,
        "",
        "This is an adviser-access lead, not a request for direct contact unless the visitor subsequently submits an enquiry.",
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend failed: ${response.status} ${detail}`);
  }
}

export async function POST(request: NextRequest) {
  let payload: AccessPayload;

  try {
    payload = (await request.json()) as AccessPayload;
  } catch {
    return NextResponse.json({ error: "Invalid access request." }, { status: 400 });
  }

  if (clean(payload.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const fullName = clean(payload.full_name, 160);
  const email = clean(payload.email, 320).toLowerCase();
  const source = clean(payload.source, 160) || "Malaysia & Labuan Q&A adviser";

  if (!fullName || !email || !email.includes("@") || email.startsWith("@") || email.endsWith("@")) {
    return NextResponse.json(
      { error: "Please enter your full name and a valid email address." },
      { status: 400 },
    );
  }

  const accessedAt = new Date().toISOString();
  const record = {
    full_name: fullName,
    email,
    source,
    accessed_at: accessedAt,
    status: "Adviser access",
    website_journey: "asia",
    website_region: "Malaysia / Labuan",
  };

  try {
    if (redisConfig()) {
      const key = `pfe:labuan-adviser-access:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
      await Promise.all([
        redisCommand(["SET", key, JSON.stringify(record)]),
        redisCommand(["LPUSH", "pfe:labuan-adviser-access", key]),
      ]);
    }
  } catch (error) {
    console.error("labuan-adviser-access-storage-failed", error);
  }

  console.info("labuan-adviser-access", record);

  try {
    await sendNotification(fullName, email, source);
  } catch (error) {
    console.error("labuan-adviser-access-notification-failed", error);
  }

  return NextResponse.json({ ok: true });
}
