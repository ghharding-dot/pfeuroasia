"use client";

import { FormEvent, useState } from "react";
import styles from "../../properties/properties.module.css";

export function SpanishPropertyUpdatesForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          enquiry_type: "property-collection-registration",
          preferred_area_or_property: "Colección de propiedades en España",
          indicative_budget_or_value: "A comentar",
          requirements: "Deseo recibir nuevas propiedades, cambios relevantes de precio y presentaciones privadas seleccionadas.",
          full_name: form.get("name"), email: form.get("email"), contact_desk: "Spain desk",
          preferred_channel: "email", telephone_or_whatsapp: "", wechat_id: "", current_location: "",
          partner_slug: "", language: "es", website_region: "Colección de propiedades en español",
          website_journey: "spain", company_website: form.get("company_website"),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.reference) throw new Error();
      setSent(true);
      event.currentTarget.reset();
    } catch {
      setError("No se ha podido completar el registro. Inténtelo de nuevo o escriba a enquiry@pfeuroasia.com.");
    } finally {
      setSending(false);
    }
  }

  if (sent) return <div className={styles.registrationSuccess} role="status"><strong>Registro recibido.</strong><span>Contactaremos cuando se añada una oportunidad relevante.</span></div>;

  return (
    <form className={styles.registrationForm} onSubmit={submit}>
      <label className={styles.honeypot} aria-hidden="true">Sitio web de la empresa<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      <label><span>Nombre</span><input name="name" required autoComplete="name" placeholder="Su nombre" /></label>
      <label><span>Correo electrónico</span><input name="email" required type="email" autoComplete="email" placeholder="Correo electrónico" /></label>
      <button type="submit" disabled={sending}>{sending ? "Registrando…" : "Recibir novedades"} <span>→</span></button>
      {error ? <p className={styles.formError} role="alert">{error}</p> : null}
    </form>
  );
}
