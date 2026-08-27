"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../components/HeaderMobileDirectory.module.css";

export function SpanishHeader({ transparent = true }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={`site-header ${transparent ? "is-transparent" : ""}`}>
      <div className="site-shell header-inner">
        <Link className="brand" href="/es" aria-label="Inicio de Property Facilitators EuroAsia en español">
          <span className="brand-lockup" aria-hidden="true">
            <img className="brand-symbol" src="/images/pf-gold-symbol.png" alt="" />
            <span className="brand-words"><b>Property</b><b>Facilitators</b></span>
            <span className="brand-region">EuroAsia</span>
          </span>
        </Link>
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navegación principal">
          <Link className={styles.navButton} href="/es#servicios-es" onClick={close}>Servicios</Link>
          <Link className={styles.navButton} href="/es#mercados-es" onClick={close}>Mercados</Link>
          <Link className={styles.navButton} href="/es/luxury-villa-rentals" onClick={close}>Alquiler de villas</Link>
          <Link className={styles.navButton} href="/es/commercial" onClick={close}>Inversión</Link>
          <Link className={styles.navButton} href="/es/properties" onClick={close}>Propiedades</Link>
          <Link className={styles.navButton} href="/es/property-owners" onClick={close}>Propietarios</Link>
          <Link className={styles.navButton} href="/es/about" onClick={close}>Nuestro enfoque</Link>
          <Link className="language-link" href="/" onClick={close}>EN</Link>
          <Link className="nav-enquire" href="/es/enquire" onClick={close}>Contactar <span>→</span></Link>
        </nav>
        <span className={styles.mobileDirectory} aria-hidden="true">Menú</span>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span />
        </button>
      </div>
    </header>
  );
}
