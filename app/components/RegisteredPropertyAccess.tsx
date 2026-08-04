"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function RegisteredPropertyAccess({
  propertyId,
  propertyTitle,
  propertyLocation,
}: {
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
}) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [code, setCode] = useState("");
  const [challenge, setChallenge] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  const awaitingCode = Boolean(challenge);

  async function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWorking(true);
    setError("");

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/registered-properties/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId,
          fullName,
          email,
          telephone,
          companyWebsite: String(form.get("companyWebsite") || ""),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.challenge) {
        throw new Error(result.error || "The verification code could not be sent.");
      }
      setChallenge(result.challenge);
      setMaskedEmail(result.maskedEmail || email);
      setCode("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The verification code could not be sent.");
    } finally {
      setWorking(false);
    }
  }

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWorking(true);
    setError("");

    try {
      const response = await fetch("/api/registered-properties/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge, code }),
      });
      const result = await response.json();
      if (!response.ok || !result.propertyPath) {
        throw new Error(result.error || "The verification code could not be confirmed.");
      }
      router.push(result.propertyPath);
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The verification code could not be confirmed.");
    } finally {
      setWorking(false);
    }
  }

  function changeDetails() {
    setChallenge("");
    setMaskedEmail("");
    setCode("");
    setError("");
  }

  return (
    <div className="registered-access-layout">
      <aside className="registered-access-summary">
        <p className="eyebrow light">Registered listing</p>
        <h1>{propertyTitle}</h1>
        <p className="registered-access-location">{propertyLocation}</p>
        <p>
          This is a selected market listing rather than a private off-market introduction. Register your contact details once and verify your email to view the full particulars.
        </p>
        <div className="registered-access-points">
          <span>No manual approval required</span>
          <span>Six-digit email verification</span>
          <span>Access remains active for 30 days</span>
        </div>
      </aside>

      <section className="registered-access-card">
        {!awaitingCode ? (
          <form onSubmit={requestCode}>
            <label className="registered-access-honeypot" aria-hidden="true">
              Company website
              <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
            </label>
            <p className="eyebrow">View full details</p>
            <h2>Confirm your contact information.</h2>
            <p className="registered-access-intro">
              Your details are recorded as a property enquiry. They do not grant access to the separate Private Off-Market Collection.
            </p>

            <div className="registered-access-fields">
              <label>
                <span>Full name *</span>
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  autoComplete="name"
                  required
                />
              </label>
              <label>
                <span>Email address *</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  inputMode="email"
                  required
                />
              </label>
              <label>
                <span>Telephone / WhatsApp *</span>
                <input
                  type="tel"
                  value={telephone}
                  onChange={(event) => setTelephone(event.target.value)}
                  autoComplete="tel"
                  placeholder="Include country code"
                  required
                />
              </label>
            </div>

            <label className="registered-access-consent">
              <input type="checkbox" required />
              <span>
                I agree to be contacted regarding this property and understand that my verified details will be recorded by Property Facilitators EuroAsia. <Link href="/privacy">Privacy notice</Link>.
              </span>
            </label>

            {error && <p className="form-error" role="alert">{error}</p>}

            <button className="button button-gold registered-access-button" type="submit" disabled={working}>
              {working ? "Sending code…" : "Send verification code"} <span>→</span>
            </button>
          </form>
        ) : (
          <form onSubmit={verifyCode}>
            <p className="eyebrow">Email verification</p>
            <h2>Enter your six-digit code.</h2>
            <p className="registered-access-intro">
              We sent the code to <strong>{maskedEmail}</strong>. It expires in 10 minutes.
            </p>

            <label className="registered-code-field">
              <span>Verification code</span>
              <input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                placeholder="000000"
                required
              />
            </label>

            {error && <p className="form-error" role="alert">{error}</p>}

            <button
              className="button button-gold registered-access-button"
              type="submit"
              disabled={working || code.length !== 6}
            >
              {working ? "Verifying…" : "View full property details"} <span>→</span>
            </button>
            <button className="registered-access-change" type="button" onClick={changeDetails} disabled={working}>
              Change contact details
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
