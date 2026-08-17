"use client";

import Link from "next/link";
import { useState } from "react";
import { HeaderLiveStrip } from "./HeaderLiveStrip";
import styles from "./HeaderMobileDirectory.module.css";

type HeaderProps = {
  transparent?: boolean;
  enquireHref?: string;
  enquireLabel?: string;
};

const tickerItems = [
  "PF EUROASIA ASIA AFFILIATION — Property Facilitators EuroAsia is now affiliating with IQI Global and Juwai IQI, giving Spanish developers direct exposure across Asian markets",
  "FORMULA 1 RETURNS TO SEPANG — Malaysia will host the Formula 1 Gulf Air Bahrain Grand Prix at Sepang International Circuit, 2–4 October 2026",
  "MALAYSIA TOURISM GROWTH — 10.6 million international visitor arrivals in Q1 2026, up 5.4% year-on-year",
  "CHINA VISITOR MOMENTUM — 1.4 million visitor arrivals from China in Q1 2026, up 25.2% year-on-year",
  "DOMESTIC TOURISM STRONG — 74.7 million domestic visitors in Q1 2026, up 7.2%, with expenditure reaching RM34.0 billion",
];

const tickerText = tickerItems.slice(1).join("   ◆   ");

function TickerCopy({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <span className="news-ticker-copy" aria-hidden={duplicate || undefined}>
      <span className="news-ticker-affiliation">{tickerItems[0]}</span>
      {"   ◆   "}
      {tickerText}
    </span>
  );
}

export function Header({
  transparent = false,
  enquireHref = "/enquire",
  enquireLabel = "Enquire",
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`site-header ${transparent ? "is-transparent" : ""}`}>
      <div className="news-ticker" role="region" aria-label="Latest Malaysia news and market updates">
        <span className="news-ticker-label">Latest</span>
        <div className="news-ticker-window">
          <Link className="news-ticker-track" href="/markets/malaysia">
            <TickerCopy />
            <TickerCopy duplicate />
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

      <HeaderLiveStrip />
    </header>
  );
}
