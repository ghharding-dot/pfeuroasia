import Link from "next/link";
import styles from "./MalaysiaCostAndVisit.module.css";
import cardStyles from "./MalaysiaDiscoveryCards.module.css";

const comparisonRows = [
  {
    icon: "⛽",
    label: "Petrol / gasoline",
    unit: "per litre",
    europe: "€1.80",
    malaysia: "RM3.82 (€0.80)",
  },
  {
    icon: "◈",
    label: "Diesel",
    unit: "per litre",
    europe: "€1.84",
    malaysia: "RM4.62 (€0.96)",
  },
  {
    icon: "▥",
    label: "Residential build cost",
    unit: "per m²",
    europe: "€1,100–€2,200",
    malaysia: "RM2,700–RM3,200 (€563–€667)",
  },
  {
    icon: "▦",
    label: "120 m² apartment rent",
    unit: "monthly, major-city benchmark",
    europe: "€2,500–€4,000",
    malaysia: "RM4,900–RM7,000 (€1,021–€1,458)",
  },
  {
    icon: "◇",
    label: "Meal for two",
    unit: "mid-range restaurant",
    europe: "€60",
    malaysia: "RM110 (€23)",
  },
  {
    icon: "ϟ",
    label: "Household electricity",
    unit: "per kWh",
    europe: "c. €0.29",
    malaysia: "c. RM0.45 (€0.09)",
  },
];

const visitSteps = [
  {
    number: "01",
    title: "Stay in central Kuala Lumpur",
    text: "We can coordinate suitable five-star accommodation through our local network, including central options such as JW Marriott Kuala Lumpur and The Ritz-Carlton, Kuala Lumpur.",
  },
  {
    number: "02",
    title: "Private airport collection",
    text: "Arrival at Kuala Lumpur International Airport can be met with a pre-arranged private car or luxury executive MPV, taking you directly to your hotel in central Kuala Lumpur.",
  },
  {
    number: "03",
    title: "Meet our local partners",
    text: "Our Malaysia collaborator partners can meet you personally, introduce the city and help you understand the neighbourhoods, lifestyle and practicalities of living in Kuala Lumpur.",
  },
  {
    number: "04",
    title: "Make the visit productive",
    text: "Your programme can include property viewings, residency and company-formation meetings, business introductions and other specialist appointments relevant to your plans.",
  },
];

export function MalaysiaCostAndVisit() {
  return (
    <>
      <section className={styles.comparisonSection}>
        <div className="site-shell">
          <div className={styles.comparisonHeading}>
            <p className="eyebrow light">A practical comparison</p>
            <h2>Still not convinced?</h2>
            <p>
              Compare some indicative day-to-day and property-related costs
              between Europe and Malaysia.
            </p>
          </div>

          <div className={styles.comparisonPanel}>
            <div className={styles.tableHeader}>
              <span>Typical cost</span>
              <strong>Europe</strong>
              <strong>Malaysia</strong>
            </div>

            {comparisonRows.map((row) => (
              <div className={styles.comparisonRow} key={row.label}>
                <div className={styles.rowLabel}>
                  <span className={styles.rowIcon} aria-hidden="true">{row.icon}</span>
                  <div>
                    <strong>{row.label}</strong>
                    <small>{row.unit}</small>
                  </div>
                </div>
                <div className={styles.europeValue}>{row.europe}</div>
                <div className={styles.malaysiaValue}>{row.malaysia}</div>
              </div>
            ))}

            <div className={styles.airfareStrip}>
              <span aria-hidden="true">✈</span>
              <p>
                Typical London ↔ Kuala Lumpur economy return airfare:
                <strong> £630–£900</strong>
              </p>
            </div>
          </div>

          <p className={styles.comparisonNote}>
            Ringgit-to-euro equivalents use RM4.8 = €1. Figures are indicative
            only and vary by location, specification, consumption, season and
            market conditions. Malaysia fuel figures use non-subsidised
            Peninsular market rates published for 30 July–5 August 2026;
            subsidised citizen rates can be lower. Electricity is shown as an
            indicative household benchmark based on the current Peninsular
            tariff structure.
          </p>
        </div>
      </section>

      <section className={styles.visitSection}>
        <div className="site-shell">
          <div className={styles.visitIntro}>
            <div>
              <p className="eyebrow">Malaysia discovery visits</p>
              <h2>
                Come and see it
                <em>for yourself.</em>
              </h2>
            </div>
            <div className={styles.visitLead}>
              <p>
                A relocation or investment decision is easier when you have
                experienced the city personally. We can coordinate a focused
                Kuala Lumpur discovery visit around your property, residency,
                lifestyle or business objectives.
              </p>
              <Link className="button button-dark" href="/asia-gateway/enquire">
                Plan a Malaysia discovery visit <span>→</span>
              </Link>
            </div>
          </div>

          <div className={styles.hotelRates}>
            <article className={`${cardStyles.visualCard} ${cardStyles.jwCard}`}>
              <img
                className={cardStyles.visualCardImage}
                src="/images/jw-marriott-kuala-lumpur.webp"
                alt="JW Marriott Kuala Lumpur in Bukit Bintang"
              />
              <div className={cardStyles.visualCardShade} />
              <div className={cardStyles.visualCardCopy}>
                <span className={styles.hotelTag}>Indicative stay</span>
                <h3>JW Marriott Kuala Lumpur</h3>
                <p className={styles.hotelPrice}>from around <strong>RM500</strong> <span>(€104)</span> / night</p>
                <small>Selected-date public rate indication. Actual rates vary by date, room type, taxes and availability.</small>
              </div>
            </article>

            <article className={`${cardStyles.visualCard} ${cardStyles.ritzCard}`}>
              <img
                className={cardStyles.visualCardImage}
                src="/images/ritz-carlton-kuala-lumpur.webp"
                alt="Entrance of The Ritz-Carlton, Kuala Lumpur"
              />
              <div className={cardStyles.visualCardShade} />
              <div className={cardStyles.visualCardCopy}>
                <span className={styles.hotelTag}>Indicative stay</span>
                <h3>The Ritz-Carlton, Kuala Lumpur</h3>
                <p className={styles.hotelPrice}>from around <strong>RM650</strong> <span>(€135)</span> / night</p>
                <small>Selected-date public rate indication. Actual rates vary by date, room type, taxes and availability.</small>
              </div>
            </article>

            <article className={`${cardStyles.visualCard} ${cardStyles.transferCard}`}>
              <img
                className={cardStyles.visualCardImage}
                src="/images/luxury-mpv-kuala-lumpur.webp"
                alt="Representative black luxury executive MPV for Kuala Lumpur airport transfers"
              />
              <div className={cardStyles.visualCardShade} />
              <div className={cardStyles.visualCardCopy}>
                <span className={styles.hotelTag}>Private arrival</span>
                <h3>KLIA → central Kuala Lumpur</h3>
                <p className={styles.hotelPrice}>luxury executive MPV from around <strong>RM250</strong> <span>(€52)</span></p>
                <small>Representative Toyota Alphard / Vellfire-style vehicle shown. Indicative daytime private-transfer pricing; actual vehicle, timing and route affect cost.</small>
              </div>
            </article>
          </div>

          <div className={styles.visitSteps}>
            {visitSteps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>

          <div className={styles.visitClose}>
            <p>
              Tell us what you are considering before you travel. We will shape
              the visit around the questions you actually need answered—not a
              generic sightseeing itinerary.
            </p>
            <Link className="text-link" href="/asia-gateway/enquire">
              Discuss your Malaysia visit <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
