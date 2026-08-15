import { createHash } from "node:crypto";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { recordMalaysiaAdviserAnswer } from "../../lib/malaysiaAdviserLeadStore";
import { findMalaysiaAdviserAnswer } from "../../services/labuan-company-residency/adviser/MalaysiaAdviserMatcher";
import {
  formatHybridKnowledgeContext,
  retrieveMalaysiaAdviserKnowledge,
} from "../../services/labuan-company-residency/adviser/MalaysiaAdviserHybridRetrieval";
import { adviserSourceLink } from "../../services/labuan-company-residency/adviser/MalaysiaAdviserSourceLinks";

export const runtime = "nodejs";
export const maxDuration = 30;

const HYBRID_MODEL = "openai/gpt-5.6-luna";

type HistoryMessage = {
  role: "assistant" | "user";
  text: string;
};

type HybridPayload = {
  full_name?: unknown;
  email?: unknown;
  question?: unknown;
  history?: unknown;
  company_website?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanHistory(value: unknown): HistoryMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .slice(-8)
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const role = "role" in item && item.role === "user" ? "user" : "assistant";
      const text = "text" in item ? clean(item.text, 1800) : "";
      return text ? ({ role, text } satisfies HistoryMessage) : null;
    })
    .filter((item): item is HistoryMessage => Boolean(item));
}

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function uniqueSourceLinks(values: { label: string; url?: string }[]) {
  const seen = new Set<string>();
  return values.filter((value) => {
    const key = `${value.label}|${value.url || ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function shouldPersistAudit() {
  // Preview deployments are used for regression testing and should not pollute the
  // production adviser register with test questions.
  return process.env.VERCEL_ENV !== "preview";
}

async function persistAnswer(args: {
  fullName: string;
  email: string;
  question: string;
  answer: string;
  source: string;
  mode: "controlled" | "hybrid-ai";
  topic: string;
  knowledgeIds: string[];
  model?: string;
}) {
  if (!shouldPersistAudit()) return;

  try {
    await recordMalaysiaAdviserAnswer({
      fullName: args.fullName,
      email: args.email,
      question: args.question,
      answer: args.answer,
      answerSource: args.source,
      answerMode: args.mode,
      topic: args.topic,
      knowledgeIds: args.knowledgeIds,
      model: args.model,
    });
  } catch (error) {
    // The visitor should still receive the adviser answer if audit storage has a
    // temporary problem. The failure remains visible in Vercel runtime logs.
    console.error("malaysia-adviser-hybrid-audit-failed", error);
  }
}

function controlledResponse(args: {
  fullName: string;
  email: string;
  question: string;
  topic: string;
}) {
  const match = findMalaysiaAdviserAnswer(args.question);
  if (!match || match.needsConfirmation) return null;

  const source = match.source;
  const sourceLink = adviserSourceLink(match.id, match.source);
  void persistAnswer({
    fullName: args.fullName,
    email: args.email,
    question: args.question,
    answer: match.answer,
    source,
    mode: "controlled",
    topic: args.topic,
    knowledgeIds: [match.id],
  });

  return NextResponse.json({
    ok: true,
    mode: "controlled",
    topic: args.topic,
    answer: match.answer,
    source,
    sources: [sourceLink],
    followUps: match.followUps || [],
  });
}

export async function POST(request: NextRequest) {
  let payload: HybridPayload;

  try {
    payload = (await request.json()) as HybridPayload;
  } catch {
    return NextResponse.json({ error: "Invalid adviser request." }, { status: 400 });
  }

  // Honeypot used by the adviser access form. Bots receive a harmless success.
  if (clean(payload.company_website, 200)) {
    return NextResponse.json({ ok: true, noAnswer: true });
  }

  const fullName = clean(payload.full_name, 160);
  const email = clean(payload.email, 320).toLowerCase();
  const question = clean(payload.question, 3000);
  const history = cleanHistory(payload.history);

  if (!fullName || !email || !email.includes("@") || !question) {
    return NextResponse.json({ error: "Incomplete adviser request." }, { status: 400 });
  }

  const retrieval = retrieveMalaysiaAdviserKnowledge(question, 6);

  // Company, tax, residency and immigration remain deliberately controlled. The AI
  // layer is not allowed to reinterpret or embellish these sensitive answers.
  if (retrieval.sensitive) {
    const response = controlledResponse({
      fullName,
      email,
      question,
      topic: retrieval.intent,
    });
    if (response) return response;

    return NextResponse.json({
      ok: true,
      noAnswer: true,
      topic: retrieval.intent,
      reason: "Sensitive question requires a verified controlled answer or human confirmation.",
    });
  }

  if (!retrieval.matches.length) {
    return NextResponse.json({
      ok: true,
      noAnswer: true,
      topic: retrieval.intent,
      reason: "No sufficiently relevant verified Malaysia knowledge was retrieved.",
    });
  }

  const verifiedContext = formatHybridKnowledgeContext(retrieval.matches);
  const conversationContext = history.length
    ? history.map((item) => `${item.role.toUpperCase()}: ${item.text}`).join("\n")
    : "No earlier conversation context.";

  try {
    const result = await generateText({
      model: HYBRID_MODEL,
      maxOutputTokens: 700,
      temperature: 0.2,
      system: `You are Ask EuroAsia — Malaysia Adviser, a practical relocation, lifestyle and tourism adviser for PF EuroAsia.\n\nGROUNDING RULES:\n- The VERIFIED KNOWLEDGE supplied in the user prompt is your only factual source.\n- Never add facts, prices, statistics, opening hours, transport times, legal rules, medical claims, tax rules, immigration rules or travel requirements from memory.\n- Conversation history may help you understand what the visitor means, but it is not a factual source.\n- If the verified knowledge is not sufficient to answer the visitor's actual question, reply with exactly: INSUFFICIENT_CONTEXT\n- Never invent a source or imply that you checked a live website during this request.\n- Never disclose internal provider costs, commercial mark-ups or internal business notes.\n\nANSWER STYLE:\n- Be conversational, confident where the verified context is clear, and useful rather than terse.\n- For tourism and lifestyle questions, proactively connect relevant retrieved facts and give sensible options.\n- For itinerary questions, organize the retrieved ideas into a practical outline but do not invent precise schedules.\n- If a figure or condition in the verified material is described as approximate, dated or variable, preserve that qualification.\n- Use short paragraphs and bullets where they improve clarity. Avoid tables.\n- Do not append a fabricated bibliography; the application displays the verified sources separately.`,
      prompt: `VISITOR QUESTION:\n${question}\n\nRECENT CONVERSATION (for intent only; not a factual source):\n${conversationContext}\n\nVERIFIED KNOWLEDGE:\n${verifiedContext}\n\nAnswer the visitor using only the verified knowledge above.`,
      providerOptions: {
        gateway: {
          user: createHash("sha256").update(email).digest("hex").slice(0, 32),
          tags: ["feature:malaysia-adviser", `topic:${retrieval.intent}`],
        },
      },
    });

    const answer = result.text.trim();
    if (!answer || answer.startsWith("INSUFFICIENT_CONTEXT")) {
      return NextResponse.json({
        ok: true,
        noAnswer: true,
        topic: retrieval.intent,
        reason: "The retrieved verified material was not sufficient for a grounded AI answer.",
      });
    }

    const sources = uniqueSourceLinks(
      retrieval.matches.map(({ entry }) => adviserSourceLink(entry.id, entry.source)),
    );
    const knowledgeIds = retrieval.matches.map(({ entry }) => entry.id);
    const followUps = unique(
      retrieval.matches.flatMap(({ entry }) => entry.followUps || []),
    ).slice(0, 4);
    const source = unique(sources.map(({ label }) => label)).join(" · ").slice(0, 1000);

    void persistAnswer({
      fullName,
      email,
      question,
      answer,
      source,
      mode: "hybrid-ai",
      topic: retrieval.intent,
      knowledgeIds,
      model: HYBRID_MODEL,
    });

    return NextResponse.json({
      ok: true,
      mode: "hybrid-ai",
      topic: retrieval.intent,
      answer,
      source,
      sources,
      followUps,
    });
  } catch (error) {
    console.error("malaysia-adviser-hybrid-generation-failed", error);

    // Graceful degradation: use the existing verified deterministic answer if one
    // is strong enough. The visitor never sees a raw provider or gateway error.
    const fallback = controlledResponse({
      fullName,
      email,
      question,
      topic: retrieval.intent,
    });
    if (fallback) return fallback;

    return NextResponse.json({
      ok: true,
      noAnswer: true,
      topic: retrieval.intent,
      reason: "Hybrid generation was unavailable and no safe controlled fallback matched.",
    });
  }
}
