import Link from "next/link";
import styles from "./OwnerListingSection.module.css";

const marketFigures = [
  {
    value: "397,300",
    label: "Resident US-dollar millionaires",
    detail: "Singapore and Hong Kong combined",
  },
  {
    value: "42,715",
    label: "Individuals worth US$10m+",
    detail: "Resident in Hong Kong",
  },
  {
    value: "+5%",
    label: "Growth in Asia’s US$10m+ population",
    detail: "During 2024 — second-highest regional growth",
  },
  {
    value: "45%",
    label: "Wealthy Saudis looking to buy",
    detail: "A home during 2025, according to Knight Frank",
  },
];

const ownerServices = [
  {
    number: "01",
    title: "International buyer access",
    text: "Relationship-led introductions across Singapore, Hong Kong, Macau, Malaysia, Thailand, Greater China and Saudi Arabia, supported by selected property and business networks.",
  },
  {
    number: "02",
    title: "Prime and discreet representation",
    text: "A focused service for luxury villas, private estates and investment opportunities, generally from €2 million upwards, with controlled off-market exposure where required.",
  },
  {
    number: "03",
    title: "Sales and premium rental strategy",
    text: "Suitable properties can be presented for both sale and high-end seasonal rental, creating immediate income potential while introducing the home to future buyers.",
  },
  {
    number: "04",
    title: "Personal handling",
    text: "Serious enquiries are assessed and managed personally, rather than passed through an anonymous mass-market lead system.",
  },
];

const buyerPriorities = [
  "Secure gated communities",
  "Large private plots",
  "Sea, mountain or golf views",
  "Six or more bedrooms",
  "Staff and guest accommodation",
  "Pools, spas, gyms and cinemas",
  "Turnkey or fully furnished homes",
  "Confidential off-market opportunities",
];

export function OwnerListingSection() {
  return (
    <section className={styles.ownerSection} id="list-your-property">
      <div className={`site-shell ${styles.ownerHero}`}>
        <div className={styles.ownerIntro}>
          <p className="eyebrow">For property owners</p>
          <h2>Your property deserves more than local exposure.</h2>
          <p>
            Property Facilitators EuroAsia connects selected Marbella properties
            with high-net-worth buyers and renters across Asia and the Middle East.
            Our focus is confidential, relationship-led representation for prime
            homes generally valued from €2 million upwards.
          </p>
          <Link className="button button-dark" href="/enquire">
            Submit your property <span>→</span>
          </Link>
        </div>

        <div className={styles.marketStatement}>
          <span>Marbella × Asia × Middle East</span>
          <p>
            Through established relationships in Malaysia, Greater China and
            Saudi Arabia, we introduce international families, entrepreneurs and
            private investors to exceptional residential, rental and investment
            opportunities across the Costa del Sol.
          </p>
        </div>
      </div>

      <div className={styles.marketPanel}>
        <div className={`site-shell ${styles.marketPanelInner}`}>
          <div className={styles.marketHeading}>
            <p className="eyebrow">The international opportunity</p>
            <h3>A concentrated and expanding private-wealth market.</h3>
            <p>
              The relevant opportunity is not the size of Asia or the Middle East
              alone. It is the concentration of internationally mobile wealth in
              a small number of financial and business centres.
            </p>
          </div>

          <div className={styles.figureGrid}>
            {marketFigures.map((figure) => (
              <article key={figure.value + figure.label}>
                <strong>{figure.value}</strong>
                <h4>{figure.label}</h4>
                <p>{figure.detail}</p>
              </article>
            ))}
          </div>

          <p className={styles.sourceNote}>
            Sources: Henley &amp; Partners, World’s Wealthiest Cities Report 2025;
            Knight Frank, The Wealth Report 2025 and The Saudi Report 2025.
          </p>
        </div>
      </div>

      <div className={`site-shell ${styles.ownerDetails}`}>
        <div className={styles.ownerLeadBlock}>
          <p className="eyebrow">Why list with us</p>
          <h3>Access beyond the conventional European agency network.</h3>
          <p>
            A relatively small number of properly qualified international
            introductions can produce meaningful results at Marbella’s prime
            price levels. Our role is to position the property correctly and
            introduce it through trusted channels.
          </p>
        </div>

        <div className={styles.ownerServiceList}>
          {ownerServices.map((service) => (
            <article key={service.title}>
              <span>{service.number}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={`site-shell ${styles.buyerSection}`}>
        <div className={styles.buyerIntro}>
          <p className="eyebrow">What international clients seek</p>
          <h3>Space, privacy, security and a European family base.</h3>
          <p>
            Asian and Gulf buyers frequently seek homes suitable for extended
            family, guests and household staff, together with privacy and
            immediate usability.
          </p>
        </div>

        <div className={styles.priorityGrid}>
          {buyerPriorities.map((priority, index) => (
            <div key={priority}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{priority}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`site-shell ${styles.rentalBridge}`}>
        <div>
          <p className="eyebrow">Rental before purchase</p>
          <h3>A luxury rental can become the first stage of a future sale.</h3>
        </div>
        <div>
          <p>
            A growing number of internationally mobile families prefer to rent
            before committing to a second home. This allows them to experience
            Marbella, compare residential areas and understand the type of
            property that best suits their family.
          </p>
          <p>
            For suitable owners, premium seasonal rental can create immediate
            revenue while introducing the property to qualified future buyers,
            repeat clients and valuable referral networks.
          </p>
        </div>
      </div>

      <div className={`site-shell ${styles.ownerCta}`}>
        <div>
          <p className="eyebrow">Present your property</p>
          <h3>Open your property to a wider international market.</h3>
        </div>
        <div>
          <p>
            Send us the property location, asking price, a brief description and
            available photographs or brochure. We will review the opportunity and
            advise whether it is suitable for our international sales or premium
            rental network.
          </p>
          <Link className="button button-dark" href="/enquire">
            Submit your property <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
