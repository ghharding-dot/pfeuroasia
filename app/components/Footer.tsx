import Link from "next/link";
import { PartnerStrip } from "./PartnerStrip";

export function Footer() {
  return (
    <footer className="site-footer">
      <PartnerStrip />
      <div className="site-shell footer-top">
        <Link className="brand footer-brand" href="/">
          <span className="brand-lockup" aria-hidden="true">
            <img className="brand-symbol" src="/images/pf-gold-symbol.png" alt="" />
            <span className="brand-words"><b>Property</b><b>Facilitators</b></span>
            <span className="brand-region">EuroAsia</span>
          </span>
        </Link>
        <p>Independent luxury property representation between Spain and Asia.</p>
        <div className="footer-links">
          <Link href="/services/acquisition">Acquisition</Link>
          <Link href="/services/international-sales">International sales</Link>
          <Link href="/services/relocation-concierge">Relocation & concierge</Link>
          <Link href="/about">Our approach</Link>
        </div>
        <div className="footer-links footer-markets">
          <Link href="/markets/marbella">Marbella property</Link>
          <Link href="/areas/la-zagaleta">La Zagaleta</Link>
          <Link href="/areas/el-madronal">El Madroñal</Link>
          <Link href="/markets/malaysia">Malaysia & Asia</Link>
          <Link href="/zh">简体中文</Link>
          <Link href="/enquire">Contact our desks</Link>
        </div>
      </div>
      <div className="site-shell footer-bottom">
        <p>© {new Date().getFullYear()} Property Facilitators EuroAsia</p>
        <p>Marbella · Malaysia · Spain ↔ Asia</p>
      </div>
    </footer>
  );
}
