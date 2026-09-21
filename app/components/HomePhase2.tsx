import Link from "next/link";
import phase2Styles from "../HomePhase2.module.css";

export function HomePhase2() {
  return (
    <section className={phase2Styles.gatewayHero} aria-labelledby="gateway-heading">
      <div className={phase2Styles.gatewayOverlay} />
      <div className={`site-shell ${phase2Styles.gatewayInner}`}>
        <div className={phase2Styles.gatewayIntro}>
          <div>
            <p className="eyebrow light">Three gateways · One trusted network</p>
            <h1 id="gateway-heading">
              Choose your direction.
              <em>We will guide the journey.</em>
              <span className={phase2Styles.gatewayPromise}>
                But ultimately, go where you’re treated best.
              </span>
            </h1>
          </div>
          <div className={phase2Styles.gatewayServices}>
            <p>
              Exclusive residential properties <span>·</span> Investment properties
              <span>·</span> International monetary transfers <span>·</span> Top legal advice
              <span>·</span> Local collaborative partners in all zones
            </p>
            <strong>Select your direction below.</strong>
          </div>
        </div>

        <div className={phase2Styles.gatewayCards}>
          <Link
            className={`${phase2Styles.gatewayCard} ${phase2Styles.spainPath}`}
            href="/spain-gateway"
          >
            <div className={phase2Styles.cardOverlay} />
            <div className={phase2Styles.cardTopline}>
              <span>01</span>
              <span>Spain · Costa del Sol</span>
            </div>
            <div className={phase2Styles.gatewayCardCopy}>
              <span className={phase2Styles.pathLabel}>Spain Gateway</span>
              <h2>Spain</h2>
              <p className={phase2Styles.cardLead}>
                Luxury property and trusted local expertise.
              </p>
              <p>
                Selected villas, discreet opportunities and personal
                representation across Marbella, Benahavís and the Costa del
                Sol.
              </p>
              <strong>Enter Spain Gateway <span aria-hidden="true">→</span></strong>
            </div>
          </Link>

          <Link
            className={`${phase2Styles.gatewayCard} ${phase2Styles.aboutPath}`}
            href="/why-euroasia"
          >
            <div className={phase2Styles.cardOverlay} />
            <div className={phase2Styles.cardTopline}>
              <span>02</span>
              <span>Europe · Asia · Trusted partners</span>
            </div>
            <div className={phase2Styles.gatewayCardCopy}>
              <span className={phase2Styles.pathLabel}>PF EuroAsia</span>
              <h2>About Us</h2>
              <p className={phase2Styles.cardLead}>
                Trusted professionals across borders.
              </p>
              <p>
                A coordinated network connecting property, legal, residency
                and business expertise across Europe and Asia.
              </p>
              <strong>Meet PF EuroAsia <span aria-hidden="true">→</span></strong>
            </div>
          </Link>

          <Link
            className={`${phase2Styles.gatewayCard} ${phase2Styles.asiaPath}`}
            href="/asia-gateway"
          >
            <div className={phase2Styles.cardOverlay} />
            <div className={phase2Styles.cardTopline}>
              <span>03</span>
              <span>Malaysia · Wider Asia</span>
            </div>
            <div className={phase2Styles.gatewayCardCopy}>
              <span className={phase2Styles.pathLabel}>Malaysia &amp; Asia Gateway</span>
              <h2>Malaysia</h2>
              <p className={phase2Styles.cardLead}>
                Property, residency and business opportunities.
              </p>
              <p>
                Explore property, relocation, residency and company formation
                across Malaysia and carefully selected Asian markets.
              </p>
              <strong>Enter Malaysia &amp; Asia <span aria-hidden="true">→</span></strong>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
