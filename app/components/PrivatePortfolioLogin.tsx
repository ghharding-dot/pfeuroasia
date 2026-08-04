"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 10V7a5 5 0 0 1 10 0v3" />
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M12 14v2" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

type PrivatePortfolioLoginProps = {
  theme?: "dark" | "light";
  showRegistrationLink?: boolean;
};

export function PrivatePortfolioLogin({
  theme = "dark",
  showRegistrationLink = false,
}: PrivatePortfolioLoginProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [challenge, setChallenge] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const awaitingCode = Boolean(challenge);

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/private-portfolio/access/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok || !result.challenge) {
        throw new Error(result.error || "The access code could not be sent.");
      }
      setChallenge(result.challenge);
      setMaskedEmail(result.maskedEmail || email);
      setCode("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The access code could not be sent.");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/private-portfolio/access/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge, code }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "The access code could not be verified.");
      }
      router.push("/private-portfolio/collection");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The access code could not be verified.");
    } finally {
      setSubmitting(false);
    }
  }

  function changeEmail() {
    setChallenge("");
    setMaskedEmail("");
    setCode("");
    setError("");
  }

  return (
    <div className={`portfolio-login-wrap portfolio-login-${theme}`}>
      {!awaitingCode ? (
        <form className="portfolio-login-form" onSubmit={submitEmail}>
          <label>
            <span>Approved email address</span>
            <div className="portfolio-password-field">
              <span className="portfolio-lock"><MailIcon /></span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                inputMode="email"
                placeholder="Enter your approved email"
                required
              />
              <span className="portfolio-field-end" aria-hidden="true" />
            </div>
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-gold portfolio-access-button" type="submit" disabled={submitting}>
            <span className="portfolio-button-lock"><LockIcon /></span>
            <span>{submitting ? "Sending code…" : "Send secure access code"}</span>
            <span className="portfolio-button-arrow" aria-hidden="true">→</span>
          </button>
        </form>
      ) : (
        <form className="portfolio-login-form" onSubmit={submitCode}>
          <div className="portfolio-code-sent">
            <strong>Code sent</strong>
            <p>Enter the six-digit code sent to {maskedEmail}. It expires in 10 minutes.</p>
          </div>
          <label>
            <span>Six-digit access code</span>
            <div className="portfolio-password-field">
              <span className="portfolio-lock"><LockIcon /></span>
              <input
                className="portfolio-code-input"
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                autoComplete="one-time-code"
                inputMode="numeric"
                pattern="[0-9]{6}"
                placeholder="000000"
                required
              />
              <span className="portfolio-field-end" aria-hidden="true" />
            </div>
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-gold portfolio-access-button" type="submit" disabled={submitting || code.length !== 6}>
            <span className="portfolio-button-lock"><LockIcon /></span>
            <span>{submitting ? "Verifying…" : "Enter Private Collection"}</span>
            <span className="portfolio-button-arrow" aria-hidden="true">→</span>
          </button>
          <button className="portfolio-change-email" type="button" onClick={changeEmail} disabled={submitting}>
            Use a different email address
          </button>
        </form>
      )}

      {showRegistrationLink && (
        <p className="portfolio-registration-link">
          Not yet registered? <Link href="/private-portfolio">Request private access</Link>
        </p>
      )}
    </div>
  );
}
