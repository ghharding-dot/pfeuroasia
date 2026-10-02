"use client";

import { submitEnquiry } from "../../lib/submitEnquiry";

import { FormEvent, useState } from "react";

export function ZhRentalEnquiryForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      enquiry_type: "luxury-rental",
      full_name: form.get("name"),
      email: form.get("email"),
      telephone_or_whatsapp: form.get("phone"),
      requirements: ["Arrival: " + form.get("arrival"), "Departure: " + form.get("departure"), "Guests: " + form.get("guests"), "Bedrooms: " + form.get("bedrooms"), "Additional requirements: " + (form.get("requirements") || "Not provided")].join(" · "),
      contact_desk: "Spain rental desk",
      preferred_channel: "telephone_or_whatsapp",
      website_journey: "spain",
      website_region: "Chinese villa rentals",
      language: "zh",
      preferred_area_or_property: form.get("location"),
      indicative_budget_or_value: form.get("budget"),
    };

    try {
      await submitEnquiry(payload);
      setSent(true);
      formElement.reset();
    } catch {
      setError("您的咨询暂时无法发送，请稍后重试。");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="rental-form-success" role="status">
        <span>✓</span>
        <h3>咨询已收到</h3>
        <p>您的需求已私密发送给双方团队，我们将由专人回复。</p>
        <button type="button" onClick={() => setSent(false)}>再次发送咨询</button>
      </div>
    );
  }

  return (
    <form className="rental-form" onSubmit={handleSubmit}>
      <h2>查询别墅档期</h2>
      <p>请告诉我们您的具体需求，我们将为您准备专属别墅推荐。</p>

      <div className="rental-form-grid">
        <input name="name" required autoComplete="name" placeholder="姓名" />
        <input name="email" required type="email" autoComplete="email" placeholder="电子邮箱" />
        <input className="wide" name="phone" required type="text" placeholder="电话 / 微信 / WhatsApp" />
        <input name="arrival" required type="date" aria-label="入住日期" />
        <input name="departure" required type="date" aria-label="退房日期" />
        <input name="guests" required min="1" type="number" placeholder="入住人数" />
        <input name="bedrooms" required min="1" type="number" placeholder="所需卧室数量" />
        <select className="wide" name="location" required defaultValue="">
          <option value="" disabled>首选区域</option>
          <option>La Zagaleta</option>
          <option>El Madroñal</option>
          <option>Marbella Golden Mile</option>
          <option>Sierra Blanca</option>
          <option>Benahavís</option>
          <option>Puerto Banús</option>
          <option>区域灵活</option>
        </select>
        <select className="wide" name="budget" required defaultValue="">
          <option value="" disabled>每周预算</option>
          <option>€20,000 以下</option>
          <option>€20,000–€50,000</option>
          <option>€50,000–€100,000</option>
          <option>€100,000 以上</option>
          <option>希望私下沟通</option>
        </select>
        <textarea className="wide" name="requirements" rows={4} placeholder="其他要求，例如厨师、司机、安保、游艇或儿童服务" />
      </div>

      {error && <p className="rental-form-error" role="alert">{error}</p>}
      <button className="rental-form-submit" type="submit" disabled={sending}>
        {sending ? "发送中…" : "查询别墅档期"}
      </button>
      <small>您的咨询将私密发送至 Property Facilitators EuroAsia 与英国 The Luxury Villa Collection。</small>
    </form>
  );
}
