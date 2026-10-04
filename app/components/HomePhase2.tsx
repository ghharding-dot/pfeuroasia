import Link from "next/link";
import phase2Styles from "../HomePhase2.module.css";

export function HomePhase2() {
  return (
    <section className={phase2Styles.gatewayHero} aria-labelledby="gateway-heading">
      <div className={phase2Styles.gatewayOverlay} />
      <div className={`site-shell ${phase2Styles.gatewayInner}`}>
        <div className={phase2Styles.gatewayIntro}>
          <div>
            <p className="eyebrow light">Spain &amp; Malaysia · One trusted network</p>
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
              Luxury property &amp; developments <span>·</span> 100+ rental villas
              <span>·</span> Malaysia residency &amp; company formation
              <span>·</span> International currency transfers
            </p>
            <strong>Select your direction below.</strong>
          </div>
        </div>

        <div className={`${phase2Styles.gatewayCards} ${phase2Styles.weightedCards}`}>
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
                Luxury homes, developments &amp; villa rentals.
              </p>
              <p>
                Buy, invest or rent along the Costa del Sol, with personal
                support in Marbella, Benahavís, La Zagaleta and El Madroñal.
              </p>
              <ul className={phase2Styles.cardHighlights} aria-label="Spain services">
                <li>Luxury properties for sale</li>
                <li>New developments &amp; investment residences</li>
                <li><b>100+ luxury villas to rent</b></li>
              </ul>
              <strong>Explore Spain</strong>
            </div>
          </Link>

          <Link
            className={`${phase2Styles.gatewayCard} ${phase2Styles.aboutPath}`}
            href="/why-euroasia"
          >
            <div className={phase2Styles.cardOverlay} />
            <div className={phase2Styles.cardTopline}>
              <span>02</span>
              <span>Our network</span>
            </div>
            <div className={phase2Styles.gatewayCardCopy}>
              <span className={phase2Styles.pathLabel}>PF EuroAsia</span>
              <h2>About Us</h2>
              <p className={phase2Styles.cardLead}>
                Your trusted connection.
              </p>
              <p>
                Meet the people and partners supporting your plans.
              </p>
              <strong>About us</strong>
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
              <h2>Malaysia <em>&amp; Asia</em></h2>
              <p className={phase2Styles.cardLead}>
                Residency, relocation &amp; business setup.
              </p>
              <p>
                Plan your move from Europe: compare residency routes,
                tax-residence considerations and company formation. Our
                Malaysia property collection is being prepared.
              </p>
              <ul className={phase2Styles.cardHighlights} aria-label="Malaysia and Asia services">
                <li>Malaysia residency &amp; relocation</li>
                <li>Malaysia &amp; Labuan company formation</li>
                <li>Tax residence &amp; living-cost guidance</li>
              </ul>
              <strong>Explore Malaysia &amp; Asia</strong>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
