"use client";

import { useEffect, useMemo, useState } from "react";
import type { RentalVilla } from "../lib/rentalVillaStore";
import styles from "./RentalVillaCarousel.module.css";

type Props = {
  villas: RentalVilla[];
};

const FALLBACK_GBP_RATES = { EUR: 1.16, USD: 1.35 };

function priceAmount(value?: string) {
  if (!value) return undefined;
  const amount = Number(value.replace(/[^0-9]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? amount : undefined;
}

function formatCurrency(amount: number, currency: "GBP" | "EUR" | "USD") {
  return new Intl.NumberFormat(currency === "USD" ? "en-US" : "en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function priceRange(
  from: number | undefined,
  to: number | undefined,
  currency: "GBP" | "EUR" | "USD",
) {
  if (from && to) return `${formatCurrency(from, currency)} – ${formatCurrency(to, currency)}`;
  if (from || to) return `From ${formatCurrency(from || to || 0, currency)}`;
  return "";
}

function amenities(value?: string) {
  return String(value || "")
    .split(/,|\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function RentalVillaCarousel({ villas }: Props) {
  const [active, setActive] = useState(0);
  const [photoSet, setPhotoSet] = useState(0);
  const [gbpRates, setGbpRates] = useState(FALLBACK_GBP_RATES);
  const current = villas[active];
  const currentAmenities = useMemo(() => amenities(current?.amenities), [current]);
  const currentImages = useMemo(
    () =>
      Array.from(
        new Set(
          [
            ...(current?.galleryImages || []),
            current?.image,
            current?.secondaryImage,
            current?.thirdImage,
            current?.fourthImage,
          ].filter((image): image is string => Boolean(image)),
        ),
      ).slice(0, 8),
    [current],
  );
  const photoSetCount = Math.max(1, Math.ceil(currentImages.length / 4));
  const visibleImages = Array.from(
    { length: 4 },
    (_, index) => {
      const imageIndex = currentImages.length
        ? (photoSet * 4 + index) % currentImages.length
        : 0;
      return { src: currentImages[imageIndex] || "", number: imageIndex + 1 };
    },
  );

  useEffect(() => {
    if (villas.length < 2) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % villas.length),
      8000,
    );
    return () => window.clearInterval(timer);
  }, [villas.length]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.frankfurter.app/latest?from=GBP&to=EUR,USD", {
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        const EUR = Number(data?.rates?.EUR);
        const USD = Number(data?.rates?.USD);
        if (Number.isFinite(EUR) && EUR > 0 && Number.isFinite(USD) && USD > 0) {
          setGbpRates({ EUR, USD });
        }
      })
      .catch(() => {
        // Approximate fallbacks keep the conversion visible if live rates are unavailable.
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setPhotoSet(0);
  }, [active]);

  if (!current) return null;

  const amountFrom = priceAmount(current.priceFrom);
  const amountTo = priceAmount(current.priceTo);
  const sterlingPrice = priceRange(amountFrom, amountTo, "GBP");
  const euroPrice = priceRange(
    amountFrom ? amountFrom * gbpRates.EUR : undefined,
    amountTo ? amountTo * gbpRates.EUR : undefined,
    "EUR",
  );
  const dollarPrice = priceRange(
    amountFrom ? amountFrom * gbpRates.USD : undefined,
    amountTo ? amountTo * gbpRates.USD : undefined,
    "USD",
  );

  const bookingHref =
    "/luxury-villa-rentals?villa=" +
    encodeURIComponent(current.reference) +
    "#villa-enquiry";

  function move(direction: number) {
    setActive((index) => (index + direction + villas.length) % villas.length);
  }

  function movePhotos(direction: number) {
    setPhotoSet((index) => (index + direction + photoSetCount) % photoSetCount);
  }

  return (
    <section className={styles.section} aria-labelledby="rental-villa-selection">
      <div className={"site-shell " + styles.shell}>
        <div className={styles.heading}>
          <p>A private collection</p>
          <h2 id="rental-villa-selection">A Selection of Villas from Luxury Villa Collection</h2>
        </div>

        <article className={styles.carousel}>
          <div className={styles.imageColumn}>
            <a href={bookingHref} aria-label={"Enquire about " + current.title}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={visibleImages[0].src} alt={current.title + " photograph " + visibleImages[0].number} />
            </a>
            <a href={bookingHref} aria-label={"Enquire about " + current.title}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={visibleImages[1].src} alt={current.title + " photograph " + visibleImages[1].number} />
            </a>
          </div>

          <div className={styles.details}>
            <div>
              <div className={styles.topline}>
                <span>{String(active + 1).padStart(2, "0")} / {String(villas.length).padStart(2, "0")}</span>
                <strong>{current.reference}</strong>
              </div>
              {photoSetCount > 1 && (
                <div className={styles.photoNavigation} aria-label="Villa photographs">
                  <button type="button" onClick={() => movePhotos(-1)} aria-label="Previous four photographs">←</button>
                  <span>Photos {photoSet * 4 + 1}–{Math.min(photoSet * 4 + 4, currentImages.length)} of {currentImages.length}</span>
                  <button type="button" onClick={() => movePhotos(1)} aria-label="Next four photographs">→</button>
                </div>
              )}
              <p className={styles.location}>{current.location}</p>
              <h3>{current.title}</h3>
              <div className={styles.priceBlock}>
                <p className={styles.price}>{sterlingPrice ? `${sterlingPrice} per week` : "Price on request"}</p>
                {sterlingPrice && (
                  <p className={styles.priceConversions}>
                    <span>Approx. {euroPrice}</span>
                    <span>Approx. {dollarPrice}</span>
                    <small>Indicative live conversion. The rental is quoted and payable in pounds sterling.</small>
                  </p>
                )}
              </div>
              <dl className={styles.facts}>
                <div><dt>Bedrooms</dt><dd>{current.bedrooms || "—"}</dd></div>
                <div><dt>Bathrooms</dt><dd>{current.bathrooms || "—"}</dd></div>
                <div><dt>Sleeps</dt><dd>{current.guests || "—"}</dd></div>
              </dl>
              <p className={styles.description}>{current.description}</p>
              {currentAmenities.length > 0 && (
                <details className={styles.amenities}>
                  <summary>Amenities <span>＋</span></summary>
                  <div>{currentAmenities.map((amenity) => <span key={amenity}>{amenity}</span>)}</div>
                </details>
              )}
            </div>
            <a className={styles.button} href={bookingHref}>
              Request this villa <span>→</span>
            </a>
          </div>

          <div className={styles.imageColumn}>
            <a href={bookingHref} aria-label={"Enquire about " + current.title}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={visibleImages[2].src} alt={current.title + " photograph " + visibleImages[2].number} />
            </a>
            <a href={bookingHref} aria-label={"Enquire about " + current.title}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={visibleImages[3].src} alt={current.title + " photograph " + visibleImages[3].number} />
            </a>
          </div>
        </article>

        {villas.length > 1 && (
          <div className={styles.controls}>
            <button type="button" onClick={() => move(-1)} aria-label="Previous villa">←</button>
            <div role="tablist" aria-label="Choose villa">
              {villas.map((villa, index) => (
                <button
                  aria-label={"Show " + villa.title}
                  aria-selected={index === active}
                  className={index === active ? styles.active : ""}
                  key={villa.id}
                  onClick={() => setActive(index)}
                  role="tab"
                  type="button"
                />
              ))}
            </div>
            <button type="button" onClick={() => move(1)} aria-label="Next villa">→</button>
          </div>
        )}
      </div>
    </section>
  );
}
