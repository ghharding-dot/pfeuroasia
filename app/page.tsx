import Link from "next/link";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HomePhase2 } from "./components/HomePhase2";
import { createMetadata } from "./lib/seo";
import styles from "./HomePhase2.module.css";
import vaultButtonStyles from "./HomeVaultButton.module.css";

export const metadata = createMetadata("homeEn");

export default function Home() {
  return (
    <main>
      <Header transparent />
      <Link
        className={vaultButtonStyles.button}
        href="/vault"
        aria-label="Open The Vault administration"
      >
        The Vault
      </Link>

      <HomePhase2 />

      <section className={styles.missionSection} aria-labelledby="home-about-heading">
        <div className={`site-shell ${styles.missionInner}`}>
          <p className="eyebrow">Property Facilitators EuroAsia</p>
          <h2 id="home-about-heading">
            One trusted relationship.
            <em>Three distinct pathways.</em>
          </h2>
          <div className={styles.missionCopy}>
            <p>
              PF EuroAsia connects clients with established property,
              relocation, legal, residency and business specialists across
              Spain, Malaysia and selected international markets.
            </p>
            <p>
              Choose the gateway that reflects your objective. We will
              coordinate the right people and remain your trusted point of
              contact throughout the journey.
            </p>
            <Link className="text-link" href="/why-euroasia">
              Discover PF EuroAsia and our network <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="site-shell cta-inner">
          <p className="eyebrow light">A private conversation</p>
          <h2>Tell us which direction you are considering.</h2>
          <p>
            Spain, Malaysia or a wider cross-border opportunity—we will
            respond personally and in confidence.
          </p>
          <Link className="button button-gold" href="/enquire">
            Begin your enquiry <span>→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
