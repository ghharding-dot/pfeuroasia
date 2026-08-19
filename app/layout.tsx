import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "./premium-buttons.css";
import "./news-ticker.css";
import "./europe-asia-image.css";
import "./horizontal-overflow-fix.css";
import "./homepage-refinement.css";
import "./malaysia-hero-fix.css";

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

const siteUrl = "https://www.pfeuroasia.com";

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
    "Saudi buyers Spain property",
    "international property brokerage",
    "off-market Marbella property",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["zh_CN", "ar_SA", "da_DK"],
    url: siteUrl,
    siteName: "Property Facilitators EuroAsia",
    title: "Luxury Property Marbella & Asia | Property Facilitators EuroAsia",
    description:
      "Independent luxury property representation connecting Southern Spain with qualified buyers, owners and professional networks across Asia and the Middle East.",
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
      "Independent luxury property representation between Marbella, Southern Spain, the Middle East and Asia.",
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
    "Independent luxury property advisers connecting Southern Spain, the Middle East and Asia.",
  areaServed: [
    { "@type": "Place", name: "Marbella" },
    { "@type": "Place", name: "La Zagaleta" },
    { "@type": "Place", name: "El Madroñal" },
    { "@type": "Country", name: "Spain" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "Malaysia" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Level 11(A), Main Office Tower, Financial Park Labuan",
    addressLocality: "Labuan",
    addressCountry: "MY",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Property Facilitators EuroAsia",
  alternateName: "PF EuroAsia",
  url: siteUrl,
  inLanguage: ["en-GB", "da-DK", "zh-CN", "ar-SA"],
  publisher: {
    "@type": "Organization",
    name: "Property Facilitators EuroAsia",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0VQLJGS9M2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0VQLJGS9M2');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
