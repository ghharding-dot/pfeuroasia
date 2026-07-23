"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

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
      _subject: "Private Portfolio access request — pfeuroasia.com",
      request_type: "Private Portfolio registration",
      full_name: form.get("name"),
      nationality: form.get("nationality"),
      country_of_residence: form.get("country"),
      residential_address: form.get("address"),
      telephone_or_whatsapp: form.get("phone"),
      email: form.get("email"),
      wechat_id: form.get("wechat"),
      preferred_language: form.get("language"),
      company_name: form.get("company"),
      occupation: form.get("occupation"),
      property_type: form.get("propertyType"),
      preferred_location: form.get("location"),
      indicative_budget: form.get("budget"),
      purchase_timeframe: form.get("timeframe"),
      referral_source: form.get("source"),
      additional_requirements: form.get("requirements"),
      _template: "table",
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/enquiry@pfeuroasia.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Submission failed");
      setSubmitted(true);
      event.currentTarget.reset();
    } catch {
      setError("We could not send your registration. Please try again or email enquiry@pfeuroasia.com.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <section className="portfolio-registration-success site-shell">
        <span className="success-mark">✓</span>
        <p className="eyebrow">Registration received</p>
        <h1>Your request is now under review.</h1>
        <p>
          Thank you for registering. We review every application individually. Approved applicants will receive private access instructions by email or their preferred contact channel.
        </p>
        <Link className="text-link" href="/">Return to the website <span>→</span></Link>
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
        <div className="registration-notes">
          <span>Applications reviewed individually</span>
          <span>Access granted at our discretion</span>
          <span>Property information shared in confidence</span>
        </div>
      </aside>

      <form className="portfolio-registration-form" onSubmit={submit}>
        <div className="registration-heading">
          <p className="eyebrow">Request access</p>
          <h2>Prospective purchaser registration</h2>
          <p>Please provide complete and accurate details. Fields marked * are required.</p>
        </div>

        <fieldset>
          <legend>Personal information</legend>
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
          <legend>Professional information</legend>
          <div className="form-grid">
            <label><span>Company name</span><input name="company" autoComplete="organization" /></label>
            <label><span>Occupation</span><input name="occupation" /></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Property requirements</legend>
          <div className="form-grid">
            <label><span>Interested in *</span><select name="propertyType" required defaultValue=""><option value="" disabled>Select property type</option><option>Luxury villa</option><option>Luxury apartment or penthouse</option><option>Investment property</option><option>Development land</option><option>Commercial property</option><option>Multiple opportunities</option></select></label>
            <label><span>Preferred location *</span><select name="location" required defaultValue=""><option value="" disabled>Select location</option><option>La Zagaleta</option><option>El Madroñal</option><option>Marbella Golden Mile</option><option>Benahavís</option><option>Wider Costa del Sol</option><option>Open to recommendation</option></select></label>
            <label><span>Indicative budget *</span><select name="budget" required defaultValue=""><option value="" disabled>Select budget</option><option>€2m – €5m</option><option>€5m – €10m</option><option>€10m – €20m</option><option>€20m+</option><option>Prefer to discuss privately</option></select></label>
            <label><span>Purchase timeframe *</span><select name="timeframe" required defaultValue=""><option value="" disabled>Select timeframe</option><option>Immediately</option><option>Within 3 months</option><option>Within 6 months</option><option>Within 12 months</option><option>Researching future opportunities</option></select></label>
            <label><span>How did you hear about us?</span><select name="source" defaultValue=""><option value="" disabled>Select source</option><option>Referral</option><option>WeChat</option><option>Google</option><option>LinkedIn</option><option>Existing client</option><option>Property exhibition or portal</option><option>Other</option></select></label>
            <label className="full"><span>Additional requirements</span><textarea name="requirements" rows={5} placeholder="Preferred style, number of bedrooms, intended use, travel dates or any other relevant information." /></label>
          </div>
        </fieldset>

        <label className="privacy-check">
          <input type="checkbox" required />
          <span>I confirm that the information provided is accurate and agree to be contacted regarding my request for access. I understand that registration does not guarantee access.</span>
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-dark registration-submit" type="submit" disabled={sending}>
          {sending ? "Sending…" : "Submit registration"} <span>→</span>
        </button>
      </form>
    </section>
  );
}
