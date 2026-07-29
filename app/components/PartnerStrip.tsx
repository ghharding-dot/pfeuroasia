import styles from "./PartnerStrip.module.css";

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
        <p className="partner-strip-title" id="partner-strip-title">Collaborating with</p>
        <div className={`partner-logo-grid ${styles.partnerGrid}`}>
          <a className="partner-logo partner-pf" href="/go/pfiberia" aria-label="Visit Property Facilitators Iberia">
            <img src="/images/partner-pf-iberia.png" alt="Property Facilitators Iberia" />
          </a>
          <a className="partner-logo" href="/go/aylesford" aria-label="Visit Aylesford Spain">
            <AylesfordLogo />
          </a>
          <div className="partner-logo partner-house"><img src="/images/partner-house-country.png" alt="House and Country Real Estate" /></div>
          <div className="partner-logo partner-luxo" aria-label="LuxoEstates"><span>Luxo</span><b>Estates</b></div>
          <div className="partner-logo partner-legal"><img src="/images/partner-legal10.jpg" alt="Legal 10 Abogados" /></div>
          <div className="partner-logo partner-lawbird"><img src="/images/partner-lawbird.png" alt="Lawbird" /></div>
          <div className="partner-logo"><LuxuryVillaCollectionLogo /></div>
        </div>
      </div>
    </section>
  );
}
