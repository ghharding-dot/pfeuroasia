import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from "../antonio-flores/AntonioFloresProfile.module.css";

export const metadata: Metadata = {
  title: "Iván Muñoz García | Inmolux Group | PF EuroAsia",
  description:
    "Meet Iván Muñoz García, Commercial Director of Inmolux Group and PF EuroAsia's Marbella collaboration partner for real estate, development and construction.",
  alternates: {
    canonical: "https://www.pfeuroasia.com/partners/ivan-munoz-garcia",
  },
};

const services = [
  "Residential property sales and acquisition",
  "New developments and investment opportunities",
  "Construction and project management",
  "Legal and technical due diligence coordination",
  "Marketing and international buyer access",
  "Completion and after-sales support",
];

export default function IvanMunozGarciaProfilePage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <div className={`site-shell ${styles.heroInner}`}>
          <div className={styles.identity}>
            <p className="eyebrow light">Construction, development &amp; real estate collaboration</p>
            <div className={styles.logoPanel}>
              <Image
                className={styles.logo}
                src="/images/partner-inmolux-group.svg"
                alt="Inmolux Group Construction and Real Estate"
                width={151}
                height={48}
                priority
              />
            </div>
            <h1>Iván Muñoz García</h1>
            <p className={styles.role}>Commercial Director · Inmolux Group</p>
          </div>

          <figure
            className={styles.portraitWrap}
            style={{ display: "grid", placeItems: "center", padding: "48px", background: "#fff" }}
          >
            <Image
              className={styles.logo}
              src="/images/partner-inmolux-group.svg"
              alt="Inmolux Group Construction and Real Estate"
              width={302}
              height={96}
            />
          </figure>

          <div className={styles.heroCopy}>
            <p>
              PF EuroAsia works with Iván and Inmolux Group to present selected Marbella
              and Costa del Sol properties, developments and investment opportunities to
              qualified clients across Europe and Asia.
            </p>
            <Link className="button button-gold" href="/go/inmolux">
              Contact Inmolux through PF EuroAsia <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={`site-shell ${styles.profileGrid}`}>
        <article className={styles.story}>
          <p className="eyebrow">About Iván &amp; Inmolux Group</p>
          <h2>One team across the full property cycle.</h2>
          <p>
            Iván Muñoz García is Commercial Director of Inmolux Group and works with
            buyers, owners and investors considering property and development
            opportunities in Marbella and across the Costa del Sol.
          </p>
          <p>
            Inmolux Group has operated in the Marbella market for more than 15 years.
            Its multidisciplinary structure brings property sales, investment,
            construction, technical review, project management and after-sales support
            together within one organisation.
          </p>
          <p>
            This collaboration gives Inmolux a direct route to PF EuroAsia&apos;s European
            and Asian network. Approved Inmolux properties can be presented publicly,
            discreetly or off market, depending on the owner&apos;s instructions and the
            suitability of each opportunity for international buyers.
          </p>
          <p>
            Iván acts as the principal commercial contact for the collaboration,
            coordinating suitable properties and developments with PF EuroAsia and
            Property Facilitators Iberia S.L.
          </p>
        </article>

        <aside className={styles.expertise}>
          <p className="eyebrow">Areas of collaboration</p>
          <ul>
            {services.map((service) => <li key={service}>{service}</li>)}
          </ul>
          <Link href="/go/inmolux">
            Discuss a property requirement <span>→</span>
          </Link>
        </aside>
      </section>

      <section className={styles.closingSection}>
        <div className={`site-shell ${styles.closingInner}`}>
          <div>
            <p className="eyebrow light">Marbella property collaboration</p>
            <h2>Local development expertise. International market access.</h2>
          </div>
          <div className={styles.closingCopy}>
            <p>
              Tell us what you are looking for and your enquiry will be shared directly
              with Iván&apos;s team at Inmolux Group and Property Facilitators EuroAsia.
            </p>
            <Link className="button button-gold" href="/go/inmolux">
              Make a confidential enquiry <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
