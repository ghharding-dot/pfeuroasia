"use client";

import { FormEvent, useState } from "react";

type Step = "details" | "code" | "ready";

export function BrochureAccessButton({
  propertyReference,
  propertyTitle,
  partnerName,
  edition = "branded",
  label,
}: {
  propertyReference: string;
  propertyTitle: string;
  partnerName: string;
  edition?: "branded" | "partner";
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("details");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [challenge, setChallenge] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [code, setCode] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  function close() {
    setOpen(false);
    setError("");
  }

  async function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWorking(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      propertyReference,
      edition,
      fullName: String(form.get("fullName") || ""),
      email: String(form.get("email") || ""),
      telephone: String(form.get("telephone") || ""),
      consent: form.get("consent") === "on",
      companyWebsite: String(form.get("companyWebsite") || ""),
    };

    try {
      const response = await fetch("/api/private-portfolio/brochure/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The verification code could not be sent.");
      setChallenge(result.challenge);
      setMaskedEmail(result.maskedEmail);
      setStep("code");
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
      const response = await fetch("/api/private-portfolio/brochure/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge, code }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The code could not be verified.");

      setDownloadUrl(result.downloadUrl);
      setStep("ready");

      const link = document.createElement("a");
      link.href = result.downloadUrl;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The code could not be verified.");
    } finally {
      setWorking(false);
    }
  }

  return (
    <>
      <button className="text-link brochure-access-trigger" type="button" onClick={() => setOpen(true)}>
        {label || (edition === "partner" ? "Access unbranded partner brochure" : "Access branded property brochure")} <span>→</span>
      </button>

      {open && (
        <div className="brochure-modal-backdrop" role="presentation" onMouseDown={close}>
          <section
            className="brochure-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`brochure-title-${propertyReference}-${edition}`}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="brochure-modal-close" type="button" onClick={close} aria-label="Close">×</button>
            <p className="eyebrow">Verified document access</p>
            <h2 id={`brochure-title-${propertyReference}-${edition}`}>{propertyTitle}</h2>
            <p className="brochure-modal-reference">{propertyReference} · Listed with {partnerName}</p>

            {step === "details" && (
              <form className="brochure-verification-form" onSubmit={requestCode}>
                <p>
                  {edition === "partner"
                    ? "This unbranded copy is prepared for professional partner presentation. Confirm your identity before receiving a personalised, watermarked copy."
                    : "The branded brochure may contain the listing collaborator&apos;s direct details. Confirm your identity before receiving a personalised, watermarked copy."}
                </p>
                <label>
                  <span>Full name</span>
                  <input name="fullName" autoComplete="name" required />
                </label>
                <label>
                  <span>Email address</span>
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <label>
                  <span>Telephone / WhatsApp</span>
                  <input name="telephone" type="tel" autoComplete="tel" required />
                </label>
                <label className="brochure-honeypot" aria-hidden="true">
                  <span>Company website</span>
                  <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
                </label>
                <label className="brochure-consent">
                  <input name="consent" type="checkbox" required />
                  <span>
                    I consent to PF EuroAsia recording this document access and sharing my contact details and property interest with {partnerName}.
                  </span>
                </label>
                {error && <p className="brochure-form-error" role="alert">{error}</p>}
                <button className="button button-gold" type="submit" disabled={working}>
                  {working ? "Sending code…" : "Email verification code"}
                </button>
              </form>
            )}

            {step === "code" && (
              <form className="brochure-verification-form" onSubmit={verifyCode}>
                <p>
                  Enter the six-digit code sent to <strong>{maskedEmail}</strong>. It expires in 10 minutes.
                </p>
                <label>
                  <span>Verification code</span>
                  <input
                    className="brochure-code-input"
                    value={code}
                    onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]{6}"
                    required
                    autoFocus
                  />
                </label>
                {error && <p className="brochure-form-error" role="alert">{error}</p>}
                <button className="button button-gold" type="submit" disabled={working || code.length !== 6}>
                  {working ? "Verifying…" : "Verify & download brochure"}
                </button>
                <button className="brochure-text-button" type="button" onClick={() => setStep("details")}>
                  Use a different email address
                </button>
              </form>
            )}

            {step === "ready" && (
              <div className="brochure-ready">
                <strong>Your personalised brochure is ready.</strong>
                <p>
                  The copy is watermarked with your verified details. The download has been recorded and {partnerName} has been notified.
                </p>
                <a className="button button-gold" href={downloadUrl}>Download again</a>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
