import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://pfeuroasia.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Luxury Property Marbella & Asia | Property Facilitators EuroAsia",
    template: "%s | Property Facilitators EuroAsia",
  },
  description:
    "Independent luxury property advisers connecting qualified buyers and property owners across Marbella, La Zagaleta, El Madroñal, Malaysia and Asia.",
  applicationName: "Property Facilitators EuroAsia",
  authors: [{ name: "Property Facilitators EuroAsia", url: siteUrl }],
  creator: "Property Facilitators EuroAsia",
  publisher: "Property Facilitators EuroAsia",
  category: "Real Estate",
  keywords: [
    "Marbella luxury property",
    "La Zagaleta property",
    "El Madroñal villas",
    "Costa del Sol luxury real estate",
    "Spain property for Asian buyers",
    "Malaysia Spain property",
    "international property brokerage",
    "off-market Marbella property",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "zh-CN": "/zh",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["zh_CN"],
    url: siteUrl,
    siteName: "Property Facilitators EuroAsia",
    title: "Luxury Property Marbella & Asia | Property Facilitators EuroAsia",
    description:
      "Independent luxury property representation connecting Southern Spain with qualified buyers, owners and professional networks across Asia.",
    images: [
      {
        url: "/images/hero-villa.webp",
        width: 1200,
        height: 630,
        alt: "Luxury villa represented by Property Facilitators EuroAsia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Facilitators EuroAsia",
    description:
      "Independent luxury property representation between Marbella, Southern Spain and Asia.",
    images: ["/images/hero-villa.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Property Facilitators EuroAsia",
  url: siteUrl,
  logo: `${siteUrl}/images/pf-gold-symbol.png`,
  image: `${siteUrl}/images/hero-villa.webp`,
  email: "enquiry@pfeuroasia.com",
  description:
    "Independent luxury property advisers connecting Southern Spain and Asia.",
  areaServed: [
    { "@type": "Place", name: "Marbella" },
    { "@type": "Place", name: "La Zagaleta" },
    { "@type": "Place", name: "El Madroñal" },
    { "@type": "Country", name: "Spain" },
    { "@type": "Country", name: "Malaysia" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Office Tower, Financial Park Labuan Complex, Jalan Merdeka",
    postalCode: "87000",
    addressLocality: "Labuan",
    addressCountry: "MY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
