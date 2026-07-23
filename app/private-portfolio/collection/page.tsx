import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  createPortfolioToken,
  PORTFOLIO_COOKIE_NAME,
} from "../../lib/portfolioAuth";
import { privateProperties } from "./properties";
import "../private-portfolio.css";

export const metadata: Metadata = {
  title: "Private Property Collection | Property Facilitators EuroAsia",
  robots: { index: false, follow: false },
};

export default async function PrivatePortfolioCollectionPage() {
  const configuredPassword = process.env.PRIVATE_PORTFOLIO_PASSWORD;
  const cookieStore = await cookies();
  const accessCookie = cookieStore.get(PORTFOLIO_COOKIE_NAME)?.value;

  if (!configuredPassword || accessCookie !== createPortfolioToken(configuredPassword)) {
    redirect("/private-portfolio/access");
  }

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
        {privateProperties.map((property) => (
          <article className="private-property-card" key={property.reference}>
            <div className="private-property-image placeholder-image">
              <span>Property photography to be added</span>
            </div>
            <div className="private-property-content">
              <div className="private-property-heading">
                <div>
                  <p>{property.reference} · {property.location}</p>
                  <h2>{property.title}</h2>
                </div>
                <strong>{property.price}</strong>
              </div>

              <div className="private-property-facts">
                <span>{property.bedrooms} bedrooms</span>
                <span>{property.bathrooms} bathrooms</span>
                <span>{property.builtSize} built</span>
                <span>{property.plotSize} plot</span>
              </div>

              <p className="private-property-description">{property.description}</p>

              <div className="private-property-actions">
                <span className="brochure-pending">PDF information sheet to follow</span>
                <a className="text-link" href={`mailto:enquiry@pfeuroasia.com?subject=Enquiry regarding ${property.reference}`}>
                  Enquire about this property <span>→</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
      <Footer />
    </main>
  );
}
