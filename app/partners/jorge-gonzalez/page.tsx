import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from "./JorgeGonzalezProfile.module.css";

export const metadata: Metadata = {
  title: "Jorge Gonzalez | Vacation Home Management | PF EuroAsia",
  description:
    "Meet Jorge Gonzalez of Rent2Holiday, PF EuroAsia's Costa del Sol partner for vacation-home management and renting newly purchased properties.",
  alternates: {
    canonical: "https://www.pfeuroasia.com/partners/jorge-gonzalez",
  },
};

const managementServices = [
  "Professional photography, presentation and staging",
  "Publication across more than 20 international booking platforms",
  "Dynamic pricing designed to maximise income in every season",
  "24/7 check-in and multilingual guest assistance",
  "Cleaning, laundry and guest amenities",
  "Maintenance support for electrical, plumbing, painting and other incidents",
  "Tourist-rental paperwork and Andalusian compliance coordination",
  "Owner access to bookings, blocked dates and payment reporting",
];

const managementSteps = [
  ["01", "Property review", "An on-site assessment establishes the property's rental potential and practical requirements."],
  ["02", "Prepare", "Photography, presentation, staging and operational setup prepare the home for guests."],
  ["03", "Launch", "The property is published across the relevant international rental platforms."],
  ["04", "Manage", "Bookings, guests, cleaning, maintenance and daily operations are handled for the owner."],
  ["05", "Report", "The owner receives booking visibility, monthly reporting and income payments."],
] as const;

export default function JorgeGonzalezProfilePage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <div className={`site-shell ${styles.heroInner}`}>
          <div className={styles.identity}>
            <p className="eyebrow light">Vacation home management collaboration</p>
            <div className={styles.logoPanel}>
              <Image
                className={styles.logo}
                src="/images/partner-rent2holiday.webp"
                alt="Rent2Holiday"
                width={800}
                height={800}
                priority
              />
            </div>
            <h1>Jorge Gonzalez</h1>
            <p className={styles.role}>Vacation home management &amp; rentals · Rent2Holiday</p>
          </div>

          <div className={styles.heroStatement}>
            <span>Buy</span>
            <b>→</b>
            <span>Prepare</span>
            <b>→</b>
            <span>Rent</span>
          </div>

          <div className={styles.heroCopy}>
            <p>
              After purchasing a property on the Costa del Sol, clients can have it
              prepared, marketed and professionally managed as a vacation home through
              Jorge Gonzalez and the Rent2Holiday team.
            </p>
            <Link className="button button-gold" href="/go/rent2holiday">
              Discuss your new property <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={`site-shell ${styles.introduction}`}>
        <article className={styles.story}>
          <p className="eyebrow">From acquisition to rental income</p>
          <h2>Your new property, professionally managed.</h2>
          <p>
            Buying a home abroad is only the beginning. For owners who want to enjoy
            their property while also generating vacation-rental income, Jorge provides
            a practical route from completion to a fully operational holiday home.
          </p>
          <p>
            Rent2Holiday manages the complete process: assessing the property, preparing
            its presentation, arranging professional photography, launching it across
            international booking platforms and managing guests and operations on the
            owner&apos;s behalf.
          </p>
          <p>
            Dynamic pricing helps the property respond to demand throughout the year,
            while local cleaning, maintenance and guest-support teams take care of the
            everyday detail. Owners retain visibility over bookings, availability and
            payments without having to manage the property themselves.
          </p>
        </article>

        <aside className={styles.managementCard}>
          <p className="eyebrow">Complete management</p>
          <strong>20+</strong>
          <span>international booking platforms</span>
          <ul>
            <li>Dynamic seasonal pricing</li>
            <li>Multilingual guest support</li>
            <li>Local operational team</li>
            <li>Owner booking visibility</li>
          </ul>
          <Link href="/go/rent2holiday">
            Request a management discussion <span>→</span>
          </Link>
        </aside>
      </section>

      <section className={styles.servicesSection}>
        <div className="site-shell">
          <div className={styles.servicesHeading}>
            <div>
              <p className="eyebrow">Vacation-home services</p>
              <h2>Everything required to operate the property.</h2>
            </div>
            <p>
              A coordinated service for international owners who want professional
              management without the day-to-day demands of running a holiday rental.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {managementServices.map((service, index) => (
              <div className={styles.serviceItem} key={service}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className="site-shell">
          <p className="eyebrow light">How the process works</p>
          <div className={styles.processGrid}>
            {managementSteps.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className={styles.processCta}>
            <div>
              <h2>Planning to rent your new property?</h2>
              <p>
                Tell PF EuroAsia about the property and your intended use. We will
                coordinate an introduction to Jorge and the appropriate management team.
              </p>
            </div>
            <Link className="button button-gold" href="/go/rent2holiday">
              Enquire through PF EuroAsia <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
