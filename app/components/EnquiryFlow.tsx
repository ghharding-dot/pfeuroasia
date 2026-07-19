"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const goals = [
  { value: "buy", title: "Acquire a property", text: "Private search and buyer representation in Spain." },
  { value: "sell", title: "Sell a property", text: "International positioning for an exceptional Spanish home." },
  { value: "partner", title: "Discuss a partnership", text: "Cross-border brokerage and professional collaboration." },
];

export function EnquiryFlow() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="enquiry-success site-shell">
        <span className="success-mark">✓</span>
        <p className="eyebrow">Enquiry prepared</p>
        <h1>Thank you.<br />Your conversation starts here.</h1>
        <p>
          This concept form is ready to connect to your preferred inbox or CRM.
          No information has been transmitted from this preview.
        </p>
        <Link className="text-link" href="/">Return to the website <span>→</span></Link>
      </section>
    );
  }

  return (
    <section className="enquiry-shell site-shell">
      <aside className="enquiry-aside">
        <p className="eyebrow light">Confidential enquiry</p>
        <h1>How may we help?</h1>
        <p>Share a little about your objectives. Your enquiry will be handled personally and in confidence.</p>
        <div className="enquiry-progress" aria-label={`Step ${step} of 3`}>
          {[1, 2, 3].map((item) => <span className={item <= step ? "active" : ""} key={item} />)}
        </div>
        <small>Step {step} of 3</small>
      </aside>

      <form className="enquiry-form" onSubmit={submit}>
        {step === 1 && (
          <fieldset>
            <legend>What would you like to discuss?</legend>
            <p className="form-hint">Choose the option that best describes your enquiry.</p>
            <div className="goal-options">
              {goals.map((item) => (
                <label className={goal === item.value ? "selected" : ""} key={item.value}>
                  <input type="radio" name="goal" value={item.value} checked={goal === item.value} onChange={() => setGoal(item.value)} />
                  <span className="radio-mark" />
                  <span><strong>{item.title}</strong><small>{item.text}</small></span>
                </label>
              ))}
            </div>
            <button className="button button-dark form-next" type="button" disabled={!goal} onClick={() => setStep(2)}>Continue <span>→</span></button>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend>Tell us about your requirements.</legend>
            <p className="form-hint">An outline is enough—we will explore the details together.</p>
            <div className="form-grid">
              <label><span>Preferred area or property</span><input name="location" placeholder="e.g. La Zagaleta, Marbella" /></label>
              <label><span>Indicative budget / value</span><select name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>€2m – €5m</option><option>€5m – €10m</option><option>€10m – €20m</option><option>€20m+</option><option>Prefer to discuss</option></select></label>
              <label className="full"><span>Anything else we should know?</span><textarea name="message" rows={5} placeholder="Timing, priorities, privacy requirements or relevant background…" /></label>
            </div>
            <div className="form-actions"><button className="back-button" type="button" onClick={() => setStep(1)}>← Back</button><button className="button button-dark" type="button" onClick={() => setStep(3)}>Continue <span>→</span></button></div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend>Where may we reach you?</legend>
            <p className="form-hint">We will use these details only to respond to this enquiry.</p>
            <div className="form-grid">
              <label><span>Full name *</span><input name="name" required autoComplete="name" /></label>
              <label><span>Email address *</span><input name="email" type="email" required autoComplete="email" /></label>
              <label><span>Contact desk</span><select name="desk" defaultValue=""><option value="" disabled>Select a desk</option><option>Spain desk</option><option>Asia & Malaysia desk</option><option>China enquiry</option></select></label>
              <label><span>Preferred channel</span><select name="channel" defaultValue="email"><option value="email">Email</option><option value="whatsapp">WhatsApp</option><option value="wechat">WeChat</option><option value="telephone">Telephone</option></select></label>
              <label><span>Telephone / WhatsApp</span><input name="phone" type="tel" autoComplete="tel" /></label>
              <label><span>WeChat ID</span><input name="wechat" placeholder="For mainland China enquiries" /></label>
              <label><span>Current location</span><input name="country" placeholder="Country or city" /></label>
            </div>
            <p className="china-channel-note">Mainland China: email, WeChat and this secure form are the recommended contact routes.</p>
            <label className="privacy-check"><input type="checkbox" required /><span>I agree to be contacted regarding this enquiry.</span></label>
            <div className="form-actions"><button className="back-button" type="button" onClick={() => setStep(2)}>← Back</button><button className="button button-dark" type="submit">Prepare enquiry <span>→</span></button></div>
          </fieldset>
        )}
      </form>
    </section>
  );
}
