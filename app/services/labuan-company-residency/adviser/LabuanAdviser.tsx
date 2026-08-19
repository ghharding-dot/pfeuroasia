"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { MessageResponse } from "@/components/ai-elements/message";
import styles from "./LabuanAdviser.module.css";
import { adviserSuggestions } from "./MalaysiaAdviserMatcher";

type Visitor = {
  fullName: string;
  email: string;
};

type AdviserSource = {
  label: string;
  url?: string;
};

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  source?: string;
  sources?: AdviserSource[];
  mode?: "controlled" | "hybrid-ai";
  topic?: string;
  needsConfirmation?: boolean;
  followUps?: string[];
};

type HybridResponse = {
  ok?: boolean;
  noAnswer?: boolean;
  mode?: "controlled" | "hybrid-ai";
  topic?: string;
  answer?: string;
  source?: string;
  sources?: AdviserSource[];
  followUps?: string[];
  reason?: string;
  error?: string;
};

export function LabuanAdviser({ visitor }: { visitor: Visitor }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      text:
        `Welcome ${visitor.fullName.split(" ")[0] || ""}. Ask me naturally about Malaysia — where to go, what to do, travel seasons, Kuala Lumpur, food, living costs, property, healthcare, transport and lifestyle — or about Malaysia tax residency and the PF EuroAsia Labuan company and residency pathway. For general Malaysia questions I can combine relevant facts from our verified knowledge into a more useful answer. Company, personal tax, residency and immigration questions use controlled answers from our verified knowledge. If I do not have enough information, I will register the question for our team rather than guess.`,
      source: "PF EuroAsia verified Malaysia & Labuan knowledge base — updated August 2026",
      mode: "controlled",
      followUps: adviserSuggestions.slice(0, 3),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const nextId = useRef(2);
  const messagesPanelRef = useRef<HTMLDivElement | null>(null);
  const latestAssistantRef = useRef<HTMLElement | null>(null);

  const hasConversation = useMemo(() => messages.length > 1, [messages.length]);

  useEffect(() => {
    if (messages.length <= 1) return;

    const latestMessage = messages[messages.length - 1];
    const frame = window.requestAnimationFrame(() => {
      const panel = messagesPanelRef.current;
      if (!panel) return;

      if (latestMessage.role === "assistant" && !isThinking && latestAssistantRef.current) {
        const panelRect = panel.getBoundingClientRect();
        const answerRect = latestAssistantRef.current.getBoundingClientRect();
        const answerTop = panel.scrollTop + answerRect.top - panelRect.top - 12;

        panel.scrollTo({
          top: Math.max(0, answerTop),
          behavior: "smooth",
        });

        panel.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      } else {
        panel.scrollTo({
          top: panel.scrollHeight,
          behavior: "smooth",
        });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [messages, isThinking]);

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

  async function ask(question: string) {
    const clean = question.trim();
    if (!clean || isThinking) return;

    const conversationHistory = messages
      .filter((message) => message.id !== 1)
      .slice(-8)
      .map((message) => ({ role: message.role, text: message.text }));

    const userId = nextId.current++;
    setMessages((current) => [...current, { id: userId, role: "user", text: clean }]);
    setInput("");
    setIsThinking(true);

    const assistantId = nextId.current++;

    try {
      const response = await fetch("/api/malaysia-adviser-hybrid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: visitor.fullName,
          email: visitor.email,
          question: clean,
          history: conversationHistory,
          company_website: "",
        }),
      });

      const result = (await response.json().catch(() => ({}))) as HybridResponse;

      if (response.ok && result.answer && !result.noAnswer) {
        setMessages((current) => [
          ...current,
          {
            id: assistantId,
            role: "assistant",
            text: result.answer || "",
            source: result.source,
            sources: result.sources,
            mode: result.mode,
            topic: result.topic,
            followUps: result.followUps,
          },
        ]);
        return;
      }

      const saved = await registerFollowUp(clean);
      setMessages((current) => [
        ...current,
        {
          id: assistantId,
          role: "assistant",
          text: saved
            ? `I do not yet have enough verified information to answer that confidently. I have registered your exact question for the PF EuroAsia team to review, and the confirmed answer can be sent to ${visitor.email}.`
            : "I do not yet have enough verified information to answer that confidently, and I could not register the email follow-up automatically. Please use the enquiry link below and our Malaysia desk will confirm it for you.",
          source: saved
            ? "Question registered in the PF EuroAsia Malaysia Adviser follow-up queue"
            : "No sufficiently verified answer available",
          topic: result.topic,
          needsConfirmation: !saved,
          followUps: [
            "What should I do in Kuala Lumpur?",
            "Where should I go in Malaysia for beaches?",
            "What is the cost of living in Kuala Lumpur?",
          ],
        },
      ]);
    } catch {
      const saved = await registerFollowUp(clean);
      setMessages((current) => [
        ...current,
        {
          id: assistantId,
          role: "assistant",
          text: saved
            ? `The adviser could not complete that answer safely, so I have registered your exact question for our team to check. The confirmed answer can be sent to ${visitor.email}.`
            : "The adviser is temporarily unable to complete that answer. Please use the enquiry link below so our Malaysia desk can help directly.",
          source: saved
            ? "Question registered in the PF EuroAsia Malaysia Adviser follow-up queue"
            : "Hybrid adviser unavailable",
          needsConfirmation: !saved,
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  const latestMessageId = messages[messages.length - 1]?.id;

  return (
    <div className={styles.adviser}>
      <div className={styles.topBar}>
        <div>
          <span className={styles.statusDot} />
          <span>Hybrid Malaysia adviser · verified knowledge + AI synthesis</span>
        </div>
        <span>Updated August 2026</span>
      </div>

      <div ref={messagesPanelRef} className={styles.messages} aria-live="polite">
        {messages.map((message) => (
          <article
            key={message.id}
            ref={message.role === "assistant" && message.id === latestMessageId ? latestAssistantRef : undefined}
            className={`${styles.message} ${message.role === "user" ? styles.userMessage : styles.assistantMessage}`}
          >
            <div className={styles.messageLabel}>
              {message.role === "user" ? "You" : "Ask EuroAsia"}
              {message.role === "assistant" && message.mode ? (
                <span className={styles.answerMode}>
                  {message.mode === "hybrid-ai" ? "AI · verified sources" : "Controlled answer"}
                </span>
              ) : null}
            </div>

            {message.role === "assistant" ? (
              <MessageResponse className={styles.aiMarkdown}>{message.text}</MessageResponse>
            ) : (
              <p>{message.text}</p>
            )}

            {message.sources?.length ? (
              <div className={styles.sources} aria-label="Verified answer sources">
                <span>Verified sources</span>
                {message.sources.map((source) =>
                  source.url ? (
                    <a key={`${source.label}-${source.url}`} href={source.url} target="_blank" rel="noreferrer">
                      {source.label} <b>↗</b>
                    </a>
                  ) : (
                    <small key={source.label}>{source.label}</small>
                  ),
                )}
              </div>
            ) : message.source ? (
              <small>Source: {message.source}</small>
            ) : null}

            {message.needsConfirmation ? (
              <Link className={styles.confirmLink} href="/asia-gateway/enquire">
                Ask us to confirm this <span>→</span>
              </Link>
            ) : null}
            {message.role === "assistant" && message.followUps?.length ? (
              <div className={styles.followUps}>
                {message.followUps.map((followUp) => (
                  <button key={followUp} type="button" onClick={() => void ask(followUp)} disabled={isThinking}>
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
            <div className={styles.thinking} aria-label="Retrieving verified knowledge and preparing the answer">
              <span /><span /><span />
            </div>
          </article>
        ) : null}
      </div>

      {!hasConversation ? (
        <div className={styles.quickQuestions}>
          {adviserSuggestions.map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => void ask(suggestion)}>
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
            placeholder="e.g. We have 10 days in Malaysia — KL, good food and beaches. What would you suggest?"
            autoComplete="off"
          />
          <button type="submit" disabled={!input.trim() || isThinking} aria-label="Send question">
            Ask <span>→</span>
          </button>
        </div>
      </form>

      <div className={styles.footerNote}>
        <p>
          General information only. Hybrid answers are composed from PF EuroAsia&apos;s verified knowledge sources. Company, tax, residency and immigration answers remain controlled and questions without sufficient verified support are sent for human follow-up. Weather, property, travel and cost information can change.
        </p>
        <Link href="/asia-gateway/enquire">Request a private assessment →</Link>
      </div>
    </div>
  );
}
