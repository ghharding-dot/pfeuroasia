"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { LabuanAdviser } from "./LabuanAdviser";
import styles from "./LabuanAdviserAccess.module.css";

const SESSION_KEY = "pfe-labuan-adviser-access";

type AccessDetails = {
  fullName: string;
  email: string;
};

export function LabuanAdviserAccess() {
  const [details, setDetails] = useState<AccessDetails>({ fullName: "", email: "" });
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(SESSION_KEY);
      if (stored) setUnlocked(true);
    } catch {
      // Session storage is optional; the gate still works without it.
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const fullName = details.fullName.trim();
    const email = details.email.trim().toLowerCase();

    if (!fullName || !email || !email.includes("@")) {
      setError("Please enter your full name and a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/labuan-adviser-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email,
          source: "Malaysia & Labuan Q&A adviser",
          company_website: "",
        }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error || "We could not register your access details.");
      }

      try {
        window.sessionStorage.setItem(SESSION_KEY, "granted");
      } catch {
        // Access should not depend on browser storage being available.
      }

      setUnlocked(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We could not register your access details. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (unlocked) {
    return (
      <div className={styles.unlocked}>
        <div className={styles.accessBar}>
          <span>Malaysia & Labuan adviser access</span>
          <strong>{details.fullName || "Access granted"}</strong>
        </div>
        <LabuanAdviser />
      </div>
    );
  }

  return (
    <section className={styles.gate} aria-labelledby="adviser-access-title">
      <div className={styles.gateCopy}>
        <p className={styles.kicker}>Complimentary adviser access</p>
        <h2 id="adviser-access-title">Enter your details to continue.</h2>
        <p>
          Access the PF EuroAsia Malaysia & Labuan knowledge adviser for practical questions about company formation, residency, tax framework, costs and process.
        </p>
        <ul>
          <li>Controlled Malaysia & Labuan information</li>
          <li>Current PF EuroAsia package and process guidance</li>
          <li>Unverified figures are clearly flagged for confirmation</li>
        </ul>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <span>Full name</span>
          <input
            type="text"
            name="full_name"
            autoComplete="name"
            required
            value={details.fullName}
            onChange={(event) => setDetails((current) => ({ ...current, fullName: event.target.value }))}
            placeholder="Your full name"
          />
        </label>

        <label>
          <span>Email address</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={details.email}
            onChange={(event) => setDetails((current) => ({ ...current, email: event.target.value }))}
            placeholder="you@example.com"
          />
        </label>

        <input className={styles.honeypot} type="text" name="company_website" tabIndex={-1} autoComplete="off" />

        {error ? <p className={styles.error} role="alert">{error}</p> : null}

        <button className="button button-dark" type="submit" disabled={submitting}>
          {submitting ? "Opening adviser…" : "Access Malaysia & Labuan adviser"} <span>→</span>
        </button>

        <p className={styles.privacy}>
          By continuing, you agree that PF EuroAsia may use these details to provide this information service and follow up about your Malaysia/Labuan enquiry. See our <Link href="/privacy">privacy notice</Link>.
        </p>
      </form>
    </section>
  );
}
