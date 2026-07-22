"use client";

import Link from "next/link";
import { useState } from "react";

export function Header({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`site-header ${transparent ? "is-transparent" : ""}`}>
      <div className="site-shell header-inner">
        <Link className="brand" href="/" aria-label="Property Facilitators EuroAsia home">
          <span className="brand-lockup" aria-hidden="true">
            <img className="brand-symbol" src="/images/pf-gold-symbol.png" alt="" />
            <span className="brand-words"><b>Property</b><b>Facilitators</b></span>
            <span className="brand-region">EuroAsia</span>
          </span>
        </Link>

        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
          <Link href="/#services" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/#markets" onClick={() => setOpen(false)}>Markets</Link>
          <Link href="/#property-owners" onClick={() => setOpen(false)}>Property owners</Link>
          <Link href="/about" onClick={() => setOpen(false)}>Our approach</Link>
          <Link className="language-link" href="/zh" onClick={() => setOpen(false)}>中文</Link>
          <Link className="nav-enquire" href="/enquire" onClick={() => setOpen(false)}>
            Enquire <span>→</span>
          </Link>
        </nav>

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
