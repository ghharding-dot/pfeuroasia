import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { createMetadata } from "../../lib/seo";
import styles from "../InvestmentPropertyMarbella.module.css";

export const metadata = createMetadata("fairmontLaHaciendaEn");

const amenities = [
  ["Fairmont service", "24-hour residential concierge, private check-in and ownership support"],
  ["Golf", "Five-year membership of La Hacienda Links Golf Resort and preferred access"],
  ["Wellbeing", "Fairmont spa, indoor pool, sauna, treatments and fitness facilities"],
  ["Dining", "Restaurants, bars, in-residence dining and optional private-chef services"],
  ["Residence", "Private landscaped garden, swimming pool, terraces and accessible lift"],
  ["Family", "Kids’ club, children’s facilities and personalised childcare options"],
  ["Security", "Round-the-clock security, parking and comprehensive maintenance support"],
  ["Benefits", "Eligibility for the Accor Ownership Benefits Programme, subject to its terms"],
];

const residenceTypes = [
  ["Private villas", "4–5 bedrooms", "From 336 m²"],
  ["Presidential residence", "Signature multi-bedroom layout", "Up to 1,149 m²"],
];

export default function FairmontLaHaciendaPage() {
  return (
    <main className={styles.page}>
      <Header enquireHref="/enquire?partner=fairmont-la-hacienda" enquireLabel="Fairmont enquiry" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Residence",
            name: "Fairmont Residences La Hacienda",
            description:
              "A limited collection of 31 fully furnished branded villas beside the Mediterranean and La Hacienda Links Golf Resort in San Roque.",
            url: "https://www.pfeuroasia.com/investment-property-marbella/fairmont-residences-la-hacienda",
            image: "https://www.pfeuroasia.com/images/fairmont-la-hacienda/fairmont-hero.webp",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Calle Faro de Punta Mala, 2",
              addressLocality: "San Roque",
              addressRegion: "Cádiz",
              postalCode: "11360",
              addressCountry: "ES",
            },
          }),
        }}
      />

      <section className={styles.detailHero}>
        <Image
          className={styles.heroImage}
          src="/images/fairmont-la-hacienda/fairmont-hero.webp"
          alt="Mediterranean coastline and La Hacienda Links beside Fairmont Residences La Hacienda"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.detailHeroShade} aria-hidden="true" />
        <div className={`site-shell ${styles.detailHeroCopy}`}>
          <p className="eyebrow light">San Roque · Costa del Sol · Golf &amp; seaside</p>
          <h1>Fairmont Residences<br />La Hacienda.</h1>
          <p>
            A limited collection of 31 fully furnished branded villas combining
            private ownership with Fairmont hospitality, resort amenities and an
            exceptional setting beside the Mediterranean.
          </p>
          <div className={styles.detailHeroActions}>
            <Link className="button button-gold" href="/enquire?partner=fairmont-la-hacienda">
              Request current availability <span>→</span>
            </Link>
            <Link href="/enquire?partner=fairmont-la-hacienda">
              Request brochure &amp; price list <span>→</span>
            </Link>
          </div>
        </div>
        <dl className={styles.heroFacts}>
          <div><dt>Collection</dt><dd>31 villas</dd></div>
          <div><dt>Bedrooms</dt><dd>4–5</dd></div>
          <div><dt>Guide price</dt><dd>From €2.75m</dd></div>
          <div><dt>Position</dt><dd>Golf &amp; seaside</dd></div>
        </dl>
      </section>

      <section className={styles.model} aria-labelledby="fairmont-overview-heading">
        <div className={`site-shell ${styles.modelGrid}`}>
          <div>
            <p className="eyebrow">Branded villas by the sea</p>
            <h2 id="fairmont-overview-heading">Private villa living with five-star support.</h2>
          </div>
          <div className={styles.modelCopy}>
            <p>
              Fairmont Residences La Hacienda occupies a coastal setting in San Roque,
              beside La Hacienda Links Golf Resort and the Fairmont La Hacienda Costa
              del Sol hotel. The collection is designed around privacy, panoramic views
              and direct access to an established hospitality environment.
            </p>
            <p>
              Each home is arranged across two generous levels and includes a landscaped
              garden, private swimming pool and sea-facing terraces. Villas are delivered
              fully furnished with interiors by Studio IBU and architecture by dAAr Arquitectura.
            </p>
          </div>
        </div>
        <div className={`site-shell ${styles.modelCards}`}>
          <article><span>01</span><h3>Fairmont hospitality</h3><p>Residential concierge, housekeeping, security and ownership support coordinated on site.</p></article>
          <article><span>02</span><h3>Private villa scale</h3><p>Four and five-bedroom homes, plus a singular Presidential residence, from 336 m².</p></article>
          <article><span>03</span><h3>Turnkey interiors</h3><p>Fully furnished homes with private pools, gardens, terraces and carefully specified finishes.</p></article>
          <article><span>04</span><h3>Sustainable design</h3><p>A-rated homes developed to LEED Gold certification standards.</p></article>
        </div>
      </section>

      <section className={styles.galleryPair}>
        <figure>
          <Image src="/images/fairmont-la-hacienda/fairmont-aerial.webp" alt="La Hacienda Links and the Mediterranean coastline at San Roque" fill sizes="(max-width: 760px) 100vw, 60vw" />
          <figcaption>Golf, beach and open Mediterranean views</figcaption>
        </figure>
        <figure>
          <Image src="/images/fairmont-la-hacienda/fairmont-terrace.webp" alt="Private sea-view terrace at Fairmont Residences La Hacienda" fill sizes="(max-width: 760px) 100vw, 40vw" />
          <figcaption>Private terraces designed for year-round living</figcaption>
        </figure>
      </section>

      <section className={styles.residences} aria-labelledby="fairmont-residences-heading">
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow light">Residence collection</p><h2 id="fairmont-residences-heading">A limited collection with individual scale.</h2></div>
            <p>The developer presents 31 residences ranging from 336 m² to the 1,149 m² Presidential residence. Exact layouts, plots and live prices should be confirmed against the current unit list.</p>
          </div>
          <div className={styles.residenceTable} role="table" aria-label="Fairmont La Hacienda residence types">
            <div className={styles.tableHead} role="row"><span>Residence</span><span>Configuration</span><span>Internal area</span></div>
            {residenceTypes.map(([name, configuration, area]) => (
              <div role="row" key={name}><strong>{name}</strong><span>{configuration}</span><span>{area}</span></div>
            ))}
          </div>
          <div className={styles.pendingPrice}>
            <span>Advertised entry point</span>
            <strong>From €2,750,000</strong>
            <Link href="/enquire?partner=fairmont-la-hacienda">Request the live unit list →</Link>
          </div>
        </div>
      </section>

      <section className={styles.amenities} aria-labelledby="fairmont-amenities-heading">
        <Image className={styles.amenitiesImage} src="/images/fairmont-la-hacienda/fairmont-pool.webp" alt="Infinity pool overlooking the Mediterranean at Fairmont La Hacienda" fill sizes="100vw" />
        <div className={styles.amenitiesShade} aria-hidden="true" />
        <div className={`site-shell ${styles.amenitiesInner}`}>
          <div className={styles.amenitiesIntro}>
            <p className="eyebrow light">Resort services &amp; owner benefits</p>
            <h2 id="fairmont-amenities-heading">Designed for effortless ownership.</h2>
          </div>
          <div className={styles.amenitiesGrid}>
            {amenities.map(([category, label]) => <article key={category}><strong>{category}</strong><span>{label}</span></article>)}
          </div>
        </div>
      </section>

      <section className={styles.services} aria-labelledby="fairmont-services-heading">
        <div className={`site-shell ${styles.servicesGrid}`}>
          <div className={styles.servicesImageWrap}>
            <Image src="/images/fairmont-la-hacienda/fairmont-living.webp" alt="Furnished Fairmont La Hacienda living room with Mediterranean view" fill sizes="(max-width: 860px) 100vw, 52vw" />
          </div>
          <div className={styles.servicesCopy}>
            <p className="eyebrow">Core &amp; à la carte services</p>
            <h2 id="fairmont-services-heading">Arrive and feel at home.</h2>
            <p>Core services include 24-hour residential concierge and security, private check-in, weekly housekeeping, parking and ownership and maintenance support.</p>
            <p>Optional services can include chauffeuring, in-residence dining, private chefs and sommeliers, wellness treatments, childcare, pet care and personalised lifestyle assistance.</p>
          </div>
        </div>
      </section>

      <section className={styles.location} aria-labelledby="fairmont-location-heading">
        <div className={`site-shell ${styles.locationGrid}`}>
          <div>
            <p className="eyebrow">San Roque · Between Sotogrande &amp; Gibraltar</p>
            <h2 id="fairmont-location-heading">A quieter coast with international connections.</h2>
            <p>The position combines the Mediterranean, La Hacienda Links and the amenities of Sotogrande, with Gibraltar Airport and Marbella within practical reach.</p>
            <dl className={styles.locationTimes}>
              <div><dt>Sotogrande</dt><dd>Approximately 15 minutes</dd></div>
              <div><dt>Gibraltar</dt><dd>Approximately 25 minutes</dd></div>
              <div><dt>Marbella</dt><dd>Approximately 35 minutes</dd></div>
              <div><dt>Málaga</dt><dd>Approximately 75–90 minutes</dd></div>
            </dl>
          </div>
          <div className={styles.locationImageWrap}>
            <Image src="/images/fairmont-la-hacienda/fairmont-bedroom.webp" alt="Fairmont La Hacienda bedroom opening to a private garden and pool" fill sizes="(max-width: 860px) 100vw, 48vw" />
          </div>
        </div>
      </section>

      <section className={styles.detailCta}>
        <Image className={styles.detailCtaImage} src="/images/fairmont-la-hacienda/fairmont-kitchen.webp" alt="Fully furnished kitchen and dining area at Fairmont Residences La Hacienda" fill sizes="100vw" />
        <div className={styles.detailCtaShade} aria-hidden="true" />
        <div className={`site-shell ${styles.detailCtaCopy}`}>
          <p className="eyebrow light">Private presentation</p>
          <h2>Review the available villa, operating terms and ownership costs.</h2>
          <p>Request the current availability, price list, floor plans and development documentation through PF EuroAsia.</p>
          <Link className="button button-gold" href="/enquire?partner=fairmont-la-hacienda">Request a private presentation <span>→</span></Link>
        </div>
      </section>

      <section className={styles.legalNote}>
        <div className="site-shell">
          <p><strong>Important:</strong> This independent overview summarises information publicly presented by the project and reviewed on 1 October 2026. Prices, availability, areas, specifications, services, service charges and operating arrangements may change without notice. Fairmont La Hacienda Costa del Sol is independently owned and developed by FLAME HOTEL PROPCO S.L.U.; Fairmont branding is used under licence from Accor Luxury &amp; Lifestyle SAS. The project&apos;s source marketing materials state that they are directed only to persons outside the United Kingdom and United States. PF EuroAsia does not offer securities or investment advice, and project material will only be supplied where appropriate and lawful. Any rental-program participation, personal-use limits, fees and operating terms must be confirmed in the final contracts. Images are illustrative. Buyers should appoint independent Spanish legal and tax advisers and verify title, planning, licensing, specifications, service charges and all purchase documentation before proceeding.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
