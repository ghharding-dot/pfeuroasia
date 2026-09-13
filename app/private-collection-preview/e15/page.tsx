import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const imageRoot =
  "https://images.squarespace-cdn.com/content/v1/62dfd00db50c2801dd8d0cd2";

const images = {
  hero: `${imageRoot}/95f648f4-9446-4e97-8188-69128c1b86f9/infinity-pool-villa-castellina-la-zagaleta-marbella-spain-web1.jpg?format=2500w`,
  clouds: `${imageRoot}/fa22dc7e-8a98-4249-9a90-ba20f7abf671/pool-in-clouds-luxury-villas-in-marbella-spain.jpg?format=2500w`,
  twilight: `${imageRoot}/5c1e5655-c958-449a-b6c1-816cdc668b61/villa-twilight-gala-private-function-catering-luxury-villas-in-marbella-spain.jpg?format=2500w`,
  side: `${imageRoot}/38738449-d5f4-43e6-9da7-4cfe3da518aa/villa-side-elevation-hills-luxury-villas-in-marbella-spain.jpg?format=2500w`,
  porch: `${imageRoot}/b261efe7-90e0-4f28-93f3-985b8b7fc552/villa-porch-dusk-luxury-villas-in-marbella-spain.jpg?format=2500w`,
  suite: `${imageRoot}/48f4f787-0692-4368-9f96-bb03ed7bd13f/upstairs-guest-bedroom-terrace-seating-luxury-villas-in-marbella-spain.jpg?format=2500w`,
  driveway: `${imageRoot}/3867d6de-ee2d-4681-882e-ea7fc0ad1167/porsche-driveway-villa-luxury-villas-in-marbella-spain.jpg?format=2500w`,
  lounge: `${imageRoot}/1acf5edf-04d3-40b0-8303-66a20c91bab0/lounge-twilight-arched-entrances-luxury-villas-in-marbella-spain.jpg?format=2500w`,
  bathroom: `${imageRoot}/7c097b6e-9cf3-4576-bf35-aecf859e7dd9/master-ensuite-spa-double-vanity-luxury-villas-in-marbella-spain.jpg?format=2500w`,
  dining: `${imageRoot}/5fa31fb0-2653-46a7-9387-3daf2587d88e/grand-octagonal-dining-setting-luxury-villas-in-marbella-spain.jpg?format=2500w`,
  guest: `${imageRoot}/5751f1e5-60cb-45a4-b170-3b375f098f3e/guest-lounge-stunning-views-luxury-villas-in-marbella-spain.jpg?format=2500w`,
};

const facts = [
  ["4", "bedroom suites"],
  ["893 m²", "interior built area"],
  ["325 m²", "covered & open terraces"],
  ["4,553 m²", "private plot"],
  ["5 cars", "secure garaging"],
];

function Picture({
  src,
  alt,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`${styles.picture} ${className || ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 760px) 100vw, 100vw"
        className={styles.image}
      />
    </div>
  );
}

export default function PrivateCollectionE15Page() {
  return (
    <main className={styles.page}>
      <div className={styles.previewNotice}>Private draft · not publicly listed</div>

      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Property Facilitators EuroAsia home">
          <Image src="/images/pf-gold-symbol.png" alt="" width={38} height={38} />
          <span>
            <b>Property Facilitators</b>
            <small>EuroAsia · Private Collection</small>
          </span>
        </Link>
        <Link className={styles.headerCta} href="/private-collection-preview/e15/enquire">
          Request dossier
        </Link>
      </header>

      <section className={styles.hero}>
        <Picture
          src={images.hero}
          alt="Infinity pool and panoramic Mediterranean view from a private La Zagaleta villa"
          priority
          className={styles.heroPicture}
        />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <p>By private invitation · La Zagaleta</p>
          <h1>A residence above the Mediterranean.</h1>
          <span>Private reference E15</span>
        </div>
        <a className={styles.scrollCue} href="#residence" aria-label="Discover the residence">
          <span>Discover</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <section className={styles.introduction} id="residence">
        <div className={styles.introHeading}>
          <p className={styles.eyebrow}>An original La Zagaleta residence</p>
          <h2>Quiet architecture.<br />Extraordinary outlook.</h2>
        </div>
        <div className={styles.introCopy}>
          <p>
            Set on an elevated, southwest-facing plot, this established residence looks across the Old Course
            towards the Mediterranean, Gibraltar and the distant coast of Africa.
          </p>
          <p>
            Mature gardens, generous terraces and interiors shaped around the view give the house a quality
            that newer architecture often tries—but rarely manages—to recreate.
          </p>
        </div>
        <div className={styles.facts} aria-label="Property facts">
          {facts.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.fullBleed}>
        <Picture
          src={images.twilight}
          alt="The La Zagaleta residence illuminated at twilight above its mature gardens"
        />
        <p className={styles.imageCaption}>Evening settles across the terraces and gardens.</p>
      </section>

      <section className={styles.storyGrid}>
        <div className={styles.storyCopy}>
          <p className={styles.eyebrow}>The house in outline</p>
          <h2>Designed to live with the landscape.</h2>
          <p>
            The principal level brings together a sea-facing master suite, generous reception rooms, a marble
            kitchen, bar and distinctive octagonal dining room. Arched openings and deep terraces soften the
            boundary between indoors and out.
          </p>
          <p>
            A private guest suite occupies the upper level. Two further suites sit below, alongside extensive
            garaging and unfinished space with scope for a cinema, wellness suite, gym or additional accommodation.
          </p>
        </div>
        <Picture
          src={images.porch}
          alt="A shaded dining terrace with arched openings and garden views"
          className={styles.storyPicture}
        />
      </section>

      <section className={styles.imagePair} aria-label="Villa details">
        <Picture src={images.lounge} alt="Elegant living room opening through arches to a sunset terrace" />
        <Picture src={images.dining} alt="Octagonal dining room with windows overlooking the landscape" />
      </section>

      <section className={styles.darkStory}>
        <div>
          <p className={styles.eyebrow}>Life above the coast</p>
          <h2>Privacy is part of the architecture.</h2>
        </div>
        <p>
          La Zagaleta is arranged around distance, mature woodland and controlled access. Two private golf
          courses, clubhouses, an equestrian centre and helipad sit within the estate, while Puerto Banús and
          Marbella remain close enough for an evening out—when you choose it.
        </p>
      </section>

      <section className={styles.gallery}>
        <Picture src={images.side} alt="Side elevation of the villa overlooking the green hills of La Zagaleta" />
        <Picture src={images.suite} alt="Guest suite opening onto a private panoramic terrace" />
        <Picture src={images.bathroom} alt="Master bathroom with twin vanity and spa-like finishes" />
        <Picture src={images.guest} alt="Private guest sitting room overlooking the Mediterranean landscape" />
      </section>

      <section className={styles.arrival}>
        <Picture
          src={images.driveway}
          alt="Private driveway arrival through established Mediterranean landscaping"
        />
        <div className={styles.arrivalCopy}>
          <p className={styles.eyebrow}>Private presentation</p>
          <h2>The complete story is shared personally.</h2>
          <p>
            Price guidance, plans, the full photographic collection and viewing arrangements are available to
            qualified buyers through a confidential dossier.
          </p>
          <Link className={styles.primaryCta} href="/private-collection-preview/e15/enquire">
            Request the private dossier <span>→</span>
          </Link>
        </div>
      </section>

      <section className={styles.finalImage}>
        <Picture
          src={images.clouds}
          alt="Infinity pool floating above clouds and the Mediterranean horizon"
        />
        <div className={styles.finalCopy}>
          <p>Property Facilitators EuroAsia</p>
          <span>Private property representation · Spain ↔ Asia</span>
        </div>
      </section>
    </main>
  );
}
