import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { createMetadata } from "../../lib/seo";
import styles from "../InvestmentPropertyMarbella.module.css";

export const metadata = createMetadata("azureanMarbellaEn");

const residenceTypes = [
  ["1-bedroom residence", "100 m²"],
  ["1-bedroom garden", "115 m²"],
  ["1-bedroom Aqua", "105 m²"],
  ["2-bedroom residence", "170 m²"],
  ["2-bedroom Double", "195 m²"],
  ["2-bedroom garden", "230 m²"],
  ["Grand penthouse", "465 m²"],
];

const paymentSteps = [
  ["Reservation", "€30,000"],
  ["Private contract", "30%"],
  ["Final structure", "20%"],
  ["Enclosures & utilities", "20%"],
  ["Completion", "30%"],
];

const amenities = [
  ["815 m²", "Panoramic infinity pool"],
  ["850 m²", "Wellness centre"],
  ["350 m²", "Indoor & outdoor fitness club"],
  ["1,375 m²", "International restaurant"],
  ["1,250 m²", "Fine-dining restaurant"],
  ["890 m²", "Congress salon & terrace"],
  ["470 m²", "Adults-only pool"],
  ["170 m²", "Indoor swimming pool"],
];

const faqs = [
  {
    question: "Are the residences freehold?",
    answer: "The supplied developer brochure describes all 133 residences as freehold. The title, contract and specific unit documentation should still be checked by the purchaser's independent Spanish lawyer before reservation or exchange.",
  },
  {
    question: "Can an owner live in the residence all year?",
    answer: "No. Owners have 8 weeks per year for personal stays, of which up to 14 nights may be used in July and August (subject to availability). Short-term rental accommodation in Andalucía requires an official tourist-rental licence, which does not permit full-time occupancy. The residences are licensed and legally authorised to be rented to guests when not in personal use.",
  },
  {
    question: "Is participation in the rental programme optional?",
    answer: "No. When not in personal use, the residence forms part of the mandatory professionally managed rental programme, in accordance with the applicable rental programme agreement.",
  },
  {
    question: "What is the relationship with Hyatt?",
    answer: "Insignia Suites S.L. and its affiliates are solely responsible for the marketing and sale of the residences. Hyatt has granted the developer the right to offer and sell the residences using the Destination by Hyatt name and trademarks pursuant to a revocable licence agreement. Neither Hyatt nor any affiliate is responsible for, or makes any representation or warranty concerning, the development, marketing, sale or operation of the residences.",
  },
  {
    question: "What tax is shown on the supplied price list?",
    answer: "The developer material states that prices are subject to 21% VAT. Buyers should obtain current independent tax and legal advice because the treatment and total acquisition costs depend on the property structure and the purchaser's circumstances.",
  },
];

export default function AzureanResidencesPage() {
  return (
    <main className={`${styles.page} ${styles.azureanPage}`}>
      <Header enquireHref="/enquire?partner=azurean-residences" enquireLabel="Azurean enquiry" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ApartmentComplex",
            name: "Azurean Marbella",
            description: "Destination by Hyatt branded residences in Benahavís, Marbella, presented by Property Facilitators EuroAsia.",
            url: "https://www.pfeuroasia.com/investment-property-marbella/azurean-residences-benahavis",
            image: "https://www.pfeuroasia.com/images/azurean/azurean-hero.webp",
            address: { "@type": "PostalAddress", addressLocality: "Benahavís", addressRegion: "Málaga", addressCountry: "ES" },
          }),
        }}
      />

      <section className={styles.detailHero}>
        <Image
          className={styles.heroImage}
          src="/images/azurean/azurean-hero.webp"
          alt="Azurean Marbella residences at dusk"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.detailHeroShade} aria-hidden="true" />
        <div className={`site-shell ${styles.detailHeroCopy}`}>
          <p className="eyebrow light">Benahavís · Marbella · Branded residences</p>
          <Image
            className={styles.azureanLogo}
            src="/images/partner-azurean-residences.webp"
            alt="Azurean Residences · Destination by Hyatt"
            width={1983}
            height={793}
            priority
          />
          <h1>The place<br />for every mood.</h1>
          <p>
            A new vision of branded real estate: beautifully appointed freehold
            residences with private terraces, spectacular views and extensive
            resort facilities in Benahavís.
          </p>
          <div className={styles.detailHeroActions}>
            <Link className="button button-gold" href="/enquire?partner=azurean-residences">Request current availability <span>→</span></Link>
            <a href="/downloads/azurean/azurean-marbella-brochure.pdf" target="_blank" rel="noopener">Download brochure <span>↓</span></a>
          </div>
        </div>
        <dl className={styles.heroFacts}>
          <div><dt>Residences</dt><dd>133</dd></div>
          <div><dt>Bedrooms</dt><dd>1–3</dd></div>
          <div><dt>Prices from</dt><dd>€708,442</dd></div>
          <div><dt>Completion</dt><dd>Q2 2029</dd></div>
        </dl>
      </section>

      <section className={styles.model} aria-labelledby="azurean-model-heading">
        <div className={`site-shell ${styles.modelGrid}`}>
          <div>
            <p className="eyebrow">The ownership model</p>
            <h2 id="azurean-model-heading">Beautifully appointed residences with private terraces &amp; spectacular views.</h2>
          </div>
          <div className={styles.modelCopy}>
            <p>
              Azurean combines individual freehold ownership with a resort and
              guest-accommodation model. The residences are supplied fully
              furnished and the developer material states that they are licensed
              under the Vivienda de Uso Turístico framework.
            </p>
            <p>
              Owners have 8 weeks per year for personal stays, of which up to 14
              nights may be used in July and August (subject to availability).
              When not in personal use, the residence forms part of the mandatory
              professionally managed rental programme, in accordance with the
              applicable rental programme agreement.
            </p>
          </div>
        </div>
        <div className={`site-shell ${styles.modelCards}`}>
          <article><span>01</span><h3>Freehold title</h3><p>Individual ownership, subject to the development&apos;s contractual, community and operational framework.</p></article>
          <article><span>02</span><h3>Licensed stays</h3><p>The supplied material describes all residences as licensed under Andalucía&apos;s tourist-accommodation rules.</p></article>
          <article><span>03</span><h3>Mandatory rental programme</h3><p>When not in personal use, each residence forms part of the professionally managed rental programme under the applicable agreement.</p></article>
          <article><span>04</span><h3>Property management</h3><p>A professional property team is available to care for owners&apos; homes throughout the year, operating in alignment with Hyatt&apos;s brand standards.</p></article>
        </div>
      </section>

      <section className={styles.galleryPair}>
        <figure><Image src="/images/azurean/azurean-residence.webp" alt="Furnished Azurean Marbella residence interior" fill sizes="(max-width: 760px) 100vw, 60vw" /><figcaption>Fully furnished residences</figcaption></figure>
        <figure><Image src="/images/azurean/azurean-terrace.webp" alt="Private terrace overlooking the Benahavís landscape" fill sizes="(max-width: 760px) 100vw, 40vw" /><figcaption>Private terraces and Mediterranean views</figcaption></figure>
      </section>

      <section className={styles.residences} aria-labelledby="azurean-residences-heading">
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow light">Residence collection</p><h2 id="azurean-residences-heading">The residences.</h2></div>
            <p>Average sizes are taken from the supplied September 2026 factsheet. Current unit availability and pricing change and should be reconfirmed before reservation.</p>
          </div>
          <div className={styles.residenceTable} role="table" aria-label="Azurean Marbella residence types and average sizes">
            <div className={styles.tableHead} role="row"><span role="columnheader">Residence type</span><span role="columnheader">Average size</span><span role="columnheader">Current pricing</span></div>
            {residenceTypes.map(([type, size]) => (
              <div role="row" key={type}><strong role="cell">{type}</strong><span role="cell">{size}</span><span role="cell">On request</span></div>
            ))}
          </div>
          <p className={styles.sourceNote}><strong>Current prices from €708,442.</strong> Prices, areas and availability must be reconfirmed for the selected unit. The supplied price material states that all prices are subject to 21% VAT.</p>
        </div>
      </section>

      <section className={styles.payment} aria-labelledby="azurean-payment-heading">
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow">Payment structure</p><h2 id="azurean-payment-heading">Payment plan.</h2></div>
            <p>Anticipated completion is Q2 2029. Each payment, guarantee and trigger should be checked in the unit-specific private contract.</p>
          </div>
          <ol className={styles.paymentSteps}>
            {paymentSteps.map(([label, amount], index) => <li key={label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{amount}</strong><small>{label}</small></li>)}
          </ol>
          <div className={styles.downloadRow}>
            <a href="/downloads/azurean/azurean-marbella-payment-plan.pdf" target="_blank" rel="noopener">Download payment plan <span>↓</span></a>
            <a href="/downloads/azurean/azurean-marbella-quality-specifications.pdf" target="_blank" rel="noopener">Download quality specifications <span>↓</span></a>
          </div>
        </div>
      </section>

      <section className={styles.amenities} aria-labelledby="azurean-amenities-heading">
        <Image className={styles.amenitiesImage} src="/images/azurean/azurean-pool.webp" alt="Azurean Marbella panoramic swimming pool" fill sizes="100vw" />
        <div className={styles.amenitiesShade} aria-hidden="true" />
        <div className={`site-shell ${styles.amenitiesInner}`}>
          <div className={styles.amenitiesIntro}>
            <p className="eyebrow light">Resort scale</p>
            <h2 id="azurean-amenities-heading">Spaces for every mood.</h2>
          </div>
          <div className={styles.amenitiesGrid}>
            {amenities.map(([size, label]) => <article key={label}><strong>{size}</strong><span>{label}</span></article>)}
          </div>
        </div>
      </section>

      <section className={styles.services} aria-labelledby="azurean-services-heading">
        <div className={`site-shell ${styles.servicesGrid}`}>
          <div className={styles.servicesImageWrap}><Image src="/images/azurean/azurean-lobby.webp" alt="Azurean Marbella reception and residents lounge" fill sizes="(max-width: 860px) 100vw, 52vw" /></div>
          <div className={styles.servicesCopy}>
            <p className="eyebrow">Residential services</p>
            <h2 id="azurean-services-heading">Residential services.</h2>
            <div className={styles.serviceColumns}>
              <div><h3>Core services</h3><ul><li>24/7 reception and security</li><li>Priority check-in and check-out</li><li>Concierge and doorman</li><li>Common-area management</li><li>Underground parking and storage</li><li>Repairs and maintenance</li></ul></div>
              <div><h3>Available à la carte</h3><ul><li>Residence management</li><li>In-residence housekeeping</li><li>Private chef and catering</li><li>Transfers and excursions</li><li>Childcare and pet care</li><li>Personal security and butler service</li></ul></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.specification} aria-labelledby="azurean-spec-heading">
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow light">Specification</p><h2 id="azurean-spec-heading">Elegant contemporary furnishings and premium finishes.</h2></div>
            <p>The supplied specification is preliminary and subject to the final contract, construction documentation and permitted substitutions.</p>
          </div>
          <div className={styles.specGrid}>
            <article><span>Interiors</span><h3>Fully furnished</h3><p>Elegant contemporary furnishings and premium finishes created by the international design firm Room 1804.</p></article>
            <article><span>Comfort</span><h3>Climate &amp; connectivity</h3><p>Aerothermal technology, ducted air conditioning, controlled ventilation and professional Wi-Fi throughout each residence.</p></article>
            <article><span>Private exterior</span><h3>Terrace or garden</h3><p>Furnished terraces, with efficient rainwater irrigation specified for private gardens.</p></article>
            <article><span>Sustainability</span><h3>Energy rating A</h3><p>Designed toward BREEAM Excellent criteria, with attention to energy, water, materials, air quality and waste.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.location} aria-labelledby="azurean-location-heading">
        <div className={`site-shell ${styles.locationGrid}`}>
          <div>
            <p className="eyebrow">Benahavís · The Golden Triangle</p>
            <h2 id="azurean-location-heading">A location that just works.</h2>
            <p>Azurean sits among golf courses and protected hills, 7.1 km from San Pedro Beach and within practical reach of Puerto Banús, Marbella and Málaga Airport.</p>
            <dl className={styles.locationTimes}>
              <div><dt>La Zagaleta</dt><dd>6 min</dd></div>
              <div><dt>San Pedro Beach</dt><dd>11 min</dd></div>
              <div><dt>Puerto Banús</dt><dd>17 min</dd></div>
              <div><dt>Marbella Old Town</dt><dd>19 min</dd></div>
              <div><dt>Málaga Airport</dt><dd>40 min</dd></div>
            </dl>
          </div>
          <div className={styles.locationImageWrap}><Image src="/images/azurean/azurean-masterplan.webp" alt="Azurean Marbella set in the Benahavís hills" fill sizes="(max-width: 860px) 100vw, 48vw" /></div>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="azurean-faq-heading">
        <div className={`site-shell ${styles.faqGrid}`}>
          <div><p className="eyebrow light">Important questions</p><h2 id="azurean-faq-heading">Understand the structure before reserving.</h2></div>
          <div className={styles.faqList}>{faqs.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.detailCta}>
        <Image className={styles.detailCtaImage} src="/images/azurean/azurean-penthouse.webp" alt="Azurean Marbella grand penthouse" fill sizes="100vw" />
        <div className={styles.detailCtaShade} aria-hidden="true" />
        <div className={`site-shell ${styles.detailCtaCopy}`}>
          <p className="eyebrow light">Private presentation</p>
          <h2>Request current availability.</h2>
          <p>Request the current unit list, plans and a discussion of owner use, management and acquisition costs.</p>
          <Link className="button button-gold" href="/enquire?partner=azurean-residences">Request current availability <span>→</span></Link>
        </div>
      </section>

      <section className={styles.legalNote}>
        <div className="site-shell">
          <p>
            <strong>Important:</strong> This page summarises developer-supplied material dated September 2026 and is not an offer, contract, financial projection or legal or tax advice. Insignia Suites S.L. and its affiliates are responsible for development, marketing and sale. Hyatt has granted the developer a revocable licence to use the Destination by Hyatt name and trademarks; Hyatt does not warrant the development, marketing, sale or operation. Plans, areas, amenities, services, brands, prices, availability and completion dates may change. Purchasers should appoint independent Spanish legal and tax advisers and review the final purchase, management, community and tourist-accommodation documents.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
