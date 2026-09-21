import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import {
  PublicPropertyCarousel,
  type PublicPropertySlide,
} from "../components/PublicPropertyCarousel";
import { SpecialistOpportunities } from "../components/SpecialistOpportunities";
import {
  imageObjectPosition,
  normalizePropertyMarket,
  readProperties,
} from "../lib/propertyStore";
import styles from "../HomeRegions.module.css";
import pageStyles from "./SpainGateway.module.css";

export const metadata: Metadata = {
  title: "Spain Gateway | Marbella & Benahavís Property | PF EuroAsia",
  description:
    "Explore selected villas, new developments, investment property, luxury rentals and private opportunities across Marbella, Benahavís and the Costa del Sol.",
  alternates: { canonical: "https://www.pfeuroasia.com/spain-gateway" },
};

export const dynamic = "force-dynamic";

const services = [
  {
    number: "01",
    title: "Property acquisition",
    text: "Selected villas, private homes and discreet off-market opportunities across Marbella, Benahavís and the Costa del Sol.",
    href: "/properties",
  },
  {
    number: "02",
    title: "New developments",
    text: "Branded residences, managed investment properties and carefully selected new-build projects with direct access to current information.",
    href: "/investment-property-marbella",
  },
  {
    number: "03",
    title: "Private portfolio",
    text: "Confidential access to exceptional villas, estates and specialist requirements that are not presented fully on the open market.",
    href: "/private-portfolio",
  },
  {
    number: "04",
    title: "Luxury villa rentals",
    text: "A selection from more than 100 luxury villas, supported by local concierge and practical arrival services.",
    href: "/luxury-villa-rentals",
  },
];

async function getSpainPropertySlides(): Promise<{
  properties: PublicPropertySlide[];
  developments: PublicPropertySlide[];
  privateVillaValueMillions: number;
}> {
  try {
    const properties = await readProperties();
    const approvedProperties = properties.filter(
      (property) =>
        property.status === "published" &&
        normalizePropertyMarket(property.market) === "spain" &&
        (property.visibility === "teaser" || property.visibility === "public") &&
        property.publicImageApproved === true &&
        Boolean(property.image),
    );

    const uniqueVillaTitles = new Set<string>();
    const privateVillaValue = approvedProperties.reduce((total, property) => {
      if (property.listingType === "new-development" || property.priceCurrency !== "EUR") {
        return total;
      }
      const titleKey = property.title.trim().toLowerCase().replace(/\s+/g, " ");
      if (!titleKey || uniqueVillaTitles.has(titleKey)) return total;
      uniqueVillaTitles.add(titleKey);
      return total + (property.priceAmount || 0);
    }, 0);

    const approved = approvedProperties.map((property) => {
      const isTeaser = property.visibility === "teaser";
      return {
        listingType:
          property.listingType === "new-development" ? "new-development" : "resale",
        featuredOnHomepage: property.featuredOnHomepage === true,
        homepagePriority: property.homepagePriority || 100,
        slide: {
          id: property.id,
          reference: property.reference,
          image: property.image,
          secondaryImage: property.secondaryImage,
          thirdImage: property.thirdImage,
          fourthImage: property.fourthImage,
          imagePosition: imageObjectPosition(property.imagePosition),
          title:
            property.publicTitle ||
            (isTeaser ? "Private property opportunity" : property.title),
          location:
            property.publicLocation || (isTeaser ? "Southern Spain" : property.location),
          visibility: property.visibility as "teaser" | "public",
          price:
            property.visibility === "public"
              ? property.price || "Price on application"
              : undefined,
          priceTo:
            property.visibility === "public" &&
            property.listingType === "new-development"
              ? property.priceTo
              : undefined,
          plotSize: property.plotSize || undefined,
          builtSize: property.builtSize || undefined,
          builtSizeTo: property.builtSizeTo || undefined,
          bedrooms: property.bedrooms || undefined,
          bedroomsTo: property.bedroomsTo || undefined,
          bathrooms: property.bathrooms || undefined,
          bathroomsTo: property.bathroomsTo || undefined,
          terraces: property.terraces || undefined,
          yearOfConstruction: property.yearOfConstruction || undefined,
          amenities: property.amenities || undefined,
          description:
            property.visibility === "public" ? property.description || undefined : undefined,
        } satisfies PublicPropertySlide,
      };
    });

    const resale = approved.filter((item) => item.listingType === "resale");
    const uniqueResale = resale.filter((item, index, items) => {
      const titleKey = item.slide.title.trim().toLowerCase().replace(/\s+/g, " ");
      return (
        items.findIndex(
          (candidate) =>
            candidate.slide.title.trim().toLowerCase().replace(/\s+/g, " ") === titleKey,
        ) === index
      );
    });
    const featured = uniqueResale
      .filter((item) => item.featuredOnHomepage)
      .sort((a, b) => a.homepagePriority - b.homepagePriority);

    return {
      properties: [
        ...featured,
        ...uniqueResale.filter((item) => !item.featuredOnHomepage),
      ]
        .slice(0, 10)
        .map((item) => item.slide),
      developments: approved
        .filter((item) => item.listingType === "new-development")
        .map((item) => item.slide),
      privateVillaValueMillions: Math.floor(privateVillaValue / 1_000_000),
    };
  } catch (error) {
    console.error("spain-gateway-property-carousel-unavailable", error);
    return { properties: [], developments: [], privateVillaValueMillions: 0 };
  }
}

export default async function SpainGatewayPage() {
  const publicPropertySlides = await getSpainPropertySlides();

  return (
    <main>
      <Header transparent />

      <section className={pageStyles.hero}>
        <div className={pageStyles.heroOverlay} />
        <div className={`site-shell ${pageStyles.heroInner}`}>
          <p className="eyebrow light">Spain Gateway</p>
          <h1>
            Property in Spain.
            <em>Personally represented.</em>
          </h1>
          <p>
            Selected villas, new developments, investment opportunities and
            luxury stays across Marbella, Benahavís and the Costa del Sol,
            supported by trusted local professionals.
          </p>
          <div className={pageStyles.heroActions}>
            <a className="button button-gold" href="#spain-properties">
              Explore Spain property <span>→</span>
            </a>
            <Link className="text-link light-link" href="/enquire">
              Make a confidential enquiry <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <div id="spain-properties">
        <PublicPropertyCarousel
          slides={publicPropertySlides.properties}
          portfolioValueMillions={publicPropertySlides.privateVillaValueMillions}
          catalogueHref="/properties"
        />
      </div>
      <PublicPropertyCarousel
        slides={publicPropertySlides.developments}
        variant="development"
      />

      <section className={styles.regionsSection} id="spain-areas">
        <div className="site-shell">
          <div className={styles.heading}>
            <div>
              <p className="eyebrow">Property in Spain</p>
              <h2>
                Marbella Golden Mile &amp; Benahavís.
                <em>The Costa del Sol.</em>
              </h2>
            </div>
            <p>
              Explore our established Spain property service, including
              Marbella, La Zagaleta, El Madroñal, private estates and luxury
              villa rentals.
            </p>
          </div>

          <div className={styles.regionGrid}>
            <article className={`${styles.regionCard} ${styles.spain}`}>
              <div className={styles.regionInner}>
                <span className={styles.regionLabel}>Spain · Costa del Sol</span>
                <div className={styles.regionCopy}>
                  <h3>Spain</h3>
                  <p>
                    Luxury residential property, private estates and relocation
                    across Marbella, Benahavís and the Costa del Sol.
                  </p>
                  <nav className={styles.subLinks} aria-label="Explore Spain">
                    <Link href="/markets/marbella">Marbella</Link>
                    <Link href="/areas/marbella-golden-mile">Golden Mile</Link>
                    <Link href="/areas/benahavis">Benahavís</Link>
                    <Link href="/areas/la-zagaleta">La Zagaleta</Link>
                    <Link href="/areas/el-madronal">El Madroñal</Link>
                    <Link href="/guides/marbella-property-international-buyers">
                      International buyer guide
                    </Link>
                    <Link href="/private-portfolio">Private estates</Link>
                    <Link href="/investment-property-marbella">
                      Investment developments
                    </Link>
                  </nav>
                </div>
                <Link className={styles.cardCta} href="/properties">
                  View Spain property →
                </Link>
              </div>
            </article>
          </div>

          <article className={`${styles.rentalCard} ${styles.rentals}`}>
            <div className={styles.rentalInner}>
              <div className={styles.rentalCopy}>
                <span className={styles.regionLabel}>Stay first · Explore Marbella</span>
                <h3>Luxury Villa Rentals</h3>
                <p>
                  Come to Spain first and stay in one of our luxury villas
                  before deciding where you would like to buy in Marbella.
                </p>
              </div>
              <Link className={styles.rentalCta} href="/luxury-villa-rentals">
                View luxury villas <span>→</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="services-section section-pad">
        <div className="site-shell">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow light">Spain property service</p>
              <h2>
                Local knowledge.
                <br />International reach.
              </h2>
            </div>
            <p>
              One Spain gateway for selected homes, new developments, private
              opportunities and luxury stays.
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

      <section className="private-portfolio section-pad">
        <div className="site-shell">
          <div className="portfolio-intro">
            <div>
              <p className="eyebrow light">Specialist private opportunities</p>
              <h2>Some requirements begin beyond the conventional market.</h2>
            </div>
            <div>
              <p>
                Register your criteria and we will respond personally with
                suitable public and private introductions.
              </p>
              <Link
                className="button button-gold private-access-button"
                href="/private-portfolio/access"
              >
                Access Private Portfolio <span>→</span>
              </Link>
            </div>
          </div>
          <SpecialistOpportunities />
        </div>
      </section>

      <section className="cta-section">
        <div className="site-shell cta-inner">
          <p className="eyebrow light">Spain property enquiry</p>
          <h2>Tell us what you are looking for in Spain.</h2>
          <p>
            Buying, investing, renting or exploring a private opportunity—we
            will respond personally and in confidence.
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
