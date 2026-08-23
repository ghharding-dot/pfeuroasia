"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { getPartnerReferral } from "../lib/partner-referrals";

const spainGoals = [
  {
    value: "buy",
    title: "Acquire a property",
    text: "Private search and buyer representation in Spain.",
  },
  {
    value: "sell",
    title: "Sell a property",
    text: "International positioning for an exceptional Spanish home.",
  },
  {
    value: "partner",
    title: "Discuss a partnership",
    text: "Cross-border brokerage and professional collaboration.",
  },
];

const asiaGoals = [
  {
    value: "asia-residency-company",
    title: "Residency & company setup",
    text: "Residency pathways, relocation and company formation in Malaysia and selected Asian jurisdictions.",
  },
  {
    value: "asia-partnership",
    title: "Discuss a partnership",
    text: "Business expansion, professional collaboration and regional introductions.",
  },
  {
    value: "asia-property",
    title: "Acquire a property in Asia",
    text: "Selected residential and investment opportunities, beginning with Malaysia.",
  },
];

const standardBudgetOptions = [
  "€2m – €5m",
  "€5m – €10m",
  "€10m – €20m",
  "€20m+",
  "Prefer to discuss",
];

const asiaBudgetOptions = [
  "Under US$250,000",
  "US$250,000 – US$500,000",
  "US$500,000 – US$1m",
  "US$1m+",
  "Prefer to discuss",
];

const asiaGoalDetails: Record<
  string,
  {
    legend: string;
    hint: string;
    locationLabel: string;
    locationPlaceholder: string;
    budgetLabel: string;
    messagePlaceholder: string;
  }
> = {
  "asia-residency-company": {
    legend: "Tell us about your residency or company plans.",
    hint:
      "An outline is enough. We will identify the appropriate local specialists and discuss the process with you personally.",
    locationLabel: "Preferred country or jurisdiction",
    locationPlaceholder: "e.g. Malaysia, Labuan, Singapore or Hong Kong",
    budgetLabel: "Indicative setup / investment level",
    messagePlaceholder:
      "Residency objectives, family requirements, company activity, preferred timing or other priorities…",
  },
  "asia-partnership": {
    legend: "Tell us about the partnership you would like to discuss.",
    hint:
      "Share the market, opportunity or professional relationship you are considering.",
    locationLabel: "Target market or partnership area",
    locationPlaceholder: "e.g. Malaysia property, business expansion or professional services",
    budgetLabel: "Indicative project / investment level",
    messagePlaceholder:
      "Your organisation, proposed collaboration, target markets, timing and intended outcome…",
  },
  "asia-property": {
    legend: "Tell us about the property you are seeking in Asia.",
    hint:
      "An outline is enough. We will discuss location, use, investment objectives and suitable opportunities personally.",
    locationLabel: "Preferred market or property type",
    locationPlaceholder: "e.g. Kuala Lumpur apartment, investment property or development",
    budgetLabel: "Indicative property budget",
    messagePlaceholder:
      "Preferred location, property type, intended use, timing, yield expectations or lifestyle priorities…",
  },
};

export type EnquiryInterest = "country-estates" | "investment-opportunities";
export type EnquiryJourney = "spain" | "asia";

const interestConfig: Record<
  EnquiryInterest,
  {
    enquiryType: string;
    kicker: string;
    heading: string;
    intro: string;
    scope: string;
    formLegend: string;
    formHint: string;
    locationLabel: string;
    locationPlaceholder: string;
    defaultLocation: string;
    messagePlaceholder: string;
    budgetOptions: string[];
    successText: string;
  }
> = {
  "country-estates": {
    enquiryType: "country-estates",
    kicker: "Country estates · Andalusia",
    heading: "Register your requirements.",
    intro:
      "For substantial private estates with more than 20,000 m² of land, introduced discreetly through our direct network.",
    scope: "Large estates · Fincas · Cortijos · Equestrian · Agricultural · Lifestyle",
    formLegend: "Tell us about the country estate you are seeking.",
    formHint:
      "An outline is enough. We will discuss location, land, intended use and privacy requirements personally.",
    locationLabel: "Preferred area or estate type",
    locationPlaceholder: "e.g. Málaga, Cádiz, Seville, equestrian estate",
    defaultLocation: "Andalusia",
    messagePlaceholder:
      "Minimum land area, intended use, privacy, equestrian, agricultural, hunting or other priorities…",
    budgetOptions: standardBudgetOptions,
    successText:
      "Your country-estate requirements have been registered. We will contact you personally to discuss suitable public and privately available opportunities.",
  },
  "investment-opportunities": {
    enquiryType: "investment-opportunities",
    kicker: "Private investment opportunities",
    heading: "Register your interest.",
    intro:
      "For selected property-led investment opportunities handled discreetly and often outside conventional public marketing.",
    scope: "Hotels · Commercial · Development sites · Land · Refurbishment · Income-producing assets",
    formLegend: "Tell us what type of opportunity interests you.",
    formHint:
      "An outline is enough. We will qualify the opportunity type, geography, investment level and timing with you directly.",
    locationLabel: "Preferred market or opportunity type",
    locationPlaceholder: "e.g. hotel, commercial building, development land",
    defaultLocation: "Spain",
    messagePlaceholder:
      "Target asset class, preferred location, investment criteria, timing or operating requirements…",
    budgetOptions: [
      "€1m – €5m",
      "€5m – €10m",
      "€10m – €25m",
      "€25m+",
      "Prefer to discuss",
    ],
    successText:
      "Your investment criteria have been registered. We will contact you personally regarding appropriate public and privately introduced opportunities.",
  },
};

const initialDetails = { location: "", budget: "", message: "" };

type EnquiryFlowProps = {
  partnerSlug?: string;
  interest?: EnquiryInterest;
  journey?: EnquiryJourney;
};

type SubmissionResponse = {
  ok?: boolean;
  reference?: string;
  delivery?: "sent" | "browser-fallback";
  error?: string;
};

type EnquiryPayload = {
  enquiry_type: string;
  preferred_area_or_property: string;
  indicative_budget_or_value: string;
  requirements: string;
  full_name: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  contact_desk: FormDataEntryValue | null;
  preferred_channel: FormDataEntryValue | null;
  telephone_or_whatsapp: FormDataEntryValue | null;
  wechat_id: FormDataEntryValue | null;
  current_location: FormDataEntryValue | null;
  partner_slug: string;
  language: string;
  website_region: FormDataEntryValue | string;
  website_journey: EnquiryJourney;
  company_website: FormDataEntryValue | null;
};

function asText(value: FormDataEntryValue | string | null) {
  return typeof value === "string" ? value : "";
}

async function deliverFromBrowser(
  payload: EnquiryPayload,
  reference: string,
  partner: ReturnType<typeof getPartnerReferral>,
) {
  const recipients = ["enquiry@pfeuroasia.com"];

  if (partner?.code === "FIX") {
    recipients.push("robert@bazothefixer.com");
  }

  if (partner?.code === "R2H") {
    recipients.push("jorge@rent2holiday.es");
  }

  const subjectType = payload.website_journey === "asia" ? "Asia enquiry" : "property enquiry";
  const record = {
    reference,
    submitted_at: new Date().toISOString(),
    status: "New",
    priority: "Unqualified",
    partner_code: partner?.code || "DIRECT",
    partner_name: partner?.name || "Direct website enquiry",
    partner_slug: payload.partner_slug || "direct",
    website_region: asText(payload.website_region) || "International",
    website_journey: payload.website_journey,
    language: payload.language || "en",
    enquiry_type: payload.enquiry_type,
    preferred_area_or_property: payload.preferred_area_or_property,
    indicative_budget_or_value: payload.indicative_budget_or_value,
    requirements: payload.requirements,
    full_name: asText(payload.full_name),
    email: asText(payload.email),
    contact_desk: asText(payload.contact_desk),
    preferred_channel: asText(payload.preferred_channel),
    telephone_or_whatsapp: asText(payload.telephone_or_whatsapp),
    wechat_id: asText(payload.wechat_id),
    current_location: asText(payload.current_location),
    _subject: `New confidential ${subjectType} via ${partner ? partner.name : "PF EuroAsia website"}`,
    _template: "table",
    _replyto: asText(payload.email),
  };

  await Promise.all(
    recipients.map(async (recipient) => {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(record),
        },
      );

      if (!response.ok) {
        throw new Error(`Browser delivery failed: ${response.status}`);
      }
    }),
  );
}

export function EnquiryFlow({
  partnerSlug,
  interest,
  journey = "spain",
}: EnquiryFlowProps) {
  const partner = getPartnerReferral(partnerSlug);
  const preset = interest ? interestConfig[interest] : undefined;
  const isAsia = journey === "asia";
  const goals = isAsia ? asiaGoals : spainGoals;
  const [step, setStep] = useState(preset ? 2 : 1);
  const [goal, setGoal] = useState(
    preset?.enquiryType || (partner ? (isAsia ? "asia-property" : "buy") : ""),
  );
  const [details, setDetails] = useState(() =>
    preset
      ? { ...initialDetails, location: preset.defaultLocation }
      : initialDetails,
  );
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const totalSteps = preset ? 2 : 3;
  const progressStep = preset ? step - 1 : step;
  const asiaDetail = isAsia ? asiaGoalDetails[goal] : undefined;
  const budgetOptions = preset?.budgetOptions || (isAsia ? asiaBudgetOptions : standardBudgetOptions);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const payload: EnquiryPayload = {
      enquiry_type: goal,
      preferred_area_or_property: details.location,
      indicative_budget_or_value: details.budget,
      requirements: details.message,
      full_name: form.get("name"),
      email: form.get("email"),
      contact_desk: form.get("desk"),
      preferred_channel: form.get("channel"),
      telephone_or_whatsapp: form.get("phone"),
      wechat_id: form.get("wechat"),
      current_location: form.get("country"),
      partner_slug: partnerSlug || "",
      language: document.documentElement.lang || "en",
      website_region: form.get("desk") || (isAsia ? "Asia & Malaysia desk" : "International"),
      website_journey: journey,
      company_website: form.get("company_website"),
    };

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as SubmissionResponse;
      if (!response.ok || !result.reference) {
        throw new Error(result.error || "Submission failed");
      }

      if (result.delivery === "browser-fallback") {
        await deliverFromBrowser(payload, result.reference, partner);
      }

      setReference(result.reference);
      setSubmitted(true);
    } catch {
      setError("Your enquiry could not be delivered. Please try again or email enquiry@pfeuroasia.com.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <section className="enquiry-success site-shell">
        <span className="success-mark">✓</span>
        <p className="eyebrow">Registration sent</p>
        <h1>Thank you.<br />Your conversation starts here.</h1>
        <p>
          {preset?.successText ||
            (isAsia
              ? "Your confidential Asia enquiry has been sent to our team. We will respond personally using your preferred contact method."
              : `Your confidential enquiry has been sent to our team${
                  partner ? ` and ${partner.name}` : ""
                }. We will respond personally using your preferred contact method.`)}
        </p>
        <p><strong>Your enquiry reference: {reference}</strong></p>
        <Link className="text-link" href={isAsia ? "/asia-gateway" : "/"}>
          Return to the website <span>→</span>
        </Link>
      </section>
    );
  }

  return (
    <section className="enquiry-shell site-shell">
      <aside className="enquiry-aside">
        <p className="eyebrow light">
          {preset?.kicker || (isAsia ? "Asia Gateway · Confidential enquiry" : "Confidential enquiry")}
        </p>
        <h1>{preset?.heading || (isAsia ? "How may we help in Asia?" : "How may we help?")}</h1>
        <p>
          {preset?.intro ||
            (isAsia
              ? "Tell us whether you are considering residency, company setup, a professional partnership or property acquisition in Asia. Your enquiry will be handled personally and in confidence."
              : "Share a little about your objectives. Your enquiry will be handled personally and in confidence.")}
        </p>
        {preset && (
          <p>
            <strong>Opportunity scope:</strong><br />
            {preset.scope}
          </p>
        )}
        {partner && (
          <p>
            <strong>Collaboration source:</strong><br />
            {partner.name} · {partner.code}
          </p>
        )}
        <div className="enquiry-progress" aria-label={`Step ${progressStep} of ${totalSteps}`}>
          {Array.from({ length: totalSteps }, (_, index) => index + 1).map((item) => (
            <span className={item <= progressStep ? "active" : ""} key={item} />
          ))}
        </div>
        <small>Step {progressStep} of {totalSteps}</small>
      </aside>

      <form className="enquiry-form" onSubmit={submit}>
        <label aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
          Company website
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>

        {!preset && step === 1 && (
          <fieldset>
            <legend>What would you like to discuss?</legend>
            <p className="form-hint">
              {partner
                ? `This enquiry will be shared with ${partner.name} and Property Facilitators EuroAsia.`
                : "Choose the option that best describes your enquiry."}
            </p>
            <div className="goal-options">
              {goals.map((item) => (
                <label className={goal === item.value ? "selected" : ""} key={item.value}>
                  <input
                    type="radio"
                    name="goal"
                    value={item.value}
                    checked={goal === item.value}
                    onChange={() => setGoal(item.value)}
                  />
                  <span className="radio-mark" />
                  <span><strong>{item.title}</strong><small>{item.text}</small></span>
                </label>
              ))}
            </div>
            <button className="button button-dark form-next" type="button" disabled={!goal} onClick={() => setStep(2)}>
              Continue <span>→</span>
            </button>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend>{preset?.formLegend || asiaDetail?.legend || "Tell us about your requirements."}</legend>
            <p className="form-hint">
              {preset?.formHint || asiaDetail?.hint || "An outline is enough—we will explore the details together."}
            </p>
            <div className="form-grid">
              <label>
                <span>{preset?.locationLabel || asiaDetail?.locationLabel || "Preferred area or property"}</span>
                <input
                  name="location"
                  value={details.location}
                  onChange={(e) => setDetails({ ...details, location: e.target.value })}
                  placeholder={
                    preset?.locationPlaceholder ||
                    asiaDetail?.locationPlaceholder ||
                    "e.g. La Zagaleta, Marbella"
                  }
                />
              </label>
              <label>
                <span>{asiaDetail?.budgetLabel || "Indicative budget / investment level"}</span>
                <select
                  name="budget"
                  value={details.budget}
                  onChange={(e) => setDetails({ ...details, budget: e.target.value })}
                >
                  <option value="" disabled>Select a range</option>
                  {budgetOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <label className="full">
                <span>Anything else we should know?</span>
                <textarea
                  name="message"
                  rows={5}
                  value={details.message}
                  onChange={(e) => setDetails({ ...details, message: e.target.value })}
                  placeholder={
                    preset?.messagePlaceholder ||
                    asiaDetail?.messagePlaceholder ||
                    "Timing, priorities, privacy requirements or relevant background…"
                  }
                />
              </label>
            </div>
            <div className="form-actions">
              {preset ? (
                <Link className="back-button" href="/#private-portfolio">← Back to opportunities</Link>
              ) : (
                <button className="back-button" type="button" onClick={() => setStep(1)}>← Back</button>
              )}
              <button className="button button-dark" type="button" onClick={() => setStep(3)}>
                Continue <span>→</span>
              </button>
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend>{isAsia ? "Where may our Asia team reach you?" : "Where may we reach you?"}</legend>
            <p className="form-hint">We will use these details only to respond to this enquiry.</p>
            <div className="form-grid">
              <label><span>Full name *</span><input name="name" required autoComplete="name" /></label>
              <label><span>Email address *</span><input name="email" type="email" required autoComplete="email" /></label>
              <label>
                <span>Contact desk</span>
                {isAsia ? (
                  <select name="desk" defaultValue="Asia & Malaysia desk">
                    <option>Asia & Malaysia desk</option>
                    <option>Middle East desk</option>
                    <option>China enquiry</option>
                    <option>Other Asia market</option>
                  </select>
                ) : (
                  <select name="desk" defaultValue={preset ? "Spain desk" : ""}>
                    <option value="" disabled>Select a desk</option>
                    <option>Spain desk</option>
                    <option>Asia & Malaysia desk</option>
                    <option>China enquiry</option>
                    <option>Middle East desk</option>
                  </select>
                )}
              </label>
              <label>
                <span>Preferred channel</span>
                <select name="channel" defaultValue="email">
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="wechat">WeChat</option>
                  <option value="telephone">Telephone</option>
                </select>
              </label>
              <label><span>Telephone / WhatsApp</span><input name="phone" type="tel" autoComplete="tel" /></label>
              <label><span>WeChat ID</span><input name="wechat" placeholder="For mainland China enquiries" /></label>
              <label><span>Current location</span><input name="country" placeholder="Country or city" /></label>
            </div>
            <p className="china-channel-note">Mainland China: email, WeChat and this secure form are the recommended contact routes.</p>
            <label className="privacy-check">
              <input type="checkbox" required />
              <span>
                I agree to be contacted regarding this enquiry. I understand that a referred collaboration partner may receive the details and that approximate network location plus a masked IP address may be recorded for security, routing and fraud prevention. <Link href="/privacy">Privacy notice</Link>.
              </span>
            </label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="form-actions">
              <button className="back-button" type="button" disabled={sending} onClick={() => setStep(2)}>← Back</button>
              <button className="button button-dark" type="submit" disabled={sending}>
                {sending ? "Sending…" : "Register interest"} <span>→</span>
              </button>
            </div>
          </fieldset>
        )}
      </form>
    </section>
  );
}
