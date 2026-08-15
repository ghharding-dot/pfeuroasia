import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import regionStyles from "../HomeRegions.module.css";
import styles from "./AsiaGateway.module.css";

const services = [
  {
    number: "01",
    title: "Property investment",
    text: "Selected residential and development opportunities, beginning with Kuala Lumpur and Malaysia.",
  },
  {
    number: "02",
    title: "Residency pathways",
    text: "Introductions to qualified local specialists who can explain current programmes, eligibility and process.",
  },
  {
    number: "03",
    title: "Company formation",
    text: "Professional introductions for establishing and operating businesses in Malaysia, Labuan and selected Asian jurisdictions.",
  },
  {
    number: "04",
    title: "Relocation support",
    text: "Practical coordination for individuals, families and internationally mobile professionals considering a move to Asia.",
  },
  {
    number: "05",
    title: "Discovery visits",
    text: "A developing concierge service combining destination familiarisation, property viewings and professional meetings.",
  },
  {
    number: "06",
    title: "Business expansion",
    text: "Trusted introductions for European businesses assessing new relationships and opportunities across the region.",
  },
];

export default function AsiaGatewayPage() {
  return (
    <main>
      <Header
        transparent
        enquireHref="/asia-gateway/enquire"
        enquireLabel="Asia enquiry"
      />

      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={`site-shell ${styles.heroInner}`}>
          <p className="eyebrow light">Asia Gateway</p>
          <h1>
            Explore Asia.
            <em>Begin with Malaysia.</em>
          </h1>
          <p>
            Property investment, residency, relocation and business
            opportunities introduced through a growing network of experienced
            local professionals.
          </p>
          <div className={styles.heroActions}>
            <Link className="button button-gold" href="/asia-gateway/enquire">
              Arrange a confidential consultation <span>→</span>
            </Link>
            <Link className="text-link light-link" href="/services/labuan-company-residency/adviser">
              Ask the Malaysia Adviser <span>→</span>
            </Link>
            <Link className="text-link light-link" href="/markets/malaysia">
              View Malaysia property <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={`site-shell ${styles.introGrid}`}>
          <div>
            <p className="eyebrow">A dedicated Asia pathway</p>
            <h2>
              Understand the opportunity
              <em>before making the move.</em>
            </h2>
          </div>
          <div className={styles.introCopy}>
            <p>
              EuroAsia is developing a dedicated service for clients from the
              United Kingdom, Scandinavia, Germany, Spain and elsewhere in
              Europe who are considering investment, residency, relocation or
              business expansion in Asia.
            </p>
            <p>
              Malaysia is our first focus, with Kuala Lumpur and Labuan offering
              distinct property, lifestyle and commercial possibilities. Our
              role is to help clients identify the right specialists, arrange
              useful introductions and coordinate the journey from initial
              enquiry to an informed decision.
            </p>
          </div>
        </div>
      </section>

      <section className={regionStyles.regionsSection}>
        <div className="site-shell">
          <div className={regionStyles.heading}>
            <div>
              <p className="eyebrow">Explore our international markets</p>
              <h2>Malaysia & the Middle East.<em>Distinct opportunities.</em></h2>
            </div>
            <p>
              Begin with the market most relevant to your objectives. Malaysia
              offers property, lifestyle, residency and business possibilities,
              while the Gulf region adds selected investment and private-client
              opportunities through trusted local relationships.
            </p>
          </div>

          <div className={regionStyles.regionGrid}>
            <article className={`${regionStyles.regionCard} ${regionStyles.malaysia}`}>
              <div className={regionStyles.regionInner}>
                <span className={regionStyles.regionLabel}>Southeast Asia</span>
                <div className={regionStyles.regionCopy}>
                  <h3>Malaysia</h3>
                  <p>Property, residency, relocation and business connections centred on Kuala Lumpur and Labuan.</p>
                  <nav className={regionStyles.subLinks} aria-label="Explore Malaysia">
                    <Link href="/markets/malaysia">Kuala Lumpur</Link>
                    <Link href="/markets/malaysia">Developments</Link>
                    <Link href="/asia-gateway/enquire">Relocation</Link>
                    <Link href="/asia-gateway/enquire">Labuan</Link>
                  </nav>
                </div>
                <Link className={regionStyles.cardCta} href="/markets/malaysia">Explore Malaysia →</Link>
              </div>
            </article>

            <article className={`${regionStyles.regionCard} ${regionStyles.middleEast}`}>
              <div className={regionStyles.regionInner}>
                <span className={regionStyles.regionLabel}>Gulf region</span>
                <div className={regionStyles.regionCopy}>
                  <h3>Middle East</h3>
                  <p>Selected property, investment and private-client opportunities supported by trusted local relationships.</p>
                  <nav className={regionStyles.subLinks} aria-label="Explore the Middle East">
                    <Link href="/markets/middle-east#saudi-arabia">Saudi Arabia</Link>
                    <Link href="/markets/middle-east#uae">UAE</Link>
                    <Link href="/markets/middle-east#qatar">Qatar</Link>
                  </nav>
                </div>
                <Link className={regionStyles.cardCta} href="/markets/middle-east">Explore Middle East →</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div>
              <p className="eyebrow light">What the Asia Gateway will cover</p>
              <h2>One point of contact.<br />Several specialist services.</h2>
            </div>
            <p>
              This page is the first stage of a wider platform. Additional
              destination, residency, property and discovery-visit guidance will
              be introduced as each service is finalised.
            </p>
          </div>

          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <article key={service.title}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.malaysiaSection}>
        <div className={`site-shell ${styles.malaysiaGrid}`}>
          <div className={styles.malaysiaImage} role="img" aria-label="Kuala Lumpur skyline at night" />
          <div className={styles.malaysiaCopy}>
            <p className="eyebrow">Featured destination</p>
            <h2>Malaysia</h2>
            <p>
              Begin with Kuala Lumpur for selected property opportunities and
              an internationally connected city lifestyle, or explore Labuan
              for specialist business and residency conversations through
              qualified local advisers.
            </p>
            <p className={styles.priceNote}>
              Selected Kuala Lumpur property opportunities are available from
              approximately <strong>US$150,000</strong>, subject to current
              availability and confirmation.
            </p>
            <Link className="button button-dark" href="/markets/malaysia">
              Explore Malaysia opportunities <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.comingSoon}>
        <div className={`site-shell ${styles.comingSoonInner}`}>
          <div>
            <p className="eyebrow light">In development</p>
            <h2>Discover Asia before you decide.</h2>
          </div>
          <div>
            <p>
              Planned additions include Malaysia discovery visits, recommended
              accommodation, airport transfers, property tours, residency and
              company-formation meetings, and carefully selected hospitality
              and lifestyle experiences.
            </p>
            <p>
              Hospitality brands and collaborative partners will only be named
              where the relationship has been appropriately authorised.
            </p>
            <Link className="text-link light-link" href="/asia-gateway/enquire">
              Register your interest <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
