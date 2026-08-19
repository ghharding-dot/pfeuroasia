import Link from "next/link";
import { AreaPage } from "../../components/AreaPage";

export default function MarbellaGoldenMilePage() {
  return <AreaPage
    eyebrow="Marbella · Costa del Sol"
    title="Marbella Golden Mile"
    subtitle="An established corridor of beachfront living, private villas and landmark addresses."
    imageClass="golden-mile-hero"
    overview="The Marbella Golden Mile is not one uniform neighbourhood. It stretches across beachfront apartments, hotel-adjacent residences, established villa areas and elevated gated communities. The correct location depends on whether the priority is walking access, privacy, sea views, plot size or everyday convenience."
    character={[
      { title: "Established prestige", text: "A mature prime market connecting Marbella centre with Puerto Banús and some of the coast’s best-known residential addresses." },
      { title: "Varied property", text: "Beachfront apartments, renovated homes, gated communities and substantial private villas serve very different lifestyles." },
      { title: "Practical living", text: "Restaurants, hotels, beaches, schools and central Marbella are accessible without giving up a residential setting." },
    ]}
    details={<>
      <section className="zagaleta-life section-pad">
        <div className="site-shell zagaleta-life-grid">
          <div><p className="eyebrow light">Four different searches</p><h2>The address is familiar—<em>the experience changes street by street.</em></h2></div>
          <div className="zagaleta-life-list">
            <article><span>Beachfront</span><p>Apartments and select villas where proximity to the promenade, sea and hotel amenities is the defining advantage.</p></article>
            <article><span>Lower Golden Mile</span><p>Established residential areas offering practical access to both central Marbella and Puerto Banús.</p></article>
            <article><span>Upper Golden Mile</span><p>Villa communities above the main coastal road, often chosen for privacy, outlook and larger residential settings.</p></article>
            <article className="honest-note"><span>The honest trade-off</span><p>Two properties carrying the Golden Mile name may deliver very different walkability, traffic exposure, views and long-term appeal. Micro-location matters.</p></article>
          </div>
        </div>
      </section>

      <section className="zagaleta-property section-pad">
        <div className="site-shell">
          <div className="zagaleta-heading"><div><p className="eyebrow">Property choices</p><h2>Different formats for different priorities.</h2></div><p>Rather than beginning with a building style, begin with how the home will be used and which compromises are acceptable.</p></div>
          <div className="property-band-list madronal-home-list">
            <article><span>Lock-up & leave</span><div><h3>Prime apartments</h3><p>Managed communities can suit part-time owners who value security, service and straightforward maintenance.</p></div></article>
            <article><span>Residential</span><div><h3>Family villas</h3><p>Established homes and contemporary residences with private outdoor space and practical year-round access.</p></div></article>
            <article><span>Private</span><div><h3>Individual estates</h3><p>Larger plots and discreet positions where setting, neighbouring properties and road access require close assessment.</p></div></article>
          </div>
          <p className="source-note"><Link href="/guides/marbella-property-international-buyers">International buyer? Read our Marbella acquisition guide →</Link></p>
        </div>
      </section>
    </>}
    buyerNote="Golden Mile property should be compared at micro-location level. Orientation, road position, community quality, walkability, future works and the relationship between asking price and actual condition can matter more than the broad area label."
  />;
}
