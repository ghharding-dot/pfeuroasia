"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import news from "../data/spain-property-news.json";
import styles from "./SpainPropertyNews.module.css";

function subscribeToMotionPreference(callback: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function dateLabel(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Madrid",
  }).format(new Date(`${value}T12:00:00Z`));
}

export function SpainPropertyNews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const touchStart = useRef<number | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeToMotionPreference, prefersReducedMotion, () => true);
  const items = news.items;
  const rotating = !paused && !hovered && !focused && !reducedMotion && items.length > 1;

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % items.length);
    }, 15_000);
    return () => window.clearInterval(timer);
  }, [rotating, items.length]);

  function move(direction: number) {
    setIndex((current) => (current + direction + items.length) % items.length);
  }

  if (!items.length) return null;

  return (
    <section
      className={styles.section}
      id="spain-property-news"
      aria-labelledby="spain-news-heading"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="site-shell">
        <div className={styles.heading}>
          <div>
            <p className="eyebrow">From the property desk</p>
            <h2 id="spain-news-heading">Spain Property <em>News.</em></h2>
          </div>
          <div className={styles.intro}>
            <p>Selected developments, investment and market updates from Marbella, the Costa del Sol and beyond.</p>
            <span>Reviewed <time dateTime={news.updatedAt}>{dateLabel(news.updatedAt)}</time> · Updated fortnightly</span>
          </div>
        </div>

        <div
          className={styles.stage}
          aria-live={rotating ? "off" : "polite"}
          onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
          onTouchEnd={(event) => {
            const end = event.changedTouches[0]?.clientX;
            if (touchStart.current !== null && end !== undefined && Math.abs(end - touchStart.current) > 60) {
              move(end < touchStart.current ? 1 : -1);
            }
            touchStart.current = null;
          }}
        >
          {items.map((item, itemIndex) => (
            <article
              className={styles.card}
              hidden={itemIndex !== index}
              key={item.id}
              aria-roledescription="slide"
              aria-label={`${itemIndex + 1} of ${items.length}`}
            >
              <div className={styles.feature}>
                <span className={styles.category}>{item.category}</span>
                <strong>{item.figure}</strong>
                <span className={styles.figureLabel}>{item.figureLabel}</span>
                <span className={styles.location}>{item.location}</span>
              </div>
              <div className={styles.copy}>
                <div className={styles.meta}>
                  <time dateTime={item.date}>{dateLabel(item.date)}</time>
                  <span>{String(itemIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <span className={styles.status}>{item.status}</span>
                <a className={styles.source} href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                  Read the source <span aria-hidden="true">↗</span>
                  <small>{item.source}<span className={styles.srOnly}> (opens in a new tab)</span></small>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.controls}>
          <div className={styles.pagination} aria-label="Choose a news clip">
            {items.map((item, itemIndex) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setIndex(itemIndex)}
                aria-label={`Show news ${itemIndex + 1}: ${item.title}`}
                aria-current={index === itemIndex ? "true" : undefined}
              >
                <span>{String(itemIndex + 1).padStart(2, "0")}</span>
                <span className={styles.clipTitle}>{item.title}</span>
              </button>
            ))}
          </div>
          <div className={styles.buttons}>
            <button type="button" onClick={() => move(-1)} aria-label="Previous news clip">←</button>
            {!reducedMotion && items.length > 1 ? (
              <button type="button" className={styles.pause} onClick={() => setPaused(!paused)} aria-pressed={paused}>
                {paused ? "Resume" : "Pause"}
              </button>
            ) : null}
            <button type="button" onClick={() => move(1)} aria-label="Next news clip">→</button>
          </div>
        </div>
        <div className={styles.footer}>
          <span>Brief summaries by PF EuroAsia · Full reporting at the original source</span>
          <Link href="/enquire?interest=spain-property">Discuss Spain property with us <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
