"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../components/HeaderMobileDirectory.module.css";

export function DanishHeader({ transparent = true }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className={`site-header ${transparent ? "is-transparent" : ""}`}>
    <div className="site-shell header-inner">
      <Link className="brand" href="/da" aria-label="Property Facilitators EuroAsia dansk forside"><span className="brand-lockup" aria-hidden="true"><img className="brand-symbol" src="/images/pf-gold-symbol.png" alt=""/><span className="brand-words"><b>Property</b><b>Facilitators</b></span><span className="brand-region">EuroAsia</span></span></Link>
      <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Hovednavigation">
        <Link className={styles.navButton} href="/da#services-da" onClick={close}>Ydelser</Link><Link className={styles.navButton} href="/da#markets-da" onClick={close}>Markeder</Link><Link className={styles.navButton} href="/da/luxury-villa-rentals" onClick={close}>Luksusvillaer</Link><Link className={styles.navButton} href="/da/commercial" onClick={close}>Erhverv</Link><Link className={styles.navButton} href="/da/private-portfolio" onClick={close}>Privat portefølje</Link><Link className={styles.navButton} href="/da/property-owners" onClick={close}>Ejendomsejere</Link><Link className={styles.navButton} href="/da/about" onClick={close}>Vores tilgang</Link><Link className="language-link" href="/" onClick={close}>EN</Link><Link className="nav-enquire" href="/da/enquire" onClick={close}>Kontakt os <span>→</span></Link>
      </nav>
      <span className={styles.mobileDirectory} aria-hidden="true">Menu</span>
      <button className="menu-button" type="button" aria-label={open ? "Luk menu" : "Åbn menu"} aria-expanded={open} onClick={() => setOpen(!open)}><span/><span/></button>
    </div>
  </header>;
}
