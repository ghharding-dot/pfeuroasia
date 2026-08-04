"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./PublicPropertyCarousel.module.css";

export type PublicPropertySlide = {
  id: string;
  image: string;
  imagePosition: string;
  title: string;
  location: string;
  visibility: "teaser" | "public";
  price?: string;
};

export function PublicPropertyCarousel({ slides }: { slides: PublicPropertySlide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  function move(direction: number) {
    setIndex((current) => (current + direction + slides.length) % slides.length);
  }

  return (
    <section className={styles.section} aria-labelledby="selected-opportunities-heading">
      <div className="site-shell">
        <div className={styles.heading}>
          <div>
            <p className="eyebrow">Selected private opportunities</p>
            <h2 id="selected-opportunities-heading">
              A glimpse of what is available.
              <em>Full details remain private.</em>
            </h2>
          </div>
          <div className={styles.headingCopy}>
            <strong>{slides.length} approved {slides.length === 1 ? "opportunity" : "opportunities"}</strong>
            <p>
              A carefully approved selection from our private portfolio. Register for access to full particulars, additional photography and protected brochures.
            </p>
          </div>
        </div>

        <div className={styles.carousel}>
          <div className={styles.slides} aria-live="polite">
            {slides.map((slide, slideIndex) => (
              <article
                className={`${styles.slide} ${slideIndex === index ? styles.active : ""}`}
                aria-hidden={slideIndex !== index}
                key={slide.id}
              >
                <div className={styles.imageWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    style={{ objectPosition: slide.imagePosition }}
                  />
                  <span className={styles.imageLabel}>
                    {slide.visibility === "teaser" ? "Private teaser" : "Selected listing"}
                  </span>
                </div>

                <div className={styles.copy}>
                  <p className={styles.count}>
                    {String(slideIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                  </p>
                  <p className={styles.location}>{slide.location}</p>
                  <h3>{slide.title}</h3>
                  {slide.visibility === "public" && slide.price && (
                    <strong className={styles.price}>{slide.price}</strong>
                  )}
                  <p className={styles.description}>
                    {slide.visibility === "teaser"
                      ? "The property identity, specifications and brochure are available only to registered private-collection clients."
                      : "Selected summary information is public. Full particulars and brochure access remain protected."}
                  </p>
                  <Link className="button button-gold" href="/private-portfolio/access">
                    Request private access <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {slides.length > 1 && (
            <div className={styles.controls}>
              <div className={styles.arrows}>
                <button type="button" onClick={() => move(-1)} aria-label="Previous property">←</button>
                <button type="button" onClick={() => move(1)} aria-label="Next property">→</button>
              </div>

              <div className={styles.thumbnails} aria-label="Choose a property">
                {slides.map((slide, thumbnailIndex) => (
                  <button
                    type="button"
                    className={`${styles.thumbnail} ${thumbnailIndex === index ? styles.activeThumbnail : ""}`}
                    onClick={() => setIndex(thumbnailIndex)}
                    aria-label={`Show property ${thumbnailIndex + 1}: ${slide.title}`}
                    aria-current={thumbnailIndex === index ? "true" : undefined}
                    key={slide.id}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={slide.image} alt="" style={{ objectPosition: slide.imagePosition }} />
                    <span>{String(thumbnailIndex + 1).padStart(2, "0")}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
