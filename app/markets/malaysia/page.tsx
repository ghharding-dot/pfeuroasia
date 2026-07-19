import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export default function MalaysiaPage() {
  return <main>
    <Header />
    <section className="market-landing-hero malaysia-landing"><div className="area-overlay"/><div className="site-shell market-landing-copy"><p className="eyebrow light">Asia desk</p><h1>Malaysia</h1><p>A practical, relationship-led bridge between Malaysian clients, professional partners and Spanish property.</p></div></section>
    <section className="market-landing-intro section-pad"><div className="site-shell narrow-grid"><p className="eyebrow">Spain made closer</p><div><h2>Local representation across borders.</h2><p>For clients based in Malaysia, we provide an accountable presence in Spain—qualifying opportunities, arranging focused visits, coordinating advisers and representing the client through the commercial process.</p></div></div></section>
    <section className="malaysia-services section-pad"><div className="site-shell"><p className="eyebrow light">How we connect the markets</p><div className="area-feature-grid"><article><span>01</span><h2>Private clients</h2><p>Spanish acquisition advice built around lifestyle, residency plans and long-term ownership.</p></article><article><span>02</span><h2>Professional partners</h2><p>A Spain-side brokerage relationship for trusted agents, advisers and family offices in Asia.</p></article><article><span>03</span><h2>Cross-border coordination</h2><p>One point of contact to organise property, legal, tax and relocation workstreams.</p></article></div></div></section>
    <section className="china-contact section-pad"><div className="site-shell china-contact-grid"><div><p className="eyebrow">Serving wider Asia</p><h2>Malaysia first.<br />China ready.</h2></div><div><p>Malaysia provides the operational bridge, while mainland China requires a different communication approach. China enquiries should use email, WeChat or the secure enquiry form rather than relying on WhatsApp.</p><div className="channel-tags"><span>Email</span><span>WeChat</span><span>Secure form</span></div><Link className="button button-dark" href="/enquire">Contact the Asia desk <span>→</span></Link></div></div></section>
    <Footer />
  </main>;
}
