"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function VaultLogin({ nextPath = "/vault/dashboard" }: { nextPath?: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("enquiry@pfeuroasia.com");
  const [challenge, setChallenge] = useState("");
  const [code, setCode] = useState("");

  async function requestCode() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/vault/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The code could not be sent.");
      setChallenge(result.challenge);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The code could not be sent.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/vault/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge, code }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Access denied.");
      router.push(nextPath);
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Access denied.");
    } finally {
      setLoading(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/vault/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Access denied.");
      router.push(nextPath);
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Access denied.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="vault-login-options">
      <div className="vault-login-form vault-email-login">
        <label>
          <span>PF EuroAsia email</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
        </label>
        {!challenge ? (
          <button type="button" onClick={requestCode} disabled={loading}>{loading ? "Sending…" : "Email Me a Code"}</button>
        ) : (
          <>
            <label><span>Six-digit code</span><input inputMode="numeric" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} autoComplete="one-time-code" autoFocus /></label>
            <button type="button" onClick={verifyCode} disabled={loading || code.length !== 6}>{loading ? "Checking…" : "Enter Administration"}</button>
          </>
        )}
      </div>
      <div className="vault-login-divider"><span>or use the existing password</span></div>
      <form className="vault-login-form" onSubmit={submit}>
      <label>
        <span>Vault password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          autoFocus
        />
      </label>
      <button type="submit" disabled={loading}>{loading ? "Opening..." : "Enter Vault"}</button>
      </form>
      {error && <p className="vault-error">{error}</p>}
    </div>
  );
}
