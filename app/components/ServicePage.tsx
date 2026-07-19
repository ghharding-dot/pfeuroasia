import Link from "next/link";
import { Footer } from "./Footer";
import { Header } from "./Header";

type ServicePageProps = {
  number: string;
  title: string;
  kicker: string;
  introduction: string;
  imageClass: string;
  pillars: { title: string; text: string }[];
  process: { step: string; title: string; text: string }[];
};

export function ServicePage(props: ServicePageProps) {
  return (
    <main>
      <Header />
      <section className="service-hero">
        <div className="site-shell service-hero-grid">
          <div>
            <p className="eyebrow">Service {props.number}</p>
            <h1>{props.title}</h1>
            <p className="service-kicker">{props.kicker}</p>
            <Link className="button button-dark" href="/enquire">Discuss your requirements <span>→</span></Link>
          </div>
          <div className={`service-hero-image ${props.imageClass}`} />
        </div>
      </section>

      <section className="service-intro section-pad">
        <div className="site-shell narrow-grid">
          <p className="eyebrow">Our role</p>
          <p className="service-lead">{props.introduction}</p>
        </div>
      </section>

      <section className="pillars-section section-pad">
        <div className="site-shell">
          <p className="eyebrow light">What this includes</p>
          <div className="pillar-grid">
            {props.pillars.map((pillar, index) => (
              <article key={pillar.title}>
                <span>0{index + 1}</span>
                <h2>{pillar.title}</h2>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="site-shell process-grid">
          <div>
            <p className="eyebrow">How we work</p>
            <h2>A clear, considered process.</h2>
          </div>
          <div className="process-list">
            {props.process.map((item) => (
              <article key={item.step}>
                <span>{item.step}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mini-cta">
        <div className="site-shell">
          <p className="eyebrow light">Start with a conversation</p>
          <h2>Every mandate begins in confidence.</h2>
          <Link className="button button-gold" href="/enquire">Make an enquiry <span>→</span></Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
