"use client";

import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";
import styles from "./LabuanAdviser.module.css";
import type { AdviserKnowledgeEntry } from "./LabuanKnowledge";
import {
  adviserSuggestions,
  findMalaysiaAdviserAnswer,
} from "./MalaysiaAdviserMatcher";

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

export function LabuanAdviser({ visitor }: { visitor: Visitor }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      text:
        `Welcome ${visitor.fullName.split(" ")[0] || ""}. You can ask broad or detailed questions about Malaysia — living costs, Kuala Lumpur property, food, healthcare, transport, weather, seasons, travel, destinations and international connections — as well as the PF EuroAsia Labuan company and residency pathway. I will first identify the subject of your question and only search the relevant part of the knowledge base. If I cannot give you a sufficiently verified answer, I can register the question for our team to check and send the answer to ${visitor.email}.`,
      source: "PF EuroAsia Malaysia & Labuan controlled knowledge base — updated August 2026",
      followUps: adviserSuggestions.slice(0, 3),
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
      // Audit logging must never interrupt the visitor's adviser experience.
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
      const match = findMalaysiaAdviserAnswer(clean);
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
                ? `I do not have a sufficiently verified answer to that question in the relevant Malaysia knowledge section yet. Rather than give you an unrelated answer, I have registered your exact question for our team to check. We will send the answer to ${visitor.email} once it has been verified.`
                : "I do not have a sufficiently verified answer to that question yet, and I could not register the email follow-up automatically. Please use the enquiry link below so our Malaysia desk can confirm it for you.",
              source: saved
                ? "Question registered in the PF EuroAsia Malaysia Adviser follow-up queue"
                : "No sufficiently strong topic-specific knowledge-base match",
              needsConfirmation: !saved,
              followUps: [
                "What is the best time of year to visit Malaysia?",
                "What is the weather like in Kuala Lumpur through the year?",
                "What is the cost of living in Kuala Lumpur?",
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
            <div className={styles.thinking} aria-label="Checking the relevant knowledge section">
              <span /><span /><span />
            </div>
          </article>
        ) : null}
      </div>

      {!hasConversation ? (
        <div className={styles.quickQuestions}>
          {adviserSuggestions.map((suggestion) => (
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
            placeholder="e.g. What is the best time of year to visit Malaysia?"
            autoComplete="off"
          />
          <button type="submit" disabled={!input.trim() || isThinking} aria-label="Send question">
            Ask <span>→</span>
          </button>
        </div>
      </form>

      <div className={styles.footerNote}>
        <p>
          General information only. Weather, property prices, rents, travel schedules and costs can change. This adviser does not provide personal legal, tax, medical or immigration advice and does not guarantee approval. Questions requiring confirmation can be registered for email follow-up.
        </p>
        <Link href="/asia-gateway/enquire">Request a private assessment →</Link>
      </div>
    </div>
  );
}
