"use client";

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

function EyeIcon({ crossed = false }: { crossed?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
      {crossed && <path d="m4 4 16 16" />}
    </svg>
  );
}

export function PrivatePortfolioLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/private-portfolio/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Access could not be verified.");
      router.push("/private-portfolio/collection");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Access could not be verified.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="portfolio-login-form" onSubmit={submit}>
      <label>
        <span>Private access password</span>
        <div className="portfolio-password-field">
          <span className="portfolio-lock"><LockIcon /></span>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            placeholder="Enter your password"
            required
          />
          <button
            className="portfolio-password-toggle"
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            <EyeIcon crossed={showPassword} />
          </button>
        </div>
      </label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-gold portfolio-access-button" type="submit" disabled={submitting}>
        <span className="portfolio-button-lock"><LockIcon /></span>
        <span>{submitting ? "Checking…" : "Access Private Portfolio"}</span>
        <span className="portfolio-button-arrow" aria-hidden="true">→</span>
      </button>
    </form>
  );
}
