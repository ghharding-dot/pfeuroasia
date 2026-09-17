import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from "./BrembergProfile.module.css";

export const metadata: Metadata = {
  title: "Eric Bremberg | Sweden Property Collaboration | PF EuroAsia",
  description:
    "Meet Eric Bremberg of Bremberg International Estate, PF EuroAsia's specialist collaboration partner for private and luxury property in Sweden.",
  alternates: { canonical: "https://www.pfeuroasia.com/partners/bremberg" },
};

const expertise = [
  "Luxury residential property across Stockholm and selected Swedish markets",
  "Discreet and off-market sales for owners who value privacy",
  "Active property searches and direct matching through a private buyer register",
  "Cross-border experience connecting Sweden with Marbella and international buyers",
];

export default function BrembergProfilePage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <div className={`site-shell ${styles.heroInner}`}>
          <div className={styles.identity}>
            <p className="eyebrow light">Sweden property collaboration</p>
            <div className={styles.wordmark} aria-label="Bremberg International Estate">
              <span>Bremberg</span>
              <small>International Estate</small>
            </div>
            <h1>Eric Bremberg</h1>
            <p className={styles.role}>CEO · Founder · Registered Real Estate Agent</p>
          </div>
          <div className={styles.heroCopy}>
            <p>
              PF EuroAsia works with Eric Bremberg and Bremberg International Estate for clients buying,
              selling or discreetly exploring property opportunities in Sweden.
            </p>
            <div className={styles.heroActions}>
              <Link className="button button-gold" href="/go/bremberg">
                Enquire about Sweden property <span>→</span>
              </Link>
              <a href="https://brembergestate.com/" target="_blank" rel="noopener noreferrer">
                Visit Bremberg International Estate <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={`site-shell ${styles.profileGrid}`}>
        <article className={styles.story}>
          <p className="eyebrow">Background &amp; expertise</p>
          <h2>Swedish knowledge with an international perspective.</h2>
          <p>
            Eric has worked in the property sector for more than 15 years and has also spent substantial
            periods working internationally. He became a registered Swedish real estate agent in 2021 and
            is the founder and CEO of Bremberg International Estate.
          </p>
          <p>
            The company operates from Stockholm and Marbella, specialising in exclusive homes, private
            introductions and sales conducted outside the open market. Its approach is deliberately personal:
            a carefully maintained buyer register, direct property searches and close matching between owners
            and qualified purchasers.
          </p>
          <p>
            In Sweden, Eric&apos;s experience includes villas, apartments, plots and holiday homes, with particular
            activity in Stockholm-area markets including Djursholm, Danderyd, Täby, Sollentuna and Lidingö.
          </p>
        </article>

        <aside className={styles.expertise}>
          <p className="eyebrow">Core expertise</p>
          <ul>
            {expertise.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <Link href="/go/bremberg">Discuss a Swedish property requirement <span>→</span></Link>
        </aside>
      </section>

      <section className={styles.swedishSection} lang="sv">
        <div className={`site-shell ${styles.swedishInner}`}>
          <div>
            <p className="eyebrow light">Svenska</p>
            <h2>Fastigheter i Sverige – med personlig och diskret rådgivning.</h2>
          </div>
          <div className={styles.swedishCopy}>
            <p>
              Eric Bremberg har arbetat inom fastighetsbranschen i mer än 15 år och är grundare, VD och
              registrerad fastighetsmäklare på Bremberg International Estate. Företaget har kontor i Stockholm
              och Marbella och arbetar med exklusiva bostäder, internationella kunder och diskreta försäljningar.
            </p>
            <p>
              En stor del av arbetet sker utanför den öppna marknaden. Genom ett etablerat spekulantregister,
              aktiv fastighetssökning och personlig kontakt matchar Eric kvalificerade köpare med säljare som
              värdesätter integritet, erfarenhet och ett långsiktigt arbetssätt.
            </p>
            <p>
              Kontakta oss om du vill köpa eller sälja en bostad i Sverige, eller diskutera en privat
              fastighetsmöjlighet med Eric och vårt internationella nätverk.
            </p>
            <Link className="button button-gold" href="/go/bremberg">
              Förfrågan om fastighet i Sverige <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
