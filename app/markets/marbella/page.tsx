import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export default function MarbellaPage() {
  return <main>
    <Header />
    <section className="market-landing-hero marbella-landing"><div className="area-overlay"/><div className="site-shell market-landing-copy"><p className="eyebrow light">Southern Spain</p><h1>Marbella property</h1><p>Independent advice across the Costa del Sol’s most sought-after residential markets.</p></div></section>
    <section className="market-landing-intro section-pad"><div className="site-shell narrow-grid"><p className="eyebrow">A considered search</p><div><h2>Marbella is not one market.</h2><p>Beachfront apartments, established family villas, new architecture and private country estates each behave differently. We help international clients understand where lifestyle, value, privacy and long-term ownership align.</p></div></div></section>
    <section className="market-area-links section-pad"><div className="site-shell"><p className="eyebrow light">Specialist areas</p><div className="market-area-grid"><Link href="/areas/la-zagaleta"><span>01</span><h2>La Zagaleta</h2><p>Private country-estate living, significant plots and exceptional discretion.</p><b>Read the area guide →</b></Link><Link href="/areas/el-madronal"><span>02</span><h2>El Madroñal</h2><p>Wooded hillside living, panoramic views and an established community.</p><b>Read the area guide →</b></Link></div></div></section>
    <section className="privacy-statement section-pad"><div className="site-shell privacy-statement-grid"><p className="eyebrow">Discreet by design</p><div><h2>Some homes should never become public listings.</h2><p>For owners who require a controlled sale, we work quietly: qualifying interest, limiting circulation and releasing information only when there is a credible reason to do so. Buyers who engage with us may therefore gain access to opportunities that cannot be found through normal channels.</p><Link className="text-link" href="/enquire">Request a private discussion <span>→</span></Link></div></div></section>
    <section className="area-advice section-pad"><div className="site-shell area-advice-grid"><div><p className="eyebrow">Beyond the headline areas</p><h2>One coast, many lifestyles.</h2></div><div><p>Our work can extend across Benahavís, the Golden Mile, Nueva Andalucía, Sierra Blanca, Estepona and selected opportunities throughout the wider Costa del Sol.</p><Link className="text-link" href="/enquire">Discuss your search <span>→</span></Link></div></div></section>
    <Footer />
  </main>;
}
