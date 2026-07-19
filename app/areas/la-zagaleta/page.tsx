import { AreaPage } from "../../components/AreaPage";

export default function LaZagaletaPage() {
  return <AreaPage
    eyebrow="Benahavís · Costa del Sol"
    title="La Zagaleta"
    subtitle="One of Europe’s most private and established country estates."
    imageClass="zagaleta-hero"
    overview="La Zagaleta is defined by scale, seclusion and controlled access. Large plots, mature landscape and an exceptional level of privacy create a market where the individual setting of a property matters as much as its architecture."
    character={[
      { title: "Privacy", text: "A discreet gated environment designed around space, security and low-density living." },
      { title: "Country-club life", text: "Golf, equestrian facilities and private amenities support a self-contained lifestyle." },
      { title: "Residential scale", text: "Substantial plots and panoramic positions allow homes of genuine presence and individuality." },
    ]}
    details={<>
      <section className="zagaleta-facts section-pad">
        <div className="site-shell">
          <div className="zagaleta-heading"><div><p className="eyebrow">La Zagaleta by the numbers</p><h2>Space is the real luxury.</h2></div><p>A deliberately low-density estate across protected Benahavís hillside, designed to preserve distance, landscape and anonymity.</p></div>
          <div className="zagaleta-stat-grid">
            <article><strong>900</strong><span>hectares of private hillside</span></article>
            <article><strong>≈300</strong><span>completed villas</span></article>
            <article><strong>3,000–12,000</strong><span>m² typical plot sizes</span></article>
            <article><strong>50</strong><span>km of private roads</span></article>
          </div>
        </div>
      </section>

      <section className="zagaleta-life section-pad">
        <div className="site-shell zagaleta-life-grid">
          <div><p className="eyebrow light">What daily life feels like</p><h2>The coast is close—<em>but only when you choose it.</em></h2></div>
          <div className="zagaleta-life-list">
            <article><span>Morning</span><p>Absolute quiet, mature cork oak and pine, and terraces looking toward golf, sea and mountain landscapes.</p></article>
            <article><span>Inside the estate</span><p>Two private golf courses, equestrian facilities, clubhouse dining, fitness, tennis and padel support a self-contained rhythm.</p></article>
            <article><span>Beyond the gates</span><p>San Pedro is approximately 15 minutes away, Puerto Banús around 20, Marbella centre around 25 and Málaga Airport around 50.</p></article>
            <article className="honest-note"><span>The honest trade-off</span><p>This is not walkable urban Marbella. It suits people who want to arrive home, close the gate and genuinely withdraw from view.</p></article>
          </div>
        </div>
      </section>

      <section className="zagaleta-gallery section-pad" aria-labelledby="zagaleta-gallery-title">
        <div className="site-shell">
          <div className="zagaleta-gallery-heading">
            <p className="eyebrow">Inside La Zagaleta</p>
            <h2 id="zagaleta-gallery-title">A private world above the coast.</h2>
          </div>
          <div className="zagaleta-gallery-grid">
            <figure><img src="/images/zagaleta-golf-club.webp" alt="The Old Course golf club at La Zagaleta" /><figcaption><span>01</span>Golf Club</figcaption></figure>
            <figure><img src="/images/zagaleta-view.webp" alt="Panoramic Mediterranean view from a La Zagaleta villa" /><figcaption><span>02</span>A View to Die For</figcaption></figure>
            <figure><img src="/images/zagaleta-security-entrance.webp" alt="Controlled security entrance at La Zagaleta" /><figcaption><span>03</span>Security Entrance</figcaption></figure>
            <figure><img src="/images/zagaleta-helipad.webp" alt="Private helipad within La Zagaleta" /><figcaption><span>04</span>Private Helipad</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="zagaleta-property section-pad">
        <div className="site-shell">
          <div className="zagaleta-heading"><div><p className="eyebrow">Indicative 2026 property guide</p><h2>Four distinct levels of opportunity.</h2></div><p>Prices depend heavily on position, plot, outlook, age and specification. These broad bands are a starting point, not a substitute for property-level advice.</p></div>
          <div className="property-band-list">
            <article><span>€4M–€6M</span><div><h3>Established villas</h3><p>Often traditional in style, generally 700 m² or more, with renovation or repositioning potential.</p></div></article>
            <article><span>€8M–€15M</span><div><h3>Modern residences</h3><p>Typically contemporary homes with substantial built area, infinity pools, wellness spaces and intelligent-home systems.</p></div></article>
            <article><span>€15M–€25M</span><div><h3>Trophy estates</h3><p>Signature architecture, larger plots, extensive staff and leisure accommodation, and exceptional outlooks.</p></div></article>
            <article><span>€25M+</span><div><h3>Landmark properties</h3><p>Very large private estates where architecture, scale and rarity place the property in an international category.</p></div></article>
          </div>
        </div>
      </section>

      <section className="zagaleta-practical section-pad">
        <div className="site-shell zagaleta-practical-grid">
          <div><p className="eyebrow light">Inside the gates</p><h2>Privacy is structural, not promotional.</h2><p>Visitors require advance authorisation. There is no through-traffic, and access for agents, taxis, deliveries and guests is controlled. This is central to the estate’s appeal.</p></div>
          <div><h3>Key amenities</h3><ul><li>Two private 18-hole golf courses</li><li>Clubhouses and resident dining</li><li>Equestrian centre and estate trails</li><li>Private helipad</li><li>Tennis, padel and fitness facilities</li><li>24-hour controlled security</li></ul></div>
        </div>
        <div className="site-shell source-note">Figures are indicative and adapted from the <a href="https://luxoestates.com/benahavis/la-zagaleta-marbella-what-its-really-like-2026/" target="_blank" rel="noreferrer">Luxo Estates 2026 La Zagaleta guide</a>. Verify current costs and availability before relying on them.</div>
      </section>
    </>}
    buyerNote="Not every opportunity is openly marketed, and two apparently similar homes can have very different outlooks, road positions and long-term value. A credible search depends on knowing the sectors, the plots and the history behind the property—not simply the asking price."
  />;
}
