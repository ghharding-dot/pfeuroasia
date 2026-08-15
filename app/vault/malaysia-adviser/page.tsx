import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createVaultToken, getVaultPassword, VAULT_COOKIE_NAME } from "../../lib/vaultAuth";
import { readMalaysiaAdviserLeads } from "../../lib/malaysiaAdviserLeadStore";
import "../vault.css";
import "../client-access.css";

export const metadata: Metadata = {
  title: "Malaysia Adviser Register | PF EuroAsia Vault",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatDate(value?: string) {
  if (!value) return "Never";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatTopic(value?: string) {
  if (!value) return "Unclassified";
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function MalaysiaAdviserRegisterPage() {
  const configuredPassword = getVaultPassword();
  const cookieStore = await cookies();
  const token = cookieStore.get(VAULT_COOKIE_NAME)?.value;

  if (!configuredPassword || token !== createVaultToken(configuredPassword)) {
    redirect("/vault");
  }

  const leads = await readMalaysiaAdviserLeads().catch((error) => {
    console.error("malaysia-adviser-register-unavailable", error);
    return [];
  });

  const ordered = [...leads].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
  const allQuestions = ordered.flatMap((lead) => lead.questions || []);
  const pendingQuestions = allQuestions.filter((question) => question.status === "pending").length;
  const totalQuestions = allQuestions.length;
  const hybridAnswers = allQuestions.filter((question) => question.answerMode === "hybrid-ai").length;
  const controlledAnswers = allQuestions.filter((question) => question.answerMode === "controlled").length;
  const legacyAnswers = allQuestions.filter(
    (question) => question.status === "answered" && !question.answerMode,
  ).length;
  const totalAccesses = ordered.reduce((sum, lead) => sum + (lead.accessCount || 0), 0);

  const topicCounts = new Map<string, number>();
  for (const question of allQuestions) {
    const topic = question.topic || (question.status === "pending" ? "pending / unclassified" : "legacy / unclassified");
    topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
  }
  const topTopics = [...topicCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <main className="vault-dashboard-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header">
          <div>
            <p className="vault-kicker">PF EuroAsia · Ask EuroAsia</p>
            <h1>Malaysia Adviser Register</h1>
            <p>
              Real visitor questions, hybrid and controlled answers, source history and the recurring topics that show what prospective clients actually want clarified.
            </p>
          </div>
          <Link className="vault-primary-button" href="/vault/dashboard">Back to The Vault</Link>
        </header>

        <section className="vault-stats vault-stats-access" aria-label="Malaysia adviser summary">
          <article className="vault-stat"><strong>{ordered.length}</strong><span>Registered adviser users</span></article>
          <article className="vault-stat"><strong>{totalQuestions}</strong><span>Questions recorded</span></article>
          <article className="vault-stat vault-stat-attention"><strong>{pendingQuestions}</strong><span>Questions awaiting verification</span></article>
          <article className="vault-stat"><strong>{hybridAnswers}</strong><span>Hybrid AI answers</span></article>
        </section>

        <section className="vault-panel vault-client-panel">
          <div className="vault-panel-header vault-client-panel-header">
            <div>
              <h2>What people are asking about</h2>
              <p>
                Topic counts are captured automatically on new hybrid/controlled answers. Use recurring questions and unanswered items as the editorial backlog for stronger verified content.
              </p>
            </div>
          </div>
          <div className="vault-client-detail-grid">
            {topTopics.length ? topTopics.map(([topic, count]) => (
              <div className="vault-client-detail-full" key={topic}>
                <span>Question topic</span>
                <strong>{formatTopic(topic)}</strong>
                <p>{count} recorded question{count === 1 ? "" : "s"}</p>
              </div>
            )) : (
              <div className="vault-empty">Topic analysis will appear as visitors ask the upgraded adviser questions.</div>
            )}
          </div>
          <p>
            Response mix: {hybridAnswers} hybrid AI · {controlledAnswers} controlled · {legacyAnswers} earlier logged answer{legacyAnswers === 1 ? "" : "s"} · {totalAccesses} total adviser access{totalAccesses === 1 ? "" : "es"}.
          </p>
        </section>

        <section className="vault-panel vault-client-panel">
          <div className="vault-panel-header vault-client-panel-header">
            <div>
              <h2>Malaysia Adviser Leads & Q&A</h2>
              <p>
                Name and email are captured before access. Each new answer records the exact visitor question, answer, source, response mode, topic and timestamp. Questions without enough verified support remain in the human follow-up queue.
              </p>
            </div>
          </div>

          {ordered.length === 0 ? (
            <div className="vault-empty">No Malaysia Adviser registrations have been received yet.</div>
          ) : (
            <div className="vault-client-list">
              {ordered.map((lead) => {
                const pending = (lead.questions || []).filter((question) => question.status === "pending");
                return (
                  <article className="vault-client-row" key={lead.id}>
                    <div className="vault-client-main">
                      <span className={`vault-client-status ${pending.length ? "vault-client-status-pending" : "vault-client-status-approved"}`}>
                        {pending.length ? `${pending.length} follow-up${pending.length === 1 ? "" : "s"}` : "Registered"}
                      </span>
                      <div>
                        <h3>{lead.fullName}</h3>
                        <p><a href={`mailto:${lead.email}`}>{lead.email}</a></p>
                        <small>{lead.source} · {lead.accessCount || 1} access{(lead.accessCount || 1) === 1 ? "" : "es"} · {(lead.questions || []).length} recorded question{(lead.questions || []).length === 1 ? "" : "s"}</small>
                      </div>
                    </div>
                    <div className="vault-client-dates">
                      <span>First access <strong>{formatDate(lead.createdAt)}</strong></span>
                      <span>Latest activity <strong>{formatDate(lead.updatedAt)}</strong></span>
                    </div>

                    {(lead.questions || []).length > 0 ? (
                      <details className="vault-client-details" open={pending.length > 0}>
                        <summary>Review adviser Q&A history</summary>
                        <div className="vault-client-detail-grid">
                          {[...(lead.questions || [])].reverse().map((question) => (
                            <div className="vault-client-detail-full" key={question.id}>
                              <span>
                                {question.status === "pending" ? "Awaiting answer" : "Answered"} · {formatDate(question.askedAt)}
                                {question.answerMode ? ` · ${question.answerMode === "hybrid-ai" ? "Hybrid AI" : "Controlled"}` : ""}
                                {question.topic ? ` · ${formatTopic(question.topic)}` : ""}
                              </span>
                              <strong>{question.question}</strong>
                              {question.answer ? <p>{question.answer}</p> : null}
                              {question.source ? <small>Answer source: {question.source}</small> : null}
                              {question.knowledgeIds?.length ? (
                                <small>Grounded in {question.knowledgeIds.length} approved knowledge item{question.knowledgeIds.length === 1 ? "" : "s"}{question.model ? ` · ${question.model}` : ""}</small>
                              ) : null}
                              {question.status === "pending" ? (
                                <a href={`mailto:${lead.email}?subject=${encodeURIComponent("Your PF EuroAsia Malaysia Adviser question")}&body=${encodeURIComponent(`Dear ${lead.fullName},\n\nThank you for your question to the PF EuroAsia Malaysia Adviser:\n\n${question.question}\n\n`)}`}>
                                  Reply by email →
                                </a>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </details>
                    ) : null}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
