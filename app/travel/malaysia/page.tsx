import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { SkyscannerFlightSearch } from "../../components/SkyscannerFlightSearch";
import styles from "../Travel.module.css";

export const metadata: Metadata = {
  title: "Travel to Malaysia | Flights, Hotels & Discovery Visits",
  description: "Plan travel to Malaysia with live flight search, selected Kuala Lumpur hotels, private transfers and coordinated discovery visits from PF EuroAsia.",
  alternates: { canonical: "/travel/malaysia" },
  openGraph: {
    title: "Travel to Malaysia with PF EuroAsia",
    description: "Flights, selected hotels, transfers and coordinated Malaysia discovery visits.",
    url: "/travel/malaysia",
    images: ["/images/kl BACK GORUND.avif"],
  },
};

const services = [
  ["01", "Shape the itinerary", "Tell us your dates, interests and priorities so the visit is organised around what you genuinely want to understand."],
  ["02", "Coordinate your arrival", "Selected accommodation and private airport transfer options can be arranged through trusted local relationships."],
  ["03", "Make useful connections", "Include property visits, residency or company meetings and introductions to relevant Malaysia specialists when appropriate."],
];

const hotels = [
  { title: "The Ritz-Carlton, Kuala Lumpur", image: "/images/Ritz%20CARLTON.webp", text: "A refined central Kuala Lumpur stay with a quieter luxury atmosphere, dining and spa facilities.", href: "https://www.ytlhotels.com/hotels-and-resorts/malaysia/the-ritz-carlton/" },
  { title: "JW Marriott Kuala Lumpur", image: "/images/JW%20Marriott%20STREET.jpg", text: "A city-centre base close to Kuala Lumpur's business, shopping, dining and social districts.", href: "https://www.ytlhotels.com/hotels-and-resorts/malaysia/jw-marriott/" },
  { title: "Pangkor Laut Resort", image: "/images/Emerald%20bay%20pkl.jpg", text: "A private-island retreat for clients who want nature, privacy and time away from the city.", href: "https://www.ytlhotels.com/hotels-and-resorts/malaysia/" },
];

export default function MalaysiaTravelPage() {
  return <main className={styles.travelPage}>
    <Header transparent enquireHref="/asia-gateway/enquire" enquireLabel="Plan a Malaysia trip" />
    <section className={styles.hero}>
      <Image className={`${styles.heroImage} ${styles.malaysiaImage}`} src="/images/kl%20BACK%20GORUND.avif" alt="Kuala Lumpur skyline at night" fill priority sizes="100vw" />
      <div className={styles.heroShade} />
      <div className={`site-shell ${styles.heroCopy}`}>
        <p className="eyebrow light">PF EuroAsia Travel · Malaysia</p>
        <h1>Travel to Malaysia.<em>Discover what is possible.</em></h1>
        <p>Search the journey, choose the right stay and coordinate a focused visit around lifestyle, property, residency or business objectives.</p>
      </div>
      <nav className={styles.routeSwitch} aria-label="Choose a travel destination">
        <Link href="/travel/spain"><span>Travelling to Spain</span><b aria-hidden="true">←</b></Link>
        <Link className={styles.active} href="/travel/malaysia"><span>Travelling to Malaysia</span><small>You are here</small></Link>
      </nav>
    </section>

    <section className={styles.intro}><div className={`site-shell ${styles.introGrid}`}><div><p className="eyebrow">A considered introduction</p><h2>See Malaysia for yourself.</h2></div><div><p>PF EuroAsia can help coordinate the practical parts of a Malaysia visit while making the trip commercially useful. Combine flights and accommodation with private transfers, neighbourhood orientation, property visits and meetings with the relevant local specialists.</p><div className={styles.serviceTags}><span>Flights</span><span>Hotels</span><span>Private transfers</span><span>Discovery visits</span></div></div></div></section>

    <section className={styles.flightSection}><div className={`site-shell ${styles.flightGrid}`}><div className={styles.flightCopy}><p className="eyebrow light">Search live flights</p><h2>Fly to Kuala Lumpur.</h2><p>Compare current flight options with Skyscanner. Kuala Lumpur International Airport (KUL) is preselected and your departure point can be suggested from your location.</p><small>Schedules, availability and fares are supplied by Skyscanner and can change. Results open on Skyscanner. Affiliate tracking will be added when PF EuroAsia&apos;s approved partner details are available.</small></div><div className={styles.flightWidget}><SkyscannerFlightSearch destinationName="Kuala Lumpur" destinationIata="KUL" buttonLabel="Search flights to Kuala Lumpur" /></div></div></section>

    <section className={styles.hotelSection}><div className="site-shell"><div className={styles.sectionHeading}><div><p className="eyebrow">Selected stays</p><h2>Kuala Lumpur and beyond.</h2></div><p>Hotels and resorts currently presented through our YTL Hotels recommendations. Rates, room types and availability should be confirmed for the actual dates.</p></div><div className={styles.hotelGrid}>{hotels.map(hotel=><article className={styles.hotelCard} key={hotel.title}><div className={styles.hotelImage}><Image src={hotel.image} alt={hotel.title} fill sizes="(max-width: 900px) 100vw, 33vw" /><h3>{hotel.title}</h3></div><div className={styles.hotelCopy}><p>{hotel.text}</p><a className="text-link" href={hotel.href} target="_blank" rel="noreferrer">View at YTL Hotels <span>→</span></a></div></article>)}</div></div></section>

    <section className={styles.stepsSection}><div className="site-shell"><p className="eyebrow light">Your Malaysia visit</p><div className={styles.stepsGrid}>{services.map(([number,title,text])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className={styles.cta}><div className="site-shell"><p className="eyebrow">Start with your dates</p><h2>Planning a trip to Malaysia?</h2><p>Tell us who is travelling, what you want to explore and whether the visit should include property, residency, company or professional meetings.</p><Link className="button button-dark" href="/asia-gateway/enquire">Plan your Malaysia trip <span>→</span></Link></div></section>
    <Footer />
  </main>;
}
