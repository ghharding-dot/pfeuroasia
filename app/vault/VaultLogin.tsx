"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function VaultLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      router.push("/vault/dashboard");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Access denied.");
    } finally {
      setLoading(false);
    }
  }

  return (
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
      {error && <p className="vault-error">{error}</p>}
      <button type="submit" disabled={loading}>{loading ? "Opening..." : "Enter Vault"}</button>
    </form>
  );
}
