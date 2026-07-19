import Link from "next/link";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

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
            <p className="eyebrow light">Private brokerage · Spain ↔ Asia</p>
            <h1>
              Exceptional homes.
              <span>Borderless representation.</span>
            </h1>
            <p className="hero-intro">
              Independent luxury property advice connecting discerning clients
              in Asia with Spain&apos;s most sought-after addresses.
            </p>
            <div className="hero-actions">
              <Link className="button button-gold" href="/enquire">
                Start a confidential enquiry <span>→</span>
              </Link>
              <a className="text-link light-link" href="#services">
                Explore our services <span>↓</span>
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
          <p>La Zagaleta · El Madroñal · Marbella · Costa del Sol</p>
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

      <section className="destinations-section section-pad">
        <div className="site-shell">
          <div className="destinations-heading">
            <div>
              <p className="eyebrow">Our markets</p>
              <h2>Local depth.<br /><em>International direction.</em></h2>
            </div>
            <p>
              Specialist knowledge where we are strongest, supported by a
              carefully developed network between Southern Spain and Asia.
            </p>
          </div>
          <div className="destination-grid">
            <Link className="destination-card marbella-card" href="/markets/marbella">
              <span>Spain</span><div><h3>Marbella</h3><p>Prime coastal and hillside property across the Costa del Sol.</p></div><b>Explore →</b>
            </Link>
            <Link className="destination-card zagaleta-card" href="/areas/la-zagaleta">
              <span>Benahavís</span><div><h3>La Zagaleta</h3><p>Private country-estate living and exceptional residential scale.</p></div><b>Area guide →</b>
            </Link>
            <Link className="destination-card madronal-card" href="/areas/el-madronal">
              <span>Benahavís</span><div><h3>El Madroñal</h3><p>Wooded privacy, panoramic views and a true residential community.</p></div><b>Area guide →</b>
            </Link>
            <Link className="destination-card malaysia-card" href="/markets/malaysia">
              <span>Asia</span><div><h3>Malaysia</h3><p>A strategic bridge for clients, agents and investment relationships.</p></div><b>Discover →</b>
            </Link>
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
              <Link className="text-link light-link" href="/enquire">Request private access <span>→</span></Link>
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
