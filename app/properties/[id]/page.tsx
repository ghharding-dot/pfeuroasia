import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { PrivatePropertyCard } from "../../components/PrivatePropertyCard";
import {
  imageObjectPosition,
  normalizePropertyAccessLevel,
  readProperties,
} from "../../lib/propertyStore";
import {
  REGISTERED_PROPERTY_COOKIE_NAME,
  verifyRegisteredPropertySession,
} from "../../lib/registeredPropertyAuth";
import "../registered-property.css";
import "../../private-portfolio/portfolio-collection.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const properties = await readProperties();
  const property = properties.find((item) => item.id === id && item.status === "published");
  const isDevelopment = property?.listingType === "new-development";

  return {
    title: property
      ? `${property.title} | Property Facilitators EuroAsia`
      : "Property Details | Property Facilitators EuroAsia",
    description: property?.description || "View current property details and availability through Property Facilitators EuroAsia.",
    robots: isDevelopment
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}

export default async function RegisteredPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const properties = await readProperties();
  const property = properties.find(
    (item) =>
      item.id === id &&
      item.status === "published" &&
      (item.listingType === "new-development"
        ? (item.visibility === "public" || item.visibility === "teaser") &&
          item.publicImageApproved === true
        : normalizePropertyAccessLevel(item.accessLevel, item.visibility) === "registered"),
  );

  if (!property) notFound();

  const isDevelopment = property.listingType === "new-development";

  const cookieStore = isDevelopment ? null : await cookies();
  const session = isDevelopment
    ? null
    : verifyRegisteredPropertySession(
        cookieStore?.get(REGISTERED_PROPERTY_COOKIE_NAME)?.value,
      );

  if (!isDevelopment && !session) redirect(`/properties/${property.id}/access`);

  const locationKey = (property.approximateLocation || property.location)
    .split(",")[0]
    .trim()
    .toLowerCase();
  const similarProperties = properties
    .filter(
      (item) =>
        item.id !== property.id &&
        item.status === "published" &&
        (isDevelopment
          ? item.listingType === "new-development" &&
            (item.visibility === "public" || item.visibility === "teaser") &&
            item.publicImageApproved === true
          : normalizePropertyAccessLevel(item.accessLevel, item.visibility) === "registered"),
    )
    .sort((left, right) => {
      const leftMatches = (left.approximateLocation || left.location).toLowerCase().includes(locationKey);
      const rightMatches = (right.approximateLocation || right.location).toLowerCase().includes(locationKey);
      return Number(rightMatches) - Number(leftMatches);
    })
    .slice(0, 3);

  return (
    <main className="registered-property-page">
      <Header />

      <section className="registered-property-hero site-shell">
        <div className="registered-property-notice">
          <div>
            <strong>{isDevelopment ? "New development · Open listing" : "Verified registered-listing access"}</strong>
            <p>
              {isDevelopment
                ? "View the complete development presentation without registering. Enquire when you would like current availability, floor plans or further information."
                : `Signed in as ${session?.fullName}. This access covers general registered listings for 30 days. Private off-market opportunities require a separate application and approval.`}
            </p>
          </div>
          <Link className="button button-gold" href={isDevelopment ? "/#new-developments-heading" : "/private-portfolio"}>
            {isDevelopment ? "Back to developments" : "Explore Private Collection"} <span>→</span>
          </Link>
        </div>
      </section>

      <section className="private-collection-grid registered-property-grid site-shell">
        <PrivatePropertyCard
          property={property}
          brochureMode="enquiry"
          detailMode
          enquiryHref={isDevelopment ? `/enquire?property=${encodeURIComponent(property.id)}` : undefined}
          enquiryLabel={isDevelopment ? "Enquire about this development" : undefined}
        />
      </section>

      {similarProperties.length > 0 && (
        <section className="registered-similar site-shell">
          <div className="registered-similar-heading">
            <div>
              <p className="eyebrow">Curated alternatives</p>
              <h2>Similar properties</h2>
            </div>
            <p>Comparable homes selected by area, access level and current availability.</p>
          </div>
          <div className="registered-similar-grid">
            {similarProperties.map((item) => (
              <Link className="registered-similar-card" href={`/properties/${item.id}`} key={item.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={`${item.title} in ${item.approximateLocation || item.location}`}
                  style={{ objectPosition: imageObjectPosition(item.imagePosition) }}
                />
                <div>
                  <span>{item.approximateLocation || item.location}</span>
                  <h3>{item.title}</h3>
                  <strong>{item.price || "Price on application"}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
