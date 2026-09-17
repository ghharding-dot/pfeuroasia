"use client";

import Link from "next/link";
import { useState } from "react";
import { HeaderLiveStrip, LanguageFlagBar } from "../components/HeaderLiveStrip";
import styles from "../components/HeaderMobileDirectory.module.css";

export function SwedishHeader({ transparent = true }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={`site-header has-language-bars ${transparent ? "is-transparent" : ""}`}>
      <div className="site-shell header-inner">
        <Link className="brand" href="/sv" aria-label="Property Facilitators EuroAsia svensk startsida">
          <span className="brand-lockup" aria-hidden="true">
            <img className="brand-symbol" src="/images/pf-gold-symbol.png" alt="" />
            <span className="brand-words"><b>Property</b><b>Facilitators</b></span>
            <span className="brand-region">EuroAsia</span>
          </span>
        </Link>
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Huvudnavigation">
          <Link className={styles.navButton} href="/sv/properties" onClick={close}>Fastigheter</Link>
          <Link className={styles.navButton} href="/sv/markets/malaysia" onClick={close}>Asien</Link>
          <Link className={styles.navButton} href="/partners/bremberg" onClick={close}>Bremberg Estate</Link>
          <Link className={styles.navButton} href="/about" onClick={close}>Vårt arbetssätt</Link>
          <Link className="nav-enquire" href="/enquire?goal=sweden-property" onClick={close}>Kontakta oss <span>→</span></Link>
        </nav>
        <span className={styles.mobileDirectory} aria-hidden="true">Meny</span>
        <button className="menu-button" type="button" aria-label={open ? "Stäng menyn" : "Öppna menyn"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
      </div>
      <HeaderLiveStrip />
      <LanguageFlagBar />
    </header>
  );
}
