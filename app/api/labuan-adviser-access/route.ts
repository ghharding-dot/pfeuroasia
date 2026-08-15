import { NextRequest, NextResponse } from "next/server";
import { recordMalaysiaAdviserAccess } from "../../lib/malaysiaAdviserLeadStore";

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
      subject: "New Malaysia Adviser access",
      text: [
        "A visitor has unlocked the Ask EuroAsia Malaysia Adviser.",
        "",
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Source: ${source}`,
        `Accessed: ${new Date().toISOString()}`,
        "",
        "The visitor is now recorded in the encrypted Malaysia Adviser register in The Vault.",
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

  if (clean(payload.company_website)) return NextResponse.json({ ok: true });

  const fullName = clean(payload.full_name, 160);
  const email = clean(payload.email, 320).toLowerCase();
  const source = clean(payload.source, 160) || "Ask EuroAsia — Malaysia Adviser";

  if (!fullName || !email || !email.includes("@") || email.startsWith("@") || email.endsWith("@")) {
    return NextResponse.json(
      { error: "Please enter your full name and a valid email address." },
      { status: 400 },
    );
  }

  try {
    await recordMalaysiaAdviserAccess({ fullName, email, source });
  } catch (error) {
    console.error("malaysia-adviser-access-storage-failed", error);
    return NextResponse.json(
      { error: "We could not register your adviser access. Please try again." },
      { status: 503 },
    );
  }

  try {
    await sendNotification(fullName, email, source);
  } catch (error) {
    console.error("malaysia-adviser-access-notification-failed", error);
  }

  return NextResponse.json({ ok: true });
}
