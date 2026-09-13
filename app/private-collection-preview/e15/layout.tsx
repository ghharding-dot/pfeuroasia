import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Collection Preview · La Zagaleta",
  description: "A private draft presentation for an exceptional La Zagaleta residence.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function PrivateCollectionE15Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
