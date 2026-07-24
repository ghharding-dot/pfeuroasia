import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "./commercial.css";

const services = [
  {
    number: "01",
    title: "Development Land",
    copy: "Residential, mixed-use, coastal and resort development opportunities selected for serious investors and development partners.",
  },
  {
    number: "02",
    title: "Hotels & Hospitality",
    copy: "Operating hotels, repositioning opportunities, redevelopment assets and confidential hospitality transactions.",
  },
  {
    number: "03",
    title: "Investment Assets",
    copy: "Income-producing buildings, strategic acquisitions and commercial real estate opportunities across our markets.",
  },
  {
    number: "04",
    title: "Joint Ventures",
    copy: "Introductions between landowners, developers, operators and capital partners where interests are properly aligned.",
  },
  {
    number: "05",
    title: "Family Offices",
    copy: "Discreet acquisition support, local representation and opportunity sourcing for private investors and family offices.",
  },
  {
    number: "06",
    title: "Saudi & Gulf Connections",
    copy: "Selected opportunities and introductions supported by trusted business relationships across Saudi Arabia and the wider Gulf region.",
  },
];

export default function CommercialPage() {
  return (
    <main className="commercial-page">
      <Header />

      <section className="commercial-hero">
        <div className="site-shell commercial-hero-content">
          <p className="commercial-eyebrow">Commercial real estate advisory</p>
          <h1>Confidential opportunities across Europe, Asia and the Middle East.</h1>
          <p className="commercial-hero-copy">
            Property Facilitators EuroAsia connects qualified investors, developers,
            operators and family offices with selected commercial property and
            development opportunities through trusted local relationships.
          </p>
        </div>
      </section>

      <section className="commercial-intro">
        <div className="site-shell commercial-intro-grid">
          <div>
            <p className="commercial-eyebrow">Headquartered in Malaysia</p>
            <h2>International reach. Local collaboration.</h2>
          </div>
          <div className="commercial-intro-copy">
            <p>
              From our base in Labuan, Malaysia, we work in collaboration with
              Property Facilitators Iberia in Spain and a growing network of trusted
              professional and business contacts across Asia, Europe and the Gulf.
            </p>
            <p>
              Many opportunities are handled privately and are not promoted through
              public property portals. Detailed information is released only after
              an initial discussion, qualification and, where required, a signed NDA.
            </p>
          </div>
        </div>
      </section>

      <section className="commercial-services">
        <div className="site-shell">
          <div className="commercial-section-heading">
            <p className="commercial-eyebrow">What we handle</p>
            <h2>Commercial opportunities selected for serious counterparties.</h2>
            <p>
              We focus on transactions where access, discretion and the quality of
              the introduction are as important as the asset itself.
            </p>
          </div>

          <div className="commercial-card-grid">
            {services.map((service) => (
              <article className="commercial-card" key={service.title}>
                <span className="commercial-card-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="commercial-process">
        <div className="site-shell">
          <p className="commercial-eyebrow">Private process</p>
          <h2>Access is managed carefully.</h2>
          <div className="commercial-process-grid">
            <article className="commercial-step"><strong>01</strong><h3>Initial enquiry</h3><p>Tell us the asset type, market and investment parameters you are considering.</p></article>
            <article className="commercial-step"><strong>02</strong><h3>Qualification</h3><p>We establish relevance, authority and the appropriate level of information to release.</p></article>
            <article className="commercial-step"><strong>03</strong><h3>NDA & information</h3><p>Where necessary, confidentiality is documented before detailed material is shared.</p></article>
            <article className="commercial-step"><strong>04</strong><h3>Introduction</h3><p>Qualified parties are connected directly for discussion, meetings and due diligence.</p></article>
          </div>
        </div>
      </section>

      <section className="commercial-cta">
        <div className="site-shell commercial-cta-inner">
          <div className="commercial-cta-copy">
            <p className="commercial-eyebrow">Commercial enquiries</p>
            <h2>Request access to current opportunities.</h2>
            <p>
              Register your interest or contact our commercial team to discuss your
              investment criteria in confidence.
            </p>
          </div>
          <div className="commercial-actions">
            <Link className="commercial-button is-dark" href="/enquire">Register interest</Link>
            <Link className="commercial-button" href="/private-portfolio">Private collection</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
