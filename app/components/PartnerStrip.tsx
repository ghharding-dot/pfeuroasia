export function PartnerStrip() {
  return (
    <section className="partner-strip" aria-labelledby="partner-strip-title">
      <div className="site-shell">
        <p className="partner-strip-title" id="partner-strip-title">Collaborating with</p>
        <div className="partner-logo-grid">
          <div className="partner-logo partner-pf"><img src="/images/partner-pf-iberia.png" alt="Property Facilitators Iberia" /></div>
          <div className="partner-logo partner-house"><img src="/images/partner-house-country.png" alt="House and Country Real Estate" /></div>
          <div className="partner-logo partner-luxo" aria-label="LuxoEstates"><span>Luxo</span><b>Estates</b></div>
          <div className="partner-logo partner-legal"><img src="/images/partner-legal10.jpg" alt="Legal 10 Abogados" /></div>
          <div className="partner-logo partner-lawbird"><img src="/images/partner-lawbird.png" alt="Lawbird" /></div>
        </div>
      </div>
    </section>
  );
}
