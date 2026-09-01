import { NextRequest, NextResponse } from "next/server";
import { previousPartnerClickKey, redisCommand } from "../../../lib/partner-clicks";

export const runtime = "nodejs";

function authorised(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) return request.headers.get("authorization") === `Bearer ${secret}`;
  return request.headers.get("x-vercel-cron") === "1";
}

function parseCount(value: unknown) {
  const count = Number(value);
  return Number.isFinite(count) ? count : 0;
}

function entriesFromHash(result: unknown) {
  if (!Array.isArray(result)) return [] as Array<[string, number]>;
  const entries: Array<[string, number]> = [];
  for (let index = 0; index < result.length; index += 2) {
    entries.push([String(result[index]), parseCount(result[index + 1])]);
  }
  return entries;
}

async function sendSummary(text: string, week: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

  const recipient = process.env.PARTNER_NOTIFICATION_EMAIL || "enquiry@pfeuroasia.com";
  const sender =
    process.env.PARTNER_NOTIFICATION_FROM ||
    "PF EuroAsia <notifications@pfeuroasia.com>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      subject: `Weekly collaboration partner page activity — ${week}`,
      text,
    }),
  });

  if (!response.ok) throw new Error(`Resend failed: ${response.status}`);
}

export async function GET(request: NextRequest) {
  if (!authorised(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = previousPartnerClickKey();
  const week = key.split(":").at(-1) || "previous week";
  const sentKey = `${key}:summary-sent`;
  const alreadySent = await redisCommand(["GET", sentKey]);
  if (alreadySent?.result) {
    return NextResponse.json({ ok: true, week, delivery: "already-sent" });
  }
  const response = await redisCommand(["HGETALL", key]);
  const entries = entriesFromHash(response?.result);
  const total = entries.find(([field]) => field === "total")?.[1] || 0;
  const partners = entries
    .filter(([field]) => field.startsWith("partner:"))
    .map(([field, count]) => ({ name: field.split(":").slice(2).join(":"), count }))
    .sort((a, b) => b.count - a.count);
  const countries = entries
    .filter(([field]) => field.startsWith("country:"))
    .map(([field, count]) => ({ name: field.slice("country:".length), count }))
    .sort((a, b) => b.count - a.count);

  const text = [
    `PF EuroAsia collaboration partner page activity for ${week}.`,
    "",
    `Total genuine page openings: ${total}`,
    "No enquiry form is implied by these page-opening figures.",
    "Completed enquiries continue to arrive immediately in separate emails.",
    "",
    "Openings by collaboration partner:",
    ...(partners.length ? partners.map((item) => `- ${item.name}: ${item.count}`) : ["- None recorded"]),
    "",
    "Openings by country:",
    ...(countries.length ? countries.map((item) => `- ${item.name}: ${item.count}`) : ["- None recorded"]),
  ].join("\n");

  await sendSummary(text, week);
  await redisCommand(["SET", sentKey, new Date().toISOString(), "EX", 60 * 60 * 24 * 120]);
  return NextResponse.json({ ok: true, week, total });
}
