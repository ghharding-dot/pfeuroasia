import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { PrivatePropertyCard, type PrivatePropertyDisplay } from "../../components/PrivatePropertyCard";
import {
  PORTFOLIO_COOKIE_NAME,
  verifyPrivateClientSession,
} from "../../lib/portfolioAuth";
import { findPrivateClientById } from "../../lib/privateClientStore";
import {
  normalizePropertyAccessLevel,
  readProperties,
  type VaultProperty,
} from "../../lib/propertyStore";
import { privateProperties } from "./properties";
import "../private-portfolio.css";
import "../portfolio-collection.css";
import "../client-access.css";

export const metadata: Metadata = {
  title: "Private Property Collection",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PrivatePortfolioCollectionPage() {
  const cookieStore = await cookies();
  const session = verifyPrivateClientSession(
    cookieStore.get(PORTFOLIO_COOKIE_NAME)?.value,
  );

  if (!session) {
    redirect("/private-portfolio/access");
  }

  const client = await findPrivateClientById(session.clientId);
  if (
    !client ||
    client.status !== "approved" ||
    client.email !== session.email
  ) {
    redirect("/private-portfolio/access");
  }

  let vaultProperties: VaultProperty[] = [];
  try {
    vaultProperties = (await readProperties()).filter(
      (property) =>
        property.status === "published" &&
        normalizePropertyAccessLevel(property.accessLevel, property.visibility) === "private",
    );
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
          <p className="eyebrow light">Approved private access</p>
          <h1>Private Off-Market Collection</h1>
          <p>Genuine private and off-market opportunities shared only with individually approved clients.</p>
          <small className="private-client-session-label">Access approved for {client.fullName}</small>
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
