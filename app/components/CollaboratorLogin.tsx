"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function CollaboratorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [challenge, setChallenge] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/collaborators/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The login code could not be sent.");

      setChallenge(result.challenge);
      setPartnerName(result.partnerName);
      setMaskedEmail(result.maskedEmail);
      setMessage("Verification code sent. Check your email inbox and spam folder.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The login code could not be sent.");
    } finally {
      setSubmitting(false);
    }
  }

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/collaborators/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge, code }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The login code could not be verified.");

      router.push("/collaborators/dashboard");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The login code could not be verified.");
      setSubmitting(false);
    }
  }

  if (challenge) {
    return (
      <form className="collaborator-login-form" onSubmit={verifyCode}>
        <div className="collaborator-login-confirmation">
          <strong>{partnerName}</strong>
          <p>Enter the six-digit code sent to {maskedEmail}. It expires after 10 minutes.</p>
        </div>
        <label>
          <span>Verification code</span>
          <input
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="000000"
            required
          />
        </label>
        {message && <p className="collaborator-form-message" role="status">{message}</p>}
        <button className="button button-gold" type="submit" disabled={submitting || code.length !== 6}>
          {submitting ? "Verifying…" : "Enter Collaborator Portal"}
        </button>
        <button
          className="collaborator-reset-button"
          type="button"
          onClick={() => {
            setChallenge("");
            setCode("");
            setMessage("");
          }}
        >
          Use a different email address
        </button>
      </form>
    );
  }

  return (
    <form className="collaborator-login-form" onSubmit={requestCode}>
      <label>
        <span>Approved collaborator email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          placeholder="name@company.com"
          required
        />
      </label>
      {message && <p className="collaborator-form-message" role="status">{message}</p>}
      <button className="button button-gold" type="submit" disabled={submitting}>
        {submitting ? "Sending code…" : "Send Secure Login Code"}
      </button>
    </form>
  );
}
