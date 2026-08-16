import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { OwnerListingSection } from "../components/OwnerListingSection";
import { createMetadata } from "../lib/seo";

export const metadata = createMetadata("ownersEn");

export default function PropertyOwnersPage() {
  return (
    <main>
      <Header />
      <OwnerListingSection />
      <Footer />
    </main>
  );
}
