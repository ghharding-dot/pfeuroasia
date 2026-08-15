import { NextRequest, NextResponse } from "next/server";
import { recordMalaysiaAdviserQuestion } from "../../lib/malaysiaAdviserLeadStore";

export const runtime = "nodejs";

type QuestionPayload = {
  full_name?: unknown;
  email?: unknown;
  question?: unknown;
  company_website?: unknown;
};

function clean(value: unknown, maxLength = 3000) {
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

async function sendWithResend(args: {
  to: string[];
  subject: string;
  text: string;
  replyTo?: string;
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
      from: `PF EuroAsia Malaysia Adviser <${notificationAddress()}>`,
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

export async function POST(request: NextRequest) {
  let payload: QuestionPayload;

  try {
    payload = (await request.json()) as QuestionPayload;
  } catch {
    return NextResponse.json({ error: "Invalid question request." }, { status: 400 });
  }

  if (clean(payload.company_website)) return NextResponse.json({ ok: true });

  const fullName = clean(payload.full_name, 160);
  const email = clean(payload.email, 320).toLowerCase();
  const question = clean(payload.question, 3000);

  if (!fullName || !email || !email.includes("@") || !question) {
    return NextResponse.json(
      { error: "We could not register this question for follow-up." },
      { status: 400 },
    );
  }

  let questionId = "";
  try {
    const stored = await recordMalaysiaAdviserQuestion({
      fullName,
      email,
      question,
      source: "Ask EuroAsia — Malaysia Adviser",
    });
    questionId = stored.id;
  } catch (error) {
    console.error("malaysia-adviser-question-storage-failed", error);
    return NextResponse.json(
      { error: "We could not save this question for follow-up." },
      { status: 503 },
    );
  }

  const recipient = process.env.ENQUIRY_EMAIL || "enquiry@pfeuroasia.com";
  const internalText = [
    "The Malaysia Adviser could not provide a sufficiently verified answer and has created a follow-up item.",
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Question: ${question}`,
    `Question ID: ${questionId}`,
    `Received: ${new Date().toISOString()}`,
    "",
    "Please research/confirm the answer and reply to the visitor by email. The question is also stored in the Malaysia Adviser register in The Vault.",
  ].join("\n");

  const clientText = [
    `Dear ${fullName},`,
    "",
    "Thank you for your question to the PF EuroAsia Malaysia Adviser.",
    "The adviser did not have a sufficiently verified answer in its current knowledge base, so your question has been passed to our team for review.",
    "",
    `Your question: ${question}`,
    "",
    "We will send the answer to this email address once it has been checked. Where the question requires legal, tax, immigration or other specialist advice, we may need to confirm the position with the appropriate adviser.",
    "",
    "Property Facilitators EuroAsia",
    "Malaysia & Labuan Desk",
  ].join("\n");

  try {
    const sent = await sendWithResend({
      to: [recipient],
      subject: `Malaysia Adviser follow-up question — ${fullName}`,
      text: internalText,
      replyTo: email,
    });

    if (sent) {
      await sendWithResend({
        to: [email],
        subject: "We received your Malaysia Adviser question",
        text: clientText,
        replyTo: recipient,
      }).catch((error) => console.error("malaysia-adviser-client-confirmation-failed", error));
    }
  } catch (error) {
    console.error("malaysia-adviser-question-notification-failed", error);
  }

  return NextResponse.json({ ok: true, question_id: questionId });
}
