"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import "./villa-enquiry.css";

const conciergeOptions = [
  "Airport transfers",
  "Luxury vehicle hire",
  "Chauffeur service",
  "Yacht charter",
  "Private aviation",
  "Private chef",
  "Golf reservations",
  "Childcare",
  "Spa and wellness",
  "Private security",
];

export default function LuxuryVillaEnquiryPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const selectedServices = conciergeOptions.filter((service) => form.getAll("concierge_services").includes(service));

    const payload = {
      _subject: "New luxury villa rental enquiry from pfeuroasia.com",
      _cc: "villas@theluxuryvillacollection.com",
      _template: "table",
      enquiry_type: "Luxury villa rental",
      preferred_location: form.get("location"),
      arrival_date: form.get("arrival"),
      departure_date: form.get("departure"),
      number_of_guests: form.get("guests"),
      minimum_bedrooms: form.get("bedrooms"),
      approximate_weekly_budget: form.get("budget"),
      concierge_services: selectedServices.join(", ") || "None specified",
      additional_requirements: form.get("requirements"),
      full_name: form.get("name"),
      email: form.get("email"),
      telephone_or_whatsapp: form.get("phone"),
      country_of_residence: form.get("country"),
      preferred_contact_method: form.get("contact_method"),
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/enquiry@pfeuroasia.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("We could not send your enquiry. Please try again shortly.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <main className="villa-enquiry-page">
        <Header />
        <section className="villa-enquiry-success site-shell">
          <span className="villa-enquiry-success-mark">✓</span>
          <p className="eyebrow">Enquiry sent</p>
          <h1>Thank you.<br />Your villa search has begun.</h1>
          <p>
            Your requirements have been sent privately to Property Facilitators EuroAsia and
            The Luxury Villa Collection. A member of the team will respond personally.
          </p>
          <Link className="villa-enquiry-submit" href="/luxury-villa-rentals">Return to villa rentals <span>→</span></Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="villa-enquiry-page">
      <Header />
      <section className="villa-enquiry-hero">
        <div className="site-shell">
          <p className="eyebrow light">Private villa concierge</p>
          <h1>Request your bespoke<br /><em>villa selection.</em></h1>
          <p>Share your dates, preferred location and requirements. Every enquiry is handled personally and in complete confidence.</p>
        </div>
      </section>

      <section className="villa-enquiry-section">
        <form className="villa-enquiry-form site-shell" onSubmit={submit}>
          <fieldset>
            <legend><span>01</span>Your villa requirements</legend>
            <div className="villa-enquiry-grid">
              <label>
                <span>Preferred location *</span>
                <select name="location" required defaultValue="">
                  <option value="" disabled>Select a location</option>
                  <option>La Zagaleta</option>
                  <option>El Madroñal</option>
                  <option>Marbella Golden Mile</option>
                  <option>Sierra Blanca</option>
                  <option>Puerto Banús</option>
                  <option>Benahavís</option>
                  <option>Flexible</option>
                  <option>Other</option>
                </select>
              </label>
              <label><span>Minimum bedrooms *</span><input name="bedrooms" type="number" min="1" required placeholder="e.g. 6" /></label>
              <label><span>Arrival date *</span><input name="arrival" type="date" required /></label>
              <label><span>Departure date *</span><input name="departure" type="date" required /></label>
              <label><span>Number of guests *</span><input name="guests" type="number" min="1" required placeholder="e.g. 12" /></label>
              <label>
                <span>Approximate weekly budget *</span>
                <select name="budget" required defaultValue="">
                  <option value="" disabled>Select a range</option>
                  <option>Under €20,000 per week</option>
                  <option>€20,000 – €50,000 per week</option>
                  <option>€50,000 – €100,000 per week</option>
                  <option>€100,000+ per week</option>
                  <option>Prefer to discuss privately</option>
                </select>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend><span>02</span>Concierge requirements</legend>
            <p className="villa-enquiry-hint">Select any services you would like us to coordinate.</p>
            <div className="villa-enquiry-options">
              {conciergeOptions.map((service) => (
                <label key={service}>
                  <input type="checkbox" name="concierge_services" value={service} />
                  <span>{service}</span>
                </label>
              ))}
            </div>
            <label className="villa-enquiry-full">
              <span>Additional requirements</span>
              <textarea name="requirements" rows={5} placeholder="Preferred style, location details, children, staff, pets, accessibility, privacy, events or any other requirements…" />
            </label>
          </fieldset>

          <fieldset>
            <legend><span>03</span>Your contact details</legend>
            <div className="villa-enquiry-grid">
              <label><span>Full name *</span><input name="name" required autoComplete="name" /></label>
              <label><span>Email address *</span><input name="email" type="email" required autoComplete="email" /></label>
              <label><span>Telephone / WhatsApp *</span><input name="phone" type="tel" required autoComplete="tel" /></label>
              <label><span>Country of residence</span><input name="country" autoComplete="country-name" /></label>
              <label>
                <span>Preferred contact method</span>
                <select name="contact_method" defaultValue="Email">
                  <option>Email</option>
                  <option>WhatsApp</option>
                  <option>Telephone</option>
                </select>
              </label>
            </div>
            <label className="villa-enquiry-consent">
              <input type="checkbox" required />
              <span>I agree to be contacted regarding this villa enquiry.</span>
            </label>
          </fieldset>

          {error && <p className="villa-enquiry-error" role="alert">{error}</p>}

          <div className="villa-enquiry-footer">
            <p>
              Every enquiry is handled personally and in complete confidence by Property Facilitators EuroAsia
              in collaboration with The Luxury Villa Collection. We aim to respond within 24 hours.
            </p>
            <button className="villa-enquiry-submit" type="submit" disabled={sending}>
              {sending ? "Sending…" : "Send private enquiry"} <span>→</span>
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </main>
  );
}
