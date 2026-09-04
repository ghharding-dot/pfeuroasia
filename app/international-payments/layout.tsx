import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "International Currency Transfers | Estuary FX Partner",
  description: "Specialist property, personal and business currency transfers between Spain, Europe, Dubai, the UAE and Asia through our Estuary FX collaboration.",
  alternates: { canonical: "/international-payments" },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
