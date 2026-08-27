"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatPropertyArea } from "../lib/propertyDisplay";
import styles from "./PublicPropertyCarousel.module.css";

export type PublicPropertySlide = {
  id: string;
  image: string;
  secondaryImage?: string;
  thirdImage?: string;
  fourthImage?: string;
  imagePosition: string;
  title: string;
  location: string;
  visibility: "teaser" | "public";
  accessLevel?: "registered" | "private";
  price?: string;
  priceTo?: string;
  plotSize?: string;
  builtSize?: string;
  bedrooms?: number;
  bathrooms?: number;
  terraces?: string;
  country?: string;
  setting?: string;
  views?: string;
  yearOfConstruction?: string;
  developer?: string;
  salesAgent?: string;
  propertyType?: string;
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
  portfolioValueMillions,
  catalogueHref,
  locale = "en",
}: {
  slides: PublicPropertySlide[];
  variant?: "property" | "development" | "asia";
  eyebrow?: string;
  heading?: string;
  emphasis?: string;
  summary?: string;
  emptyMessage?: string;
  headingId?: string;
  directPublicListings?: boolean;
  portfolioValueMillions?: number;
  catalogueHref?: string;
  locale?: "en" | "es";
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
  const isAsia = variant === "asia";
  const isSpanish = locale === "es";
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
      <section className={`${styles.section} ${isDevelopment ? styles.developmentSection : ""} ${isAsia ? styles.asiaSection : ""}`} aria-labelledby={headingId}>
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
            <strong>{isSpanish ? "Nueva sección de propiedades" : "New portfolio section"}</strong>
              <p>{displaySummary}</p>
            </div>
          </div>
          <div className={styles.emptyState}>
            <span>{isDevelopment ? (isSpanish ? "Nuevas promociones" : "New developments") : isAsia ? "Asia property network" : (isSpanish ? "Red inmobiliaria" : "Malaysia property network")}</span>
            <h3>{isDevelopment ? (isSpanish ? "Estamos preparando nuestros primeros proyectos seleccionados." : "Our first selected projects are being prepared.") : (isSpanish ? "Las nuevas oportunidades aparecerán aquí." : "New opportunities will appear here.")}</h3>
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
    <section className={`${styles.section} ${isDevelopment ? styles.developmentSection : ""} ${isAsia ? styles.asiaSection : ""}`} aria-labelledby={headingId}>
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
            <strong>{isSpanish
              ? `${slides.length} ${slides.length === 1 ? "oportunidad aprobada" : "oportunidades aprobadas"}`
              : `${slides.length} approved ${slides.length === 1 ? "opportunity" : "opportunities"}`}</strong>
            <p>{displaySummary}</p>
            {catalogueHref ? (
              <Link className={styles.catalogueLink} href={catalogueHref}>
                {isSpanish ? "Ver la colección completa" : "View the complete property collection"} <span>→</span>
              </Link>
            ) : null}
          </div>
        </div>

        <div className={styles.carousel}>
          <div className={styles.slides} aria-live="polite">
            {slides.map((slide, slideIndex) => {
              if (slideIndex !== index) return null;
              const registered = slide.accessLevel
                ? slide.accessLevel === "registered"
                : slide.visibility === "public";
              const fourPhotoProperty = !isDevelopment && !isAsia && Boolean(slide.thirdImage || slide.fourthImage);
              return (
                <article
                  className={`${styles.slide} ${isDevelopment ? styles.developmentSlide : ""} ${fourPhotoProperty ? styles.fourPhotoSlide : ""} ${styles.active}`}
                  key={slide.id}
                >
                  {isDevelopment || fourPhotoProperty ? (
                    <div className={`${styles.developmentPhotos} ${styles.developmentPhotosLeft}`}>
                      <div className={styles.imageWrap}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={slide.image}
                          alt={slide.title}
                          style={{ objectPosition: slide.imagePosition }}
                        />
                        <span className={styles.imageLabel}>
                          {isSpanish
                            ? (isDevelopment ? "Nueva promoción" : registered ? "Propiedad publicada" : "Oportunidad privada")
                            : (isDevelopment ? "New development" : registered ? "Registered listing" : "Private opportunity")}
                        </span>
                      </div>
                      {slide.secondaryImage ? (
                        <div className={styles.imageWrap}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={slide.secondaryImage} alt={`${slide.title} — second view`} />
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div
                      className={`${styles.imageGallery} ${slide.secondaryImage ? styles.twoImages : styles.singleImage}`}
                    >
                      <div className={styles.imageWrap}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={slide.image}
                          alt={slide.title}
                          style={{ objectPosition: slide.imagePosition }}
                        />
                        <span className={styles.imageLabel}>
                          {isSpanish
                            ? (registered ? "Propiedad publicada" : "Oportunidad privada")
                            : isAsia
                              ? (slide.country || "Asia property")
                              : (registered ? "Registered listing" : "Private opportunity")}
                        </span>
                      </div>
                      {slide.secondaryImage ? (
                        <div className={styles.imageWrap}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={slide.secondaryImage}
                            alt={`${slide.title} — additional view`}
                          />
                        </div>
                      ) : null}
                    </div>
                  )}

                  <div className={styles.copy}>
                    <p className={styles.count}>
                      {String(slideIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                    </p>
                    <p className={styles.location}>{slide.location}</p>
                    <h3>{slide.title}</h3>
                    {slide.visibility === "public" && slide.price && (
                      <div className={styles.priceBlock}>
                        {isAsia ? <span className={styles.priceCaption}>{slide.priceTo ? "Price range" : "Prices from"}</span> : null}
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
                    {(formatPropertyArea(slide.plotSize) || formatPropertyArea(slide.builtSize) || formatPropertyArea(slide.terraces) || Boolean(slide.bedrooms) || Boolean(slide.bathrooms)) && (
                      <dl className={styles.propertyFacts}>
                        {formatPropertyArea(slide.plotSize) ? (
                          <div>
                            <dt>{isSpanish ? "Parcela" : "Plot"}</dt>
                            <dd>{formatPropertyArea(slide.plotSize)}</dd>
                          </div>
                        ) : null}
                        {formatPropertyArea(slide.builtSize) ? (
                          <div>
                            <dt>{isSpanish ? "Construido" : "Built"}</dt>
                            <dd>{formatPropertyArea(slide.builtSize)}</dd>
                          </div>
                        ) : null}
                        {slide.bedrooms ? (
                          <div>
                            <dt>{isSpanish ? "Dormitorios" : "Bedrooms"}</dt>
                            <dd>{slide.bedrooms}</dd>
                          </div>
                        ) : null}
                        {slide.bathrooms ? (
                          <div>
                            <dt>{isSpanish ? "Baños" : "Bathrooms"}</dt>
                            <dd>{slide.bathrooms}</dd>
                          </div>
                        ) : null}
                        {formatPropertyArea(slide.terraces) ? (
                          <div>
                            <dt>{isSpanish ? "Terraza" : "Terrace"}</dt>
                            <dd>{formatPropertyArea(slide.terraces)}</dd>
                          </div>
                        ) : null}
                      </dl>
                    )}
                    {isAsia && (
                      <dl className={styles.asiaDetails}>
                        {slide.country ? <div><dt>Country</dt><dd>{slide.country}</dd></div> : null}
                        {slide.setting ? <div><dt>Setting</dt><dd>{slide.setting}</dd></div> : null}
                        {slide.views ? <div><dt>Views</dt><dd>{slide.views}</dd></div> : null}
                        <div><dt>Build status</dt><dd>{slide.propertyType || "New build"}</dd></div>
                        {slide.yearOfConstruction ? <div><dt>Completion</dt><dd>{slide.yearOfConstruction}</dd></div> : null}
                        {slide.developer ? <div><dt>Developer</dt><dd>{slide.developer}</dd></div> : null}
                        {slide.salesAgent ? <div><dt>Sales agent</dt><dd>{slide.salesAgent}</dd></div> : null}
                      </dl>
                    )}
                    <p className={styles.description}>
                      {isSpanish
                        ? registered && directPublicListings
                          ? "Consulte la presentación completa de la promoción y contacte con PF EuroAsia para conocer la disponibilidad, los precios y obtener más información."
                          : isDevelopment
                          ? "Consulte las fotografías, el rango de precios y todos los detalles de la promoción sin registrarse. Envíe una consulta cuando desee conocer la disponibilidad actual u obtener más información."
                          : registered
                          ? "Consulte las fotografías ampliadas y todos los detalles de la propiedad sin registrarse. Solo deberá registrarse si desea descargar el folleto en PDF."
                          : "Esta es una oportunidad privada u off-market. Los detalles completos se facilitan tras una solicitud detallada y la aprobación de PF EuroAsia."
                        : isAsia
                        ? "Open the full presentation for further photographs and project information, then enquire for current availability, floor plans and the latest prices."
                        : registered && directPublicListings
                        ? "View the complete development presentation, then contact the PF EuroAsia Asia desk for current availability, pricing and further information."
                        : isDevelopment
                        ? "View the photographs, price range and full development details without registering. Enquire only when you would like current availability or further information."
                        : registered
                        ? "View the larger photographs and full property details without registering. Registration is only required when you download a brochure PDF."
                        : "This is a private or off-market introduction. Full particulars are disclosed only after a detailed client application and PF EuroAsia approval."}
                    </p>
                    <Link
                      className="button button-gold"
                      tabIndex={slideIndex === index ? undefined : -1}
                      href={
                        isDevelopment || registered
                          ? `/properties/${slide.id}`
                          : "/private-portfolio"
                      }
                    >
                      {isSpanish
                        ? isDevelopment
                          ? "Ver promoción completa"
                          : registered
                            ? "Ver todos los detalles"
                            : "Solicitar acceso privado"
                        : isAsia && registered
                          ? "View full Asia listing"
                        : isDevelopment
                          ? "View full development"
                          : registered
                            ? "View full details"
                            : "Request private access"} <span>→</span>
                    </Link>
                  </div>

                  {isDevelopment || fourPhotoProperty ? (
                    <div className={`${styles.developmentPhotos} ${styles.developmentPhotosRight}`}>
                      {slide.thirdImage ? (
                        <div className={styles.imageWrap}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={slide.thirdImage} alt={`${slide.title} — third view`} />
                        </div>
                      ) : null}
                      {slide.fourthImage ? (
                        <div className={styles.imageWrap}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={slide.fourthImage} alt={`${slide.title} — fourth view`} />
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>

          {slides.length > 1 && (
            <div className={styles.controls}>
              <div className={styles.arrows}>
                <button type="button" onClick={() => move(-1)} aria-label={isSpanish ? "Propiedad anterior" : "Previous property"}>←</button>
                <button type="button" onClick={() => move(1)} aria-label={isSpanish ? "Propiedad siguiente" : "Next property"}>→</button>
              </div>

              <div className={styles.thumbnails} aria-label={isSpanish ? "Elegir una propiedad" : "Choose a property"}>
                {slides.map((slide, thumbnailIndex) => (
                  <button
                    type="button"
                    className={`${styles.thumbnail} ${thumbnailIndex === index ? styles.activeThumbnail : ""}`}
                    onClick={() => setIndex(thumbnailIndex)}
                    aria-label={`${isSpanish ? "Mostrar propiedad" : "Show property"} ${thumbnailIndex + 1}: ${slide.title}`}
                    aria-current={thumbnailIndex === index ? "true" : undefined}
                    key={slide.id}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.image}
                      alt=""
                      loading="lazy"
                      style={{ objectPosition: slide.imagePosition }}
                    />
                    <span>{String(thumbnailIndex + 1).padStart(2, "0")}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isDevelopment && portfolioValueMillions && portfolioValueMillions > 0 ? (
            <p className={styles.portfolioValue}>
              {isSpanish ? "Actualmente representamos más de " : "Currently representing more than "}<strong>€{portfolioValueMillions} {isSpanish ? "millones" : "million"}</strong>{isSpanish ? " en villas de comercialización privada." : " in privately listed villas."}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
