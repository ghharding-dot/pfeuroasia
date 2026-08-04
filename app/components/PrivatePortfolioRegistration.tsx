"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { PrivatePortfolioLogin } from "./PrivatePortfolioLogin";

function ArrowIcon() {
  return <span aria-hidden="true">→</span>;
}

export function PrivatePortfolioRegistration() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      fullName: form.get("name"),
      nationality: form.get("nationality"),
      countryOfResidence: form.get("country"),
      residentialAddress: form.get("address"),
      telephone: form.get("phone"),
      email: form.get("email"),
      wechatId: form.get("wechat"),
      preferredLanguage: form.get("language"),
      companyName: form.get("company"),
      occupation: form.get("occupation"),
      propertyType: form.get("propertyType"),
      preferredLocation: form.get("location"),
      indicativeBudget: form.get("budget"),
      purchaseTimeframe: form.get("timeframe"),
      referralSource: form.get("source"),
      additionalRequirements: form.get("requirements"),
      companyWebsite: form.get("companyWebsite"),
    };

    try {
      const response = await fetch("/api/private-portfolio/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }
      setSubmitted(true);
      event.currentTarget.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "We could not save your registration. Please try again or email enquiry@pfeuroasia.com.",
      );
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <section className="portfolio-registration-success site-shell">
        <div className="registration-success-card">
          <span className="success-mark" aria-hidden="true">✓</span>
          <p className="eyebrow">Registration received</p>
          <h1>Your request is now under review.</h1>
          <p>
            Thank you for your application. Every request is reviewed individually to protect the privacy of our clients and property owners. Once approved, you will receive an email explaining how to enter the Private Collection using your email address and a secure one-time code.
          </p>
          <div className="success-response-time">
            <span>Expected response time</span>
            <strong>24–48 hours</strong>
          </div>
          <Link className="button button-gold success-return-button" href="/">
            Return to the website <ArrowIcon />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="portfolio-registration site-shell">
      <aside className="portfolio-registration-intro">
        <p className="eyebrow light">Private Collection</p>
        <h1>Confidential property opportunities in Southern Spain.</h1>
        <p>
          Our private portfolio is prepared for qualified purchasers, family offices and trusted professional advisers across Asia. It includes selected off-market and discreetly marketed villas, residences and investment opportunities that are not published on conventional property portals.
        </p>

        <div className="approved-access-panel">
          <p className="eyebrow light">Already approved?</p>
          <h2>Enter the private collection</h2>
          <p>Use your approved email address. We will send you a secure six-digit access code.</p>
          <PrivatePortfolioLogin theme="dark" />
        </div>

        <div className="registration-notes">
          <span>Applications reviewed individually</span>
          <span>Access granted at our discretion</span>
          <span>Property information shared in confidence</span>
        </div>
      </aside>

      <form className="portfolio-registration-form" onSubmit={submit}>
        <label className="portfolio-registration-honeypot" aria-hidden="true">
          Company website
          <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label>

        <div className="registration-heading">
          <p className="eyebrow">Request access</p>
          <h2>Prospective purchaser registration</h2>
          <p>New clients and professional advisers may apply below. Please provide complete and accurate details. Fields marked * are required.</p>
        </div>

        <fieldset>
          <legend><span>01</span> Personal information</legend>
          <div className="form-grid">
            <label><span>Full name *</span><input name="name" required autoComplete="name" /></label>
            <label><span>Nationality *</span><input name="nationality" required autoComplete="country-name" /></label>
            <label><span>Country of residence *</span><input name="country" required /></label>
            <label><span>Telephone / WhatsApp *</span><input name="phone" type="tel" required autoComplete="tel" placeholder="Include country code" /></label>
            <label><span>Email address *</span><input name="email" type="email" required autoComplete="email" /></label>
            <label><span>WeChat ID</span><input name="wechat" placeholder="Optional" /></label>
            <label className="full"><span>Residential address *</span><textarea name="address" rows={3} required autoComplete="street-address" /></label>
            <label><span>Preferred language *</span><select name="language" required defaultValue=""><option value="" disabled>Select language</option><option>English</option><option>中文</option><option>Bahasa Melayu</option><option>Other</option></select></label>
          </div>
        </fieldset>

        <fieldset>
          <legend><span>02</span> Professional information</legend>
          <div className="form-grid">
            <label><span>Company name</span><input name="company" autoComplete="organization" /></label>
            <label><span>Occupation</span><input name="occupation" /></label>
          </div>
        </fieldset>

        <fieldset>
          <legend><span>03</span> Property requirements</legend>
          <div className="form-grid">
            <label><span>Interested in *</span><select name="propertyType" required defaultValue=""><option value="" disabled>Select property type</option><option>Luxury villa</option><option>Luxury apartment or penthouse</option><option>Investment property</option><option>Development land</option><option>Commercial property</option><option>Multiple opportunities</option></select></label>
            <label><span>Preferred location *</span><select name="location" required defaultValue=""><option value="" disabled>Select location</option><option>La Zagaleta</option><option>El Madroñal</option><option>Marbella Golden Mile</option><option>Benahavís</option><option>Wider Costa del Sol</option><option>Open to recommendation</option></select></label>
            <label><span>Indicative budget *</span><select name="budget" required defaultValue=""><option value="" disabled>Select budget</option><option>€2m – €5m</option><option>€5m – €10m</option><option>€10m – €20m</option><option>€20m+</option><option>Prefer to discuss privately</option></select></label>
            <label><span>Purchase timeframe *</span><select name="timeframe" required defaultValue=""><option value="" disabled>Select timeframe</option><option>Immediately</option><option>Within 3 months</option><option>Within 6 months</option><option>Within 12 months</option><option>Researching future opportunities</option></select></label>
            <label><span>How did you hear about us?</span><select name="source" defaultValue=""><option value="" disabled>Select source</option><option>Referral</option><option>WeChat</option><option>Google</option><option>LinkedIn</option><option>Existing client</option><option>Property exhibition or portal</option><option>Other</option></select></label>
            <label className="full"><span>Additional requirements</span><textarea name="requirements" rows={5} placeholder="Preferred style, number of bedrooms, intended use, travel dates or any other relevant information." /></label>
          </div>
        </fieldset>

        <div className="registration-consent">
          <label className="privacy-check">
            <input type="checkbox" required />
            <span>I confirm that the information provided is accurate and agree to be contacted regarding my request for access. I understand that registration does not guarantee access.</span>
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="registration-submit-row">
            <button className="button button-gold registration-submit" type="submit" disabled={sending}>
              <span>{sending ? "Saving registration…" : "Submit registration"}</span> <ArrowIcon />
            </button>
            <p>Your information is encrypted and used only to assess and manage this access request.</p>
          </div>
        </div>
      </form>
    </section>
  );
}
