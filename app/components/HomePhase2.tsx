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
          <p>
            Spain, our international network and Asia each offer a distinct
            route forward. Select the direction that reflects what you want to
            achieve.
          </p>
        </div>

        <div className={phase2Styles.gatewayCards}>
          <Link
            className={`${phase2Styles.gatewayCard} ${phase2Styles.spainPath}`}
            href="#selected-opportunities-heading"
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
              <strong>Explore Spain <span aria-hidden="true">↓</span></strong>
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
              <span className={phase2Styles.pathLabel}>Our Network</span>
              <h2>PF EuroAsia</h2>
              <p className={phase2Styles.cardLead}>
                Trusted professionals across borders.
              </p>
              <p>
                A coordinated network connecting property, legal, residency
                and business expertise across Europe and Asia.
              </p>
              <strong>Discover our network <span aria-hidden="true">→</span></strong>
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
              <span className={phase2Styles.pathLabel}>Asia Gateway</span>
              <h2>Asia</h2>
              <p className={phase2Styles.cardLead}>
                Property, residency and business opportunities.
              </p>
              <p>
                Explore property, relocation, residency and company formation
                across Malaysia and carefully selected Asian markets.
              </p>
              <strong>Enter Asia Gateway <span aria-hidden="true">→</span></strong>
            </div>
          </Link>
        </div>

        <div className={phase2Styles.travelRoutes} aria-label="PF EuroAsia travel planning">
          <Link href="/luxury-villa-rentals" className={phase2Styles.travelRoute}>
            <span><small>Europe-bound travel</small>Travelling to Spain?</span>
            <strong>Flights · Luxury villas · Local support <b aria-hidden="true">→</b></strong>
          </Link>
          <Link href="/travel/malaysia" className={phase2Styles.travelRoute}>
            <span><small>Asia-bound travel</small>Travelling to Malaysia?</span>
            <strong>Flights · Hotels · Discovery visits <b aria-hidden="true">→</b></strong>
          </Link>
        </div>
      </div>
    </section>
  );
}
