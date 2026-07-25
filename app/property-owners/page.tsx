import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { OwnerListingSection } from "../components/OwnerListingSection";

export const metadata: Metadata = {
  title: "Sell Your Property Internationally | Property Facilitators EuroAsia",
  description:
    "Present prime Marbella property to selected high-net-worth buyers and renters across Asia and the Middle East through confidential international representation.",
};

export default function PropertyOwnersPage() {
  return (
    <main>
      <Header />
      <OwnerListingSection />
      <Footer />
    </main>
  );
}
