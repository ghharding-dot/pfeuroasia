import type { Metadata } from "next";
import Link from "next/link";
import { formatPropertyArea } from "../../lib/propertyDisplay";
import { normalizePropertyMarket, readProperties } from "../../lib/propertyStore";
import styles from "../../properties/properties.module.css";
import { SwedishHeader } from "../SwedishHeader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Utvalda fastigheter i Spanien | PF EuroAsia",
  description: "Se utvalda villor, privata möjligheter och nyproduktion i Marbella, La Zagaleta, El Madroñal och Benahavís.",
  alternates: { canonical: "https://www.pfeuroasia.com/sv/properties" },
};

function titleKey(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export default async function SwedishPropertiesPage() {
  const properties = await readProperties();
  const visible = properties
    .filter((property) => property.status === "published" && normalizePropertyMarket(property.market) === "spain" && (property.visibility === "teaser" || property.visibility === "public") && property.publicImageApproved === true && Boolean(property.image))
    .filter((property, index, items) => items.findIndex((candidate) => titleKey(candidate.publicTitle || candidate.title) === titleKey(property.publicTitle || property.title)) === index);

  return (
    <main className={styles.page}>
      <SwedishHeader transparent={false} />
      <section className={styles.hero}><div className="site-shell"><p className="eyebrow light">Fastigheter i Spanien</p><h1>Utvalda fastighetsmöjligheter.</h1><p>Se den aktuella samlingen i Marbella, La Zagaleta, El Madroñal och Benahavís. Publicerade objekt är öppna att visa, medan privata möjligheter kräver en personlig förfrågan.</p></div></section>
      <section className={styles.collectionSection}><div className="site-shell">
        <div className={styles.collectionHeading}><div><p className="eyebrow">Aktuell samling</p><h2>{visible.length} utvalda möjligheter</h2></div><p>Privata och off-market-objekt är föremål för kvalificering och individuellt godkännande.</p></div>
        <div className={styles.grid}>{visible.map((property) => {
          const registered = property.visibility === "public";
          const title = property.publicTitle || (registered ? property.title : "Privat fastighetsmöjlighet");
          const location = property.publicLocation || (registered ? property.location : "Södra Spanien");
          return <article className={styles.card} key={property.id}>
            <Link href={registered ? `/properties/${property.id}` : "/private-portfolio"} className={styles.imageLink}><img src={property.image} alt={title} loading="lazy" /><span>{registered ? "Publicerat objekt" : "Privat möjlighet"}</span></Link>
            <div className={styles.cardCopy}><p>{location}</p><h3>{title}</h3>{registered && property.price ? <strong>{property.price}</strong> : null}
              {(formatPropertyArea(property.plotSize) || formatPropertyArea(property.builtSize) || Boolean(property.bedrooms)) ? <dl className={styles.propertyFacts}>{formatPropertyArea(property.plotSize) ? <div><dt>Tomt</dt><dd>{formatPropertyArea(property.plotSize)}</dd></div> : null}{formatPropertyArea(property.builtSize) ? <div><dt>Boyta</dt><dd>{formatPropertyArea(property.builtSize)}</dd></div> : null}{property.bedrooms ? <div><dt>Sovrum</dt><dd>{property.bedrooms}</dd></div> : null}</dl> : null}
              <Link href={registered ? `/properties/${property.id}` : "/private-portfolio"}>{registered ? "Visa fullständig information" : "Begär privat åtkomst"} <span>→</span></Link>
            </div>
          </article>;
        })}</div>
      </div></section>
    </main>
  );
}
