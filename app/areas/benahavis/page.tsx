import Link from "next/link";
import { AreaPage } from "../../components/AreaPage";

export default function BenahavisPage() {
  return <AreaPage
    eyebrow="Benahavís · Marbella Hills"
    title="Benahavís"
    subtitle="A broad property market of private estates, golf communities, hillside villas and village life."
    imageClass="benahavis-hero"
    overview="Benahavís is a municipality rather than one single residential market. Its property choices range from village homes and golf communities to highly private hillside estates. Buyers should compare access, elevation, security, views and daily convenience before treating different addresses as directly comparable."
    character={[
      { title: "Private estates", text: "Some of Southern Spain’s most discreet gated communities are set within the Benahavís hills." },
      { title: "Golf and landscape", text: "Valleys, elevated terrain and established golf environments create a wide variety of views and residential settings." },
      { title: "International living", text: "The municipality supports full-time residents, second-home owners and clients who want space while remaining connected to Marbella." },
    ]}
    details={<>
      <section className="zagaleta-life section-pad">
        <div className="site-shell zagaleta-life-grid">
          <div><p className="eyebrow light">Not one market</p><h2>Choose the setting—<em>then choose the home.</em></h2></div>
          <div className="zagaleta-life-list">
            <article><span>Country-estate privacy</span><p>Large plots, controlled access and low-density hillside living for clients who place discretion first.</p></article>
            <article><span>Golf communities</span><p>Villas, townhouses and apartments arranged around established courses and practical community amenities.</p></article>
            <article><span>Hillside residences</span><p>Individual homes chosen for outlook, nature and space, with access and orientation varying substantially by position.</p></article>
            <article className="honest-note"><span>The buying question</span><p>Privacy, views and elevation can add appeal, but the daily driving pattern, road approach and distance to schools or the coast should be tested in real life.</p></article>
          </div>
        </div>
      </section>

      <section className="market-area-links section-pad">
        <div className="site-shell">
          <p className="eyebrow light">Private Benahavís communities</p>
          <div className="market-area-grid">
            <Link href="/areas/la-zagaleta"><span>01</span><h2>La Zagaleta</h2><p>Country-club privacy, substantial estates and carefully controlled access.</p><b>Read the guide →</b></Link>
            <Link href="/areas/el-madronal"><span>02</span><h2>El Madroñal</h2><p>Wooded hillside living, individual architecture and practical connection to the coast.</p><b>Read the guide →</b></Link>
          </div>
        </div>
      </section>

      <section className="zagaleta-property section-pad">
        <div className="site-shell">
          <div className="zagaleta-heading"><div><p className="eyebrow">A disciplined comparison</p><h2>Look beyond the postcode.</h2></div><p>Property condition, community obligations, road position, neighbouring plots and future development context all influence long-term ownership.</p></div>
          <div className="property-band-list madronal-home-list">
            <article><span>Access</span><div><h3>Test the daily journey</h3><p>Visit at different times and understand the relationship with schools, shops, the coast and the airport route.</p></div></article>
            <article><span>Setting</span><div><h3>Read the plot carefully</h3><p>Orientation, slope, privacy, wind, sunlight and neighbouring land can change the lived experience.</p></div></article>
            <article><span>Ownership</span><div><h3>Coordinate professional advice</h3><p>Use independent legal, tax and technical specialists to examine the property and ownership circumstances.</p></div></article>
          </div>
          <p className="source-note"><Link href="/guides/marbella-property-international-buyers">Read our guide for international buyers →</Link></p>
        </div>
      </section>
    </>}
    buyerNote="A Benahavís search should be structured around the client’s real priorities rather than a single price-per-square-metre comparison. Community, elevation, access, privacy and condition can produce very different ownership experiences within the same municipality."
  />;
}
