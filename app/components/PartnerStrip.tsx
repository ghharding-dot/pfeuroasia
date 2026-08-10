import styles from "./PartnerStrip.module.css";
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
    <section className="partner-strip" aria-labelledby="partner-strip-title">
      <div className="site-shell">
        <p className="partner-strip-title" id="partner-strip-title">Our collaboration network</p>

        <div className={styles.partnerGroup}>
          <p className={styles.groupEyebrow}>Property representation partners</p>
          <p className={styles.rentalStatement}>Hover on desktop or tap once on mobile to discover each partner.</p>
          <InteractivePropertyPartners />
        </div>

        <div className={styles.partnerGroup}>
          <div className={styles.groupDivider} aria-hidden="true" />
          <p className={styles.groupEyebrow}>Legal representation partners</p>
          <p className={styles.rentalStatement}>Hover on desktop or tap once on mobile to discover each firm.</p>
          <InteractiveLegalPartners />
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

        <div className={styles.rentalPartnerSection}>
          <div className={styles.rentalDivider} aria-hidden="true" />
          <p className={styles.rentalEyebrow}>Approved PF EuroAsia collaborators</p>
          <p className={styles.rentalStatement}>
            Securely submit your direct property listings, photography and private brochure for PF EuroAsia review.
          </p>
          <a className={styles.collaboratorButton} href="/collaborators">
            Collaborator Login <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
