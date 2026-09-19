import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { createMetadata } from "../../lib/seo";
import styles from "../InvestmentPropertyMarbella.module.css";

export const metadata = createMetadata("realDeLaQuintaEn");

const collections = [
  ["Olivos", "2, 3 & 4-bedroom apartments and penthouses", "Delivery from 2020"],
  ["Quercus", "Low-density hillside apartments with expansive terraces", "Delivery from 2022"],
  ["Palmitos", "Luxury low-rise residences overlooking the lake and golf", "Delivery from 2025"],
  ["Sabinas", "Contemporary apartments integrated into the natural hillside", "Delivery from 2026/27"],
  ["Enebros", "Curved contemporary architecture with panoramic coastal views", "Delivery from 2026/27"],
  ["Mimosas", "35 residences, each with a private pool", "Under construction"],
  ["Romero", "28 designer residences across four boutique blocks", "Under construction"],
];

const resortFeatures = [
  ["200 ha", "Residential country club resort"],
  ["35,000 m²", "Lake with non-motorised water sports"],
  ["6 holes", "Executive golf course"],
  ["20 m", "Heated wellness pool"],
  ["24/7", "Resort security"],
  ["15 min", "Drive to Puerto Banús"],
];

export default function RealDeLaQuintaPage() {
  return (
    <main className={`${styles.page} ${styles.realQuintaPage}`}>
      <Header enquireHref="/enquire?partner=real-de-la-quinta" enquireLabel="Real de La Quinta enquiry" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Residence",
            name: "Real de La Quinta Residential Country Club Resort",
            description: "A 200-hectare residential country club resort in Benahavís, near Marbella.",
            url: "https://www.pfeuroasia.com/investment-property-marbella/real-de-la-quinta",
            image: "https://www.pfeuroasia.com/images/real-de-la-quinta/resort-panorama.webp",
            address: { "@type": "PostalAddress", addressLocality: "Benahavís", addressRegion: "Málaga", addressCountry: "ES" },
          }),
        }}
      />

      <section className={`${styles.detailHero} ${styles.realQuintaHero}`}>
        <Image className={styles.heroImage} src="https://www.realdelaquinta.com/sites/default/files/styles/16_9_large/public/2022-10/9D9A1207.jpg?itok=gliQ0KAz" alt="Real de La Quinta resort overlooking the Mediterranean coast" fill priority sizes="100vw" />
        <div className={styles.detailHeroShade} aria-hidden="true" />
        <div className={`site-shell ${styles.detailHeroCopy}`}>
          <p className="eyebrow light">Benahavís · Marbella · Residential country club resort</p>
          <h1>This is Real living.</h1>
          <p>
            A 200-hectare residential resort between Marbella and Benahavís,
            bringing together contemporary homes, nature, lake life, golf,
            wellness and hospitality.
          </p>
          <div className={styles.detailHeroActions}>
            <Link className="button button-gold" href="/enquire?partner=real-de-la-quinta">Request current availability <span>→</span></Link>
            <a href="https://www.realdelaquinta.com/sites/default/files/2026-09/Real%20de%20La%20Quinta%20-%20Brochure.pdf" target="_blank" rel="noopener">Download brochure <span>↓</span></a>
          </div>
        </div>
        <dl className={styles.heroFacts}>
          <div><dt>Setting</dt><dd>200 hectares</dd></div>
          <div><dt>Collections</dt><dd>7 + villa plots</dd></div>
          <div><dt>Prices</dt><dd>Available shortly</dd></div>
          <div><dt>Location</dt><dd>Benahavís</dd></div>
        </dl>
      </section>

      <section className={styles.model} aria-labelledby="real-quinta-overview-heading">
        <div className={`site-shell ${styles.modelGrid}`}>
          <div>
            <p className="eyebrow">The resort</p>
            <h2 id="real-quinta-overview-heading">Mountain privacy. Marbella within reach.</h2>
          </div>
          <div className={styles.modelCopy}>
            <p>
              Real de La Quinta sits in the foothills of the Sierra de las Nieves,
              with views towards La Concha, Istán Lake and the Mediterranean. The
              resort is approximately 15 minutes by car from Puerto Banús.
            </p>
            <p>
              Its masterplan combines established and new residential collections,
              a lake and country club, an executive golf course, wellness facilities,
              sports, hospitality and a limited selection of individual villa plots.
            </p>
          </div>
        </div>
        <div className={`site-shell ${styles.resortFactGrid}`}>
          {resortFeatures.map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}
        </div>
      </section>

      <section className={`${styles.amenities} ${styles.realQuintaAmenities}`} aria-labelledby="el-lago-heading">
        <Image className={styles.amenitiesImage} src="https://www.realdelaquinta.com/sites/default/files/styles/16_9_large/public/2022-10/9D9A1207.jpg?itok=gliQ0KAz" alt="El Lago Club lake and beach at Real de La Quinta" fill sizes="100vw" />
        <div className={styles.amenitiesShade} aria-hidden="true" />
        <div className={`site-shell ${styles.amenitiesInner}`}>
          <div className={styles.amenitiesIntro}>
            <p className="eyebrow light">El Lago Club · Opening 2026</p>
            <h2 id="el-lago-heading">A lake club at the heart of the resort.</h2>
            <p className={styles.realQuintaLead}>A sandy bathing beach, kayaking, paddle surf, water bikes, tennis and padel, restaurant and bar, children&apos;s activities, a gym, spa, sauna and heated pool.</p>
          </div>
        </div>
      </section>

      <section className={styles.residences} aria-labelledby="real-quinta-collections-heading">
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow light">Residential collections</p><h2 id="real-quinta-collections-heading">Seven distinct addresses.</h2></div>
            <p>Delivery descriptions come from the September 2026 resort brochure. Current resale and developer availability will be added when the new price list is received.</p>
          </div>
          <div className={styles.collectionList}>
            {collections.map(([name, description, status], index) => (
              <article key={name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{name}</h3><p>{description}</p></div>
                <strong>{status}</strong>
              </article>
            ))}
          </div>
          <div className={styles.pendingPrice}><span>Current prices &amp; availability</span><strong>Price list arriving next week</strong><Link href="/enquire?partner=real-de-la-quinta">Register your interest →</Link></div>
        </div>
      </section>

      <section className={styles.galleryPair}>
        <figure><Image src="https://www.realdelaquinta.com/sites/default/files/styles/4_3_medium/public/2017-09/ALTA%20TERRAZALR.jpg?itok=zFRBiu90" alt="Contemporary residence at Real de La Quinta" fill sizes="(max-width: 760px) 100vw, 60vw" /><figcaption>Contemporary hillside living</figcaption></figure>
        <figure><Image src="https://www.realdelaquinta.com/sites/default/files/styles/3_1_medium/public/2020-05/Landscape_Concept_rlq_en.png?itok=vk29A8Wg" alt="Landscape concept at Real de La Quinta" fill sizes="(max-width: 760px) 100vw, 40vw" /><figcaption>Integrated with the landscape</figcaption></figure>
      </section>

      <section className={styles.services} aria-labelledby="angsana-heading">
        <div className={`site-shell ${styles.servicesGrid}`}>
          <div className={styles.servicesImageWrap}><Image src="https://www.realdelaquinta.com/sites/default/files/styles/3_1_medium/public/2017-09/_17A8360_0.jpg?itok=6JcBLght" alt="Real de La Quinta natural setting" fill sizes="(max-width: 860px) 100vw, 52vw" /></div>
          <div className={styles.servicesCopy}>
            <p className="eyebrow">Hotel &amp; branded residences</p>
            <h2 id="angsana-heading">Angsana by Banyan Tree Group.</h2>
            <p>The resort brochure presents an Angsana hotel with 88 guest rooms and suites, three dining venues, a spa and kids&apos; club, alongside 41 two and three-bedroom branded residences.</p>
            <p>Hotel services described for branded-residence owners include daily housekeeping and room service, while the residences remain independent from the hotel itself.</p>
          </div>
        </div>
      </section>

      <section className={styles.location} aria-labelledby="real-quinta-plots-heading">
        <div className={`site-shell ${styles.locationGrid}`}>
          <div>
            <p className="eyebrow">Individual villa opportunity</p>
            <h2 id="real-quinta-plots-heading">Limited plots from 1,500 to 10,000 m².</h2>
            <p>Elevated building plots for substantial private villas, with views across the resort, lake, golf and towards the Mediterranean. Plot availability, buildability and planning conditions must be confirmed for each parcel.</p>
            <Link className="button button-gold" href="/enquire?partner=real-de-la-quinta">Ask about plots <span>→</span></Link>
          </div>
          <div className={styles.locationImageWrap}><Image src="https://www.realdelaquinta.com/sites/default/files/styles/16_9_large/public/2017-09/ThinkstockPhotos-636156782LR.jpg?itok=NVcZ6aBt" alt="Elevated natural landscape at Real de La Quinta" fill sizes="(max-width: 860px) 100vw, 48vw" /></div>
        </div>
      </section>

      <section className={styles.detailCta}>
        <Image className={styles.detailCtaImage} src="https://www.realdelaquinta.com/sites/default/files/styles/16_9_large/public/2022-10/9D9A1207.jpg?itok=gliQ0KAz" alt="Panoramic setting of Real de La Quinta" fill sizes="100vw" />
        <div className={styles.detailCtaShade} aria-hidden="true" />
        <div className={`site-shell ${styles.detailCtaCopy}`}>
          <p className="eyebrow light">Private presentation</p>
          <h2>Tell us which part of Real de La Quinta interests you.</h2>
          <p>We will send the current unit or plot availability, plans and prices as soon as the updated list is received.</p>
          <Link className="button button-gold" href="/enquire?partner=real-de-la-quinta">Register for the price list <span>→</span></Link>
        </div>
      </section>

      <section className={styles.legalNote}><div className="site-shell"><p><strong>Important:</strong> This page summarises developer-supplied resort material dated September 2026. It is not an offer or contract. Availability, prices, delivery dates, amenities, hotel operations, plans and specifications may change. Buyers should verify the selected property, community arrangements, planning position and acquisition costs through independent Spanish legal and tax advisers.</p></div></section>

      <Footer />
    </main>
  );
}
