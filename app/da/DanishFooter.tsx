import Link from "next/link";

export function DanishFooter() {
  return <footer className="zh-footer"><div className="site-shell">
    <Link className="brand" href="/da"><span className="brand-lockup"><img className="brand-symbol" src="/images/pf-gold-symbol.png" alt=""/><span className="brand-words"><b>Property</b><b>Facilitators</b></span><span className="brand-region">EuroAsia</span></span></Link>
    <p>Uafhængig international ejendomsrådgivning mellem Europa og Asien.</p>
    <div><Link className="language-link" href="/">English version →</Link><br/><Link className="language-link" href="/da/privacy">Privatliv</Link></div>
  </div></footer>;
}
