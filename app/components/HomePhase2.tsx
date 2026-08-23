import Link from "next/link";
import phase2Styles from "../HomePhase2.module.css";
import { PartnerNetworkDialog } from "./PartnerNetworkDialog";

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

export function HomePhase2() {
  return (
    <>
      <section className={phase2Styles.gatewayHero} aria-labelledby="gateway-heading">
        <div className={phase2Styles.gatewayOverlay} />
        <div className={`site-shell ${phase2Styles.gatewayInner}`}>
          <div className={phase2Styles.gatewayIntro}>
            <div>
              <p className="eyebrow light">Europe & Asia connected</p>
              <h1 id="gateway-heading">
                Choose your direction.
                <em>We will guide the journey.</em>
                <span className={phase2Styles.gatewayPromise}>
                  But ultimately, go where you’re treated best.
                </span>
              </h1>
            </div>
            <p>
              Two distinct services under one trusted international network.
              Select Spain for property, rentals and concierge, or enter our
              growing Asia Gateway for investment, relocation, residency and
              business opportunities.
            </p>
          </div>

          <div className={phase2Styles.gatewayCards}>
            <Link
              className={`${phase2Styles.gatewayCard} ${phase2Styles.spainPath}`}
              href="#regions"
            >
              <div className={phase2Styles.cardOverlay} />
              <div className={phase2Styles.gatewayCardCopy}>
                <span className={phase2Styles.pathLabel}>Spanish property</span>
                <h2>Looking to buy property in Spain?</h2>
                <p>
                  Explore luxury homes, private opportunities, buyer
                  representation, villa rentals and concierge services across
                  Marbella and the Costa del Sol.
                </p>
                <div className={phase2Styles.pathTags}>
                  <span>Buy</span>
                  <span>Sell</span>
                  <span>Rent</span>
                  <span>Concierge</span>
                </div>
                <strong>Continue to Spain <span aria-hidden="true">↓</span></strong>
              </div>
            </Link>

            <Link
              className={`${phase2Styles.gatewayCard} ${phase2Styles.asiaPath}`}
              href="/asia-gateway"
            >
              <div className={phase2Styles.cardOverlay} />
              <div className={phase2Styles.gatewayCardCopy}>
                <span className={phase2Styles.pathLabel}>Asia Gateway</span>
                <h2>
                  Thinking of Dubai for tax residency? Have you considered
                  Malaysia and Asia? The opportunities might surprise you.
                </h2>
                <p>
                  Before making the conventional move to Dubai, compare the
                  alternatives available across Malaysia and selected Asian
                  markets—from residency and relocation to property investment,
                  company formation and business expansion.
                </p>
                <div className={phase2Styles.pathTags}>
                  <span>Invest</span>
                  <span>Relocate</span>
                  <span>Residency</span>
                  <span>Business</span>
                </div>
                <strong>Compare Malaysia & Asia <span aria-hidden="true">→</span></strong>
              </div>
            </Link>
          </div>

        </div>
      </section>

      <section className={phase2Styles.missionSection} aria-labelledby="mission-heading">
        <div className={`site-shell ${phase2Styles.missionInner}`}>
          <p className="eyebrow">Our mission</p>
          <h2 id="mission-heading">
            Trusted professionals. Verified opportunities.
            <em>New markets.</em>
          </h2>
          <div className={phase2Styles.missionCopy}>
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

      <section className={phase2Styles.expertiseSection} id="expertise">
        <div className="site-shell">
          <div className={phase2Styles.expertiseIntro}>
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

          <div className={phase2Styles.expertiseGrid}>
            {expertise.map((item) => (
              <Link className={phase2Styles.expertiseCard} href={item.href} key={item.title}>
                <span className={phase2Styles.cardNumber}>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className={phase2Styles.cardArrow} aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={phase2Styles.trustSection}>
        <div className="site-shell">
          <div className={phase2Styles.trustHeading}>
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

          <div className={phase2Styles.trustGrid}>
            {trustPoints.map((item, index) => (
              <div className={phase2Styles.trustItem} key={item.title}>
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
    </>
  );
}
