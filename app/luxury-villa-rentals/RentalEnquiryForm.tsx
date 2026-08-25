"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "../lib/analytics";

export function RentalEnquiryForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const stay = [
      `Arrival: ${form.get("arrival")}`,
      `Departure: ${form.get("departure")}`,
      `Guests: ${form.get("guests")}`,
      `Bedrooms: ${form.get("bedrooms")}`,
      `Additional requirements: ${form.get("requirements") || "Not provided"}`,
    ].join(" · ");
    const payload = {
      enquiry_type: "luxury-rental",
      preferred_area_or_property: form.get("location"),
      indicative_budget_or_value: form.get("budget"),
      requirements: stay,
      full_name: form.get("name"),
      email: form.get("email"),
      contact_desk: "Spain rental desk",
      preferred_channel: "telephone_or_whatsapp",
      telephone_or_whatsapp: form.get("phone"),
      wechat_id: "",
      current_location: "",
      partner_slug: "",
      language: "en",
      website_region: "Luxury villa rentals",
      website_journey: "spain",
      company_website: "",
    };

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok || !result.reference) throw new Error("Unable to send enquiry");
      trackEvent("rental_enquiry_submitted", { source: "luxury_villa_rentals" });
      setSent(true);
      event.currentTarget.reset();
    } catch {
      setError("Your enquiry could not be sent. Please try again shortly.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="rental-form-success" role="status">
        <span>✓</span>
        <h3>Enquiry received</h3>
        <p>Your requirements have been sent privately to both teams. We will respond personally.</p>
        <button type="button" onClick={() => setSent(false)}>Send another enquiry</button>
      </div>
    );
  }

  return (
    <form className="rental-form" onSubmit={handleSubmit}>
      <h2>Request availability</h2>
      <p>Tell us your requirements and our team will provide you with a bespoke selection.</p>

      <div className="rental-form-grid">
        <input name="name" required autoComplete="name" placeholder="Full Name" />
        <input name="email" required type="email" autoComplete="email" placeholder="Email Address" />
        <input className="wide" name="phone" required type="tel" autoComplete="tel" placeholder="Telephone / WhatsApp" />
        <input name="arrival" required type="date" aria-label="Arrival date" />
        <input name="departure" required type="date" aria-label="Departure date" />
        <input name="guests" required min="1" type="number" placeholder="Number of Guests" />
        <input name="bedrooms" required min="1" type="number" placeholder="Bedrooms Required" />
        <select className="wide" name="location" required defaultValue="">
          <option value="" disabled>Preferred Location</option>
          <option>La Zagaleta</option>
          <option>El Madroñal</option>
          <option>Marbella Golden Mile</option>
          <option>Sierra Blanca</option>
          <option>Benahavís</option>
          <option>Puerto Banús</option>
          <option>Flexible</option>
        </select>
        <select className="wide" name="budget" required defaultValue="">
          <option value="" disabled>Budget Range</option>
          <option>Under €20,000 per week</option>
          <option>€20,000–€50,000 per week</option>
          <option>€50,000–€100,000 per week</option>
          <option>€100,000+ per week</option>
          <option>Discuss privately</option>
        </select>
        <textarea className="wide" name="requirements" rows={4} placeholder="Additional Requirements" />
      </div>

      {error && <p className="rental-form-error" role="alert">{error}</p>}
      <button className="rental-form-submit" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Request availability"}
      </button>
      <small>Your enquiry is sent privately to Property Facilitators EuroAsia and The Luxury Villa Collection (UK).</small>
    </form>
  );
}
