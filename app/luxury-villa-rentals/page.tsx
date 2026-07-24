import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { RentalEnquiryForm } from "./RentalEnquiryForm";
import "./luxury-villa-rentals.css";

const areas = [
  {
    name: "La Zagaleta",
    location: "Benahavís",
    image: "https://images.unsplash.com/photo-1757439402359-aed14d39fc1b?auto=format&fit=crop&q=84&w=1600",
  },
  {
    name: "El Madroñal",
    location: "Benahavís",
    image: "https://images.unsplash.com/photo-1677507057691-5b5c166f6050?auto=format&fit=crop&q=84&w=1600",
  },
  {
    name: "Marbella Golden Mile",
    location: "Marbella",
    image: "https://images.unsplash.com/photo-1759405198466-d7f97ef8b4a7?auto=format&fit=crop&q=84&w=1600",
  },
  {
    name: "Benahavís",
    location: "Mountain estates",
    image: "https://images.unsplash.com/photo-1776761731066-c89caa8d25e6?auto=format&fit=crop&q=84&w=1600",
  },
  {
    name: "Puerto Banús",
    location: "Marina living",
    image: "https://images.unsplash.com/photo-1751054551120-1ccbe689d091?auto=format&fit=crop&q=84&w=1600",
  },
  {
    name: "Sierra Blanca",
    location: "Marbella hills",
    image: "https://images.unsplash.com/photo-1777919541982-dcb34c146a2d?auto=format&fit=crop&q=84&w=1600",
  },
];

const conciergeServices = [
  "Private airport transfers",
  "Luxury vehicle hire",
  "Chauffeur services",
  "Yacht charter",
  "Private aviation",
  "Private chefs",
  "Golf reservations",
  "Spa and wellness",
  "Private security",
];

export default function LuxuryVillaRentalsPage() {
  return (
    <main className="villa-rentals-page">
      <Header transparent />

      <section className="villa-rentals-hero">
        <div className="villa-rentals-overlay" />
        <div className="site-shell villa-rentals-hero-inner">
          <div className="villa-rentals-hero-copy">
            <p className="villa-rentals-eyebrow">Luxury villa rentals</p>
            <h1>Exceptional homes.<br /><em>Personal service.</em></h1>
            <p className="villa-rentals-tagline">Complete discretion.</p>
            <p className="villa-rentals-collaboration">
              Property Facilitators EuroAsia <span>×</span> The Luxury Villa Collection
            </p>
            <Link className="villa-rentals-button" href="#villa-enquiry">
              Request your bespoke villa selection <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="villa-rentals-intro">
        <div className="site-shell villa-rentals-intro-grid">
          <div>
            <p className="villa-rentals-eyebrow dark">A carefully selected collection</p>
            <h2>Luxury stays, personally arranged.</h2>
          </div>
          <div className="villa-rentals-body-copy">
            <p>
              Through our collaboration with The Luxury Villa Collection, Property
              Facilitators EuroAsia provides access to an exceptional portfolio of
              personally inspected luxury villas across Marbella and the surrounding
              prime residential areas.
            </p>
            <p>
              Whether you are planning a family holiday, an extended stay, a corporate
              retreat or a private celebration, every enquiry is handled individually
              and in confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="villa-rentals-areas">
        <div className="site-shell">
          <div className="villa-rentals-section-heading">
            <p className="villa-rentals-eyebrow">Hand-picked luxury villas</p>
            <h2>Prime addresses across the Marbella region.</h2>
          </div>
          <div className="villa-rentals-area-grid">
            {areas.map((area, index) => (
              <a className="villa-rentals-area-card" href="#villa-enquiry" key={area.name}>
                <span
                  className="villa-rentals-area-photo"
                  style={{ backgroundImage: `url(${area.image})` }}
                  aria-hidden="true"
                />
                <span className="villa-rentals-area-shade" aria-hidden="true" />
                <span className="villa-rentals-area-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="villa-rentals-area-copy">
                  <p>{area.location}</p>
                  <h3>{area.name}</h3>
                  <small>Request villas <b>→</b></small>
                </div>
              </a>
            ))}
          </div>
          <p className="villa-rentals-image-note">Representative location imagery. Individual villa selections are shared privately in response to each enquiry.</p>
        </div>
      </section>

      <section className="villa-rentals-concierge">
        <div className="site-shell villa-rentals-concierge-grid">
          <div>
            <p className="villa-rentals-eyebrow dark">Concierge services</p>
            <h2>Every detail considered.</h2>
            <p>
              Your villa is only the beginning. Our teams can coordinate the services
              required to make your stay effortless, comfortable and entirely personal.
            </p>
          </div>
          <div className="villa-rentals-service-list">
            {conciergeServices.map((service) => (
              <div key={service}><span>◆</span>{service}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="villa-rentals-partnership">
        <div className="site-shell villa-rentals-partnership-inner">
          <div className="villa-rentals-branding">
            <div className="villa-rentals-euroasia-mark">
              <img src="/images/pf-gold-symbol.png" alt="" />
              <strong>Property Facilitators<br />EuroAsia</strong>
            </div>
            <span className="villa-rentals-cross">×</span>
            <div className="villa-rentals-lvc-placeholder" aria-label="The Luxury Villa Collection">
              <span>The</span>
              <strong>Luxury Villa<br />Collection</strong>
            </div>
          </div>
          <p>
            Every enquiry is personally managed by Property Facilitators EuroAsia in
            collaboration with The Luxury Villa Collection, ensuring each client receives
            a carefully tailored villa selection together with comprehensive concierge support.
          </p>
        </div>
      </section>

      <section className="villa-rentals-enquiry" id="villa-enquiry">
        <div className="site-shell villa-rentals-enquiry-layout">
          <div className="villa-rentals-enquiry-copy">
            <p className="villa-rentals-eyebrow">Private enquiries</p>
            <h2>Request your bespoke villa selection.</h2>
            <p>
              Share your preferred dates, group size, bedroom requirement, location and
              approximate budget. We will respond personally with carefully selected options.
            </p>
            <ul>
              <li>Confidential, individually managed enquiries</li>
              <li>Access to on-market and privately available villas</li>
              <li>Full concierge support before and during your stay</li>
            </ul>
          </div>
          <RentalEnquiryForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
