"use client";

import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";
import styles from "./LabuanAdviser.module.css";
import { AdviserKnowledgeEntry, labuanKnowledge } from "./LabuanKnowledge";
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

const knowledge: AdviserKnowledgeEntry[] = [
  ...labuanKnowledge,
  ...malaysiaGeneralKnowledge,
  ...malaysiaFoodKnowledge,
];

const suggestions = [
  "What is Malaysia like to live in?",
  "What is Malaysian food like and what does it cost?",
  "How good is healthcare in Malaysia?",
  "What does a two-bedroom apartment rent for in Kuala Lumpur?",
  "How long is London to Kuala Lumpur?",
  "How much does the Labuan package cost?",
];

const stopWords = new Set([
  "a", "an", "and", "are", "can", "do", "does", "for", "how", "i", "in",
  "is", "it", "me", "my", "of", "on", "the", "to", "what", "with",
]);

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9%$,. -]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreEntry(question: string, entry: AdviserKnowledgeEntry) {
  const q = normalise(question);
  const qTokens = q.split(" ").filter((token) => token.length > 2 && !stopWords.has(token));
  let score = 0;

  for (const keyword of entry.keywords) {
    const normalisedKeyword = normalise(keyword);
    if (q.includes(normalisedKeyword)) score += normalisedKeyword.includes(" ") ? 8 : 4;

    const keywordTokens = normalisedKeyword
      .split(" ")
      .filter((token) => token.length > 2 && !stopWords.has(token));
    const overlap = keywordTokens.filter((token) => qTokens.includes(token)).length;
    score += overlap * 2;
  }

  return score;
}

function findAnswer(question: string): AdviserKnowledgeEntry | null {
  const ranked = knowledge
    .map((entry) => ({ entry, score: scoreEntry(question, entry) }))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.score >= 4 ? ranked[0].entry : null;
}

export function LabuanAdviser({ visitor }: { visitor: Visitor }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      text:
        `Welcome ${visitor.fullName.split(" ")[0] || ""}. You can ask about living in Malaysia, Kuala Lumpur property and lifestyle, food, travel connections, healthcare, transport, culture, destinations, or the PF EuroAsia Labuan company and residency pathway. If I cannot give you a sufficiently verified answer, I can register the question for our team to check and send the answer to ${visitor.email}.`,
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
                "What is Malaysia like to live in?",
                "What is Malaysian food like and what does it cost?",
                "What does a two-bedroom apartment rent for in Kuala Lumpur?",
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
            placeholder="e.g. What is eating out like in Kuala Lumpur?"
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
