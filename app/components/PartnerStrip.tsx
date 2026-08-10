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

        <div className={styles.rentalPartnerSection}>
          <div className={styles.rentalDivider} aria-hidden="true" />
          <p className={styles.rentalEyebrow}>Luxury villa rental partner</p>
          <p className={styles.rentalStatement}>
            For exceptional short-term villa rentals, we work in collaboration with our specialist luxury rental partner.
          </p>
          <a
            className={`partner-logo ${styles.rentalPartnerLogo}`}
            href="/luxury-villa-rentals#villa-enquiry"
            aria-label="Request a bespoke luxury villa selection"
          >
            <LuxuryVillaCollectionLogo />
          </a>
        </div>
      </div>
    </section>
  );
}
