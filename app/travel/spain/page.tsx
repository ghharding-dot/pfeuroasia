import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { SkyscannerFlightSearch } from "../../components/SkyscannerFlightSearch";
import { RentalEnquiryForm } from "../../luxury-villa-rentals/RentalEnquiryForm";
import { rentalAreas, rentalConciergeServices } from "../../luxury-villa-rentals/rentalContent";
import "../../luxury-villa-rentals/luxury-villa-rentals.css";
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

export default function SpainTravelPage() {
  return <main className={styles.travelPage}>
    <Header transparent enquireHref="/travel/spain#villa-enquiry" enquireLabel="Plan a Spain stay" />
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

    <section className={styles.rentalSection} aria-labelledby="spain-rental-heading"><div className="site-shell"><div className={styles.sectionHeading}><div><p className="eyebrow">Luxury villa stays</p><h2 id="spain-rental-heading">The rental collection is already here.</h2></div><p>Through our collaboration with The Luxury Villa Collection, PF EuroAsia provides access to carefully selected villas across Marbella and the surrounding prime residential areas. Availability is prepared privately around your dates and requirements.</p></div><div className={styles.rentalGrid}>{rentalAreas.map((area,index)=><a className={styles.rentalCard} href="#villa-enquiry" key={area.name}><Image src={area.image} alt={`${area.name} luxury villa rental location`} fill sizes="(max-width: 900px) 100vw, 33vw" /><span className={styles.cardShade} /><span className={styles.cardNumber}>{String(index+1).padStart(2,"0")}</span><div className={styles.cardCopy}><small>{area.location}</small><h3>{area.name}</h3><b>Request available villas <span aria-hidden="true">→</span></b></div></a>)}</div><p className={styles.collectionNote}>Representative location imagery. Individual villas, current availability and exact rates are shared privately after we understand your dates and requirements.</p><div className={styles.partnershipBand}><div><Image src="/images/pf-gold-symbol.png" alt="" width={42} height={58} sizes="42px" /><strong>Property Facilitators<br />EuroAsia</strong></div><span>×</span><div><small>The</small><strong>Luxury Villa<br />Collection</strong></div><p>One coordinated enquiry for the villa, arrival and the concierge services surrounding your stay.</p></div></div></section>

    <section className={styles.conciergeSection} aria-labelledby="spain-concierge-heading"><div className="site-shell"><div className={styles.sectionHeading}><div><p className="eyebrow light">Concierge services</p><h2 id="spain-concierge-heading">Every detail considered.</h2></div><p>Your villa is only the beginning. Select any services you would like us to coordinate and include them in the same private enquiry below.</p></div><div className={styles.conciergeGrid}>{rentalConciergeServices.map((service,index)=><a className={styles.conciergeCard} href="#villa-enquiry" key={service.name}><Image src={service.image} alt={service.name} fill sizes="(max-width: 900px) 100vw, 33vw" /><span className={styles.cardShade} /><span className={styles.cardNumber}>{String(index+1).padStart(2,"0")}</span><div className={styles.cardCopy}><h3>{service.name}</h3><p>{service.text}</p><b>Add to your enquiry <span aria-hidden="true">→</span></b></div></a>)}</div></div></section>

    <section className={styles.rentalEnquiry} id="villa-enquiry"><div className={`site-shell ${styles.enquiryGrid}`}><div className={styles.enquiryCopy}><p className="eyebrow light">One private enquiry</p><h2>Plan the complete Spain stay.</h2><p>Share your dates, group size, bedroom requirements, preferred location and any concierge services. We will respond personally with a tailored villa selection and the relevant arrangements.</p><ul><li>Current public and privately available villas</li><li>Airport collection and local transport</li><li>Concierge services before and during the stay</li></ul></div><RentalEnquiryForm /></div></section>
    <Footer />
  </main>;
}
