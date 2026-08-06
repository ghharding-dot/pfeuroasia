import Link from "next/link";
import phase2Styles from "../HomePhase2.module.css";

const asiaServices = [
  "International company formation",
  "Residency and long-term visa programmes",
  "Property investment",
  "Family relocation",
  "Business expansion",
  "Banking introductions",
  "Legal and professional services",
];

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
    href: "/services/relocation-concierge",
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
      <section className={phase2Styles.asiaSection} id="asia-opportunities">
        <div className={`site-shell ${phase2Styles.asiaGrid}`}>
          <div className={phase2Styles.asiaCopy}>
            <p className="eyebrow">International opportunity</p>
            <h2>
              Have you considered
              <em>expanding into Asia?</em>
            </h2>
            <p className={phase2Styles.asiaLead}>
              You may be surprised by the opportunities available.
            </p>
            <p>
              For entrepreneurs, investors, families and internationally mobile
              professionals, Asia can offer compelling options for business,
              residency, relocation and property investment. Through our trusted
              local network, EuroAsia helps clients explore opportunities across
              Malaysia, Labuan, Hong Kong, Singapore, Thailand and other key
              regional markets.
            </p>
            <p>
              Whether you are based in the United Kingdom, Scandinavia, Germany,
              Spain or elsewhere in Europe, we can introduce you to experienced
              professionals who can explain the available routes and help you
              assess which jurisdiction may suit your objectives.
            </p>
            <div className={phase2Styles.asiaActions}>
              <Link className="button button-gold" href="/services/relocation-concierge">
                Explore relocation & residency <span>→</span>
              </Link>
              <Link className={phase2Styles.asiaTextLink} href="/enquire">
                Arrange a confidential consultation <span>→</span>
              </Link>
            </div>
          </div>

          <aside className={phase2Styles.asiaPanel}>
            <p className={phase2Styles.panelEyebrow}>Our partner network can assist with</p>
            <ul>
              {asiaServices.map((service) => (
                <li key={service}>
                  <span aria-hidden="true">+</span>
                  {service}
                </li>
              ))}
            </ul>
            <div className={phase2Styles.panelMarkets}>
              <span>Malaysia</span>
              <span>Labuan</span>
              <span>Hong Kong</span>
              <span>Singapore</span>
              <span>Thailand</span>
            </div>
          </aside>
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
