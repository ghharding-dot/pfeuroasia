"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./app.module.css";

const actions = [
  {
    href: "/properties",
    number: "01",
    title: "Property for Sale",
    copy: "Luxury homes and selected developments in Spain.",
  },
  {
    href: "/luxury-villa-rentals",
    number: "02",
    title: "Luxury Rentals",
    copy: "Access our wider collection of 100+ villas along the Costa del Sol.",
  },
  {
    href: "/asia-gateway",
    number: "03",
    title: "Malaysia & Asia",
    copy: "Residency, relocation, company formation and property.",
  },
  {
    href: "/spain-gateway",
    number: "04",
    title: "Spain",
    copy: "Marbella, Benahavís, La Zagaleta, El Madroñal and the Costa del Sol.",
  },
  {
    href: "/enquire",
    number: "05",
    title: "Enquire",
    copy: "Tell us what you are looking for and our team will respond personally.",
  },
];

export default function EuroAsiaAppPage() {
  const [mayaOpen, setMayaOpen] = useState(false);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <Image src="/images/pf-gold-symbol.png" alt="" width={42} height={58} className={styles.logo} priority />
          <div>
            <span>PROPERTY FACILITATORS</span>
            <strong>EuroAsia</strong>
          </div>
        </div>
        <Link href="/enquire" className={styles.enquire}>ENQUIRE</Link>
      </header>

      <section className={styles.intro}>
        <p className={styles.kicker}>EUROASIA APP</p>
        <h1>Where would you like to go?</h1>
        <p>Direct access to property, rentals, Malaysia, relocation and our team.</p>
      </section>

      <section className={styles.grid} aria-label="EuroAsia app sections">
        {actions.map((item) => (
          <Link key={item.href} href={item.href} className={styles.tile}>
            <span className={styles.number}>{item.number}</span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
              <strong>Open <span>→</span></strong>
            </div>
          </Link>
        ))}
      </section>

      <section className={styles.maya}>
        <div className={styles.mayaIdentity}>
          <Image src="/images/maya-ai-advisor.webp" alt="Maya" width={62} height={62} className={styles.avatar} />
          <div>
            <span>EUROASIA AI ADVISOR</span>
            <h2>Speak to Maya</h2>
            <p>Ask about property, rentals, residency, relocation or company formation.</p>
          </div>
        </div>
        <button type="button" onClick={() => setMayaOpen(true)}>Talk to Maya</button>
      </section>

      {mayaOpen && (
        <div className={styles.mayaSheet} role="dialog" aria-modal="true" aria-label="Open Maya">
          <div className={styles.sheetCard}>
            <button className={styles.close} type="button" onClick={() => setMayaOpen(false)} aria-label="Close">×</button>
            <Image src="/images/maya-ai-advisor.webp" alt="Maya" width={72} height={72} className={styles.avatar} />
            <h2>Maya</h2>
            <p>Use the Maya button on the website interface to speak or type your question.</p>
            <Link href="/?maya=1" onClick={() => setMayaOpen(false)} className={styles.openMaya}>Open Maya</Link>
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <Link href="/">Full website</Link>
        <span>Property Facilitators EuroAsia</span>
      </footer>
    </main>
  );
}
