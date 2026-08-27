import Link from "next/link";
import { SpanishHeader } from "../../../SpanishHeader";
import { LabuanAdviserAccess } from "../../../../services/labuan-company-residency/adviser/LabuanAdviserAccess";
import pageStyles from "../../../../services/labuan-company-residency/adviser/AdviserPage.module.css";

export default function SpanishLabuanAdviserPage() {
  return (
    <main className={pageStyles.page}>
      <SpanishHeader />
      <section className={pageStyles.section}>
        <div className={`site-shell ${pageStyles.shell}`}>
          <p className="eyebrow">Malasia · Vida · Propiedad · Labuan</p>
          <div className={pageStyles.introGrid}>
            <div><h1>Pregunte a EuroAsia.<br />Malasia y Labuan.</h1></div>
            <div className={pageStyles.introCopy}>
              <p>Haga preguntas prácticas en español sobre vivir en Malasia, propiedades y costes en Kuala Lumpur, sanidad, transporte, conexiones internacionales, viajes y la vía de sociedad y residencia de PF EuroAsia en Labuan. Las respuestas utilizan una base de conocimiento controlada y con fuentes.</p>
              <Link href="/es/services/labuan-company-residency" className="text-link">Leer la guía de Labuan <span>→</span></Link>
            </div>
          </div>
          <LabuanAdviserAccess locale="es" />
        </div>
      </section>
      <footer className="zh-footer"><div className="site-shell"><Link className="brand" href="/es"><span className="brand-lockup" aria-hidden="true"><img className="brand-symbol" src="/images/pf-gold-symbol.png" alt="" /><span className="brand-words"><b>Property</b><b>Facilitators</b></span><span className="brand-region">EuroAsia</span></span></Link><p>Información verificada sobre Malasia y Labuan.</p><Link className="language-link" href="/services/labuan-company-residency/adviser">English version →</Link></div></footer>
    </main>
  );
}
