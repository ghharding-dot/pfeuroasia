import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "International ejendomsrådgivning mellem Europa og Asien",
  description: "Uafhængig rådgivning om luksusejendomme, relocation, ophold og virksomhedsudvidelse i Spanien, Malaysia og Asien for danske og skandinaviske kunder.",
  alternates: {
    canonical: "/da",
    languages: { "en-GB": "/", "da-DK": "/da", "zh-CN": "/zh", "ar-SA": "/ar" },
  },
  openGraph: {
    locale: "da_DK",
    url: "/da",
    title: "Property Facilitators EuroAsia – Dansk",
    description: "Personlig, international ejendomsrådgivning mellem Europa og Asien.",
  },
};

export default function DanishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="da">{children}</div>;
}
