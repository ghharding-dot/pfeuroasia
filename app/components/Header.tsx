"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./HeaderMobileDirectory.module.css";

type HeaderProps = {
  transparent?: boolean;
  enquireHref?: string;
  enquireLabel?: string;
};

const tickerText =
  "FORMULA 1 RETURNS TO SEPANG — Malaysia confirmed to host the 2026 Gulf Air Bahrain Grand Prix at Sepang International Circuit, 2–4 October 2026 · Discover why international attention is returning to Malaysia";

export function Header({
  transparent = false,
  enquireHref = "/enquire",
  enquireLabel = "Enquire",
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`site-header ${transparent ? "is-transparent" : ""}`}>
      <div className="news-ticker" role="region" aria-label="Latest news">
        <span className="news-ticker-label">Latest</span>
        <div className="news-ticker-window">
          <Link className="news-ticker-track" href="/markets/malaysia">
            <span>{tickerText}</span>
            <span aria-hidden="true">{tickerText}</span>
          </Link>
        </div>
      </div>

      <div className="site-shell header-inner">
        <Link className="brand" href="/" aria-label="Property Facilitators EuroAsia home">
          <span className="brand-lockup" aria-hidden="true">
            <img className="brand-symbol" src="/images/pf-gold-symbol.png" alt="" />
            <span className="brand-words"><b>Property</b><b>Facilitators</b></span>
            <span className="brand-region">EuroAsia</span>
          </span>
        </Link>

        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
          <Link className={styles.navButton} href="/#services" onClick={() => setOpen(false)}>Services</Link>
          <Link className={styles.navButton} href="/#markets" onClick={() => setOpen(false)}>Markets</Link>
          <Link className={styles.navButton} href="/luxury-villa-rentals" onClick={() => setOpen(false)}>Luxury Villa Rentals</Link>
          <Link className={styles.navButton} href="/commercial" onClick={() => setOpen(false)}>Commercial</Link>
          <Link className={styles.navButton} href="/private-portfolio" onClick={() => setOpen(false)}>Private portfolio</Link>
          <Link className={styles.navButton} href="/property-owners" onClick={() => setOpen(false)}>Property owners</Link>
          <Link className={styles.navButton} href="/about" onClick={() => setOpen(false)}>Our approach</Link>
          <Link className={styles.collaboratorLogin} href="/collaborators" onClick={() => setOpen(false)}>
            Collaborator Login <span>→</span>
          </Link>
          <Link className="language-link" href="/zh" onClick={() => setOpen(false)}>中文</Link>
          <Link className="language-link" href="/ar" onClick={() => setOpen(false)}>العربية</Link>
          <Link className="language-link" href="/da" onClick={() => setOpen(false)}>Dansk</Link>
          <Link className="nav-enquire" href={enquireHref} onClick={() => setOpen(false)}>
            {enquireLabel} <span>→</span>
          </Link>
        </nav>

        <span className={styles.mobileDirectory} aria-hidden="true">Directory</span>

        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
