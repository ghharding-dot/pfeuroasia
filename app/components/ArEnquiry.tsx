"use client";

import { FormEvent, useState } from "react";
import styles from "../ar/ArabicHome.module.css";

export function ArEnquiry() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      _subject: "استفسار عربي جديد من pfeuroasia.com",
      enquiry_type: form.get("purpose"),
      preferred_area: form.get("area"),
      budget: form.get("budget"),
      preferred_channel: form.get("channel"),
      full_name: form.get("name"),
      email: form.get("email"),
      whatsapp: form.get("whatsapp"),
      telephone: form.get("phone"),
      requirements: form.get("message"),
      language: "Arabic - Saudi Arabia",
      _template: "table",
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/enquiry@pfeuroasia.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Submission failed");
      setSent(true);
    } catch {
      setError("تعذر إرسال الطلب حالياً. يرجى المحاولة مرة أخرى أو مراسلتنا على enquiry@pfeuroasia.com");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className={styles.success}>
        <span aria-hidden="true">✓</span>
        <h3>شكراً لتواصلكم</h3>
        <p>تم إرسال طلبكم بسرية إلى فريقنا، وسنتواصل معكم شخصياً عبر الوسيلة التي اخترتموها.</p>
        <a href="/ar">العودة إلى الصفحة العربية ←</a>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.formGrid}>
        <label>
          <span>نوع الطلب</span>
          <select name="purpose" defaultValue="buy">
            <option value="buy">شراء عقار في إسبانيا</option>
            <option value="sell">بيع عقار في إسبانيا</option>
            <option value="commercial">فرصة استثمارية أو تجارية</option>
            <option value="partner">شراكة مهنية</option>
          </select>
        </label>

        <label>
          <span>المنطقة المفضلة</span>
          <input name="area" placeholder="مثال: ماربيا، لا زاغاليتا" />
        </label>

        <label>
          <span>الميزانية التقريبية</span>
          <select name="budget" defaultValue="">
            <option value="" disabled>يرجى الاختيار</option>
            <option>من 2 إلى 5 ملايين يورو</option>
            <option>من 5 إلى 10 ملايين يورو</option>
            <option>من 10 إلى 20 مليون يورو</option>
            <option>أكثر من 20 مليون يورو</option>
            <option>أفضل مناقشتها بشكل خاص</option>
          </select>
        </label>

        <label>
          <span>وسيلة التواصل المفضلة</span>
          <select name="channel" defaultValue="whatsapp">
            <option value="whatsapp">واتساب</option>
            <option value="phone">اتصال هاتفي</option>
            <option value="email">البريد الإلكتروني</option>
          </select>
        </label>

        <label>
          <span>الاسم الكامل *</span>
          <input name="name" required autoComplete="name" />
        </label>

        <label>
          <span>البريد الإلكتروني *</span>
          <input name="email" required type="email" autoComplete="email" inputMode="email" dir="ltr" />
        </label>

        <label>
          <span>رقم واتساب</span>
          <input name="whatsapp" type="tel" autoComplete="tel" inputMode="tel" dir="ltr" />
        </label>

        <label>
          <span>رقم الهاتف</span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" dir="ltr" />
        </label>

        <label className={styles.fullField}>
          <span>تفاصيل الطلب</span>
          <textarea
            name="message"
            rows={5}
            placeholder="يرجى ذكر نوع العقار، الإطار الزمني، متطلبات الخصوصية أو أي تفاصيل مهمة…"
          />
        </label>
      </div>

      <label className={styles.consent}>
        <input type="checkbox" required />
        <span>أوافق على التواصل معي بخصوص هذا الطلب.</span>
      </label>

      {error && <p className={styles.formError} role="alert">{error}</p>}

      <button className="button button-gold" type="submit" disabled={sending}>
        {sending ? "جارٍ الإرسال…" : "إرسال الطلب الخاص"} <span>←</span>
      </button>
    </form>
  );
}
