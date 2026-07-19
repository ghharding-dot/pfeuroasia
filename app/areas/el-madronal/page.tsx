import { AreaPage } from "../../components/AreaPage";

export default function ElMadronalPage() {
  return <AreaPage
    eyebrow="Benahavís · Above Marbella"
    title="El Madroñal"
    subtitle="A private hillside community with a distinctly natural character."
    imageClass="madronal-hero"
    overview="El Madroñal offers a different expression of prime Marbella living: wooded roads, elevated plots, broad coastal views and individual villas within a long-established residential community."
    character={[
      { title: "Natural setting", text: "Mature cork-oak landscape and mountain terrain give the estate an unusually peaceful identity." },
      { title: "Views and access", text: "Elevated positions combine Mediterranean outlooks with practical access to Marbella and Benahavís." },
      { title: "Individual homes", text: "From established Andalusian estates to contemporary villas, the community is deliberately varied." },
    ]}
    details={<>
      <section className="zagaleta-facts section-pad">
        <div className="site-shell">
          <div className="zagaleta-heading"><div><p className="eyebrow">Living in El Madroñal</p><h2>Private hillside living, naturally connected.</h2></div><p>A secure, established community where wooded surroundings and broad coastal outlooks sit within easy reach of everyday Marbella life.</p></div>
          <div className="zagaleta-stat-grid madronal-stat-grid">
            <article><strong>≈15</strong><span>minutes to Puerto Banús</span></article>
            <article><strong>≈20</strong><span>minutes to Marbella town</span></article>
            <article><strong>24/7</strong><span>controlled gated security</span></article>
            <article><strong>Year-round</strong><span>residential community</span></article>
          </div>
        </div>
      </section>

      <section className="zagaleta-life section-pad">
        <div className="site-shell zagaleta-life-grid">
          <div><p className="eyebrow light">The Madroñal rhythm</p><h2>Secluded at home—<em>connected when it matters.</em></h2></div>
          <div className="zagaleta-life-list">
            <article><span>At home</span><p>Quiet roads, mature vegetation and elevated plots create privacy without making the community feel remote or institutional.</p></article>
            <article><span>Everyday life</span><p>International schools, beaches, golf, restaurants and shopping are all within practical driving distance, which suits families and full-time residents.</p></article>
            <article><span>The outlook</span><p>Many villas combine Mediterranean and mountain views, with some elevated positions looking toward Gibraltar and the African coastline.</p></article>
            <article className="honest-note"><span>The character</span><p>El Madroñal feels sophisticated but residential. Its appeal lies in privacy, individuality and convenience rather than a resort-style amenity programme.</p></article>
          </div>
        </div>
      </section>

      <section className="zagaleta-gallery madronal-gallery section-pad" aria-labelledby="madronal-gallery-title">
        <div className="site-shell">
          <div className="zagaleta-gallery-heading">
            <p className="eyebrow">Inside El Madroñal</p>
            <h2 id="madronal-gallery-title">Classic elegance amongst nature.</h2>
          </div>
          <div className="zagaleta-gallery-grid">
            <figure><img src="/images/madronal-overview.webp" alt="Aerial overview of a classic El Madroñal estate and the Mediterranean coast" /><figcaption><span>01</span>El Madroñal Overview</figcaption></figure>
            <figure><img src="/images/madronal-classic-detail.webp" alt="Traditional shaded terrace and mature gardens at an El Madroñal villa" /><figcaption><span>02</span>Classic Style</figcaption></figure>
            <figure><img src="/images/madronal-classic-villa.webp" alt="Classic El Madroñal villa with private pool and established gardens" /><figcaption><span>03</span>Classic Elegance</figcaption></figure>
            <figure><img src="/images/madronal-nature.webp" alt="Woodland paths and mature pine trees within an El Madroñal estate" /><figcaption><span>04</span>Amongst Nature</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="zagaleta-property section-pad">
        <div className="site-shell">
          <div className="zagaleta-heading"><div><p className="eyebrow">Homes and architecture</p><h2>A community of individual estates.</h2></div><p>There is no single Madroñal house type. Plot position, orientation, access and neighbouring landscape can matter as much as the architecture itself.</p></div>
          <div className="property-band-list madronal-home-list">
            <article><span>Andalusian</span><div><h3>Established character villas</h3><p>Traditional proportions, courtyards, mature gardens and generous terraces, often with scope for sensitive modernisation.</p></div></article>
            <article><span>Mediterranean</span><div><h3>Family estates</h3><p>Substantial private homes designed around outdoor living, pools, gardens and flexible accommodation for family and guests.</p></div></article>
            <article><span>Contemporary</span><div><h3>Designer residences</h3><p>Modern architecture that uses the hillside for open views, natural light, expansive glazing and seamless indoor-outdoor living.</p></div></article>
          </div>
        </div>
      </section>

      <section className="zagaleta-practical section-pad">
        <div className="site-shell zagaleta-practical-grid">
          <div><p className="eyebrow light">Privacy with practicality</p><h2>A strong setting for long-term living.</h2><p>Gated entrances and controlled access support discretion, while the community’s position keeps schools, coastal facilities and Marbella’s social life comfortably reachable.</p></div>
          <div><h3>Why buyers choose El Madroñal</h3><ul><li>Secure gated residential setting</li><li>Panoramic sea and mountain views</li><li>Large private villas and gardens</li><li>Varied architectural styles</li><li>Convenient access to Marbella and San Pedro</li><li>Well suited to families and year-round residents</li></ul></div>
        </div>
        <div className="site-shell source-note">Area information is adapted from the <a href="https://luxoestates.com/lifestyle/la-zagaleta-vs-el-madronal-which-is-the-best-luxury-residential-community-in-marbella/" target="_blank" rel="noreferrer">Luxo Estates community guide</a>. Journey times are approximate; property conditions and availability require individual verification.</div>
      </section>
    </>}
    buyerNote="El Madroñal is not one uniform market. Gate, elevation, road access, orientation and neighbouring plots all influence daily life and value. Detailed local knowledge helps distinguish an attractive photograph from the right long-term purchase."
  />;
}
