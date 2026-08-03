import { BrochureAccessButton } from "./BrochureAccessButton";
import type { VaultProperty } from "../lib/propertyStore";

export type PrivatePropertyDisplay = Readonly<
  Pick<
    VaultProperty,
    | "reference"
    | "location"
    | "price"
    | "title"
    | "bedrooms"
    | "bathrooms"
    | "plotSize"
    | "builtSize"
    | "terraces"
    | "description"
    | "image"
    | "secondaryImage"
    | "brochure"
    | "listingPartnerCode"
    | "listingPartnerName"
  >
>;

function countLabel(value: number, singular: string, plural: string) {
  if (!value) return "";
  return `${value} ${value === 1 ? singular : plural}`;
}

export function PrivatePropertyCard({
  property,
  showEnquiry = true,
  brochureMode = "verified",
}: {
  property: PrivatePropertyDisplay;
  showEnquiry?: boolean;
  brochureMode?: "verified" | "preview" | "direct";
}) {
  const facts = [
    countLabel(property.bedrooms, "bedroom", "bedrooms"),
    countLabel(property.bathrooms, "bathroom", "bathrooms"),
    property.builtSize ? `${property.builtSize} built` : "",
    property.plotSize ? `${property.plotSize} plot` : "",
    property.terraces ? `${property.terraces} terraces` : "",
  ].filter(Boolean);
  const partnerName = property.listingPartnerName || "Property Facilitators EuroAsia";

  return (
    <article className="private-property-card">
      <div className="private-property-image">
        {property.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={property.image} alt={`${property.title} in ${property.location}`} />
        ) : (
          <div className="placeholder-image">
            <span>Property photography to be added</span>
          </div>
        )}
      </div>

      <div className="private-property-content">
        <div className="private-property-heading">
          <div>
            <p>{property.reference} · {property.location}</p>
            <h2>{property.title}</h2>
          </div>
          <strong>{property.price || "Price on application"}</strong>
        </div>

        {facts.length > 0 && (
          <div className="private-property-facts">
            {facts.map((fact) => <span key={fact}>{fact}</span>)}
          </div>
        )}

        {property.description && (
          <p className="private-property-description">{property.description}</p>
        )}

        <p className="private-property-partner">Listed in collaboration with {partnerName}</p>

        {property.secondaryImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="private-property-secondary-image"
            src={property.secondaryImage}
            alt={`Additional view of ${property.title}`}
          />
        )}

        <div className="private-property-actions">
          {property.brochure ? (
            brochureMode === "verified" ? (
              <BrochureAccessButton
                propertyReference={property.reference}
                propertyTitle={property.title}
                partnerName={partnerName}
              />
            ) : brochureMode === "direct" ? (
              <a
                className="text-link"
                href={property.brochure}
                target="_blank"
                rel="noopener noreferrer"
              >
                View sales brochure PDF <span>→</span>
              </a>
            ) : (
              <span className="brochure-pending brochure-attached">Protected sales brochure attached</span>
            )
          ) : (
            <span className="brochure-pending">Sales brochure PDF not attached</span>
          )}

          {showEnquiry && (
            <a
              className="text-link"
              href={`mailto:enquiry@pfeuroasia.com?subject=Enquiry regarding ${encodeURIComponent(property.reference)}`}
            >
              Enquire about this property <span>→</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
