"use client";

import { FormEvent, useState } from "react";
import styles from "./properties.module.css";

export function PropertyUpdatesForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          enquiry_type: "property-collection-registration",
          preferred_area_or_property: "Spain property collection",
          indicative_budget_or_value: "To be discussed",
          requirements: "Please register me for new listings, important price changes and selected private property introductions.",
          full_name: form.get("name"),
          email: form.get("email"),
          contact_desk: "Spain desk",
          preferred_channel: "email",
          telephone_or_whatsapp: "",
          wechat_id: "",
          current_location: "",
          partner_slug: "",
          language: "en",
          website_region: "Property collection",
          website_journey: "spain",
          company_website: form.get("company_website"),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.reference) throw new Error();
      setSent(true);
      event.currentTarget.reset();
    } catch {
      setError("Registration could not be sent. Please try again or email enquiry@pfeuroasia.com.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className={styles.registrationSuccess} role="status">
        <strong>Registration received.</strong>
        <span>We will contact you when a relevant property opportunity is added.</span>
      </div>
    );
  }

  return (
    <form className={styles.registrationForm} onSubmit={submit}>
      <label className={styles.honeypot} aria-hidden="true">
        Company website
        <input name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
      <label>
        <span>Name</span>
        <input name="name" required autoComplete="name" placeholder="Your name" />
      </label>
      <label>
        <span>Email</span>
        <input name="email" required type="email" autoComplete="email" placeholder="Email address" />
      </label>
      <button type="submit" disabled={sending}>
        {sending ? "Registering…" : "Register for property updates"} <span>→</span>
      </button>
      {error ? <p className={styles.formError} role="alert">{error}</p> : null}
    </form>
  );
}
