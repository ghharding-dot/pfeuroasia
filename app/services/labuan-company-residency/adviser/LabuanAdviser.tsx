"use client";

import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";
import styles from "./LabuanAdviser.module.css";
import { AdviserKnowledgeEntry, labuanKnowledge } from "./LabuanKnowledge";
import { malaysiaCostKnowledge } from "./MalaysiaCostKnowledge";
import { malaysiaFoodKnowledge } from "./MalaysiaFoodKnowledge";
import { malaysiaGeneralKnowledge } from "./MalaysiaGeneralKnowledge";

type Visitor = {
  fullName: string;
  email: string;
};

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  source?: string;
  needsConfirmation?: boolean;
  followUps?: string[];
};

const malaysiaKnowledge: AdviserKnowledgeEntry[] = [
  ...malaysiaCostKnowledge,
  ...malaysiaGeneralKnowledge,
  ...malaysiaFoodKnowledge,
];

const knowledge: AdviserKnowledgeEntry[] = [
  ...malaysiaKnowledge,
  ...labuanKnowledge,
];

const labuanIds = new Set(labuanKnowledge.map((entry) => entry.id));

const suggestions = [
  "What is the cost of living in Kuala Lumpur?",
  "How much do utilities cost in Kuala Lumpur?",
  "What is Malaysian food like and what does it cost?",
  "How good is healthcare in Malaysia?",
  "What does a two-bedroom apartment rent for in Kuala Lumpur?",
  "How much does the Labuan package cost?",
];

const stopWords = new Set([
  "a", "an", "and", "are", "can", "do", "does", "for", "how", "i", "in",
  "is", "it", "me", "my", "of", "on", "the", "to", "what", "with",
]);

const genericCommercialWords = new Set([
  "cost", "costs", "price", "prices", "pricing", "fee", "fees", "amount",
  "much", "pay", "paying", "annual", "yearly", "monthly", "expense", "expenses",
]);

const malaysiaLifestyleSignals = [
  "cost of living", "living cost", "live in", "kuala lumpur", "utilities", "utility",
  "electricity", "electric bill", "water bill", "internet", "wifi", "groceries",
  "grocery", "food", "restaurant", "hawker", "rent", "apartment", "condo",
  "serviced apartment", "transport", "mrt", "healthcare", "hospital", "doctor",
  "shopping", "weather", "climate", "langkawi", "penang", "sabah", "sarawak",
  "singapore", "flight", "airport",
];

const labuanSignals = [
  "labuan", "company formation", "company setup", "set up a company", "incorporation",
  "visa", "residency", "residence permit", "employment pass", "work permit",
  "director", "dependant", "dependent", "renewal", "lfsa", "substance",
  "corporate tax", "holding company", "trading company",
];

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9%$,. -]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsAny(value: string, signals: string[]) {
  return signals.some((signal) => value.includes(signal));
}

function contentTokens(value: string) {
  return normalise(value)
    .split(" ")
    .filter(
      (token) =>
        token.length > 2 &&
        !stopWords.has(token) &&
        !genericCommercialWords.has(token),
    );
}

function scoreEntry(question: string, entry: AdviserKnowledgeEntry) {
  const q = normalise(question);

  // A lifestyle question must never fall through to a Labuan company answer merely
  // because it contains generic words such as "cost", "price" or "how much".
  const hasLifestyleContext = containsAny(q, malaysiaLifestyleSignals);
  const hasLabuanContext = containsAny(q, labuanSignals);
  if (labuanIds.has(entry.id) && hasLifestyleContext && !hasLabuanContext) return 0;

  const qTokens = new Set(contentTokens(q));
  const matchedContentTokens = new Set<string>();
  let score = 0;

  for (const keyword of entry.keywords) {
    const normalisedKeyword = normalise(keyword);
    if (!normalisedKeyword) continue;

    if (q === normalisedKeyword) {
      score += 20;
    } else if (normalisedKeyword.includes(" ") && q.includes(normalisedKeyword)) {
      score += 10;
    } else if (
      !normalisedKeyword.includes(" ") &&
      !genericCommercialWords.has(normalisedKeyword) &&
      qTokens.has(normalisedKeyword)
    ) {
      score += 4;
    }

    for (const token of contentTokens(normalisedKeyword)) {
      if (qTokens.has(token)) matchedContentTokens.add(token);
    }
  }

  // Count each meaningful overlapping token only once per knowledge entry. This
  // prevents repeated synonyms like "cost", "total cost", "setup cost" from
  // artificially multiplying the score of an unrelated answer.
  score += matchedContentTokens.size * 2;

  // Meaningful title words are strong context. This preserves natural questions
  // such as "How much does the Labuan package cost?" without giving any weight
  // to the generic word "cost" itself.
  const matchedTitleTokens = new Set<string>();
  for (const token of contentTokens(entry.title)) {
    if (qTokens.has(token)) matchedTitleTokens.add(token);
  }
  score += matchedTitleTokens.size * 4;

  return score;
}

function findAnswer(question: string): AdviserKnowledgeEntry | null {
  const ranked = knowledge
    .map((entry) => ({ entry, score: scoreEntry(question, entry) }))
    .sort((a, b) => b.score - a.score);

  const first = ranked[0];
  const second = ranked[1];
  if (!first || first.score < 5) return null;

  // If two unrelated entries are effectively tied on a weak score, it is safer to
  // ask for human follow-up than confidently serve the wrong information.
  if (first.score < 9 && second && second.score === first.score) return null;

  return first.entry;
}

export function LabuanAdviser({ visitor }: { visitor: Visitor }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      text:
        `Welcome ${visitor.fullName.split(" ")[0] || ""}. You can ask about living in Malaysia, Kuala Lumpur property and lifestyle, living costs, utilities, food, travel connections, healthcare, transport, culture, destinations, or the PF EuroAsia Labuan company and residency pathway. If I cannot give you a sufficiently verified answer, I can register the question for our team to check and send the answer to ${visitor.email}.`,
      source: "PF EuroAsia Malaysia & Labuan controlled knowledge base — updated August 2026",
      followUps: suggestions.slice(0, 3),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const nextId = useRef(2);

  const hasConversation = useMemo(() => messages.length > 1, [messages.length]);

  async function registerFollowUp(question: string) {
    try {
      const response = await fetch("/api/malaysia-adviser-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: visitor.fullName,
          email: visitor.email,
          question,
          company_website: "",
        }),
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async function logAnsweredQuestion(question: string, match: AdviserKnowledgeEntry) {
    try {
      await fetch("/api/malaysia-adviser-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: visitor.fullName,
          email: visitor.email,
          question,
          answer: match.answer,
          source: match.source,
          company_website: "",
        }),
      });
    } catch {
      // Logging must never interrupt the visitor's adviser experience.
    }
  }

  function ask(question: string) {
    const clean = question.trim();
    if (!clean || isThinking) return;

    const userId = nextId.current++;
    setMessages((current) => [...current, { id: userId, role: "user", text: clean }]);
    setInput("");
    setIsThinking(true);

    window.setTimeout(async () => {
      const match = findAnswer(clean);
      const assistantId = nextId.current++;

      if (match && !match.needsConfirmation) {
        void logAnsweredQuestion(clean, match);
        setMessages((current) => [
          ...current,
          {
            id: assistantId,
            role: "assistant",
            text: match.answer,
            source: match.source,
            followUps: match.followUps,
          },
        ]);
      } else {
        const saved = await registerFollowUp(clean);

        if (match) {
          const followUpText = saved
            ? `${match.answer} I have also registered your question for follow-up. PF EuroAsia will check the current position and send the confirmed answer to ${visitor.email}.`
            : `${match.answer} I could not register the email follow-up automatically, so please use the enquiry link below and we will confirm it for you.`;

          setMessages((current) => [
            ...current,
            {
              id: assistantId,
              role: "assistant",
              text: followUpText,
              source: match.source,
              needsConfirmation: !saved,
              followUps: match.followUps,
            },
          ]);
        } else {
          setMessages((current) => [
            ...current,
            {
              id: assistantId,
              role: "assistant",
              text: saved
                ? `I do not have a sufficiently verified answer to that question in the Malaysia knowledge base yet. Rather than guess, I have registered your question for our team to check. We will send the answer to ${visitor.email} once it has been verified.`
                : "I do not have a sufficiently verified answer to that question yet, and I could not register the email follow-up automatically. Please use the enquiry link below so our Malaysia desk can confirm it for you.",
              source: saved
                ? "Question registered in the PF EuroAsia Malaysia Adviser follow-up queue"
                : "No verified knowledge-base match",
              needsConfirmation: !saved,
              followUps: [
                "What is the cost of living in Kuala Lumpur?",
                "How much do utilities cost in Kuala Lumpur?",
                "What is Malaysian food like and what does it cost?",
              ],
            },
          ]);
        }
      }

      setIsThinking(false);
    }, 220);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(input);
  }

  return (
    <div className={styles.adviser}>
      <div className={styles.topBar}>
        <div>
          <span className={styles.statusDot} />
          <span>Malaysia living & Labuan knowledge base</span>
        </div>
        <span>Updated August 2026</span>
      </div>

      <div className={styles.messages} aria-live="polite">
        {messages.map((message) => (
          <article
            key={message.id}
            className={`${styles.message} ${message.role === "user" ? styles.userMessage : styles.assistantMessage}`}
          >
            <div className={styles.messageLabel}>{message.role === "user" ? "You" : "Ask EuroAsia"}</div>
            <p>{message.text}</p>
            {message.source ? <small>Source: {message.source}</small> : null}
            {message.needsConfirmation ? (
              <Link className={styles.confirmLink} href="/asia-gateway/enquire">
                Ask us to confirm this <span>→</span>
              </Link>
            ) : null}
            {message.role === "assistant" && message.followUps?.length ? (
              <div className={styles.followUps}>
                {message.followUps.map((followUp) => (
                  <button key={followUp} type="button" onClick={() => ask(followUp)} disabled={isThinking}>
                    {followUp}
                  </button>
                ))}
              </div>
            ) : null}
          </article>
        ))}
        {isThinking ? (
          <article className={`${styles.message} ${styles.assistantMessage}`}>
            <div className={styles.messageLabel}>Ask EuroAsia</div>
            <div className={styles.thinking} aria-label="Checking the knowledge base">
              <span /><span /><span />
            </div>
          </article>
        ) : null}
      </div>

      {!hasConversation ? (
        <div className={styles.quickQuestions}>
          {suggestions.map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => ask(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}

      <form className={styles.inputBar} onSubmit={submit}>
        <label htmlFor="labuan-question">Ask a Malaysia or Labuan question</label>
        <div>
          <input
            id="labuan-question"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="e.g. How much do utilities cost in Kuala Lumpur?"
            autoComplete="off"
          />
          <button type="submit" disabled={!input.trim() || isThinking} aria-label="Send question">
            Ask <span>→</span>
          </button>
        </div>
      </form>

      <div className={styles.footerNote}>
        <p>
          General information only. Property prices, rents, travel schedules and costs are market snapshots and can change. This adviser does not provide personal legal, tax, medical or immigration advice and does not guarantee approval. Questions requiring confirmation can be registered for email follow-up.
        </p>
        <Link href="/asia-gateway/enquire">Request a private assessment →</Link>
      </div>
    </div>
  );
}
