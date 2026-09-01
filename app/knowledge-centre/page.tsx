import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { knowledgeArticles } from "../lib/knowledgeArticles";
import { createMetadata, RouteSeo, SITE_URL } from "../lib/seo";
import { KnowledgeExplorer } from "./KnowledgeExplorer";
import styles from "./KnowledgeCentre.module.css";

export const metadata = createMetadata("knowledgeCentreEn");

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/knowledge-centre#collection`,
  name: "PF EuroAsia Knowledge Centre",
  url: `${SITE_URL}/knowledge-centre`,
  description: "Practical PF EuroAsia guides to Malaysia residency, Labuan and Malaysian companies, property, relocation and Spain–Asia decisions.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: knowledgeArticles.length,
    itemListElement: knowledgeArticles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: article.title,
      url: `${SITE_URL}${article.href}`,
    })),
  },
};

export default function KnowledgeCentrePage() {
  return (
    <RouteSeo pageKey="knowledgeCentreEn">
      <main className={styles.page}>
        <Header transparent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

        <section className={styles.hero}>
          <Image className={styles.heroImage} src="/images/asia-network.webp" alt="Europe and Asia connected through the PF EuroAsia knowledge network" fill priority sizes="100vw" />
          <div className={styles.heroShade} />
          <div className={`site-shell ${styles.heroInner}`}>
            <div>
              <p className="eyebrow light">PF EuroAsia · Research and guidance</p>
              <h1>Knowledge Centre<em>answers for cross-border decisions.</em></h1>
              <p className={styles.heroCopy}>Practical, source-led guidance for people comparing Malaysia, Labuan, Spain and Asia across residency, company structures, property and relocation.</p>
            </div>
            <div className={styles.heroStats} aria-label="Knowledge Centre overview">
              <div><strong>{knowledgeArticles.length}</strong><span>Practical guides</span></div>
              <div><strong>4</strong><span>Core topics</span></div>
            </div>
          </div>
        </section>

        <section className={styles.directory}>
          <div className="site-shell">
            <div className={styles.directoryHeading}>
              <div><p className="eyebrow">Find the relevant starting point</p><h2>Research by question, not jargon.</h2></div>
              <p>Use the filters or search for the decision you are considering. Each guide identifies the practical issues, official starting sources and questions that need individual professional advice.</p>
            </div>
            <KnowledgeExplorer />
          </div>
        </section>

        <section className={styles.standards}>
          <div className="site-shell">
            <div className={styles.standardsIntro}>
              <div><p className="eyebrow light">How the guidance is prepared</p><h2>Useful enough to act on.<br />Careful enough to trust.</h2></div>
              <p>The Knowledge Centre is designed to help clients ask better questions before committing to property, residence or a company structure. It is general information, with formal conclusions left to appropriately qualified professionals.</p>
            </div>
            <div className={styles.standardsGrid}>
              <article className={styles.standard}><span>01</span><h3>Primary sources</h3><p>Guides link to the relevant government, regulator and official programme material wherever practical.</p></article>
              <article className={styles.standard}><span>02</span><h3>Editorial review</h3><p>Pages identify PF EuroAsia, the review date and the limits between general guidance and regulated advice.</p></article>
              <article className={styles.standard}><span>03</span><h3>Local specialists</h3><p>Legal, tax, immigration and company implementation is coordinated with established professionals in the relevant jurisdiction.</p></article>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={`site-shell ${styles.ctaGrid}`}>
            <div><p className="eyebrow">Private assessment</p><h2>Still deciding where to begin?</h2></div>
            <div className={styles.ctaCopy}><p>Tell us the countries involved, what you want to achieve and your likely timing. We will help identify the right property, relocation or professional starting point.</p><Link className="button button-dark" href="/enquire">Discuss your plans <span>→</span></Link></div>
          </div>
        </section>
        <Footer />
      </main>
    </RouteSeo>
  );
}
