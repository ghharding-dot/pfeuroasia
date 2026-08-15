import { NextRequest, NextResponse } from "next/server";
import { recordMalaysiaAdviserAnswer } from "../../lib/malaysiaAdviserLeadStore";

export const runtime = "nodejs";

type AnswerPayload = {
  full_name?: unknown;
  email?: unknown;
  question?: unknown;
  answer?: unknown;
  source?: unknown;
  company_website?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: NextRequest) {
  let payload: AnswerPayload;

  try {
    payload = (await request.json()) as AnswerPayload;
  } catch {
    return NextResponse.json({ error: "Invalid adviser answer log request." }, { status: 400 });
  }

  if (clean(payload.company_website, 200)) return NextResponse.json({ ok: true });

  const fullName = clean(payload.full_name, 160);
  const email = clean(payload.email, 320).toLowerCase();
  const question = clean(payload.question, 3000);
  const answer = clean(payload.answer, 8000);
  const source = clean(payload.source, 1000);

  if (!fullName || !email || !email.includes("@") || !question || !answer) {
    return NextResponse.json({ error: "Incomplete adviser answer log." }, { status: 400 });
  }

  try {
    const stored = await recordMalaysiaAdviserAnswer({
      fullName,
      email,
      question,
      answer,
      answerSource: source,
    });
    return NextResponse.json({ ok: true, question_id: stored.id });
  } catch (error) {
    console.error("malaysia-adviser-answer-storage-failed", error);
    return NextResponse.json({ error: "Could not save adviser answer log." }, { status: 503 });
  }
}
