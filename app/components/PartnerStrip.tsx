import styles from "./PartnerStrip.module.css";
import { InteractiveLegalPartners } from "./InteractiveLegalPartners";

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

function AylesfordLogo() {
  return (
    <div className={styles.aylesfordLogo} aria-label="Aylesford Spain">
      <span>Aylesford</span>
      <small>Spain</small>
      <b>Est. 1966</b>
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
          <div className={`partner-logo-grid ${styles.propertyGrid}`}>
            <a className="partner-logo partner-pf" href="/go/pfiberia" aria-label="Enquire through Property Facilitators Iberia">
              <img src="/images/partner-pf-iberia.png" alt="Property Facilitators Iberia" />
            </a>
            <a className="partner-logo" href="/go/aylesford" aria-label="Enquire through Aylesford Spain">
              <AylesfordLogo />
            </a>
            <a className="partner-logo partner-house" href="/go/house-country" aria-label="Enquire through House and Country Real Estate">
              <img src="/images/partner-house-country.png" alt="House and Country Real Estate" />
            </a>
            <a className="partner-logo partner-luxo" href="/go/luxoestates" aria-label="Enquire through LuxoEstates">
              <span>Luxo</span><b>Estates</b>
            </a>
            <a className={`partner-logo ${styles.fixerLogo}`} href="/go/the-fixer" aria-label="Enquire through The Fixer">
              <img src="/images/partner-the-fixer.svg" alt="The Fixer property advisory" />
            </a>
          </div>
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
