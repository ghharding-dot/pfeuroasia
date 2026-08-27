import type { Metadata } from "next";
import Link from "next/link";
import { SpanishHeader } from "../SpanishHeader";
import { formatPropertyArea } from "../../lib/propertyDisplay";
import { normalizePropertyMarket, readProperties } from "../../lib/propertyStore";
import styles from "../../properties/properties.module.css";
import { SpanishPropertyUpdatesForm } from "./SpanishPropertyUpdatesForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Colección de propiedades en Marbella y Benahavís | PF EuroAsia",
  description: "Villas y oportunidades seleccionadas en Marbella, La Zagaleta, El Madroñal y Benahavís.",
  alternates: { canonical: "https://www.pfeuroasia.com/es/properties", languages: { "es-ES": "/es/properties", "en-GB": "/properties", "x-default": "/properties" } },
};

function titleKey(value: string) { return value.trim().toLowerCase().replace(/\s+/g, " "); }

export default async function SpanishPropertiesPage() {
  const properties = await readProperties();
  const visible = properties
    .filter((property) => property.status === "published" && normalizePropertyMarket(property.market) === "spain" && (property.visibility === "teaser" || property.visibility === "public") && property.publicImageApproved === true && Boolean(property.image))
    .filter((property, index, items) => items.findIndex((candidate) => titleKey(candidate.publicTitle || candidate.title) === titleKey(property.publicTitle || property.title)) === index);

  return (
    <main className={styles.page}>
      <SpanishHeader />
      <section className={styles.hero}><div className="site-shell"><p className="eyebrow light">Propiedades en España</p><h1>Oportunidades seleccionadas.</h1><p>Explore la colección actual en Marbella, La Zagaleta, El Madroñal y Benahavís. Los detalles públicos pueden consultarse libremente; las propiedades privadas están sujetas a cualificación.</p></div></section>
      <section className={styles.registrationSection}><div className={`site-shell ${styles.registrationInner}`}><div><p className="eyebrow">Novedades privadas</p><h2>Conozca primero las incorporaciones importantes.</h2><p>Regístrese para recibir nuevas propiedades seleccionadas y cambios relevantes de precio.</p></div><SpanishPropertyUpdatesForm /></div></section>
      <section className={styles.collectionSection}><div className="site-shell"><div className={styles.collectionHeading}><div><p className="eyebrow">Colección actual</p><h2>{visible.length} oportunidades seleccionadas</h2></div><p>Las propiedades privadas y off-market requieren aprobación individual.</p></div><div className={styles.grid}>{visible.map((property) => {
        const registered = property.visibility === "public";
        const title = property.publicTitle || (registered ? property.title : "Oportunidad inmobiliaria privada");
        const location = property.publicLocation || (registered ? property.location : "Sur de España");
        return <article className={styles.card} key={property.id}><Link href={registered ? `/properties/${property.id}` : "/es/private-portfolio"} className={styles.imageLink}><img src={property.image} alt={title} loading="lazy" /><span>{registered ? "Propiedad publicada" : "Oportunidad privada"}</span></Link><div className={styles.cardCopy}><p>{location}</p><h3>{title}</h3>{registered && property.price ? <strong>{property.price}</strong> : null}{(formatPropertyArea(property.plotSize) || formatPropertyArea(property.builtSize) || Boolean(property.bedrooms)) ? <dl className={styles.propertyFacts}>{formatPropertyArea(property.plotSize) ? <div><dt>Parcela</dt><dd>{formatPropertyArea(property.plotSize)}</dd></div> : null}{formatPropertyArea(property.builtSize) ? <div><dt>Construido</dt><dd>{formatPropertyArea(property.builtSize)}</dd></div> : null}{property.bedrooms ? <div><dt>Dormitorios</dt><dd>{property.bedrooms}</dd></div> : null}</dl> : null}<Link href={registered ? `/properties/${property.id}` : "/es/private-portfolio"}>{registered ? "Ver detalles completos" : "Solicitar acceso privado"} <span>→</span></Link></div></article>;
      })}</div></div></section>
      <footer className="zh-footer"><div className="site-shell"><Link className="brand" href="/es"><span className="brand-lockup" aria-hidden="true"><img className="brand-symbol" src="/images/pf-gold-symbol.png" alt="" /><span className="brand-words"><b>Property</b><b>Facilitators</b></span><span className="brand-region">EuroAsia</span></span></Link><p>Propiedades seleccionadas en Marbella y Benahavís.</p><Link className="language-link" href="/properties">English version →</Link></div></footer>
    </main>
  );
}
