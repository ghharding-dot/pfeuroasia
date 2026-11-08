import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { readRentalVillas, selectRentalCarouselVillas } from "../lib/rentalVillaStore";
import { RentalEnquiryForm } from "../luxury-villa-rentals/RentalEnquiryForm";
import "../luxury-villa-rentals/luxury-villa-rentals.css";
import styles from "./collection.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Marbella Villa Collection | Private Luxury Villa Rentals",
  description: "A private selection from more than 100 luxury rental villas in Marbella, La Zagaleta, Benahavís and the Costa del Sol. Request a tailored shortlist with personal concierge service.",
  robots: { index: false, follow: false },
};

export default async function MarbellaVillaCollection({ searchParams }: {
  searchParams: Promise<{ villa?: string }>;
}) {
  const [params, records] = await Promise.all([searchParams, readRentalVillas()]);
  const villas = selectRentalCarouselVillas(records);
  const chosen = villas.find((villa) => villa.reference === params.villa);
  return <main className={styles.site}>
    <header className={styles.header}>
      <Link href="/marbella-villa-collection" className={styles.brand}><span>MARBELLA</span><strong>VILLA COLLECTION</strong></Link>
      <nav aria-label="Main navigation"><Link href="/marbella-villa-collection/ar" lang="ar">العربية</Link><a href="#collection">The collection</a><a href="#locations">Locations</a><a href="#concierge">Concierge</a><a href="#enquire" className={styles.navAction}>Private enquiry</a></nav>
    </header>
    <section className={styles.hero}>
      <Image src="/images/hero-villa.webp" fill priority sizes="100vw" alt="Luxury villa overlooking Marbella and the Mediterranean" className={styles.heroImage}/>
      <div className={styles.heroShade}/>
      <div className={styles.heroInner}><p className={styles.eyebrow}>MARBELLA · LA ZAGALETA · COSTA DEL SOL</p><h1>Exceptional homes<br/>for rental.<em>With our personal service.</em></h1><p>Privately arranged luxury villa stays, with a tailored selection and discreet concierge service from first enquiry to arrival.</p><a href="#enquire" className={styles.goldButton}>Find my villa <span>↗</span></a><a href="#collection" className={styles.secondaryButton}>Explore the collection ↓</a></div>
    </section>
    <section className={styles.intro} id="collection"><div><p className={styles.eyebrow}>THE PRIVATE COLLECTION</p><h2>A selection from over <em>100 luxury villas.</em></h2></div><p>The homes shown are only a glimpse of the wider collection. Availability varies, and some properties are offered privately. Tell us your travel dates, preferred location, guests and weekly budget; our team will prepare a personal shortlist.</p></section>
    <section className={styles.villas} aria-label="Approved luxury villas">
      {villas.length ? <div className={styles.grid}>{villas.map(villa => <article className={styles.card} key={villa.id}>
        <div className={styles.cardImage}>{villa.image && <Image src={villa.image} alt={villa.title} fill unoptimized sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"/>}</div>
        <div className={styles.cardBody}><p>{villa.location}</p><h3>{villa.title}</h3><div className={styles.facts}>{villa.bedrooms ? villa.bedrooms + " bedrooms" : "Bedrooms on request"} <span>·</span> {villa.guests ? "Sleeps " + villa.guests : "Private stays"}</div><a href={"/marbella-villa-collection?villa=" + encodeURIComponent(villa.reference) + "#enquire"}>Enquire about this villa ↗</a></div>
      </article>)}</div> : <div className={styles.empty}><h3>Discover villas selected for your stay.</h3><p>Our available collection is shared personally. Send us your requirements and we will prepare a current shortlist.</p><a href="#enquire" className={styles.goldButton}>Request a private selection ↗</a></div>}
    </section>
    <section id="locations" className={styles.dark}><div className={styles.sectionWrap}><p className={styles.eyebrow}>EXCEPTIONAL ADDRESSES</p><h2>Marbella's most coveted places.</h2><div className={styles.locationGrid}>{["La Zagaleta","El Madroñal","Marbella Golden Mile","Sierra Blanca","Puerto Banús","Benahavís"].map(x=><a href="#enquire" key={x}>{x}<span>↗</span></a>)}</div></div></section>
    <section id="concierge" className={styles.concierge}><p className={styles.eyebrow}>MORE THAN A VILLA</p><h2>Every detail, <em>considered.</em></h2><p>Airport transfers, chauffeurs, private chefs, family arrangements, yacht charters, golf and wellness experiences can be coordinated through our trusted partners, subject to availability.</p><a href="#enquire">Discuss concierge requirements ↗</a></section>
    <section id="enquire" className={styles.enquiry}><div><p className={styles.eyebrow}>PRIVATE ENQUIRIES</p><h2>Tell us about <em>your stay.</em></h2><p>Share dates, guest numbers and your preferred location. We will respond personally with carefully matched options, including villas not displayed publicly.</p><p className={styles.discreet}>Personally managed · No booking commitment · Confidential service</p></div><div className={styles.form}><RentalEnquiryForm selectedVilla={chosen ? chosen.reference + " — " + chosen.title : ""}/></div></section>
    <footer className={styles.footer}><div><strong>MARBELLA VILLA COLLECTION</strong><p>Exceptional homes for rental. With our personal service.</p></div><div><p>Personally coordinated by Property Facilitators EuroAsia with The Luxury Villa Collection.</p><a href="https://www.pfeuroasia.com/privacy">Privacy policy</a></div></footer>
  </main>;
}
