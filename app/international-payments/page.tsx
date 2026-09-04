import { EnquiryFlow } from "../components/EnquiryFlow";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import styles from "./InternationalPayments.module.css";

const services = [
  ["01", "International property payments", "Currency conversion and coordinated payments for overseas purchases and sales, including transfers from Dubai and the UAE to Spain."],
  ["02", "Personal international transfers", "Support for relocation funds, savings, living costs and other cross-border requirements."],
  ["03", "Business & corporate FX", "Global payments, collections, multi-currency accounts and practical currency-risk management."],
  ["04", "Dedicated support", "A named specialist to guide account opening, payment timing, beneficiary details and transaction progress."],
];

export default function InternationalPaymentsPage() {
  return <main className={styles.page}>
    <Header />
    <section className={styles.hero}><div className="site-shell"><div><p className="eyebrow light">Currency &amp; international payments partner</p><h1>Move money internationally.<br /><em>With clarity and support.</em></h1><p>For overseas property, relocation and business payments between Europe, the UAE, Spain and Asia.</p><a className="button button-gold" href="#fx-enquiry">Discuss your transfer <span>→</span></a></div><div className={styles.logoPanel}><img src="/images/estuary-fx-logo.png" alt="Estuary FX" /><small>Currency exchange · International payments · Risk management</small></div></div></section>
    <section className={`${styles.intro} section-pad`}><div className="site-shell"><div><p className="eyebrow">Property Facilitators × Estuary FX</p><h2>One introduction.<br />A dedicated FX specialist.</h2></div><div><p className={styles.lead}>Through our collaboration with Estuary FX, clients can access specialist foreign-exchange and international-payment services with dedicated support throughout the transaction.</p><p>Estuary FX offers capabilities across 130+ currencies and delivery to 200+ countries. Client money is held in safeguarded, segregated accounts through its regulated payment partners.</p></div></div></section>
    <section className={`${styles.services} section-pad`}><div className="site-shell"><p className="eyebrow light">How they can help</p><div className={styles.serviceGrid}>{services.map(([number,title,text])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className={`${styles.uae} section-pad`}><div className="site-shell"><div><p className="eyebrow">Dubai / UAE → Spain</p><h2>Buying Spanish property with funds in Dubai?</h2></div><div><p>For clients purchasing on the Costa del Sol with funds held in Dubai or elsewhere in the UAE, Estuary FX can assist with AED-to-EUR conversion and the international payment process.</p><p>The service also covers transfers involving the UK, Europe, Malaysia and wider international markets.</p></div></div></section>
    <div id="fx-enquiry" className={styles.enquiry}><EnquiryFlow interest="international-payments" partnerSlug="estuary-fx" journey="spain" /></div>
    <section className={styles.disclaimer}><div className="site-shell"><p>Foreign exchange markets can move in either direction. Property Facilitators introduces clients to Estuary FX but does not provide regulated payment services or currency advice. Services remain subject to Estuary FX onboarding and applicable terms.</p><a href="https://estuaryfx.co.uk" target="_blank" rel="noreferrer">Visit Estuary FX ↗</a></div></section>
    <Footer />
  </main>;
}
