"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./PublicPropertyCarousel.module.css";

export type PublicPropertySlide = {
  id: string;
  image: string;
  imagePosition: string;
  title: string;
  location: string;
  visibility: "teaser" | "public";
  accessLevel?: "registered" | "private";
  price?: string;
  priceTo?: string;
};

const FALLBACK_EUR_USD_RATE = 1.16;

function extractEuroAmount(price?: string) {
  if (!price || !price.includes("€")) return undefined;
  const amount = Number(price.replace(/[^0-9]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? amount : undefined;
}

function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PublicPropertyCarousel({
  slides,
  variant = "property",
  eyebrow,
  heading,
  emphasis,
  summary,
  emptyMessage,
  headingId: customHeadingId,
  directPublicListings = false,
}: {
  slides: PublicPropertySlide[];
  variant?: "property" | "development";
  eyebrow?: string;
  heading?: string;
  emphasis?: string;
  summary?: string;
  emptyMessage?: string;
  headingId?: string;
  directPublicListings?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [eurUsdRate, setEurUsdRate] = useState(FALLBACK_EUR_USD_RATE);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://api.frankfurter.app/latest?from=EUR&to=USD", {
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        const rate = Number(data?.rates?.USD);
        if (Number.isFinite(rate) && rate > 0) setEurUsdRate(rate);
      })
      .catch(() => {
        // The fallback rate keeps the display available if the rate service is unreachable.
      });

    return () => controller.abort();
  }, []);

  const approximateUsdPrices = useMemo(
    () =>
      slides.map((slide) => {
        const euroAmount = extractEuroAmount(slide.price);
        const euroAmountTo = extractEuroAmount(slide.priceTo);
        if (!euroAmount) return "";
        if (euroAmountTo) {
          return `Approx. US${formatUsd(euroAmount * eurUsdRate)} – US${formatUsd(euroAmountTo * eurUsdRate)} USD`;
        }
        return `Approx. US${formatUsd(euroAmount * eurUsdRate)} USD`;
      }),
    [slides, eurUsdRate],
  );

  const isDevelopment = variant === "development";
  const headingId = customHeadingId || (isDevelopment
    ? "new-developments-heading"
    : "selected-opportunities-heading");
  const displayEyebrow = eyebrow || (isDevelopment ? "New developments in Spain" : "Selected property opportunities");
  const displayHeading = heading || (isDevelopment ? "Property taking shape." : "A glimpse of what is available.");
  const displayEmphasis = emphasis || (isDevelopment
    ? "Under construction, off-plan and investment opportunities."
    : "General listings and private introductions.");
  const displaySummary = summary || (isDevelopment
    ? "Explore selected new-build projects, phased releases and under-construction opportunities with direct access to current availability and developer information."
    : "Registered listings open after simple contact verification. Genuine private and off-market opportunities remain subject to a fuller application and approval.");

  if (slides.length === 0 && !isDevelopment && !emptyMessage) return null;

  if (slides.length === 0) {
    return (
      <section className={`${styles.section} ${isDevelopment ? styles.developmentSection : ""}`} aria-labelledby={headingId}>
        <div className="site-shell">
          <div className={styles.heading}>
            <div>
              <p className="eyebrow">{displayEyebrow}</p>
              <h2 id={headingId}>
                {displayHeading}
                <em>{displayEmphasis}</em>
              </h2>
            </div>
            <div className={styles.headingCopy}>
              <strong>New portfolio section</strong>
              <p>{displaySummary}</p>
            </div>
          </div>
          <div className={styles.emptyState}>
            <span>{isDevelopment ? "New developments" : "Malaysia property network"}</span>
            <h3>{isDevelopment ? "Our first selected projects are being prepared." : "New opportunities will appear here."}</h3>
            <p>{emptyMessage || "Current availability, investment details and developer information will appear here shortly."}</p>
          </div>
        </div>
      </section>
    );
  }

  function move(direction: number) {
    setIndex((current) => (current + direction + slides.length) % slides.length);
  }

  return (
    <section className={`${styles.section} ${isDevelopment ? styles.developmentSection : ""}`} aria-labelledby={headingId}>
      <div className="site-shell">
        <div className={styles.heading}>
          <div>
            <p className="eyebrow">{displayEyebrow}</p>
            <h2 id={headingId}>
              {displayHeading}
              <em>{displayEmphasis}</em>
            </h2>
          </div>
          <div className={styles.headingCopy}>
            <strong>{slides.length} approved {slides.length === 1 ? "opportunity" : "opportunities"}</strong>
            <p>{displaySummary}</p>
          </div>
        </div>

        <div className={styles.carousel}>
          <div className={styles.slides} aria-live="polite">
            {slides.map((slide, slideIndex) => {
              const registered = slide.accessLevel
                ? slide.accessLevel === "registered"
                : slide.visibility === "public";
              return (
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
                      {isDevelopment
                        ? "New development"
                        : registered
                          ? "Registered listing"
                          : "Private opportunity"}
                    </span>
                  </div>

                  <div className={styles.copy}>
                    <p className={styles.count}>
                      {String(slideIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                    </p>
                    <p className={styles.location}>{slide.location}</p>
                    <h3>{slide.title}</h3>
                    {slide.visibility === "public" && slide.price && (
                      <div className={styles.priceBlock}>
                        <strong className={styles.price}>
                          {slide.priceTo ? `${slide.price} – ${slide.priceTo}` : slide.price}
                        </strong>
                        {approximateUsdPrices[slideIndex] && (
                          <span className={styles.convertedPrice}>
                            {approximateUsdPrices[slideIndex]}
                          </span>
                        )}
                      </div>
                    )}
                    <p className={styles.description}>
                      {registered && directPublicListings
                        ? "View the complete development presentation, then contact the PF EuroAsia Asia desk for current availability, pricing and further information."
                        : isDevelopment
                        ? "View the photographs, price range and full development details without registering. Enquire only when you would like current availability or further information."
                        : registered
                        ? "Register your name, email and telephone number, then verify your email to view the full property particulars. No manual approval is required."
                        : "This is a private or off-market introduction. Full particulars are disclosed only after a detailed client application and PF EuroAsia approval."}
                    </p>
                    <Link
                      className="button button-gold"
                      tabIndex={slideIndex === index ? undefined : -1}
                      href={
                        isDevelopment || (registered && directPublicListings)
                          ? `/properties/${slide.id}`
                          : registered
                            ? `/properties/${slide.id}/access`
                            : "/private-portfolio"
                      }
                    >
                      {isDevelopment || (registered && directPublicListings)
                        ? "View full development"
                        : registered
                          ? "View full details"
                          : "Request private access"} <span>→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
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
