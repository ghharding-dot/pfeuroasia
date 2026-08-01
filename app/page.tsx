import Link from "next/link";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import styles from "./HomeRegions.module.css";

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

export default function Home() {
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

      <section className={styles.presenceSection} aria-label="Our international presence">
        <h2 className="sr-only">Our international presence</h2>
        <div className="site-shell">
          <div className={styles.presenceGrid}>
            <article className={styles.presenceCard}>
              <svg className={styles.map} viewBox="0 0 300 190" aria-hidden="true">
                <path d="M48 78 61 55 91 45 114 27 151 30 170 42 201 41 226 58 247 77 237 100 211 111 193 137 164 143 144 159 118 151 93 133 72 120 55 101Z" />
                <path d="M62 56 48 49 37 55 43 67" />
                <path d="M207 43 217 30 227 34 225 53" />
              </svg>
              <div className={styles.location}><strong>Spain</strong><span>Marbella</span></div>
            </article>

            <article className={styles.presenceCard}>
              <svg className={styles.map} viewBox="0 0 300 190" aria-hidden="true">
                <path d="M80 37 131 29 172 42 214 48 237 71 228 91 243 117 221 145 188 156 165 143 128 149 99 132 82 104 61 81Z" />
                <path d="M82 105 57 114 45 134 59 151 82 140 100 132" />
                <path d="M214 49 241 42 257 53 250 72 237 72" />
              </svg>
              <div className={styles.location}><strong>Middle East</strong><span>Riyadh</span></div>
            </article>

            <article className={styles.presenceCard}>
              <svg className={styles.map} viewBox="0 0 300 190" aria-hidden="true">
                <path d="M60 40 86 48 101 67 93 83 104 102 94 125 79 145 66 136 70 116 58 96 63 76 52 59Z" />
                <path d="M152 74 181 58 216 63 243 82 233 105 205 114 177 103 153 110 139 94Z" />
                <path d="M119 117 128 123 124 135 114 132Z" />
              </svg>
              <div className={styles.location}><strong>Malaysia</strong><span>Kuala Lumpur</span></div>
            </article>
          </div>
        </div>
      </section>

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
              <p className="eyebrow light">The private portfolio</p>
              <h2>Not every exceptional home is publicly for sale.</h2>
            </div>
            <div>
              <p>
                Many of the owners we represent value privacy above publicity.
                Their properties will not appear on conventional portals or
                normal marketing channels. Selected opportunities are shared
                discreetly with verified, qualified clients after a confidential
                conversation.
              </p>
              <Link className="button button-gold private-access-button" href="/enquire">
                Access Private Portfolio <span>→</span>
              </Link>
            </div>
          </div>

          <div className="portfolio-grid">
            <article className="portfolio-card portfolio-estate">
              <span className="image-note">Representative image</span>
              <div className="portfolio-card-copy">
                <p>Private opportunity · Benahavís</p>
                <h3>Country estate</h3>
                <span>Significant grounds, mature landscape and extensive lifestyle amenities. Full particulars by private introduction.</span>
              </div>
            </article>
            <article className="portfolio-card portfolio-contemporary">
              <span className="image-note">Representative image</span>
              <div className="portfolio-card-copy">
                <p>Private opportunity · Marbella</p>
                <h3>Contemporary villa</h3>
                <span>Architectural living, exceptional entertaining spaces and a privileged Mediterranean setting. Details on qualification.</span>
              </div>
            </article>
          </div>

          <p className="portfolio-disclaimer">
            To protect our clients, locations, identifying details and approved
            photography are disclosed only at the appropriate stage.
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
