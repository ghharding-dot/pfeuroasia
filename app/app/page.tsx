import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { InstallEuroAsiaApp } from "../components/InstallEuroAsiaApp";
import { MayaOpenButton } from "../components/MayaOpenButton";
import styles from "./EuroAsiaApp.module.css";

export const metadata: Metadata = {
  title: "EuroAsia App",
  description:
    "Your mobile gateway to PF EuroAsia property, rentals, residency, relocation and AI guidance.",
};

const tiles = [
  {
    href: "/spain-gateway",
    kicker: "Spain",
    title: "Property for Sale",
    copy: "Luxury homes, new developments and investment opportunities across Marbella and the Costa del Sol.",
    icon: "01",
  },
  {
    href: "/luxury-villa-rentals",
    kicker: "Spain",
    title: "Luxury Villa Rentals",
    copy: "A selection from 100+ villas, supported by our personal rental service.",
    icon: "02",
  },
  {
    href: "/asia-gateway",
    kicker: "Malaysia & Asia",
    title: "Property & Relocation",
    copy: "Explore Malaysia property, relocation planning and your route from Europe to Asia.",
    icon: "03",
  },
  {
    href: "/guides/mm2h-malaysia",
    kicker: "Residency",
    title: "Malaysia Residency",
    copy: "Understand current residency routes and the practical steps involved in moving.",
    icon: "04",
  },
  {
    href: "/services/malaysia-company-formation",
    kicker: "Business",
    title: "Company Formation",
    copy: "Malaysia and Labuan company setup, coordinated with our specialist network.",
    icon: "05",
  },
  {
    href: "/enquire",
    kicker: "Personal Service",
    title: "Speak to EuroAsia",
    copy: "Send your requirements and our team will respond personally and in confidence.",
    icon: "06",
  },
];

export default function EuroAsiaAppPage() {
  return (
    <main className={styles.app}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand} aria-label="PF EuroAsia website home">
          <Image src="/images/pf-gold-symbol.png" alt="" width={38} height={52} priority />
          <span>
            <b>Property Facilitators</b>
            <strong>EuroAsia</strong>
          </span>
        </Link>
        <Link href="/enquire" className={styles.enquire}>Enquire</Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Property · Residency · Investment</p>
          <h1>Your EuroAsia <em>gateway.</em></h1>
          <p className={styles.lead}>
            Spain, Malaysia and Asia in one place — property, luxury rentals,
            residency, relocation and business support.
          </p>
        </div>

        <div className={styles.mayaCard}>
          <Image
            src="/images/maya-ai-advisor.webp"
            alt="Maya, PF EuroAsia AI advisor"
            width={78}
            height={78}
            className={styles.maya}
            priority
          />
          <div>
            <p>EuroAsia AI Advisor</p>
            <h2>Speak to Maya</h2>
            <span>
              Ask about property, rentals, residency, company formation or relocation.
            </span>
            <MayaOpenButton />
          </div>
        </div>

        <InstallEuroAsiaApp />
      </section>

      <section className={styles.directory} aria-labelledby="app-directory-heading">
        <div className={styles.sectionHeading}>
          <p>Choose your direction</p>
          <h2 id="app-directory-heading">What would you like to do?</h2>
        </div>

        <div className={styles.grid}>
          {tiles.map((tile) => (
            <Link key={tile.href} href={tile.href} className={styles.tile}>
              <span className={styles.number}>{tile.icon}</span>
              <span className={styles.kicker}>{tile.kicker}</span>
              <h3>{tile.title}</h3>
              <p>{tile.copy}</p>
              <b>Open <span aria-hidden="true">→</span></b>
            </Link>
          ))}
        </div>
      </section>

      <nav className={styles.bottomNav} aria-label="EuroAsia app navigation">
        <Link href="/app"><span>⌂</span>Home</Link>
        <Link href="/spain-gateway"><span>ES</span>Spain</Link>
        <Link href="/asia-gateway"><span>MY</span>Malaysia</Link>
        <Link href="/enquire"><span>✉</span>Enquire</Link>
      </nav>
    </main>
  );
}
