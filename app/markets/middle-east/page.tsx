import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

const marketCards = [
  {
    id: "saudi-arabia",
    number: "01",
    title: "Saudi Arabia",
    text: "Private-client introductions, selected investment opportunities and cross-border property representation.",
  },
  {
    id: "uae",
    number: "02",
    title: "United Arab Emirates",
    text: "A direct route for clients exploring international property, relocation and lifestyle opportunities.",
  },
  {
    id: "qatar",
    number: "03",
    title: "Qatar",
    text: "Relationship-led access for qualified buyers, owners and trusted professional partners.",
  },
];

export default function MiddleEastPage() {
  return (
    <main>
      <Header enquireHref="/asia-gateway/enquire" enquireLabel="Asia enquiry" />
      <section
        className="market-landing-hero"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=88)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="area-overlay" />
        <div className="site-shell market-landing-copy">
          <p className="eyebrow light">International markets</p>
          <h1>Middle East</h1>
          <p>
            Selected luxury property, investment and private-client
            opportunities supported by trusted local relationships.
          </p>
        </div>
      </section>

      <section className="market-landing-intro section-pad">
        <div className="site-shell narrow-grid">
          <p className="eyebrow">Relationship-led access</p>
          <div>
            <h2>Local expertise. International coordination.</h2>
            <p>
              Property Facilitators EuroAsia works through direct, trusted
              connections. We introduce qualified clients, coordinate the
              appropriate local specialists and remain focused on clear,
              discreet representation throughout the process.
            </p>
          </div>
        </div>
      </section>

      <section className="malaysia-services section-pad">
        <div className="site-shell">
          <p className="eyebrow light">Markets</p>
          <div className="area-feature-grid">
            {marketCards.map((market) => (
              <article id={market.id} key={market.id}>
                <span>{market.number}</span>
                <h2>{market.title}</h2>
                <p>{market.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="site-shell cta-inner">
          <p className="eyebrow light">Private introductions</p>
          <h2>Discuss a Middle East opportunity.</h2>
          <p>
            Tell us the market, property type or investment objective and we
            will respond personally and in confidence.
          </p>
          <Link className="button button-gold" href="/asia-gateway/enquire">
            Contact us <span>→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
