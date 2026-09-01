import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PartnerNetworkDialog } from "../components/PartnerNetworkDialog";
import { createMetadata } from "../lib/seo";
import styles from "../HomePhase2.module.css";

export const metadata = createMetadata("whyEn");

const expertise = [
  {
    number: "01",
    title: "Property acquisition",
    text: "Private search and discreet representation for exceptional homes and selected investment opportunities.",
    href: "/services/acquisition",
  },
  {
    number: "02",
    title: "International sales",
    text: "Positioning quality Spanish property for qualified buyers across Europe, the Middle East and Asia.",
    href: "/services/international-sales",
  },
  {
    number: "03",
    title: "Relocation & residency",
    text: "Practical guidance and trusted local support for clients establishing a new life internationally.",
    href: "/asia-gateway",
  },
  {
    number: "04",
    title: "Investment opportunities",
    text: "Selected residential, commercial, development and property-led opportunities by public or private introduction.",
    href: "/opportunities/investment-opportunities",
  },
  {
    number: "05",
    title: "Professional partners",
    text: "Coordinated access to trusted legal, financial, tax and specialist advisers throughout the transaction.",
    href: "/about",
  },
  {
    number: "06",
    title: "Cross-border representation",
    text: "One trusted relationship coordinating property interests between Spain, the Middle East and Asia.",
    href: "/about",
  },
];

const trustPoints = [
  {
    title: "25+ years of experience",
    text: "Prime Costa del Sol knowledge built through decades of direct market involvement.",
  },
  {
    title: "Independent advice",
    text: "Clear, commercially grounded guidance centred on the client rather than the transaction.",
  },
  {
    title: "Trusted network",
    text: "Established relationships with legal, financial and property professionals across our markets.",
  },
  {
    title: "Spain & Asia expertise",
    text: "Local presence and cross-border understanding connecting distinct markets and client cultures.",
  },
  {
    title: "Private client service",
    text: "A focused advisory model with fewer mandates, closer attention and one point of contact.",
  },
  {
    title: "Discreet representation",
    text: "Confidential handling of requirements, introductions and selected off-market opportunities.",
  },
];

export default function WhyEuroAsiaPage() {
  return (
    <main className={styles.whyPage}>
      <Header />

      <section className={styles.missionSection} aria-labelledby="mission-heading">
        <div className={`site-shell ${styles.missionInner}`}>
          <p className="eyebrow">Our mission</p>
          <h1 id="mission-heading">
            Trusted professionals. Verified opportunities.
            <em>New markets.</em>
          </h1>
          <div className={styles.missionCopy}>
            <p>
              PF EuroAsia brings together trusted professionals across property,
              law, taxation, residency, company formation and relocation.
            </p>
            <p>
              Through collaboration, we help existing clients explore carefully
              selected opportunities in new international markets—supported by
              experienced professionals who understand both the opportunities
              and the responsibilities involved.
            </p>
          </div>
          <PartnerNetworkDialog />
        </div>
      </section>

      <section className={styles.expertiseSection} id="expertise">
        <div className="site-shell">
          <div className={styles.expertiseIntro}>
            <div>
              <p className="eyebrow">Our expertise</p>
              <h2>
                Private property advisory.
                <em>International perspective.</em>
              </h2>
            </div>
            <p>
              Independent representation for buyers, sellers, investors and
              relocating families across Spain, the Middle East and Asia.
            </p>
          </div>

          <div className={styles.expertiseGrid}>
            {expertise.map((item) => (
              <Link className={styles.expertiseCard} href={item.href} key={item.title}>
                <span className={styles.cardNumber}>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className={styles.cardArrow} aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="gateway-section">
        <div className="gateway-image" role="img" aria-label="Luxury Asian city residence at blue hour" />
        <div className="gateway-copy">
          <p className="eyebrow light">Europe meets Asia</p>
          <h2>One relationship.<br />Two worlds.</h2>
          <p>
            For clients in Asia, we make Spain feel closer: qualifying the
            market, opening the right doors and coordinating every detail on
            the ground. For Spanish owners, we create considered exposure to a
            genuinely international audience.
          </p>
          <div className="gateway-points">
            <span>Spain-side presence</span>
            <span>Cross-border coordination</span>
            <span>Confidential private network</span>
          </div>
          <Link className="text-link light-link" href="/about">
            Discover our approach <span>→</span>
          </Link>
        </div>
      </section>

      <section className={styles.trustSection}>
        <div className="site-shell">
          <div className={styles.trustHeading}>
            <div>
              <p className="eyebrow">Why EuroAsia</p>
              <h2>
                The right property is only half the equation.
                <em>The right representation is everything.</em>
              </h2>
            </div>
            <p>
              More than 25 years of market experience, combined with trusted
              international relationships and a highly personal advisory model.
            </p>
          </div>

          <div className={styles.trustGrid}>
            {trustPoints.map((item, index) => (
              <div className={styles.trustItem} key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
