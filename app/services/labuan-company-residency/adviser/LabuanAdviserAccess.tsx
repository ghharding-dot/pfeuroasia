"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { LabuanAdviser } from "./LabuanAdviser";
import styles from "./LabuanAdviserAccess.module.css";

const SESSION_KEY = "pfe-malaysia-adviser-access";

type AccessDetails = {
  fullName: string;
  email: string;
};

export function LabuanAdviserAccess({ locale = "en" }: { locale?: "en" | "es" } = {}) {
  const isSpanish = locale === "es";
  const [details, setDetails] = useState<AccessDetails>({ fullName: "", email: "" });
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(SESSION_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as Partial<AccessDetails>;
      if (parsed.fullName && parsed.email) {
        const timer = window.setTimeout(() => {
          setDetails({ fullName: parsed.fullName!, email: parsed.email! });
          setUnlocked(true);
        }, 0);
        return () => window.clearTimeout(timer);
      }
    } catch {
      // Session storage is optional; the gate still works without it.
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const fullName = details.fullName.trim();
    const email = details.email.trim().toLowerCase();

    if (!fullName || !email || !email.includes("@")) {
      setError(isSpanish ? "Introduzca su nombre completo y un correo electrónico válido." : "Please enter your full name and a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/labuan-adviser-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email,
          source: isSpanish ? "Ask EuroAsia — Asesor de Malasia en español" : "Ask EuroAsia — Malaysia Adviser",
          company_website: "",
        }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error || (isSpanish ? "No hemos podido registrar sus datos de acceso." : "We could not register your access details."));
      }

      const registered = { fullName, email };
      setDetails(registered);
      try {
        window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(registered));
      } catch {
        // Access should not depend on browser storage being available.
      }

      setUnlocked(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : isSpanish ? "No hemos podido registrar sus datos. Inténtelo de nuevo." : "We could not register your access details. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (unlocked) {
    return (
      <div className={styles.unlocked}>
        <div className={styles.accessBar}>
          <span>{isSpanish ? "Acceso al Asesor de Malasia" : "Malaysia Adviser access"}</span>
          <strong>{details.fullName || (isSpanish ? "Acceso concedido" : "Access granted")}</strong>
        </div>
        <LabuanAdviser visitor={details} locale={locale} />
      </div>
    );
  }

  return (
    <section className={styles.gate} aria-labelledby="adviser-access-title">
      <div className={styles.gateCopy}>
        <p className={styles.kicker}>{isSpanish ? "Acceso gratuito al asesor" : "Complimentary adviser access"}</p>
        <h2 id="adviser-access-title">{isSpanish ? "Introduzca sus datos para continuar." : "Enter your details to continue."}</h2>
        <p>
          {isSpanish ? "Acceda al Asesor de Malasia de PF EuroAsia para consultar en español sobre vida en Malasia, Kuala Lumpur, viajes, propiedad, sanidad, gastronomía, constitución de sociedades, residencia y Labuan." : "Access the PF EuroAsia Malaysia Adviser for practical questions about living in Malaysia, Kuala Lumpur, travel, property, healthcare, food, lifestyle, company formation, residency and Labuan."}
        </p>
        <ul>
          <li>{isSpanish ? "Información sobre vida, propiedad, gastronomía, viajes y estilo de vida" : "Malaysia living, property, food, travel and lifestyle information"}</li>
          <li>{isSpanish ? "Orientación controlada sobre sociedad, fiscalidad y residencia en Labuan" : "Controlled Labuan company, tax and residency guidance"}</li>
          <li>{isSpanish ? "Si no podemos verificar una respuesta, la pregunta se envía al equipo para seguimiento" : "If we cannot verify an answer, your question can be sent to our team for email follow-up"}</li>
        </ul>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <span>{isSpanish ? "Nombre completo" : "Full name"}</span>
          <input
            type="text"
            name="full_name"
            autoComplete="name"
            required
            value={details.fullName}
            onChange={(event) => setDetails((current) => ({ ...current, fullName: event.target.value }))}
            placeholder={isSpanish ? "Su nombre completo" : "Your full name"}
          />
        </label>

        <label>
          <span>{isSpanish ? "Correo electrónico" : "Email address"}</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={details.email}
            onChange={(event) => setDetails((current) => ({ ...current, email: event.target.value }))}
            placeholder="you@example.com"
          />
        </label>

        <input className={styles.honeypot} type="text" name="company_website" tabIndex={-1} autoComplete="off" />

        {error ? <p className={styles.error} role="alert">{error}</p> : null}

        <button className="button button-dark" type="submit" disabled={submitting}>
          {submitting ? (isSpanish ? "Abriendo asesor…" : "Opening adviser…") : (isSpanish ? "Acceder al Asesor de Malasia" : "Access Malaysia Adviser")} <span>→</span>
        </button>

        <p className={styles.privacy}>
          {isSpanish ? <>Al continuar, acepta que PF EuroAsia guarde estos datos para prestar el servicio y realizar seguimiento cuando una pregunta necesite confirmación humana o especializada. Consulte nuestro <Link href="/es/privacy">aviso de privacidad</Link>.</> : <>By continuing, you agree that PF EuroAsia may store these details to provide the adviser service and follow up by email when a question needs human or specialist confirmation. See our <Link href="/privacy">privacy notice</Link>.</>}
        </p>
      </form>
    </section>
  );
}
