import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { PrivatePropertyCard, type PrivatePropertyDisplay } from "../../components/PrivatePropertyCard";
import {
  createPortfolioToken,
  PORTFOLIO_COOKIE_NAME,
} from "../../lib/portfolioAuth";
import { readProperties, type VaultProperty } from "../../lib/propertyStore";
import { privateProperties } from "./properties";
import "../private-portfolio.css";
import "../portfolio-collection.css";

export const metadata: Metadata = {
  title: "Private Property Collection | Property Facilitators EuroAsia",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PrivatePortfolioCollectionPage() {
  const configuredPassword = process.env.PRIVATE_PORTFOLIO_PASSWORD;
  const cookieStore = await cookies();
  const accessCookie = cookieStore.get(PORTFOLIO_COOKIE_NAME)?.value;

  if (!configuredPassword || accessCookie !== createPortfolioToken(configuredPassword)) {
    redirect("/private-portfolio/access");
  }

  let vaultProperties: VaultProperty[] = [];
  try {
    vaultProperties = (await readProperties()).filter((property) => property.status === "published");
  } catch {
    vaultProperties = [];
  }

  const existingReferences = new Set(vaultProperties.map((property) => property.reference));
  const properties: PrivatePropertyDisplay[] = [
    ...vaultProperties,
    ...privateProperties.filter((property) => !existingReferences.has(property.reference)),
  ];

  return (
    <main className="private-collection-page">
      <Header />
      <section className="private-collection-hero">
        <div className="site-shell">
          <p className="eyebrow light">Approved client access</p>
          <h1>Private Property Collection</h1>
          <p>Selected opportunities shared confidentially with registered and approved clients.</p>
        </div>
      </section>

      <section className="private-collection-grid site-shell">
        {properties.map((property) => (
          <PrivatePropertyCard property={property} key={property.reference} />
        ))}
      </section>
      <Footer />
    </main>
  );
}
