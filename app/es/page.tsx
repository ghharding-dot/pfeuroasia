import Image from "next/image";
import Link from "next/link";
import styles from "../HomeRegions.module.css";
import { createMetadata } from "../lib/seo";
import { SpanishHeader } from "./SpanishHeader";
import { SpanishHomePhase2 } from "./SpanishHomePhase2";
import {
  PublicPropertyCarousel,
  type PublicPropertySlide,
} from "../components/PublicPropertyCarousel";
import {
  imageObjectPosition,
  normalizePropertyMarket,
  readProperties,
} from "../lib/propertyStore";

export const metadata = createMetadata("homeEs");
export const dynamic = "force-dynamic";

const services = [
  ["01", "Asesoramiento en adquisiciones", "Búsqueda estratégica y representación del comprador, tanto en el mercado abierto como en oportunidades discretas.", "/es/services/acquisition"],
  ["02", "Venta internacional", "Posicionamiento de propiedades especiales para compradores internacionales cualificados.", "/es/services/international-sales"],
  ["03", "Relocation y residencia", "Coordinación de residencia, visados, estructuras empresariales y traslado mediante especialistas locales.", "/es/services/relocation-concierge"],
  ["04", "Concierge y alquiler de villas", "Estancias exclusivas y servicios personales en Marbella y el sur de España.", "/es/luxury-villa-rentals"],
];

async function getSpanishPropertySlides(): Promise<{
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
      if (property.listingType === "new-development" || property.priceCurrency !== "EUR") return total;
      const titleKey = property.title.trim().toLowerCase().replace(/\s+/g, " ");
      if (!titleKey || uniqueVillaTitles.has(titleKey)) return total;
      uniqueVillaTitles.add(titleKey);
      return total + (property.priceAmount || 0);
    }, 0);
    const approved = approvedProperties.map((property) => {
      const isTeaser = property.visibility === "teaser";
      return {
        listingType: property.listingType === "new-development" ? "new-development" : "resale",
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
          title: property.publicTitle || (isTeaser ? "Oportunidad inmobiliaria privada" : property.title),
          location: property.publicLocation || (isTeaser ? "Sur de España" : property.location),
          visibility: property.visibility as "teaser" | "public",
          accessLevel: property.accessLevel,
          price: property.visibility === "public" ? property.price || "Precio a consultar" : undefined,
          priceTo: property.visibility === "public" && property.listingType === "new-development" ? property.priceTo : undefined,
          plotSize: property.plotSize || undefined,
          builtSize: property.builtSize || undefined,
          builtSizeTo: property.builtSizeTo || undefined,
          bedrooms: property.bedrooms || undefined,
          bedroomsTo: property.bedroomsTo || undefined,
          bathrooms: property.bathrooms || undefined,
          bathroomsTo: property.bathroomsTo || undefined,
          terraces: property.terraces || undefined,
          amenities: property.amenities || undefined,
          description: property.visibility === "public" ? property.description || undefined : undefined,
        },
      };
    });
    const resale = approved.filter((item) => item.listingType === "resale");
    const uniqueResale = resale.filter((item, index, items) => {
      const titleKey = item.slide.title.trim().toLowerCase().replace(/\s+/g, " ");
      return items.findIndex((candidate) => candidate.slide.title.trim().toLowerCase().replace(/\s+/g, " ") === titleKey) === index;
    });
    const homepageProperties = [
      ...uniqueResale.filter((item) => item.featuredOnHomepage).sort((a, b) => a.homepagePriority - b.homepagePriority),
      ...uniqueResale.filter((item) => !item.featuredOnHomepage),
    ].slice(0, 10).map((item) => item.slide);
    return {
      properties: homepageProperties,
      developments: approved.filter((item) => item.listingType === "new-development").map((item) => item.slide),
      privateVillaValueMillions: Math.floor(privateVillaValue / 1_000_000),
    };
  } catch (error) {
    console.error("spanish-homepage-property-carousel-unavailable", error);
    return { properties: [], developments: [], privateVillaValueMillions: 0 };
  }
}

export default async function SpanishHome() {
  const publicPropertySlides = await getSpanishPropertySlides();
  return (
    <main>
      <SpanishHeader />
      <SpanishHomePhase2 />
      <PublicPropertyCarousel
        slides={publicPropertySlides.properties}
        portfolioValueMillions={publicPropertySlides.privateVillaValueMillions}
        catalogueHref="/es/properties"
        locale="es"
        eyebrow="Oportunidades inmobiliarias seleccionadas"
        heading="Una muestra de lo que está disponible."
        emphasis="Propiedades publicadas y oportunidades privadas."
        summary="Consulte propiedades seleccionadas en Marbella, Benahavís y la Costa del Sol. Las oportunidades privadas y off-market están sujetas a cualificación."
        headingId="oportunidades-seleccionadas-es"
      />
      <PublicPropertyCarousel
        slides={publicPropertySlides.developments}
        variant="development"
        locale="es"
        eyebrow="Nuevas promociones en España"
        heading="Proyectos en desarrollo."
        emphasis="Obra nueva, sobre plano y oportunidades de inversión."
        summary="Explore proyectos seleccionados de obra nueva y promociones en construcción con acceso directo a la disponibilidad y la información del promotor."
        emptyMessage="Próximamente se publicarán aquí la disponibilidad actual, los detalles de inversión y la información de los promotores."
        headingId="nuevas-promociones-es"
      />
      <section className="hero">
        <Image className="hero-image" src="/images/hero-villa.webp" alt="Villa de lujo en Marbella representada por Property Facilitators EuroAsia" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-grid site-shell">
          <div className="hero-copy reveal-up"><p className="eyebrow light">Europa y Asia conectadas</p><h1>Su puerta de entrada a <span>oportunidades internacionales.</span></h1><p className="hero-intro">Propiedad · Relocation · Residencia · Expansión empresarial</p><p className="hero-intro">Ayudamos a inversores, empresarios y familias a crear nuevas oportunidades entre Europa y Asia mediante una red de profesionales locales de confianza.</p><div className="hero-actions"><a className="button button-gold" href="#mercados-es">Descubrir oportunidades <span>→</span></a><Link className="text-link light-link" href="/es/enquire">Solicitar una conversación confidencial <span>→</span></Link></div></div>
          <aside className="hero-note"><span className="gold-rule" /><p>Red de confianza en Europa y Asia</p><small>España · Malasia · Hong Kong · Singapur<br />EAU · Tailandia</small></aside>
        </div>
      </section>
      <section className={styles.regionsSection} id="mercados-es">
        <div className="site-shell"><div className={styles.heading}><div><p className="eyebrow">Propiedades en España</p><h2>Marbella y Benahavís.<em>Costa del Sol.</em></h2></div><p>Acceda a propiedades seleccionadas, oportunidades privadas y asesoramiento local en las mejores zonas del sur de España.</p></div><div className={styles.regionGrid}><article className={`${styles.regionCard} ${styles.spain}`}><div className={styles.regionInner}><span className={styles.regionLabel}>España · Costa del Sol</span><div className={styles.regionCopy}><h3>España</h3><p>Villas de lujo, propiedades privadas y relocation en Marbella, Benahavís y la Costa del Sol.</p><nav className={styles.subLinks}><Link href="/es/markets/marbella">Marbella</Link><Link href="/es/areas/la-zagaleta">La Zagaleta</Link><Link href="/es/areas/el-madronal">El Madroñal</Link><Link href="/es/properties">Propiedades</Link></nav></div><Link className={styles.cardCta} href="/es/properties">Ver propiedades en España →</Link></div></article></div></div>
      </section>
      <section className="services-section section-pad">
        <div className="site-shell"><div className="section-heading-row"><div><p className="eyebrow light">Qué ofrecemos</p><h2>Servicio personal.<br />Alcance internacional.</h2></div><p>Un único contacto de confianza para propiedad, residencia, relocation y oportunidades entre mercados.</p></div><div className="service-list">{services.map(([number, title, text, href]) => <Link className="service-row" href={href} key={number}><span className="service-number">{number}</span><h3>{title}</h3><p>{text}</p><span className="round-arrow">→</span></Link>)}</div></div>
      </section>
      <section className="cta-section"><div className="site-shell cta-inner"><p className="eyebrow light">Una conversación confidencial</p><h2>Cuéntenos qué desea conseguir.</h2><p>Compra, venta, traslado, residencia o colaboración estratégica: responderemos personalmente.</p><Link className="button button-gold" href="/es/enquire">Iniciar consulta <span>→</span></Link></div></section>
      <footer className="zh-footer"><div className="site-shell"><Link className="brand" href="/es"><span className="brand-lockup" aria-hidden="true"><img className="brand-symbol" src="/images/pf-gold-symbol.png" alt="" /><span className="brand-words"><b>Property</b><b>Facilitators</b></span><span className="brand-region">EuroAsia</span></span></Link><p>Asesoramiento inmobiliario independiente entre Europa y Asia.</p><Link className="language-link" href="/">English version →</Link></div></footer>
    </main>
  );
}
