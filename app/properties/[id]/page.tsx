import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { PrivatePropertyCard } from "../../components/PrivatePropertyCard";
import {
  imageObjectPosition,
  normalizePropertyAccessLevel,
  readProperties,
} from "../../lib/propertyStore";
import { SITE_URL } from "../../lib/seo";
import "../registered-property.css";
import "../../private-portfolio/portfolio-collection.css";

export const dynamic = "force-dynamic";

function metadataDescription(value?: string) {
  const normalized = (value || "View current property details and availability through Property Facilitators EuroAsia.")
    .replace(/\s+/g, " ")
    .trim();
  if (normalized.length <= 160) return normalized;
  const shortened = normalized.slice(0, 157).replace(/\s+\S*$/, "");
  return `${shortened}…`;
}

function absoluteUrl(value: string) {
  return /^https?:\/\//i.test(value)
    ? value
    : `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function numericMeasurement(value?: string) {
  const match = value?.replace(/,/g, "").match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const properties = await readProperties();
  const property = properties.find((item) => item.id === id && item.status === "published");
  const isIndexable = Boolean(
    property &&
      property.publicImageApproved === true &&
      (property.listingType === "new-development"
        ? property.visibility === "public" || property.visibility === "teaser"
        : normalizePropertyAccessLevel(property.accessLevel, property.visibility) === "registered"),
  );
  const canonical = `https://www.pfeuroasia.com/properties/${id}`;
  const title = property
    ? `${property.title} | Property Facilitators EuroAsia`
    : "Property Details | Property Facilitators EuroAsia";
  const description = metadataDescription(property?.description);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: property?.publicImageApproved && property.image
      ? { title, description, url: canonical, images: [{ url: property.image }] }
      : { title, description, url: canonical },
    robots: isIndexable
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
  const isAsiaProperty = property.market === "malaysia" || property.market === "asia";

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
            (isAsiaProperty
              ? item.market === "malaysia" || item.market === "asia"
              : item.market === property.market) &&
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

  const canonical = `${SITE_URL}/properties/${property.id}`;
  const images = [property.image, property.secondaryImage, property.thirdImage, property.fourthImage]
    .filter((value): value is string => Boolean(value))
    .map(absoluteUrl);
  const floorSize = numericMeasurement(property.builtSize);
  const residenceType = property.propertyType === "apartment"
    ? "Apartment"
    : property.propertyType === "villa" || property.propertyType === "townhouse"
      ? "SingleFamilyResidence"
      : "Product";
  const priceDetails = property.priceAmount && property.priceAmount > 0
    ? property.priceToAmount && property.priceToAmount > property.priceAmount
      ? {
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            minPrice: property.priceAmount,
            maxPrice: property.priceToAmount,
            priceCurrency: property.priceCurrency || "EUR",
          },
        }
      : {
          price: property.priceAmount,
          priceCurrency: property.priceCurrency || "EUR",
        }
    : {};
  const propertySchema = property.publicImageApproved === true ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": `${canonical}#listing`,
        url: canonical,
        name: property.title,
        headline: property.title,
        description: property.description,
        image: images,
        dateCreated: property.createdAt,
        dateModified: property.updatedAt,
        inLanguage: "en-GB",
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntity: { "@id": `${canonical}#property` },
      },
      {
        "@type": residenceType,
        "@id": `${canonical}#property`,
        name: property.title,
        description: property.description,
        image: images,
        ...(residenceType !== "Product" ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: property.approximateLocation || property.location,
            addressCountry: property.country || (isAsiaProperty ? "Malaysia" : "Spain"),
          },
          numberOfBedrooms: property.bedrooms,
          numberOfBathroomsTotal: property.bathrooms,
          ...(floorSize ? {
            floorSize: {
              "@type": "QuantitativeValue",
              value: floorSize,
              unitCode: "MTK",
            },
          } : {}),
        } : {
          category: property.propertyType || property.listingType,
          additionalProperty: {
            "@type": "PropertyValue",
            name: "Location",
            value: property.approximateLocation || property.location,
          },
        }),
        offers: { "@id": `${canonical}#offer` },
      },
      {
        "@type": "Offer",
        "@id": `${canonical}#offer`,
        url: canonical,
        ...priceDetails,
        itemOffered: { "@id": `${canonical}#property` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Properties", item: `${SITE_URL}/#selected-opportunities-heading` },
          { "@type": "ListItem", position: 3, name: property.title, item: canonical },
        ],
      },
    ],
  } : null;

  return (
    <main className="registered-property-page">
      <Header />
      {propertySchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(propertySchema).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <section className="registered-property-hero site-shell">
        <div className="registered-property-notice">
          <div>
            <strong>{isDevelopment ? "New development · Open listing" : "Selected property · Open details"}</strong>
            <p>
              {isDevelopment
                ? "View the complete development presentation without registering. PDF information is available after a short email verification; enquire for current availability, floor plans or further information."
                : "View the larger photographs and full property information without registering. Registration is only required when you choose to download a brochure PDF."}
            </p>
          </div>
          <Link className="button button-gold" href={isAsiaProperty ? "/markets/malaysia#malaysia-property-carousel-heading" : isDevelopment ? "/#new-developments-heading" : "/#selected-opportunities-heading"}>
            {isAsiaProperty ? "Back to Asia properties" : isDevelopment ? "Back to developments" : "Back to selected properties"} <span>→</span>
          </Link>
        </div>
      </section>

      <section className="private-collection-grid registered-property-grid site-shell">
        <PrivatePropertyCard
          property={property}
          brochureMode="verified"
          detailMode
          showEnquiry={isDevelopment}
          singleBrochureAction
          brochureLabel={isDevelopment ? "Download PDF information" : undefined}
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
