import Link from "next/link";
import phase2Styles from "../HomePhase2.module.css";

export function HomePhase2() {
  return (
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
            Three clear routes within one trusted international network.
            Explore Spanish property, discover who we are and what we do, or
            enter our growing Asia Gateway for investment, relocation,
            residency and business opportunities.
          </p>
        </div>

        <div className={phase2Styles.gatewayCards}>
          <Link
            className={`${phase2Styles.gatewayCard} ${phase2Styles.spainPath}`}
            href="#selected-opportunities-heading"
          >
            <div className={phase2Styles.cardOverlay} />
            <div className={phase2Styles.gatewayCardCopy}>
              <span className={phase2Styles.pathLabel}>Spain Gateway</span>
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
            className={`${phase2Styles.gatewayCard} ${phase2Styles.aboutPath}`}
            href="/why-euroasia"
          >
            <div className={phase2Styles.cardOverlay} />
            <div className={phase2Styles.gatewayCardCopy}>
              <span className={phase2Styles.pathLabel}>Why PF EuroAsia</span>
              <h2>Our mission, what we do and our expertise.</h2>
              <p>
                Discover the principles, experience and trusted international
                network behind our property, relocation and cross-border
                advisory service.
              </p>
              <div className={phase2Styles.pathTags}>
                <span>Mission</span>
                <span>Expertise</span>
                <span>Experience</span>
                <span>Network</span>
              </div>
              <strong>Discover PF EuroAsia <span aria-hidden="true">→</span></strong>
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
                Malaysia and Asia?
              </h2>
              <p>
                Compare opportunities across Malaysia and selected Asian
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
  );
}
