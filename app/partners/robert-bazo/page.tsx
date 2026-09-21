import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from "./RobertBazoProfile.module.css";

export const metadata: Metadata = {
  title: "Robert Bazo | The Fixer | PF EuroAsia",
  description:
    "Meet Robert Bazo of The Fixer, a luxury-property adviser bringing discretion, insight and precise execution to international clients in Marbella.",
  alternates: {
    canonical: "https://www.pfeuroasia.com/partners/robert-bazo",
  },
};

const principles = [
  {
    title: "Clarity",
    copy: "Cutting through noise and conflicting advice so every decision has a clear purpose.",
  },
  {
    title: "Discretion",
    copy: "Protecting privacy, relationships and sensitive information throughout the client journey.",
  },
  {
    title: "Precision",
    copy: "Understanding the detail behind the property, the negotiation and the wider investment decision.",
  },
  {
    title: "Execution",
    copy: "Taking responsibility for challenges and staying present until the right outcome is delivered.",
  },
] as const;

export default function RobertBazoProfilePage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <div className={`site-shell ${styles.heroInner}`}>
          <div className={styles.identity}>
            <p className="eyebrow light">Luxury property collaboration</p>
            <div className={styles.logoPanel}>
              <Image
                className={styles.logo}
                src="/images/partner-the-fixer.svg"
                alt="The Fixer"
                width={420}
                height={120}
                priority
              />
            </div>
            <h1>Robert Bazo</h1>
            <p className={styles.role}>Luxury property adviser &amp; problem solver · The Fixer</p>
          </div>

          <div className={styles.heroStatement}>
            <span>Not just a brand.</span>
            <strong>A responsibility.</strong>
          </div>

          <div className={styles.heroCopy}>
            <p>
              PF EuroAsia works with Robert Bazo for international clients who need
              more than access to property: they need clarity, discretion and someone
              prepared to take responsibility for getting things done.
            </p>
            <Link className="button button-gold" href="/go/the-fixer">
              Start a private conversation <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={`site-shell ${styles.storyGrid}`}>
        <article className={styles.story}>
          <p className="eyebrow">Why The Fixer?</p>
          <h2>Serving better in a market full of noise.</h2>
          <p>
            In a fast-moving and often chaotic luxury real-estate market, it is easy
            for clients to become lost among competing promises. Everyone is selling
            something. Everyone claims to listen, care and solve.
          </p>
          <p>
            The Fixer was born in response—not simply as a brand, but as a
            responsibility to work differently: bringing clarity where there is
            confusion, trust where there is doubt and excellence where standards
            have slipped.
          </p>
          <p>
            Robert has worked with technology entrepreneurs, high-profile investors
            and international families. Their priorities are consistent: discretion,
            insight, precision and a trusted adviser who understands the challenge and
            follows it through.
          </p>

          <blockquote className={styles.quote}>
            <p>“Luxury isn&apos;t sold. It&apos;s understood.”</p>
            <cite>Robert Bazo · The Fixer</cite>
          </blockquote>

          <p>
            This is not about looking different. It is about serving better—raising
            the standard in every conversation, every property and every client
            relationship. Excellence is not treated as a slogan, but as a way of
            showing up fully present and fully committed.
          </p>
          <p>
            The promise is straightforward: protect the investment, solve the
            challenge and deliver peace of mind.
          </p>
        </article>

        <aside className={styles.promiseCard}>
          <p className="eyebrow">The promise</p>
          <p className={styles.promiseLead}>Discretion.<br />Precision.<br />Presence.</p>
          <ul>
            <li>Listen beyond the brief</li>
            <li>Identify the real challenge</li>
            <li>Protect the client&apos;s position</li>
            <li>Deliver with accountability</li>
          </ul>
          <Link href="/go/the-fixer">
            Discuss a property requirement <span>→</span>
          </Link>
        </aside>
      </section>

      <section className={styles.principlesSection}>
        <div className="site-shell">
          <div className={styles.principlesHeading}>
            <div>
              <p className="eyebrow">How Robert works</p>
              <h2>A higher standard of representation.</h2>
            </div>
            <p>
              A personal, considered approach for clients whose property decisions
              involve lifestyle, capital, privacy and long-term consequences.
            </p>
          </div>
          <div className={styles.principlesGrid}>
            {principles.map((principle, index) => (
              <article key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.internationalSection}>
        <div className={`site-shell ${styles.internationalInner}`}>
          <div>
            <p className="eyebrow light">Dubai &amp; Marbella</p>
            <h2>Two worlds of luxury. One strategic decision.</h2>
          </div>
          <div className={styles.internationalCopy}>
            <p>
              For globally mobile entrepreneurs, investors and families, choosing
              between Dubai and Marbella is not simply a comparison of properties.
              It is a decision about lifestyle, business, family priorities,
              investment objectives and the role each destination will play.
            </p>
            <p>
              Robert&apos;s perspective helps clients look beyond novelty and marketing
              to understand what genuinely fits their next chapter—and how a Marbella
              property can form part of a wider international strategy.
            </p>
            <Link className="button button-gold" href="/go/the-fixer">
              Speak with Robert through PF EuroAsia <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
