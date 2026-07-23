"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function PrivatePortfolioLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />
      </label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-dark" type="submit" disabled={submitting}>
        {submitting ? "Checking…" : "Enter private collection"} <span>→</span>
      </button>
    </form>
  );
}
