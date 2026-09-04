import Link from "next/link";
import { PartnerStrip } from "./PartnerStrip";
import styles from "./FooterCollaborators.module.css";
import { TrackedAnchor } from "./TrackedAnchor";

export function Footer({ hidePartnerStrip = false }: { hidePartnerStrip?: boolean } = {}) {
  const whatsappDigits = "34647026881";
  const whatsappHref = whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent("Hello Geoff, I am contacting you through the PF EuroAsia website.")}`
    : "";

  return (
    <footer className="site-footer">
      {!hidePartnerStrip && <PartnerStrip />}
      <div className="site-shell">
        <div className={styles.collaboratorBar}>
          <div className={styles.collaboratorCopy}>
            <strong>Collaborators & professional partners</strong>
            <span>Access the private collaborator area, shared resources and partner information.</span>
          </div>
          <Link className={`button button-gold ${styles.collaboratorButton}`} href="/collaborators">
            Collaborator access <span>→</span>
          </Link>
        </div>
      </div>
      <div className="site-shell footer-top">
        <div className="footer-identity">
          <Link className="brand footer-brand" href="/">
            <span className="brand-lockup" aria-hidden="true">
              <img className="brand-symbol" src="/images/pf-gold-symbol.png" alt="" />
              <span className="brand-words"><b>Property</b><b>Facilitators</b></span>
              <span className="brand-region">EuroAsia</span>
            </span>
          </Link>
          <div className="footer-contact">
            <p><strong>Property Facilitators EuroAsia</strong></p>
            <p><strong>Labuan, Malaysia</strong></p>
            <p><a href="mailto:enquiry@pfeuroasia.com">enquiry@pfeuroasia.com</a></p>
            {whatsappHref && (
              <p>
                <TrackedAnchor
                  className="footer-whatsapp-link"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="whatsapp_click"
                  eventParameters={{ location: "footer", desk: "PF EuroAsia" }}
                >
                  WhatsApp PF EuroAsia · +34 647 026 881 <span>↗</span>
                </TrackedAnchor>
              </p>
            )}
          </div>
        </div>
        <p>Independent luxury property representation between Spain and Asia.</p>
        <div className="footer-links">
          <Link href="/services/acquisition">Acquisition</Link>
          <Link href="/services/international-sales">International sales</Link>
          <Link href="/services/relocation-concierge">Relocation & concierge</Link>
          <Link href="/international-payments">International payments</Link>
          <Link href="/knowledge-centre">Knowledge Centre</Link>
          <Link href="/about">Our approach</Link>
          <Link href="/privacy">Privacy notice</Link>
          <a href="https://www.instagram.com/pfiberia/" target="_blank" rel="noopener noreferrer">
            Instagram · @pfiberia
          </a>
        </div>
        <div className="footer-links footer-markets">
          <Link href="/markets/marbella">Marbella property</Link>
          <Link href="/areas/la-zagaleta">La Zagaleta</Link>
          <Link href="/areas/el-madronal">El Madroñal</Link>
          <Link href="/markets/malaysia">Malaysia & Asia</Link>
          <Link href="/guides/malaysia-residency-options">Malaysia residency</Link>
          <Link href="/services/malaysia-company-formation">Malaysia company setup</Link>
          <Link href="/asia-gateway/company-residency">Asian company formation</Link>
          <Link href="/es">Español</Link>
          <Link href="/zh">简体中文</Link>
          <Link href="/da">Dansk</Link>
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
