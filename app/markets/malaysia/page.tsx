import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  PublicPropertyCarousel,
  type PublicPropertySlide,
} from "../../components/PublicPropertyCarousel";
import {
  imageObjectPosition,
  normalizePropertyMarket,
  propertyTypeLabel,
  readProperties,
} from "../../lib/propertyStore";
import { MalaysiaCostAndVisit } from "./MalaysiaCostAndVisit";

export const dynamic = "force-dynamic";

async function getMalaysiaPropertySlides(): Promise<PublicPropertySlide[]> {
  try {
    const properties = await readProperties();
    return properties
      .filter(
        (property) =>
          property.status === "published" &&
          (normalizePropertyMarket(property.market) === "malaysia" ||
            normalizePropertyMarket(property.market) === "asia") &&
          (property.visibility === "teaser" || property.visibility === "public") &&
          property.publicImageApproved === true &&
          Boolean(property.image),
      )
      .map((property) => {
        const isTeaser = property.visibility === "teaser";
        return {
          id: property.id,
          image: property.image,
          secondaryImage: property.secondaryImage,
          thirdImage: property.thirdImage,
          fourthImage: property.fourthImage,
          imagePosition: imageObjectPosition(property.imagePosition),
          title:
            property.publicTitle ||
            (isTeaser ? "Private Malaysia property opportunity" : property.title),
          location:
            property.publicLocation ||
            (isTeaser ? "Malaysia" : property.location),
          visibility: property.visibility as "teaser" | "public",
          accessLevel: property.accessLevel,
          price:
            property.visibility === "public"
              ? property.price || "Price on application"
              : undefined,
          priceTo:
            property.visibility === "public" && property.listingType === "new-development"
              ? property.priceTo
              : undefined,
          builtSize: property.builtSize || undefined,
          bedrooms: property.bedrooms || undefined,
          bathrooms: property.bathrooms || undefined,
          terraces: property.terraces || undefined,
          country: property.country || (property.market === "malaysia" ? "Malaysia" : undefined),
          setting: property.setting || undefined,
          views: property.views || undefined,
          yearOfConstruction: property.yearOfConstruction || undefined,
          developer: property.developer || undefined,
          salesAgent: property.salesAgent || property.listingPartnerName || undefined,
          propertyType:
            property.listingType === "new-development"
              ? `New build · ${propertyTypeLabel(property.propertyType)}`
              : propertyTypeLabel(property.propertyType),
        };
      });
  } catch (error) {
    console.error("malaysia-property-carousel-unavailable", error);
    return [];
  }
}

export default async function MalaysiaPage() {
  const malaysiaPropertySlides = await getMalaysiaPropertySlides();

  return <main>
    <Header enquireHref="/asia-gateway/enquire" enquireLabel="Asia enquiry" />

    <section className="malaysia-split-hero">
      <div className="malaysia-split-images" aria-hidden="true">
        <div className="malaysia-city-panel"><Image src="/images/kl%20BACK%20GORUND.avif" alt="" width={2016} height={3000} priority sizes="(max-width: 760px) 100vw, 50vw" /></div>
        <div className="malaysia-island-panel"><Image src="/images/Emerald%20bay%20pkl.jpg" alt="" width={2048} height={1365} priority sizes="(max-width: 760px) 100vw, 50vw" /></div>
      </div>
      <div className="malaysia-split-shade" />
      <div className="site-shell malaysia-split-copy">
        <p className="eyebrow light">Malaysia · City & lifestyle</p>
        <h1>Super city to beautiful beaches and islands.</h1>
        <p className="malaysia-split-line">There&apos;s more to Malaysia.</p>
        <p className="malaysia-split-intro">From Kuala Lumpur&apos;s international business, property and connectivity to tropical islands and coastal living, Malaysia combines opportunity with an exceptional quality of life.</p>
        <div className="malaysia-split-actions">
          <Link className="button button-gold" href="/asia-gateway/enquire">Explore Malaysia <span>→</span></Link>
          <a className="text-link light-link" href="#malaysia-opportunities">See property opportunities <span>→</span></a>
        </div>
      </div>
    </section>

    <section className="market-landing-intro section-pad"><div className="site-shell narrow-grid"><p className="eyebrow">Spain made closer</p><div><h2>Local representation across borders.</h2><p>For clients based in Malaysia, we provide an accountable presence in Spain—qualifying opportunities, arranging focused visits, coordinating advisers and representing the client through the commercial process.</p></div></div></section>

    <section className="malaysia-services section-pad">
      <div className="site-shell">
        <p className="eyebrow light">PF EuroAsia recommends · YTL Hotels</p>
        <div className="area-feature-grid hotel-recommendation-grid">
          <article className="hotel-recommendation-card">
            <div className="hotel-recommendation-image">
              <Image src="/images/Ritz%20CARLTON.webp" alt="The Ritz-Carlton, Kuala Lumpur" fill sizes="(max-width: 620px) 100vw, 33vw" />
              <div className="hotel-recommendation-shade" />
              <div className="hotel-recommendation-number">01</div>
              <div className="hotel-recommendation-title">
                <span>Refined city stay</span>
                <h2>The Ritz-Carlton,<br />Kuala Lumpur</h2>
              </div>
            </div>
            <div className="hotel-recommendation-copy">
              <p>Our preferred Kuala Lumpur choice for a refined five-star stay, with a quieter luxury atmosphere, award-winning dining and spa facilities.</p>
              <a className="text-link light-link" href="https://www.ytlhotels.com/hotels-and-resorts/malaysia/the-ritz-carlton/" target="_blank" rel="noreferrer">View at YTL Hotels <span>→</span></a>
            </div>
          </article>
          <article className="hotel-recommendation-card">
            <div className="hotel-recommendation-image">
              <Image src="/images/JW%20Marriott%20STREET.jpg" alt="JW Marriott Kuala Lumpur" fill sizes="(max-width: 620px) 100vw, 33vw" />
              <div className="hotel-recommendation-shade" />
              <div className="hotel-recommendation-number">02</div>
              <div className="hotel-recommendation-title">
                <span>Central Kuala Lumpur</span>
                <h2>JW Marriott<br />Kuala Lumpur</h2>
              </div>
            </div>
            <div className="hotel-recommendation-copy">
              <p>Our city-centre recommendation for visitors who want to be close to Kuala Lumpur&apos;s business, shopping, dining and social districts.</p>
              <a className="text-link light-link" href="https://www.ytlhotels.com/hotels-and-resorts/malaysia/jw-marriott/" target="_blank" rel="noreferrer">View at YTL Hotels <span>→</span></a>
            </div>
          </article>
          <article className="hotel-recommendation-card">
            <div className="hotel-recommendation-image">
              <Image src="/images/Emerald%20bay%20pkl.jpg" alt="Pangkor Laut Resort and Emerald Bay" fill sizes="(max-width: 620px) 100vw, 33vw" />
              <div className="hotel-recommendation-shade" />
              <div className="hotel-recommendation-number">03</div>
              <div className="hotel-recommendation-title">
                <span>Private island retreat</span>
                <h2>Pangkor Laut<br />Resort</h2>
              </div>
            </div>
            <div className="hotel-recommendation-copy">
              <p>Our recommended retreat: an island setting in Perak for privacy, nature and relaxation when the trip is about switching off rather than staying in the city.</p>
              <a className="text-link light-link" href="https://www.ytlhotels.com/hotels-and-resorts/malaysia/" target="_blank" rel="noreferrer">Explore Pangkor Laut at YTL Hotels <span>→</span></a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section className="china-contact section-pad"><div className="site-shell china-contact-grid"><div><p className="eyebrow">Residency & company formation</p><h2>Build a base<br />in Malaysia.</h2></div><div><p>For international entrepreneurs and families, we coordinate Labuan company formation, work permit and dependent residency applications with an established local corporate and advisory specialist.</p><div className="channel-tags"><span>Labuan company</span><span>Work permit</span><span>Family residency</span></div><Link className="button button-dark" href="/services/labuan-company-residency">Explore the Labuan pathway <span>→</span></Link></div></div></section>
    <section className="malaysia-services section-pad"><div className="site-shell"><p className="eyebrow light">How we connect the markets</p><div className="area-feature-grid"><article><span>01</span><h2>Private clients</h2><p>Spanish acquisition advice built around lifestyle, residency plans and long-term ownership.</p></article><article><span>02</span><h2>Professional partners</h2><p>A Spain-side brokerage relationship for trusted agents, advisers and family offices in Asia.</p></article><article><span>03</span><h2>Cross-border coordination</h2><p>One point of contact to organise property, legal, tax and relocation workstreams.</p></article></div></div></section>

    <section className="kl-opportunities section-pad" id="malaysia-opportunities">
      <div className="site-shell">
        <div className="kl-heading">
          <div>
            <p className="eyebrow">Kuala Lumpur property</p>
            <h2>Selected opportunities.<br />Direct local access.</h2>
          </div>
          <div>
            <p>We provide access to selected new developments across Kuala Lumpur, with opportunities in the wider portfolio from approximately <strong>US$150,000</strong>.</p>
            <Link className="text-link" href="/asia-gateway/enquire">Request current opportunities <span>→</span></Link>
          </div>
        </div>

        <article className="kl-feature">
          <div className="kl-feature-image">
            <img src="/images/kl-armani-skyline.webp" alt="Artist's impression showing Armani Hallson KLCC within the Kuala Lumpur skyline" />
            <span>Artist&apos;s impression</span>
          </div>
          <div className="kl-feature-copy">
            <p className="eyebrow">Featured development</p>
            <h3>Armani Hallson KLCC</h3>
            <p>A freehold development on Jalan Ampang, positioned approximately 300 metres from KLCC and designed around panoramic city views, flexible SOHO and SOVO layouts and elevated lifestyle facilities.</p>
            <ul>
              <li>Central KLCC location</li>
              <li>Freehold tenure</li>
              <li>Layouts from 406 to 1,182 sq ft</li>
              <li>Rooftop pools, gyms, sky lounge and viewing deck</li>
              <li>Scheduled completion in 2029</li>
            </ul>
            <small>Availability, specifications and prices are subject to confirmation. Full details are provided privately.</small>
          </div>
        </article>

        <div className="kl-gallery">
          <figure><img src="/images/kl-armani-arrival.webp" alt="Artist's impression of the Armani Hallson KLCC arrival and drop-off" /><figcaption><span>01</span>Arrival</figcaption></figure>
          <figure><img src="/images/kl-armani-rooftop.webp" alt="Artist's impression of Armani Hallson KLCC rooftop facilities" /><figcaption><span>02</span>Rooftop facilities</figcaption></figure>
          <figure><img src="/images/kl-armani-pool.webp" alt="Artist's impression of the level 76 pool deck overlooking the Petronas Towers" /><figcaption><span>03</span>KLCC pool deck</figcaption></figure>
          <figure><img src="/images/kl-armani-gym.webp" alt="Artist's impression of the sky gym overlooking Kuala Lumpur" /><figcaption><span>04</span>Sky gym</figcaption></figure>
        </div>
        <p className="kl-image-note">All development imagery shown is an artist&apos;s impression supplied for marketing purposes.</p>
      </div>
    </section>

    <PublicPropertyCarousel
      slides={malaysiaPropertySlides}
      variant="asia"
      eyebrow="Asia property collection"
      heading="Explore current opportunities."
      emphasis="Cities, beaches, islands and selected developments across Asia."
      summary="Approved Asian listings submitted through the PF EuroAsia collaboration network, with location, size, views, build status, developer and local sales representation shown clearly."
      emptyMessage="Our Asia collaborators can upload and submit developments and individual properties through the secure PF EuroAsia approval system. Approved opportunities will appear here."
      headingId="malaysia-property-carousel-heading"
      directPublicListings
    />

    <section className="china-contact section-pad"><div className="site-shell china-contact-grid"><div><p className="eyebrow">Serving wider Asia</p><h2>Malaysia first.<br />China ready.</h2></div><div><p>Malaysia provides the operational bridge, while mainland China requires a different communication approach. China enquiries should use email, WeChat or the secure enquiry form rather than relying on WhatsApp.</p><div className="channel-tags"><span>Email</span><span>WeChat</span><span>Secure form</span></div><Link className="button button-dark" href="/asia-gateway/enquire">Contact the Asia desk <span>→</span></Link></div></div></section>

    <MalaysiaCostAndVisit />

    <Footer />
  </main>;
}
