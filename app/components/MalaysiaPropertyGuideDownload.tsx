"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import styles from "./MalaysiaPropertyGuideDownload.module.css";

export function MalaysiaPropertyGuideDownload() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function download(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true); setError(""); setSuccess(false);
    try {
      const form = new FormData(event.currentTarget);
      const response = await fetch("/api/malaysia-property-guide", {
        method: "POST", headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, consent, company_website: form.get("company_website")}),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Unable to prepare your guide. Please try again.");
      }
      if (!response.headers.get("Content-Type")?.includes("application/pdf")) throw new Error("The guide could not be downloaded. Please try again.");
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url; link.download = "PF-EuroAsia-Buying-Property-in-Malaysia.pdf";
      document.body.appendChild(link); link.click(); link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60000);
      setSuccess(true);
    } catch (err) { setError(err instanceof Error ? err.message : "Please try again."); }
    finally { setLoading(false); }
  }

  return (
    <section className={styles.section} id="malaysia-buying-guide" aria-labelledby={`${id}-heading`}>
      <div className={`site-shell ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Buying in Malaysia · Kuala Lumpur & beyond</p>
          <h2 id={`${id}-heading`}>How to buy property<br />in Malaysia.</h2>
          <p>Foreign buyers can purchase eligible Malaysian property, subject to approval and the rules for the specific location and title. Before reserving a home, understand what you can buy, the full costs and the checks your lawyer should carry out.</p>
          <ul><li>Foreign-buyer eligibility, title and approval checks</li><li>Buying steps, finance and purchase costs</li><li>Kuala Lumpur viewing and ownership checklist</li></ul>
          <p className={styles.note}>Property ownership and permission to live in Malaysia are separate. Our guide explains the questions to settle before committing.</p>
          <Link className="text-link" href="/guides/buying-property-in-malaysia-as-a-foreigner#guide-overview">Read the buying overview <span>→</span></Link>
        </div>
        <div className={styles.panel}>
          <span className={styles.badge}>COMPLIMENTARY PDF · 3 PAGES</span>
          <h3>Your Malaysia<br />property buying guide</h3>
          <p>Register your email for an immediate download. Includes a practical checklist to keep for viewings and adviser conversations.</p>
          <form onSubmit={download} className={styles.form} aria-busy={loading}>
            <div className={styles.honeypot} aria-hidden="true"><label>Company website<input name="company_website" tabIndex={-1} autoComplete="off" /></label></div>
            <label htmlFor={`${id}-email`}>Email address</label>
            <input id={`${id}-email`} type="email" autoComplete="email" maxLength={254} required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
            <label className={styles.consent}>
              <input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} />
              <span>I agree that PF EuroAsia may store my email to provide this guide and contact me about my Malaysia property enquiry. See the <Link href="/privacy">privacy notice</Link>.</span>
            </label>
            {error && <p role="alert" className={styles.error}>{error}</p>}
            <button className="button button-gold" type="submit" disabled={loading}>{loading ? "Preparing your PDF…" : "Register & download the guide →"}</button>
            <p role="status" className={styles.status}>{success ? "Your guide is ready. Please check your browser downloads." : "No account or payment required."}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
