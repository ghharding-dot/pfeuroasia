import Link from "next/link";
import styles from "./TopicPathway.module.css";

type PathwayLink = {
  label: string;
  title: string;
  description: string;
  href: string;
};

type TopicPathwayProps = {
  title: string;
  intro: string;
  links: PathwayLink[];
};

export function TopicPathway({ title, intro, links }: TopicPathwayProps) {
  return (
    <section className={styles.section} aria-label="Related PF EuroAsia guidance">
      <div className="site-shell">
        <div className={styles.heading}>
          <div><p className="eyebrow">Continue your research</p><h2>{title}</h2></div>
          <p>{intro}</p>
        </div>
        <div className={styles.grid}>
          {links.map((item, index) => (
            <Link className={styles.card} href={item.href} key={item.href}>
              <div><span>{item.label}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <strong>Read next <span>→</span></strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
