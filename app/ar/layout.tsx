import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "عقارات فاخرة في ماربيا وإسبانيا للعملاء السعوديين",
  description:
    "استشارات وتمثيل خاص للعملاء في المملكة العربية السعودية ودول الخليج لشراء وبيع العقارات الفاخرة في ماربيا ولا زاغاليتا وإل مادرونيال وجنوب إسبانيا.",
  alternates: {
    canonical: "/ar",
    languages: {
      "en-GB": "/",
      "zh-CN": "/zh",
      "ar-SA": "/ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    alternateLocale: ["en_GB", "zh_CN"],
    url: "/ar",
    title: "عقارات فاخرة في إسبانيا | Property Facilitators EuroAsia",
    description:
      "تمثيل عقاري مستقل وسري يربط العملاء السعوديين بأفضل فرص ماربيا وجنوب إسبانيا.",
    images: [
      {
        url: "/images/hero-villa.webp",
        width: 1200,
        height: 630,
        alt: "فيلا فاخرة في ماربيا وجنوب إسبانيا",
      },
    ],
  },
};

export default function ArabicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
