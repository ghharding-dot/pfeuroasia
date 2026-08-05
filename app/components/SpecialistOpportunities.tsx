import Link from "next/link";
import styles from "./SpecialistOpportunities.module.css";

const opportunities = [
  {
    title: "Andalucía Country Estates",
    descriptor: "Properties with more than 20,000 m² of land.",
    description:
      "Large private estates, fincas, cortijos, equestrian, agricultural and lifestyle properties with substantial land.",
    action: "Register requirements",
    href: "/opportunities/country-estates",
    imageClass: styles.countryEstates,
  },
  {
    title: "Private Investment Opportunities",
    descriptor: "Selected property-led investment opportunities.",
    description:
      "Hotels, commercial property, development sites, refurbishment projects and income-producing assets.",
    action: "Register interest",
    href: "/opportunities/investment-opportunities",
    imageClass: styles.investment,
  },
  {
    title: "Golf & Country Club Homes",
    descriptor: "Residences within prestigious golf communities.",
    description:
      "Selected villas and apartments in established golf and country club settings across Southern Spain.",
    action: "Register requirements",
    href: "/enquire",
    imageClass: styles.golf,
  },
  {
    title: "Beachfront Collection",
    descriptor: "Prime homes in exceptional coastal settings.",
    description:
      "Beachfront and beachside residences selected for position, quality, privacy and lifestyle appeal.",
    action: "Register interest",
    href: "/enquire",
    imageClass: styles.beachfront,
  },
];

export function SpecialistOpportunities() {
  return (
    <div className={styles.grid}>
      {opportunities.map((opportunity) => (
        <Link
          className={`${styles.card} ${opportunity.imageClass}`}
          href={opportunity.href}
          aria-label={`${opportunity.action} for ${opportunity.title}`}
          key={opportunity.title}
        >
          <div className={styles.overlay} />
          <div className={styles.copy}>
            <p>{opportunity.descriptor}</p>
            <h3>{opportunity.title}</h3>
            <span className={styles.description}>{opportunity.description}</span>
            <span className={styles.action}>{opportunity.action} →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
