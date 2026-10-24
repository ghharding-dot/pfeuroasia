"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { submitEnquiry } from "../lib/submitEnquiry";
import { trackEvent } from "../lib/analytics";

export function RentalEnquiryForm({ selectedVilla = "" }: { selectedVilla?: string }) {
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const started = useRef(false);
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = new FormData(event.currentTarget);
    const arrival = String(form.get("arrival") || "");
    const departure = String(form.get("departure") || "");
    if (arrival && departure && departure <= arrival) {
      setError("Please choose a departure date after your arrival date.");
      return;
    }
    submitting.current = true;
    setSending(true); setError("");
    try {
      const result = await submitEnquiry({
        enquiry_type: "luxury-rental", preferred_area_or_property: form.get("location") || "Flexible",
        indicative_budget_or_value: form.get("budget") || "To discuss",
        requirements: [
          `Arrival: ${arrival || "Flexible / to confirm"}`, `Departure: ${departure || "Flexible / to confirm"}`,
          `Guests: ${form.get("guests") || "To confirm"}`, `Bedrooms: ${form.get("bedrooms") || "To confirm"}`,
          `Additional requirements: ${form.get("requirements") || "Not provided"}`,
        ].join(" · "),
        full_name: form.get("name"), email: form.get("email"),
        contact_desk: "Spain rental desk", preferred_channel: form.get("phone") ? "telephone_or_whatsapp" : "Email",
        telephone_or_whatsapp: form.get("phone"), partner_slug: "", language: "en",
        website_region: "Luxury villa rentals", website_journey: "spain", company_website: form.get("company_website"),
      });
      trackEvent("rental_enquiry_submitted", { source: "luxury_villa_rentals", form_variant: "short" });
      setReference(result.reference);
    } catch {
      trackEvent("enquiry_failed", { source: "luxury_villa_rentals" });
      setError("Your enquiry could not be sent. Please try again, WhatsApp Geoff or email enquiry@pfeuroasia.com.");
    } finally { submitting.current = false; setSending(false); }
  }

  if (reference) return <div className="rental-form-success" role="status"><span>✓</span><h3>Your villa request has been sent.</h3><p>Reference: {reference}</p><p>Our teams will review your requirements and respond personally with options, subject to availability.</p><button type="button" onClick={() => { setReference(""); started.current = false; }}>Send another enquiry</button></div>;

  return <form className="rental-form" onSubmit={handleSubmit} onFocusCapture={() => {
    if (!started.current) { started.current = true; trackEvent("enquiry_started", { source: "luxury_villa_rentals", form_variant: "short" }); }
  }}>
    <h2>Find my rental villa</h2>
    <p>Start with your name and email. Add any stay details you know — flexible dates are welcome.</p>
    <div className="rental-form-grid">
      <label>Full name<input name="name" required autoComplete="name" maxLength={160} /></label>
      <label>Email address<input name="email" required type="email" autoComplete="email" maxLength={320} /></label>
      <label>Arrival (optional)<input name="arrival" type="date" /></label>
      <label>Departure (optional)<input name="departure" type="date" /></label>
      <label>Guests (optional)<input name="guests" min="1" type="number" /></label>
      <label>Weekly budget<select name="budget" defaultValue="To discuss"><option>To discuss</option><option>Under €20,000 per week</option><option>€20,000–€50,000 per week</option><option>€50,000–€100,000 per week</option><option>€100,000+ per week</option></select></label>
    </div>
    <details className="rental-form-details" open={Boolean(selectedVilla)}><summary>Add a villa, area or extra requirements (optional)</summary><div className="rental-form-grid">
      <label className="wide">Telephone / WhatsApp<input name="phone" type="tel" autoComplete="tel" maxLength={120} /></label>
      <label>Bedrooms<input name="bedrooms" min="1" type="number" /></label>
      <label>Preferred area or villa<select name="location" defaultValue={selectedVilla || "Flexible"}>{selectedVilla && <option value={selectedVilla}>{selectedVilla}</option>}<option>Flexible</option><option>La Zagaleta</option><option>El Madroñal</option><option>Marbella Golden Mile</option><option>Sierra Blanca</option><option>Benahavís</option><option>Puerto Banús</option></select></label>
      <label className="wide">Anything else we should know?<textarea name="requirements" rows={3} maxLength={4000} placeholder="Children, accessibility, chef, pool heating…" /></label>
    </div></details>
    <div className="rental-form-trap" aria-hidden="true"><input name="company_website" tabIndex={-1} autoComplete="off" /></div>
    <label className="rental-form-consent"><input type="checkbox" required /><span>I agree to be contacted about this request by PF EuroAsia and The Luxury Villa Collection. <Link href="/privacy">Privacy notice</Link>.</span></label>
    {error && <p className="rental-form-error" role="alert">{error}</p>}
    <button className="rental-form-submit" type="submit" disabled={sending}>{sending ? "Sending…" : "Send my villa request →"}</button>
    <small>No booking commitment. Your requirements are shared privately with PF EuroAsia and The Luxury Villa Collection (UK).</small>
  </form>;
}
