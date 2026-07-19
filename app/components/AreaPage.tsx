import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

type AreaPageProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  imageClass: string;
  overview: string;
  character: { title: string; text: string }[];
  buyerNote: string;
  details?: ReactNode;
};

export function AreaPage({ eyebrow, title, subtitle, imageClass, overview, character, buyerNote, details }: AreaPageProps) {
  return <main>
    <Header />
    <section className={`area-hero ${imageClass}`}>
      <div className="area-overlay" />
      <div className="site-shell area-hero-copy">
        <p className="eyebrow light">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <Link className="button button-gold" href="/enquire">Discuss property in {title} <span>→</span></Link>
      </div>
    </section>
    <section className="area-intro section-pad">
      <div className="site-shell narrow-grid">
        <p className="eyebrow">The area</p>
        <p className="service-lead">{overview}</p>
      </div>
    </section>
    <section className="area-character section-pad">
      <div className="site-shell">
        <p className="eyebrow light">Why clients choose it</p>
        <div className="area-feature-grid">
          {character.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h2>{item.title}</h2><p>{item.text}</p></article>)}
        </div>
      </div>
    </section>
    {details}
    <section className="area-advice section-pad"><div className="site-shell area-advice-grid"><div><p className="eyebrow">Buying intelligently</p><h2>Local knowledge changes the search.</h2></div><div><p>{buyerNote}</p><Link className="text-link" href="/services/acquisition">Our acquisition service <span>→</span></Link></div></div></section>
    <section className="mini-cta"><div className="site-shell"><p className="eyebrow light">Private and considered</p><h2>Let us open the right doors.</h2><Link className="button button-gold" href="/enquire">Make an enquiry <span>→</span></Link></div></section>
    <Footer />
  </main>;
}
