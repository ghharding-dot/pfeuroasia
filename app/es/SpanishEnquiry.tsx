"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export function SpanishEnquiry() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const journey = form.get("journey") === "asia" ? "asia" : "spain";
    const payload = {
      enquiry_type: form.get("type"),
      preferred_area_or_property: form.get("location"),
      indicative_budget_or_value: form.get("budget"),
      requirements: form.get("message"),
      full_name: form.get("name"),
      email: form.get("email"),
      contact_desk: journey === "asia" ? "Asia & Malaysia desk" : "Spain desk",
      preferred_channel: form.get("channel"),
      telephone_or_whatsapp: form.get("phone"),
      wechat_id: "",
      current_location: form.get("country"),
      partner_slug: "",
      language: "es",
      website_region: "Sitio web en español",
      website_journey: journey,
      company_website: form.get("company_website"),
    };

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.reference) throw new Error();
      setReference(result.reference);
      setSent(true);
    } catch {
      setError("No se ha podido enviar la consulta. Inténtelo de nuevo o escriba a enquiry@pfeuroasia.com.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <section className="enquiry-success site-shell">
        <span className="success-mark">✓</span>
        <p className="eyebrow">Consulta enviada</p>
        <h1>Gracias.<br />La conversación empieza aquí.</h1>
        <p>Su consulta confidencial ha sido enviada. Nuestro equipo responderá personalmente por el canal indicado.</p>
        <p><strong>Su referencia: {reference}</strong></p>
        <Link className="text-link" href="/es">Volver al inicio <span>→</span></Link>
      </section>
    );
  }

  return (
    <section className="enquiry-shell site-shell">
      <aside className="enquiry-aside">
        <p className="eyebrow light">Consulta confidencial</p>
        <h1>¿Cómo podemos ayudarle?</h1>
        <p>Cuéntenos brevemente sus planes en España, Dubái, Malasia o el resto de Asia. Trataremos su consulta de forma personal y confidencial.</p>
        <div className="enquiry-progress"><span className="active" /></div>
        <small>Directo a nuestro equipo internacional</small>
      </aside>
      <form className="enquiry-form" onSubmit={submit}>
        <label aria-hidden="true" style={{ position: "absolute", left: "-10000px" }}>Sitio web de la empresa<input name="company_website" tabIndex={-1} /></label>
        <fieldset>
          <legend>Cuéntenos qué desea conseguir.</legend>
          <p className="form-hint">Una breve descripción es suficiente. Nosotros ampliaremos los detalles personalmente.</p>
          <div className="form-grid">
            <label><span>Mercado *</span><select name="journey" required defaultValue=""><option value="" disabled>Seleccione el mercado</option><option value="spain">España · Marbella</option><option value="asia">Dubái, Malasia y Asia</option></select></label>
            <label><span>Tipo de consulta *</span><select name="type" required defaultValue=""><option value="" disabled>Seleccione el tema</option><option value="buy">Compra de propiedad</option><option value="sell">Venta de propiedad</option><option value="luxury-rental">Villa de lujo y concierge</option><option value="asia-residency-company">Residencia y sociedad</option><option value="commercial">Comercial o inversión</option><option value="partnership">Colaboración profesional</option></select></label>
            <label><span>Zona o propiedad</span><input name="location" placeholder="Por ejemplo, La Zagaleta o Kuala Lumpur" /></label>
            <label><span>Presupuesto orientativo</span><select name="budget" defaultValue=""><option value="">A comentar</option><option>Menos de €500.000</option><option>€500.000–€2 millones</option><option>€2–€5 millones</option><option>€5–€10 millones</option><option>Más de €10 millones</option></select></label>
            <label className="full"><span>Sus necesidades</span><textarea name="message" rows={5} placeholder="Plazos, objetivos, prioridades y requisitos de privacidad…" /></label>
            <label><span>Nombre completo *</span><input name="name" required autoComplete="name" /></label>
            <label><span>Correo electrónico *</span><input name="email" type="email" required autoComplete="email" /></label>
            <label><span>Teléfono / WhatsApp</span><input name="phone" type="tel" autoComplete="tel" /></label>
            <label><span>País o ciudad actual</span><input name="country" autoComplete="country-name" /></label>
            <label><span>Contacto preferido</span><select name="channel" defaultValue="email"><option value="email">Correo electrónico</option><option value="whatsapp">WhatsApp</option><option value="telephone">Teléfono</option></select></label>
          </div>
          <label className="privacy-check"><input type="checkbox" required /><span>Acepto que contacten conmigo sobre esta consulta y he leído el <Link href="/es/privacy">aviso de privacidad</Link>.</span></label>
          {error ? <p className="form-error" role="alert">{error}</p> : null}
          <div className="form-actions"><Link className="back-button" href="/es">← Volver</Link><button className="button button-dark" type="submit" disabled={sending}>{sending ? "Enviando…" : "Enviar consulta"} <span>→</span></button></div>
        </fieldset>
      </form>
    </section>
  );
}
