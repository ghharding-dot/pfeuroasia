import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "International Transfers & Business Finance | Estuary FX",
  description: "International property, rental and relocation transfers, currency exchange and trade or invoice finance introductions through Estuary FX.",
  alternates: { canonical: "/international-payments" },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
