import Image from "next/image";
import Link from "next/link";
import { AuthorityReview } from "../../components/AuthorityReview";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from "./page.module.css";

const tiers = [
  {
    name: "Silver",
    term: "5 years",
    deposit: "USD 150,000",
    property: "RM 600,000",
    age: "25+",
    fee: "RM 1,000",
    activity: "Separate permission required",
    tone: "silver",
  },
  {
    name: "Gold",
    term: "15 years",
    deposit: "USD 500,000",
    property: "RM 1 million",
    age: "25+",
    fee: "RM 3,000",
    activity: "Separate permission required",
    tone: "gold",
  },
  {
    name: "Platinum",
    term: "20 years",
    deposit: "USD 1 million",
    property: "RM 2 million",
    age: "25+",
    fee: "RM 200,000",
    activity: "Business and career permitted",
    tone: "platinum",
  },
  {
    name: "SEZ / SFZ",
    term: "10 years",
    deposit: "USD 32,000 / 65,000",
    property: "Forest City property",
    age: "21+",
    fee: "RM 1,000",
    activity: "Separate permission required",
    tone: "sez",
  },
];

const faqs = [
  {
    question: "Is MM2H permanent residence?",
    answer: "No. MM2H is a renewable long-stay programme with a multiple-entry pass. It is not Malaysian permanent residence or citizenship.",
  },
  {
    question: "Can family members be included?",
    answer: "The official programme allows a spouse, eligible children, medically certified disabled children without an age limit, and parents or parents-in-law. The precise documents and conditions should be checked before applying.",
  },
  {
    question: "Can part of the fixed deposit be withdrawn?",
    answer: "After approval, the official rules permit withdrawal of up to 50% of the principal fixed deposit for specified purposes including property, education, medical and tourism expenditure in Malaysia.",
  },
  {
    question: "Does MM2H automatically make me tax resident in Malaysia?",
    answer: "No. Immigration permission and personal tax residence are separate. Malaysian tax residence depends on the statutory tests and the individual’s facts, while the country being left may continue to apply its own residence rules.",
  },
];

export default function Mm2hMalaysiaPage() {
  return (
    <main className={styles.page}>
      <Header transparent enquireHref="/asia-gateway/enquire?interest=mm2h" enquireLabel="MM2H enquiry" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />

      <section className={styles.hero}>
        <Image
          className={styles.heroImage}
          src="/images/kl%20BACK%20GORUND.avif"
          alt="Kuala Lumpur skyline at dusk"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={`site-shell ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className="eyebrow light">Malaysia My Second Home · 2026 guide</p>
            <h1>A considered route to <em>living in Malaysia.</em></h1>
            <p>
              MM2H offers eligible international clients a renewable long-stay base in Malaysia.
              We help compare the category, property commitment and wider relocation plan before an application begins.
            </p>
            <div className={styles.heroActions}>
              <Link className="button button-gold" href="/asia-gateway/enquire?interest=mm2h">Discuss your eligibility <span>→</span></Link>
              <a className="text-link light-link" href="#mm2h-tiers">Compare the categories <span>↓</span></a>
            </div>
          </div>
          <aside className={styles.heroFacts} aria-label="MM2H programme highlights">
            <div><strong>5–20</strong><span>year renewable passes</span></div>
            <div><strong>4</strong><span>programme categories</span></div>
            <div><strong>Family</strong><span>eligible dependants may join</span></div>
          </aside>
        </div>
      </section>

      <AuthorityReview focus="malaysia" updated="22 September 2026" />

      <section className={styles.introduction}>
        <div className={`site-shell ${styles.introGrid}`}>
          <div className={styles.introImageWrap}>
            <Image
              className={styles.introImage}
              src="/images/malaysia-travel-pool-skyline.webp"
              alt="A residential pool overlooking Kuala Lumpur"
              fill
              sizes="(max-width: 820px) 100vw, 46vw"
            />
            <span>Malaysia · Lifestyle, property and long-stay planning</span>
          </div>
          <div className={styles.introCopy}>
            <p className="eyebrow">What is MM2H?</p>
            <h2>More than a visa. It is a long-term decision.</h2>
            <p>
              Malaysia My Second Home is a government-backed programme for eligible foreign applicants.
              Depending on the category, it combines a renewable multiple-entry pass with fixed-deposit,
              residential-property and other conditions.
            </p>
            <p>
              Applications must be made through a Malaysian MM2H business licensed by the Ministry of
              Tourism, Arts and Culture. PF EuroAsia coordinates the initial assessment and connects the
              immigration, property and relocation work with the appropriate Malaysian specialists.
            </p>
            <Link className="text-link" href="/guides/malaysia-residency-options">Compare MM2H with other residency routes <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.tierSection} id="mm2h-tiers">
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow light">The four categories</p><h2>Choose by circumstances,<br />not by headline.</h2></div>
            <p>These figures summarise the current federal MM2H categories. Eligibility, property rules and the complete cost of an application must be confirmed before commitment.</p>
          </div>
          <div className={styles.tierGrid}>
            {tiers.map((tier) => (
              <article className={`${styles.tierCard} ${styles[tier.tone]}`} key={tier.name}>
                <div className={styles.tierTop}><span>{tier.name}</span><strong>{tier.term}</strong><small>renewable MM2H pass</small></div>
                <dl>
                  <div><dt>Fixed deposit</dt><dd>{tier.deposit}</dd></div>
                  <div><dt>Minimum property</dt><dd>{tier.property}</dd></div>
                  <div><dt>Principal age</dt><dd>{tier.age}</dd></div>
                  <div><dt>Participation fee</dt><dd>{tier.fee}</dd></div>
                  <div><dt>Work / business</dt><dd>{tier.activity}</dd></div>
                </dl>
              </article>
            ))}
          </div>
          <div className={styles.sezNote}>
            <strong>SEZ / SFZ detail</strong>
            <p>The fixed deposit is USD 32,000 for applicants aged 50 and above, or USD 65,000 for ages 21–49. The compulsory property purchase is currently tied to Forest City, Johor and the applicable state floor price.</p>
          </div>
        </div>
      </section>

      <section className={styles.commonRules}>
        <div className="site-shell">
          <div className={styles.sectionHeadingLight}>
            <div><p className="eyebrow">Conditions shared across the programme</p><h2>The points behind the tier.</h2></div>
            <p>The pass duration is only one part of the decision. The annual presence, property holding period and family structure should all be reviewed together.</p>
          </div>
          <div className={styles.rulesGrid}>
            <article><span>01</span><h3>Annual presence</h3><p>The official overview applies a 90-day annual requirement to participants aged below 50. For ages 25–49, the principal and/or eligible dependants may fulfil it.</p></article>
            <article><span>02</span><h3>Property commitment</h3><p>A qualifying residence must be purchased after approval and generally cannot be sold for 10 years, except when upgrading to a higher-value residence.</p></article>
            <article><span>03</span><h3>Fixed-deposit access</h3><p>Up to 50% may be withdrawn after approval for specified Malaysian property, education, medical and tourism purposes.</p></article>
            <article><span>04</span><h3>Family inclusion</h3><p>Eligible dependants can include a spouse, qualifying children, parents and parents-in-law. Platinum also permits a foreign maid under the programme rules.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.whyMalaysia}>
        <div className={`site-shell ${styles.whyGrid}`}>
          <div className={styles.whyCopy}>
            <p className="eyebrow light">Why Malaysia?</p>
            <h2>A practical base at the centre of Southeast Asia.</h2>
            <p>For many international families, Malaysia combines modern city living, established healthcare and education, English-language accessibility and direct regional connections.</p>
            <ul>
              <li><strong>Connectivity</strong><span>Direct access across Southeast Asia and beyond from Kuala Lumpur.</span></li>
              <li><strong>Healthcare</strong><span>A developed private healthcare market used by international patients.</span></li>
              <li><strong>Education</strong><span>International-school options including British, American and IB curricula.</span></li>
              <li><strong>Lifestyle</strong><span>City, island and resort living within one country.</span></li>
            </ul>
          </div>
          <div className={styles.whyImageWrap}>
            <Image className={styles.whyImage} src="/images/Emerald%20bay%20pkl.jpg" alt="Emerald Bay at Pangkor Laut Resort, Malaysia" fill sizes="(max-width: 820px) 100vw, 45vw" />
          </div>
        </div>
      </section>

      <section className={styles.taxNote}>
        <div className={`site-shell ${styles.taxGrid}`}>
          <div><p className="eyebrow">Tax and immigration</p><h2>Keep the two questions separate.</h2></div>
          <div>
            <p>The official MM2H guidance describes exemptions for foreign funds or income and Malaysian fixed-deposit profit. Tax treatment remains subject to prevailing Malaysian law, source and remittance rules, and individual circumstances.</p>
            <p>An MM2H pass does not by itself establish Malaysian tax residence or end tax residence elsewhere. Obtain coordinated advice in Malaysia and in the country being left before acting.</p>
            <Link className="text-link" href="/guides/malaysia-tax-residency-for-foreigners">Read the Malaysia tax-residency guide <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.process}>
        <div className="site-shell">
          <div className={styles.sectionHeading}>
            <div><p className="eyebrow light">PF EuroAsia coordination</p><h2>From interest to<br />a workable plan.</h2></div>
            <p>We organise the questions in the right order and coordinate the licensed Malaysian professionals required for the formal work.</p>
          </div>
          <ol className={styles.processSteps}>
            <li><span>01</span><div><strong>Initial profile</strong><p>Age, nationality, family, timing, intended activity, budget and country of departure.</p></div></li>
            <li><span>02</span><div><strong>Category review</strong><p>Compare the MM2H route with employment, remote-work and business-led alternatives.</p></div></li>
            <li><span>03</span><div><strong>Licensed application support</strong><p>Introduce the authorised Malaysian MM2H operator and coordinate required documentation.</p></div></li>
            <li><span>04</span><div><strong>Property and relocation</strong><p>Connect the approved route with property search, practical arrival and ongoing professional advice.</p></div></li>
          </ol>
        </div>
      </section>

      <section className={styles.sources}>
        <div className="site-shell">
          <p className="eyebrow">Official source material</p>
          <h2>Check the current programme rules.</h2>
          <div className={styles.sourceGrid}>
            <a href="https://www.mm2h.gov.my/category/overview" target="_blank" rel="noreferrer">MM2H category overview <span>↗</span></a>
            <a href="https://www.mm2h.gov.my/apply/guidelines" target="_blank" rel="noreferrer">Official requirements and regulations <span>↗</span></a>
            <a href="https://www.mm2h.gov.my/category/sez" target="_blank" rel="noreferrer">SEZ / SFZ category <span>↗</span></a>
            <Link href="/guides/malaysia-residency-options">Other Malaysia residency options <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.faq}>
        <div className={`site-shell ${styles.faqGrid}`}>
          <div><p className="eyebrow light">MM2H questions</p><h2>The important distinctions.</h2></div>
          <div>{faqs.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`site-shell ${styles.ctaGrid}`}>
          <div><p className="eyebrow">Private MM2H assessment</p><h2>Could Malaysia work for you?</h2></div>
          <div><p>Tell us who is moving, your preferred timing, whether you intend to work or run a business, and the level of property commitment you are considering.</p><Link className="button button-dark" href="/asia-gateway/enquire?interest=mm2h">Start a confidential discussion <span>→</span></Link></div>
        </div>
      </section>

      <section className={styles.disclaimer}><div className="site-shell"><p>Figures checked against the official Malaysia My Second Home portal on 22 September 2026. General information only. Programme, immigration, tax and property rules can change and depend on individual circumstances. Formal advice and applications are provided by appropriately licensed Malaysian professionals.</p></div></section>
      <Footer />
    </main>
  );
}
