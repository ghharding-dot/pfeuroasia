import Image from "next/image";
import Link from "next/link";
import styles from "../HomeRegions.module.css";
import { createMetadata } from "../lib/seo";
import { SpanishHeader } from "./SpanishHeader";
import { SpanishHomePhase2 } from "./SpanishHomePhase2";

export const metadata = createMetadata("homeEs");

const services = [
  ["01", "Asesoramiento en adquisiciones", "Búsqueda estratégica y representación del comprador, tanto en el mercado abierto como en oportunidades discretas.", "/es/services/acquisition"],
  ["02", "Venta internacional", "Posicionamiento de propiedades especiales para compradores internacionales cualificados.", "/es/services/international-sales"],
  ["03", "Relocation y residencia", "Coordinación de residencia, visados, estructuras empresariales y traslado mediante especialistas locales.", "/es/services/relocation-concierge"],
  ["04", "Concierge y alquiler de villas", "Estancias exclusivas y servicios personales en Marbella y el sur de España.", "/es/luxury-villa-rentals"],
];

export default function SpanishHome() {
  return (
    <main>
      <SpanishHeader />
      <SpanishHomePhase2 />
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
