import Link from "next/link";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import {
  PublicPropertyCarousel,
  type PublicPropertySlide,
} from "./components/PublicPropertyCarousel";
import {
  imageObjectPosition,
  readProperties,
} from "./lib/propertyStore";
import opportunityStyles from "./HomeOpportunities.module.css";
import styles from "./HomeRegions.module.css";

export const dynamic = "force-dynamic";

const services = [
  {
    number: "01",
    title: "Acquisition advisory",
    text: "Private search, rigorous qualification and discreet representation for exceptional homes across Southern Spain.",
    href: "/services/acquisition",
  },
  {
    number: "02",
    title: "International sales",
    text: "Positioning Spanish property for qualified buyers through trusted private networks across Europe and Asia.",
    href: "/services/international-sales",
  },
  {
    number: "03",
    title: "Relocation & concierge",
    text: "Practical, trusted support from first viewing to settled-in ownership—before, during and long after completion.",
    href: "/services/relocation-concierge",
  },
];

async function getPublicPropertySlides(): Promise<PublicPropertySlide[]> {
  try {
    const properties = await readProperties();
    return properties
      .filter(
        (property) =>
          property.status === "published" &&
          (property.visibility === "teaser" || property.visibility === "public") &&
          property.publicImageApproved === true &&
          Boolean(property.image),
      )
      .map((property) => {
        const isTeaser = property.visibility === "teaser";
        return {
          id: property.id,
          image: property.image,
          imagePosition: imageObjectPosition(property.imagePosition),
          title:
            property.publicTitle ||
            (isTeaser ? "Private property opportunity" : property.title),
          location:
            property.publicLocation ||
            (isTeaser ? "Southern Spain" : property.location),
          visibility: property.visibility as "teaser" | "public",
          price:
            property.visibility === "public"
              ? property.price || "Price on application"
              : undefined,
        };
      });
  } catch (error) {
    console.error("homepage-property-carousel-unavailable", error);
    return [];
  }
}

export default async function Home() {
  const publicPropertySlides = await getPublicPropertySlides();

  return (
    <main>
      <Header transparent />

      <section className="hero">
        <div className="hero-shade" />
        <div className="hero-grid site-shell">
          <div className="hero-copy reveal-up">
            <p className="eyebrow light">Private brokerage · Spain · Middle East · Malaysia</p>
            <h1>
              Exceptional homes.
              <span>Borderless representation.</span>
            </h1>
            <p className="hero-intro">
              Independent luxury property advice connecting discerning clients
              across Europe, the Middle East and Asia.
            </p>
            <div className="hero-actions">
              <Link className="button button-gold" href="/enquire">
                Start a confidential enquiry <span>→</span>
              </Link>
              <a className="text-link light-link" href="#regions">
                Explore our markets <span>↓</span>
              </a>
            </div>
          </div>

          <aside className="hero-note reveal-up delay-1">
            <span className="gold-rule" />
            <p>Collaboration partner</p>
            <a className="iberia-logo-link" href="https://pfiberia.com" target="_blank" rel="noreferrer" aria-label="Visit Property Facilitators Iberia">
              <img src="/images/property-facilitators-iberia-logo.png" alt="Property Facilitators Iberia" />
            </a>
            <small>Based in Marbella · Asia connected<br />Local intelligence. International reach.</small>
          </aside>
        </div>

        <div className="hero-footer site-shell">
          <p>Spain · Middle East · Malaysia · Luxury Villa Rentals</p>
          <p className="scroll-note">Scroll to discover</p>
        </div>
      </section>

      <section className="intro-section section-pad">
        <div className="site-shell intro-grid">
          <p className="eyebrow">A trusted bridge</p>
          <div>
            <h2 className="display-heading">
              The right property is only half the equation.
              <em>The right representation is everything.</em>
            </h2>
            <p className="large-copy">
              Property Facilitators EuroAsia combines more than 25 years of
              prime Costa del Sol market experience with trusted relationships
              across Asia. We advise fewer clients, more closely—bringing
              clarity, access and absolute discretion to every mandate.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.regionsSection} id="regions">
        <div className="site-shell">
          <div className={styles.heading}>
            <div>
              <p className="eyebrow">Explore our world</p>
              <h2>Three regions.<em>One trusted relationship.</em></h2>
            </div>
            <p>
              Begin with the market that interests you, then explore the
              locations and services available through our direct network.
            </p>
          </div>

          <div className={styles.regionGrid}>
            <article className={`${styles.regionCard} ${styles.spain}`}>
              <div className={styles.regionInner}>
                <span className={styles.regionLabel}>Europe</span>
                <div className={styles.regionCopy}>
                  <h3>Spain</h3>
                  <p>Luxury residential property, private estates and relocation across Marbella and the Costa del Sol.</p>
                  <nav className={styles.subLinks} aria-label="Explore Spain">
                    <Link href="/markets/marbella">Marbella</Link>
                    <Link href="/areas/la-zagaleta">La Zagaleta</Link>
                    <Link href="/areas/el-madronal">El Madroñal</Link>
                    <Link href="/private-portfolio">Private estates</Link>
                  </nav>
                </div>
                <Link className={styles.cardCta} href="/markets/marbella">Explore Spain →</Link>
              </div>
            </article>

            <article className={`${styles.regionCard} ${styles.middleEast}`}>
              <div className={styles.regionInner}>
                <span className={styles.regionLabel}>Gulf region</span>
                <div className={styles.regionCopy}>
                  <h3>Middle East</h3>
                  <p>Selected property, investment and private-client opportunities supported by trusted local relationships.</p>
                  <nav className={styles.subLinks} aria-label="Explore the Middle East">
                    <Link href="/markets/middle-east#saudi-arabia">Saudi Arabia</Link>
                    <Link href="/markets/middle-east#uae">UAE</Link>
                    <Link href="/markets/middle-east#qatar">Qatar</Link>
                  </nav>
                </div>
                <Link className={styles.cardCta} href="/markets/middle-east">Explore Middle East →</Link>
              </div>
            </article>

            <article className={`${styles.regionCard} ${styles.malaysia}`}>
              <div className={styles.regionInner}>
                <span className={styles.regionLabel}>Southeast Asia</span>
                <div className={styles.regionCopy}>
                  <h3>Malaysia</h3>
                  <p>Property, residency, relocation and business connections centred on Kuala Lumpur and Labuan.</p>
                  <nav className={styles.subLinks} aria-label="Explore Malaysia">
                    <Link href="/markets/malaysia">Kuala Lumpur</Link>
                    <Link href="/markets/malaysia">Developments</Link>
                    <Link href="/services/relocation-concierge">Relocation</Link>
                    <Link href="/enquire">Labuan</Link>
                  </nav>
                </div>
                <Link className={styles.cardCta} href="/markets/malaysia">Explore Malaysia →</Link>
              </div>
            </article>
          </div>

          <article className={`${styles.rentalCard} ${styles.rentals}`}>
            <div className={styles.rentalInner}>
              <div className={styles.rentalCopy}>
                <span className={styles.regionLabel}>Private stays · Concierge</span>
                <h3>Luxury Villa Rentals</h3>
                <p>Exceptional villas, discreet service and fully coordinated stays in Marbella and selected destinations.</p>
              </div>
              <Link className={styles.rentalCta} href="/luxury-villa-rentals">
                View luxury villas <span>→</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      <PublicPropertyCarousel slides={publicPropertySlides} />

      <section className="services-section section-pad" id="services">
        <div className="site-shell">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow light">What we do</p>
              <h2>Private service.<br />Global perspective.</h2>
            </div>
            <p>
              A focused advisory model for buying, selling and establishing a
              life in Spain—with one point of contact throughout.
            </p>
          </div>

          <div className="service-list">
            {services.map((service) => (
              <Link className="service-row" href={service.href} key={service.title}>
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="round-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="gateway-section">
        <div className="gateway-image" role="img" aria-label="Luxury Asian city residence at blue hour" />
        <div className="gateway-copy">
          <p className="eyebrow light">Europe meets Asia</p>
          <h2>One relationship.<br />Two worlds.</h2>
          <p>
            For clients in Asia, we make Spain feel closer: qualifying the
            market, opening the right doors and coordinating every detail on
            the ground. For Spanish owners, we create considered exposure to a
            genuinely international audience.
          </p>
          <div className="gateway-points">
            <span>Spain-side presence</span>
            <span>Cross-border coordination</span>
            <span>Confidential private network</span>
          </div>
          <Link className="text-link light-link" href="/about">
            Discover our approach <span>→</span>
          </Link>
        </div>
      </section>

      <section className="market-section section-pad" id="markets">
        <div className="site-shell market-grid">
          <div className="market-card image-card">
            <div className="image-card-label">
              <p className="eyebrow light">Spain</p>
              <h3>Rare access to the Costa del Sol</h3>
            </div>
          </div>
          <div className="market-copy">
            <p className="eyebrow">Local intelligence</p>
            <h2>Knowledge built over decades, not databases.</h2>
            <p>
              In prime residential markets, the best opportunities are not
              always the most visible. Our work is grounded in long-standing
              local relationships, direct market knowledge and an honest view
              of value.
            </p>
            <ul>
              <li><span>01</span> Prime and off-market property sourcing</li>
              <li><span>02</span> Commercial and legal coordination</li>
              <li><span>03</span> End-to-end ownership support</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="private-portfolio section-pad" id="private-portfolio">
        <div className="site-shell">
          <div className="portfolio-intro">
            <div>
              <p className="eyebrow light">Specialist private opportunities</p>
              <h2>Some requirements begin beyond the conventional market.</h2>
            </div>
            <div>
              <p>
                We maintain discreet access to specialist residential and
                property-led investment opportunities. Register your criteria
                and we will respond personally with suitable public and private
                introductions.
              </p>
              <Link className="button button-gold private-access-button" href="/private-portfolio/access">
                Access Private Portfolio <span>→</span>
              </Link>
            </div>
          </div>

          <div className="portfolio-grid">
            <Link
              className="portfolio-card portfolio-estate"
              href="/opportunities/country-estates"
              aria-label="Register requirements for country estates in Andalusia"
            >
              <span className="image-note">Specialist search</span>
              <div className="portfolio-card-copy">
                <p>Andalusia · More than 20,000 m² of land</p>
                <h3>Country Estates</h3>
                <span>
                  Large private estates, fincas, cortijos, equestrian,
                  agricultural and lifestyle properties with substantial land.
                </span>
                <span className={opportunityStyles.cardAction}>Register requirements →</span>
              </div>
            </Link>

            <Link
              className="portfolio-card portfolio-contemporary"
              href="/opportunities/investment-opportunities"
              aria-label="Register interest in private investment opportunities"
            >
              <span className="image-note">Confidential introductions</span>
              <div className="portfolio-card-copy">
                <p>Property-led investment · Selected opportunities</p>
                <h3>Private Investment Opportunities</h3>
                <span>
                  Hotels, commercial property, development sites, land,
                  refurbishment projects and income-producing assets.
                </span>
                <span className={opportunityStyles.cardAction}>Register interest →</span>
              </div>
            </Link>
          </div>

          <p className="portfolio-disclaimer">
            Opportunities may be available publicly or by private introduction.
            Identifying details are disclosed only after appropriate qualification.
          </p>
        </div>
      </section>

      <section className="cta-section">
        <div className="site-shell cta-inner">
          <p className="eyebrow light">A private conversation</p>
          <h2>Tell us what you are looking to achieve.</h2>
          <p>
            Buying, selling or exploring a strategic partnership—we will
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
