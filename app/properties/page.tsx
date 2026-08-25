import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { formatPropertyArea } from "../lib/propertyDisplay";
import { normalizePropertyMarket, readProperties } from "../lib/propertyStore";
import { PropertyUpdatesForm } from "./PropertyUpdatesForm";
import styles from "./properties.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Luxury Property Collection in Marbella & Benahavís | PF EuroAsia",
  description:
    "Explore selected villas, private opportunities and new developments in Marbella, La Zagaleta, El Madroñal and Benahavís.",
  alternates: { canonical: "https://www.pfeuroasia.com/properties" },
};

function titleKey(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export default async function PropertiesPage() {
  const properties = await readProperties();
  const visible = properties
    .filter(
      (property) =>
        property.status === "published" &&
        normalizePropertyMarket(property.market) === "spain" &&
        (property.visibility === "teaser" || property.visibility === "public") &&
        property.publicImageApproved === true &&
        Boolean(property.image),
    )
    .filter(
      (property, index, items) =>
        items.findIndex((candidate) => titleKey(candidate.publicTitle || candidate.title) === titleKey(property.publicTitle || property.title)) === index,
    );

  return (
    <main className={styles.page}>
      <Header />
      <section className={styles.hero}>
        <div className="site-shell">
          <p className="eyebrow light">Spain property gateway</p>
          <h1>Selected property opportunities.</h1>
          <p>
            Browse the complete current collection across Marbella, La Zagaleta,
            El Madroñal and Benahavís. Public listing details are open to view;
            brochure downloads require a simple contact registration.
          </p>
        </div>
      </section>

      <section className={styles.registrationSection}>
        <div className={`site-shell ${styles.registrationInner}`}>
          <div>
            <p className="eyebrow">Private property updates</p>
            <h2>Hear about important additions first.</h2>
            <p>Register for selected new listings, meaningful price changes and appropriate private introductions.</p>
          </div>
          <PropertyUpdatesForm />
        </div>
      </section>

      <section className={styles.collectionSection}>
        <div className="site-shell">
          <div className={styles.collectionHeading}>
            <div>
              <p className="eyebrow">Current collection</p>
              <h2>{visible.length} selected opportunities</h2>
            </div>
            <p>Private and off-market properties remain subject to qualification and individual approval.</p>
          </div>

          <div className={styles.grid}>
            {visible.map((property) => {
              const registered = property.visibility === "public";
              const title = property.publicTitle || (registered ? property.title : "Private property opportunity");
              const location = property.publicLocation || (registered ? property.location : "Southern Spain");
              return (
                <article className={styles.card} key={property.id}>
                  <Link href={registered ? `/properties/${property.id}` : "/private-portfolio"} className={styles.imageLink}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={property.image} alt={title} loading="lazy" />
                    <span>{registered ? "Registered listing" : "Private opportunity"}</span>
                  </Link>
                  <div className={styles.cardCopy}>
                    <p>{location}</p>
                    <h3>{title}</h3>
                    {registered && property.price ? <strong>{property.price}</strong> : null}
                    {(property.plotSize || property.builtSize || Boolean(property.bedrooms)) ? (
                      <dl className={styles.propertyFacts}>
                        {property.plotSize ? (
                          <div><dt>Plot</dt><dd>{formatPropertyArea(property.plotSize)}</dd></div>
                        ) : null}
                        {property.builtSize ? (
                          <div><dt>Built</dt><dd>{formatPropertyArea(property.builtSize)}</dd></div>
                        ) : null}
                        {property.bedrooms ? (
                          <div><dt>Bedrooms</dt><dd>{property.bedrooms}</dd></div>
                        ) : null}
                      </dl>
                    ) : null}
                    <Link href={registered ? `/properties/${property.id}` : "/private-portfolio"}>
                      {registered ? "View full details" : "Request private access"} <span>→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
