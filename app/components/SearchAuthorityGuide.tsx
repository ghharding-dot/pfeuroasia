import Image from "next/image";
import Link from "next/link";
import { AuthorityReview } from "./AuthorityReview";
import { Footer } from "./Footer";
import { Header } from "./Header";
import type { SearchGuideData } from "../lib/searchGuides";
import styles from "./SearchAuthorityGuide.module.css";

export function SearchAuthorityGuide({ guide }: { guide: SearchGuideData }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className={styles.page}>
      <Header
        transparent
        enquireHref={guide.focus === "spain" ? "/enquire" : "/asia-gateway/enquire"}
        enquireLabel={guide.focus === "spain" ? "Spain enquiry" : "Malaysia enquiry"}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src={guide.image}
          alt={guide.imageAlt}
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={`site-shell ${styles.heroInner}`}>
          <p className="eyebrow light">{guide.eyebrow}</p>
          <h1>{guide.title}<em>{guide.accent}</em></h1>
          <p className={styles.heroCopy}>{guide.summary}</p>
          <div className={styles.heroActions}>
            <Link className="button button-gold" href={guide.ctaHref}>
              {guide.ctaLabel} <span>→</span>
            </Link>
            <a className="text-link light-link" href="#guide-overview">Read the guide <span>↓</span></a>
          </div>
        </div>
      </section>

      <AuthorityReview focus={guide.focus} />

      <section className={styles.intro} id="guide-overview">
        <div className={`site-shell ${styles.introGrid}`}>
          <div><p className="eyebrow">{guide.introEyebrow}</p><h2>{guide.introTitle}</h2></div>
          <div className={styles.lead}>{guide.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow light">Decision framework</p><h2>{guide.cardsTitle}</h2></div>
            <p>{guide.cardsIntro}</p>
          </div>
          <div className={styles.cardGrid}>
            {guide.cards.map((card, index) => (
              <article className={styles.card} key={card.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                {card.points && <ul>{card.points.map((point) => <li key={point}>{point}</li>)}</ul>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {guide.comparison && (
        <section className={styles.comparison} aria-labelledby="comparison-heading">
          <div className="site-shell">
            <div className={styles.sectionHeading}>
              <div><p className="eyebrow">Side-by-side</p><h2 id="comparison-heading">{guide.comparison.title}</h2></div>
              <p>{guide.comparison.intro}</p>
            </div>
            <div className={styles.tableWrap}>
              <table>
                <thead><tr>{guide.comparison.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
                <tbody>{guide.comparison.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className={styles.process}>
        <div className={`site-shell ${styles.processGrid}`}>
          <div><p className="eyebrow">Practical sequence</p><h2>{guide.stepsTitle}</h2><p>{guide.stepsIntro}</p></div>
          <ol className={styles.steps}>
            {guide.steps.map((step, index) => (
              <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{step.title}</strong><p>{step.text}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.sources}>
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow">Primary references</p><h2>Official starting points.</h2></div>
            <p>Rules, fees and programme conditions can change. These links lead to the public bodies used when this guide was reviewed.</p>
          </div>
          <div className={styles.sourceGrid}>{guide.sources.map((source) => <a href={source.href} target="_blank" rel="noreferrer" key={source.label}>{source.label}<span>↗</span></a>)}</div>
          <div className={styles.related}>
            <p className="eyebrow">Continue your research</p>
            <div><Link href="/knowledge-centre">Browse the Knowledge Centre<span>→</span></Link>{guide.related.map((item) => <Link href={item.href} key={item.href}>{item.label}<span>→</span></Link>)}</div>
          </div>
        </div>
      </section>

      <section className={styles.faq}>
        <div className={`site-shell ${styles.faqGrid}`}>
          <div><p className="eyebrow light">Frequently asked</p><h2>Questions to settle early.</h2></div>
          <div>{guide.faqs.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`site-shell ${styles.ctaGrid}`}>
          <div><p className="eyebrow">Private assessment</p><h2>{guide.ctaTitle}</h2></div>
          <div><p>{guide.ctaText}</p><Link className="button button-dark" href={guide.ctaHref}>{guide.ctaLabel} <span>→</span></Link></div>
        </div>
      </section>
      <section className={styles.disclaimer}><div className="site-shell"><p>{guide.disclaimer}</p></div></section>
      <Footer />
    </main>
  );
}
