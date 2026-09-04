import styles from "./PartnerStrip.module.css";
import { InteractiveAsiaPartners } from "./InteractiveAsiaPartners";
import { InteractiveLegalPartners } from "./InteractiveLegalPartners";
import { InteractivePropertyPartners } from "./InteractivePropertyPartners";

function LuxuryVillaCollectionLogo() {
  return (
    <div className={styles.lvcLogo} aria-label="The Luxury Villa Collection">
      <span className={styles.lvcEmblem} aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <rect x="7" y="7" width="34" height="34" />
          <path d="M24 11v26M11 24h26M15 15l18 18M33 15 15 33" />
          <circle cx="24" cy="24" r="8" />
        </svg>
      </span>
      <span className={styles.lvcWords}>
        <strong>Luxury Villa</strong>
        <span>Collection</span>
      </span>
    </div>
  );
}

export function PartnerStrip() {
  return (
    <section className="partner-strip" id="collaboration-network" aria-labelledby="partner-strip-title">
      <div className="site-shell">
        <p className="partner-strip-title" id="partner-strip-title">Our collaboration network</p>

        <div className={styles.partnerGroup}>
          <p className={styles.groupEyebrow}>Spain collaborations</p>
          <p className={styles.rentalStatement}>Hover on desktop or tap once on mobile to discover each partner.</p>
          <InteractivePropertyPartners />
        </div>

        <div className={styles.partnerGroup}>
          <div className={styles.groupDivider} aria-hidden="true" />
          <p className={styles.groupEyebrow}>Legal collaborations</p>
          <p className={styles.rentalStatement}>Hover on desktop or tap once on mobile to discover each firm.</p>
          <InteractiveLegalPartners />
        </div>

        <div className={styles.partnerGroup}>
          <div className={styles.groupDivider} aria-hidden="true" />
          <p className={styles.groupEyebrow}>Malaysia &amp; Asia collaborations</p>
          <p className={styles.rentalStatement}>Trusted regional specialists supporting international clients across Asia.</p>
          <InteractiveAsiaPartners />
        </div>

        <div className={styles.financialPartnerSection}>
          <div className={styles.rentalDivider} aria-hidden="true" />
          <p className={styles.rentalEyebrow}>Currency &amp; international payments partner</p>
          <div className={styles.financialFeature}>
            <div className={styles.financialCopy}>
              <p className={styles.rentalFeatureLead}>Europe · UAE · Spain · Asia</p>
              <h3>Estuary FX</h3>
              <p>Specialist support for international property payments, personal transfers and business foreign exchange, with a dedicated account manager throughout.</p>
              <p>Particularly relevant for clients moving funds from Dubai and the UAE to purchase property in Spain.</p>
              <a className={styles.rentalFeatureLink} href="/international-payments">Explore international payments <span>→</span></a>
            </div>
            <a className={styles.estuaryLogo} href="/international-payments" aria-label="Estuary FX international payments">
              <img src="/images/estuary-fx-logo.png" alt="Estuary FX" />
              <small>Currency exchange · International payments · Risk management</small>
            </a>
          </div>
        </div>

        <div className={`${styles.rentalPartnerSection} ${styles.featuredRentalSection}`}>
          <div className={styles.rentalDivider} aria-hidden="true" />
          <p className={styles.rentalEyebrow}>Luxury villa rental partner</p>
          <div className={styles.rentalFeature}>
            <div className={styles.rentalFeatureCopy}>
              <p className={styles.rentalFeatureLead}>A collection of Spanish luxury villas, curated with you in mind.</p>
              <h3>The Luxury Villa Collection</h3>
              <p>
                Whether you are planning time away with friends or family, or a special event or celebration, The Luxury Villa Collection focuses on finding the right villa for the way you want to travel.
              </p>
              <p>
                Each villa is personally vetted and hand-selected. The I-PRAC Approved portfolio is curated with care, combining distinctive homes with exceptional service possibilities to help create memorable stays in style, comfort and luxury.
              </p>
              <p className={styles.lvcDifference}>The <strong>LVC Difference</strong>.</p>
              <a className={styles.rentalFeatureLink} href="/luxury-villa-rentals#villa-enquiry">
                Explore luxury villa rentals <span>→</span>
              </a>
              <a
                className={styles.rentalInstagramLink}
                href="https://www.instagram.com/theluxuryvillaco/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open The Luxury Villa Collection on Instagram"
              >
                Instagram @theluxuryvillaco <span>↗</span>
              </a>
            </div>
            <a
              className={`partner-logo ${styles.rentalPartnerLogo} ${styles.rentalPartnerLogoLarge}`}
              href="/luxury-villa-rentals#villa-enquiry"
              aria-label="Request a bespoke luxury villa selection"
            >
              <LuxuryVillaCollectionLogo />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
