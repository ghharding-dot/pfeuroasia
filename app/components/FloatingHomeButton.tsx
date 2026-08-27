"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./FloatingHomeButton.module.css";

const localeHomes = {
  es: { href: "/es", label: "Inicio" },
  da: { href: "/da", label: "Hjem" },
  zh: { href: "/zh", label: "首页" },
  ar: { href: "/ar", label: "الرئيسية" },
} as const;

export function FloatingHomeButton() {
  const pathname = usePathname() || "/";
  const firstSegment = pathname.split("/")[1] as keyof typeof localeHomes;
  const destination = localeHomes[firstSegment] ?? { href: "/", label: "Home" };
  const isHomepage = pathname === destination.href || pathname === `${destination.href}/`;
  const isPrivateArea = pathname.startsWith("/vault") || pathname.startsWith("/collaborators");

  if (isHomepage || isPrivateArea) return null;

  return (
    <Link
      href={destination.href}
      className={styles.button}
      aria-label={`Return to ${destination.label.toLowerCase()}`}
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m3 11 9-8 9 8" />
        <path d="M5.5 9.5V21h13V9.5" />
        <path d="M9.5 21v-7h5v7" />
      </svg>
      <span>{destination.label}</span>
    </Link>
  );
}
