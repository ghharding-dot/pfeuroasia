import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { SkyscannerFlightSearch } from "../../components/SkyscannerFlightSearch";
import styles from "../Travel.module.css";

export const metadata: Metadata = {
  title: "Travel to Spain | Flights, Luxury Villas & Local Support",
  description: "Plan travel to Marbella and Southern Spain with live flight search, luxury villa rentals, private transfers and trusted local support from PF EuroAsia.",
  alternates: { canonical: "/travel/spain" },
  openGraph: {
    title: "Travel to Spain with PF EuroAsia",
    description: "Flights, luxury villa stays and trusted local support in Marbella and Southern Spain.",
    url: "/travel/spain",
    images: ["/images/luxury-villa-rentals/panoramic-twilight.webp"],
  },
};

const services = [
  ["01", "Choose the right villa", "Explore selected luxury rentals across Marbella, La Zagaleta, El Madroñal, Sierra Blanca and the Golden Mile."],
  ["02", "Arrange your arrival", "Coordinate airport collection, private transfers and the practical details surrounding your stay."],
  ["03", "Use the visit well", "Combine your trip with property viewings, area introductions or private meetings with trusted local professionals."],
];

export default function SpainTravelPage() {
  return <main className={styles.travelPage}>
    <Header transparent enquireHref="/luxury-villa-rentals/enquire" enquireLabel="Plan a Spain stay" />
    <section className={styles.hero}>
      <Image className={`${styles.heroImage} ${styles.spainImage}`} src="/images/luxury-villa-rentals/panoramic-twilight.webp" alt="Luxury villa overlooking the Mediterranean in Marbella" fill priority sizes="100vw" />
      <div className={styles.heroShade} />
      <div className={`site-shell ${styles.heroCopy}`}>
        <p className="eyebrow light">PF EuroAsia Travel · Spain</p>
        <h1>Travel to Spain.<em>Stay exceptionally.</em></h1>
        <p>Plan the journey, secure the right private villa and arrive with trusted support already in place across Marbella and Southern Spain.</p>
      </div>
      <nav className={styles.routeSwitch} aria-label="Choose a travel destination">
        <Link className={styles.active} href="/travel/spain"><span>Travelling to Spain</span><small>You are here</small></Link>
        <Link href="/travel/malaysia"><span>Travelling to Malaysia</span><b aria-hidden="true">→</b></Link>
      </nav>
    </section>

    <section className={styles.intro}><div className={`site-shell ${styles.introGrid}`}><div><p className="eyebrow">One coordinated journey</p><h2>More than simply booking a flight.</h2></div><div><p>PF EuroAsia connects the practical parts of a Spain visit: live flight comparison, carefully selected villa accommodation, transfers and local assistance. If the trip also involves property, we can coordinate focused viewings and trusted professional introductions.</p><div className={styles.serviceTags}><span>Flights</span><span>Luxury villas</span><span>Transfers</span><span>Property visits</span></div></div></div></section>

    <section className={styles.flightSection}><div className={`site-shell ${styles.flightGrid}`}><div className={styles.flightCopy}><p className="eyebrow light">Search live flights</p><h2>Fly to Málaga.</h2><p>Compare current flight options with Skyscanner. Málaga-Costa del Sol Airport (AGP) is preselected and your departure point can be suggested from your location.</p><small>Schedules, availability and fares are supplied by Skyscanner and can change. Results open on Skyscanner. Affiliate tracking will be added when PF EuroAsia&apos;s approved partner details are available.</small></div><div className={styles.flightWidget}><SkyscannerFlightSearch destinationName="Málaga" destinationIata="AGP" buttonLabel="Search flights to Málaga" /></div></div></section>

    <section className={styles.featureSection}><div className={`site-shell ${styles.featureGrid}`}><div className={styles.featureImage}><Image src="/images/luxury-villa-rentals/la-zagaleta.webp" alt="Private luxury villa available for rent in La Zagaleta" fill sizes="(max-width: 900px) 100vw, 56vw" /></div><div className={styles.featureCopy}><p className="eyebrow light">Private villa collection</p><h2>Your stay, properly considered.</h2><p>Our rental channel provides access to selected private villas supported by experienced local specialists. Tell us your dates, group size, preferred area and the atmosphere you want—we will focus the search around the stay itself.</p><Link className="button button-gold" href="/luxury-villa-rentals">Explore luxury villa rentals <span>→</span></Link></div></div></section>

    <section className={styles.stepsSection}><div className="site-shell"><p className="eyebrow light">How we can help</p><div className={styles.stepsGrid}>{services.map(([number,title,text])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className={styles.cta}><div className="site-shell"><p className="eyebrow">Start with your dates</p><h2>Planning time in Marbella?</h2><p>Tell us when you wish to travel, who is joining you and what you want from the visit. We will coordinate the most relevant next steps.</p><Link className="button button-dark" href="/luxury-villa-rentals/enquire">Plan your Spain stay <span>→</span></Link></div></section>
    <Footer />
  </main>;
}
