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
  const pendingQuestions = ordered.reduce(
    (total, lead) => total + (lead.questions || []).filter((question) => question.status === "pending").length,
    0,
  );

  return (
    <main className="vault-dashboard-page">
      <div className="vault-dashboard-shell">
        <header className="vault-dashboard-header">
          <div>
            <p className="vault-kicker">PF EuroAsia · Ask EuroAsia</p>
            <h1>Malaysia Adviser Register</h1>
            <p>Registered adviser users and questions requiring human or specialist follow-up.</p>
          </div>
          <Link className="vault-primary-button" href="/vault/dashboard">Back to The Vault</Link>
        </header>

        <section className="vault-stats vault-stats-access" aria-label="Malaysia adviser summary">
          <article className="vault-stat"><strong>{ordered.length}</strong><span>Registered adviser users</span></article>
          <article className="vault-stat vault-stat-attention"><strong>{pendingQuestions}</strong><span>Questions awaiting answer</span></article>
          <article className="vault-stat"><strong>{ordered.reduce((sum, lead) => sum + (lead.accessCount || 0), 0)}</strong><span>Total adviser accesses</span></article>
        </section>

        <section className="vault-panel vault-client-panel">
          <div className="vault-panel-header vault-client-panel-header">
            <div>
              <h2>Malaysia Adviser Leads</h2>
              <p>Name and email are captured before access. Unanswered questions are attached to the same visitor record.</p>
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
                        <small>{lead.source} · {lead.accessCount || 1} access{(lead.accessCount || 1) === 1 ? "" : "es"}</small>
                      </div>
                    </div>
                    <div className="vault-client-dates">
                      <span>First access <strong>{formatDate(lead.createdAt)}</strong></span>
                      <span>Latest activity <strong>{formatDate(lead.updatedAt)}</strong></span>
                    </div>

                    {(lead.questions || []).length > 0 ? (
                      <details className="vault-client-details" open={pending.length > 0}>
                        <summary>Review adviser questions</summary>
                        <div className="vault-client-detail-grid">
                          {[...(lead.questions || [])].reverse().map((question) => (
                            <div className="vault-client-detail-full" key={question.id}>
                              <span>{question.status === "pending" ? "Awaiting answer" : "Answered"} · {formatDate(question.askedAt)}</span>
                              <strong>{question.question}</strong>
                              {question.answer ? <p>{question.answer}</p> : null}
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
