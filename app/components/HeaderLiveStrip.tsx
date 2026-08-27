"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import styles from "./HeaderLiveStrip.module.css";

type WeatherPayload = {
  stockholm: number | null;
  marbella: number | null;
  kualaLumpur: number | null;
};

const languages = [
  { href: "/", flagSrc: "/images/flags/gb.svg", label: "English", prefix: "/" },
  { href: "/es", flagSrc: "/images/flags/es.svg", label: "Español", prefix: "/es" },
  { href: "/ar", flagSrc: "/images/flags/sa.svg", label: "العربية", prefix: "/ar" },
  { href: "/zh", flagSrc: "/images/flags/cn.svg", label: "中文", prefix: "/zh" },
  { href: "/da", flagSrc: "/images/flags/dk.svg", label: "Dansk", prefix: "/da" },
] as const;

function formatTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function HeaderLiveStrip() {
  const [now, setNow] = useState<Date | null>(null);
  const [weather, setWeather] = useState<WeatherPayload>({
    stockholm: null,
    marbella: null,
    kualaLumpur: null,
  });

  useEffect(() => {
    const initialClock = window.setTimeout(() => setNow(new Date()), 0);

    const clockTimer = window.setInterval(() => setNow(new Date()), 30_000);

    const loadWeather = async () => {
      try {
        const response = await fetch("/api/header-weather", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as WeatherPayload;
        setWeather(data);
      } catch {
        // Keep the time display available even if weather is temporarily unavailable.
      }
    };

    void loadWeather();
    const weatherTimer = window.setInterval(loadWeather, 10 * 60 * 1000);

    return () => {
      window.clearTimeout(initialClock);
      window.clearInterval(clockTimer);
      window.clearInterval(weatherTimer);
    };
  }, []);

  const times = useMemo(() => {
    if (!now) return { stockholm: "--:--", marbella: "--:--", kualaLumpur: "--:--" };

    return {
      stockholm: formatTime(now, "Europe/Stockholm"),
      marbella: formatTime(now, "Europe/Madrid"),
      kualaLumpur: formatTime(now, "Asia/Kuala_Lumpur"),
    };
  }, [now]);

  return (
    <div className={styles.strip} role="region" aria-label="Current time and temperature in Stockholm, Sweden; Marbella, Spain; and Kuala Lumpur, Malaysia">
      <div className={`site-shell ${styles.inner}`}>
        <div className={styles.location}>
          <strong>Stockholm<span className={styles.country}>, Sweden</span></strong>
          <span className={styles.time}>{times.stockholm}</span>
          <span className={styles.temperature}>{weather.stockholm === null ? "--°C" : `${weather.stockholm}°C`}</span>
        </div>

        <span className={styles.divider} aria-hidden="true" />

        <div className={styles.location}>
          <strong>Marbella<span className={styles.country}>, Spain</span></strong>
          <span className={styles.time}>{times.marbella}</span>
          <span className={styles.temperature}>{weather.marbella === null ? "--°C" : `${weather.marbella}°C`}</span>
        </div>

        <span className={styles.divider} aria-hidden="true" />

        <div className={styles.location}>
          <strong>Kuala Lumpur<span className={styles.country}>, Malaysia</span></strong>
          <span className={styles.time}>{times.kualaLumpur}</span>
          <span className={styles.temperature}>{weather.kualaLumpur === null ? "--°C" : `${weather.kualaLumpur}°C`}</span>
        </div>

        <span className={styles.attribution}>Weather data: MET Norway</span>
      </div>
    </div>
  );
}

export function LanguageFlagBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.languageBar} aria-label="Choose website language">
      <div className={`site-shell ${styles.languageInner}`}>
        {languages.map((language) => {
          const active = language.prefix === "/"
            ? !languages.slice(1).some((item) => pathname.startsWith(item.prefix))
            : pathname.startsWith(language.prefix);

          return (
            <Link
              className={`${styles.flagButton} ${active ? styles.activeFlag : ""}`}
              href={language.href}
              aria-label={language.label}
              aria-current={active ? "page" : undefined}
              title={language.label}
              key={language.href}
            >
              <img
                className={styles.flagImage}
                src={language.flagSrc}
                alt=""
                aria-hidden="true"
              />
              <span className={styles.visuallyHidden}>{language.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
