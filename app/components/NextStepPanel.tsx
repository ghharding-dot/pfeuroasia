"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { trackEvent } from "../lib/analytics";
import { submitEnquiry } from "../lib/submitEnquiry";
import styles from "./NextStepPanel.module.css";

type Topic = "rental" | "asia";

export function NextStepPanel({ topic }: { topic: Topic }) {
  const asia = topic === "asia";
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const started = useRef(false);
  const submitting = useRef(false);
  const context = asia ? "malaysia_residency_options" : "luxury_villa_rentals";
  const whatsapp = `https://wa.me/34647026881?text=${encodeURIComponent(asia
    ? "Hello Geoff, I’m exploring a move to Malaysia. Could we discuss the options for my situation?"
    : "Hello Geoff, please help me find a Marbella rental villa. My dates are: __. Guests: __. Approximate weekly budget: __.")}`;

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setSending(true); setError("");
    const form = new FormData(event.currentTarget);
    try {
      const result = await submitEnquiry({
        enquiry_type: "asia-residency-company", full_name: form.get("name"), email: form.get("email"),
        requirements: `Malaysia residency — purpose: ${form.get("purpose")}. ${form.get("requirements") || "Please contact me to discuss my plans."}`,
        contact_desk: "Malaysia residency guide", preferred_channel: "Email", language: "en",
        website_region: "Malaysia", website_journey: "asia", company_website: form.get("company_website"),
      });
      trackEvent("enquiry_submitted", { source: context, enquiry_type: "asia-residency-company", form_variant: "short" });
      setReference(result.reference);
    } catch {
      trackEvent("enquiry_failed", { source: context });
      setError("Your message could not be sent. Please try again, use WhatsApp or email enquiry@pfeuroasia.com.");
    } finally { submitting.current = false; setSending(false); }
  }

  return <section className={styles.section} id={asia ? "malaysia-enquiry" : "rental-next-step"} aria-labelledby={`${topic}-next-step-title`}>
    <div className={`site-shell ${styles.grid}`}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Your next step · Personal service</p>
        <h2 id={`${topic}-next-step-title`}>{asia ? "Which Malaysia route could fit you?" : "Tell us your dates. We’ll find the villas."}</h2>
        <p>{asia ? "Tell us what you have in mind. Geoff and the EuroAsia team will help arrange the right first conversation with our Malaysian specialists." : "Choose from more than 100 luxury villas across Marbella and the Costa del Sol. Share your dates, guests and budget for a personal shortlist, subject to availability."}</p>
        <div className={styles.actions}>
          {!asia && <a className={styles.primary} href="#villa-enquiry" onClick={() => trackEvent("enquiry_cta_clicked", { source: context, placement: "intro" })}>Send my rental requirements →</a>}
          <a className={styles.secondary} href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("whatsapp_clicked", { source: context, placement: "intro" })}>WhatsApp Geoff ↗</a>
          <button className={styles.secondary} type="button" onClick={() => window.dispatchEvent(new CustomEvent("pfe:open-maya", { detail: { journey: topic, source: context } }))}>Ask Maya about {asia ? "Malaysia" : "rentals"} →</button>
        </div>
        <small>{asia ? "An initial conversation, with no obligation to proceed. Specialist advice and applications are arranged separately." : "No booking commitment. Not sure of the details yet? Send what you know or speak with us on WhatsApp."}</small>
      </div>
      {asia && <div className={styles.formCard}>
        {reference ? <div role="status"><h3>Your message has been sent.</h3><p>Reference: {reference}</p><p>Our team will follow up by email about your Malaysia plans.</p></div> : <form onSubmit={send} onFocusCapture={() => { if (!started.current) { started.current = true; trackEvent("enquiry_started", { source: context, form_variant: "short" }); } }}>
          <h3>Start a personal conversation</h3>
          <label>Your name<input name="name" autoComplete="name" required maxLength={160} /></label>
          <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={320} /></label>
          <label>What brings you to Malaysia?<select name="purpose" defaultValue="Still exploring"><option>Still exploring</option><option>Retirement or family relocation</option><option>Remote work</option><option>Business or company setup</option><option>Employment</option><option>Property investment</option></select></label>
          <label>Your question or plans (optional)<textarea name="requirements" rows={3} maxLength={4000} placeholder="For example: moving from the UK with my family next year…" /></label>
          <div className={styles.trap} aria-hidden="true"><input name="company_website" tabIndex={-1} autoComplete="off" /></div>
          <label className={styles.consent}><input type="checkbox" required /><span>I agree to be contacted about this enquiry. Relevant specialists may receive my details. <Link href="/privacy">Privacy notice</Link>.</span></label>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button className={styles.primary} type="submit" disabled={sending}>{sending ? "Sending…" : "Discuss my Malaysia plans →"}</button>
        </form>}
      </div>}
    </div>
  </section>;
}
