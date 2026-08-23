import { BrochureAccessButton } from "./BrochureAccessButton";
import { imageObjectPosition, propertyTypeLabel, type VaultProperty } from "../lib/propertyStore";

export type PrivatePropertyDisplay = Readonly<
  Pick<
    VaultProperty,
    | "reference"
    | "location"
    | "approximateLocation"
    | "price"
    | "priceTo"
    | "title"
    | "bedrooms"
    | "bathrooms"
    | "plotSize"
    | "builtSize"
    | "terraces"
    | "annualCosts"
    | "description"
    | "image"
    | "secondaryImage"
    | "thirdImage"
    | "fourthImage"
    | "brochure"
    | "unbrandedBrochure"
    | "adviserName"
    | "adviserWhatsApp"
    | "lastVerifiedAt"
    | "imagePosition"
    | "listingPartnerCode"
    | "listingPartnerName"
    | "propertyType"
  > & { updatedAt?: string }
>;

function countLabel(value: number, singular: string, plural: string) {
  if (!value) return "";
  return `${value} ${value === 1 ? singular : plural}`;
}

function displayDate(value?: string) {
  if (!value) return "Awaiting verification";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Awaiting verification";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function whatsappHref(number: string, reference: string) {
  const digits = number.replace(/\D/g, "");
  if (!digits) return "";
  const message = encodeURIComponent(
    `Hello, I would like to speak with an adviser about ${reference} and arrange a private viewing.`,
  );
  return `https://wa.me/${digits}?text=${message}`;
}

export function PrivatePropertyCard({
  property,
  showEnquiry = true,
  brochureMode = "verified",
  detailMode = false,
}: {
  property: PrivatePropertyDisplay;
  showEnquiry?: boolean;
  brochureMode?: "verified" | "preview" | "direct" | "enquiry";
  detailMode?: boolean;
}) {
  const facts = [
    propertyTypeLabel(property.propertyType),
    countLabel(property.bedrooms, "bedroom", "bedrooms"),
    countLabel(property.bathrooms, "bathroom", "bathrooms"),
    property.builtSize ? `${property.builtSize} built` : "",
    property.plotSize ? `${property.plotSize} plot` : "",
    property.terraces ? `${property.terraces} terraces` : "",
  ].filter(Boolean);
  const partnerName = property.listingPartnerName || "Property Facilitators EuroAsia";
  const enquirySubject = encodeURIComponent(`Enquiry regarding ${property.reference}`);
  const brochureSubject = encodeURIComponent(`Sales brochure request regarding ${property.reference}`);
  const partnerBrochureSubject = encodeURIComponent(`Unbranded partner brochure request regarding ${property.reference}`);
  const viewingSubject = encodeURIComponent(`Private viewing request regarding ${property.reference}`);
  const adviserName = property.adviserName || "PF EuroAsia Property Adviser";
  const whatsapp = whatsappHref(
    property.adviserWhatsApp || process.env.NEXT_PUBLIC_PROPERTY_ADVISER_WHATSAPP || "",
    property.reference,
  );
  const additionalImages = [
    property.secondaryImage,
    property.thirdImage,
    property.fourthImage,
  ].filter((image): image is string => Boolean(image));

  return (
    <article className="private-property-card">
      <div className="private-property-image">
        {property.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={property.image}
            alt={`${property.title} in ${property.location}`}
            style={{ objectPosition: imageObjectPosition(property.imagePosition) }}
          />
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
          <strong>
            {property.priceTo
              ? `${property.price || "Price on application"} – ${property.priceTo}`
              : property.price || "Price on application"}
          </strong>
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

        {detailMode && (
          <div className="private-property-detail-grid">
            <div>
              <span>Approximate location</span>
              <strong>{property.approximateLocation || property.location}</strong>
              <small>Exact address and access details are released privately.</small>
            </div>
            <div>
              <span>Annual running costs</span>
              <strong>{property.annualCosts || "Available on request"}</strong>
              <small>Indicative figures, subject to the latest owner documentation.</small>
            </div>
            <div>
              <span>Last verified</span>
              <strong>{displayDate(property.lastVerifiedAt || property.updatedAt)}</strong>
              <small>Price, availability and particulars reconfirmed by our team.</small>
            </div>
            <div>
              <span>Your adviser</span>
              <strong>{adviserName}</strong>
              <small>One direct contact from enquiry through to private viewing.</small>
            </div>
          </div>
        )}

        {additionalImages.length > 0 && (
          <div className="private-property-image-gallery">
            {additionalImages.map((image, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="private-property-secondary-image"
                src={image}
                alt={`Additional view ${index + 2} of ${property.title}`}
                key={image}
              />
            ))}
          </div>
        )}

        <div className="private-property-actions">
          {property.brochure ? (
            brochureMode === "verified" ? (
              <BrochureAccessButton
                propertyReference={property.reference}
                propertyTitle={property.title}
                partnerName={partnerName}
                edition="branded"
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
            ) : brochureMode === "enquiry" ? (
              <a
                className="text-link"
                href={`mailto:enquiry@pfeuroasia.com?subject=${brochureSubject}`}
              >
                Request branded property brochure <span>→</span>
              </a>
            ) : (
              <span className="brochure-pending brochure-attached">Protected sales brochure attached</span>
            )
          ) : (
            <span className="brochure-pending">Sales brochure PDF not attached</span>
          )}

          {property.unbrandedBrochure && brochureMode === "verified" && (
            <BrochureAccessButton
              propertyReference={property.reference}
              propertyTitle={property.title}
              partnerName={partnerName}
              edition="partner"
            />
          )}

          {property.unbrandedBrochure && brochureMode === "direct" && (
            <a className="text-link" href={property.unbrandedBrochure} target="_blank" rel="noopener noreferrer">
              View unbranded partner brochure <span>→</span>
            </a>
          )}

          {property.unbrandedBrochure && brochureMode === "enquiry" && (
            <a className="text-link" href={`mailto:enquiry@pfeuroasia.com?subject=${partnerBrochureSubject}`}>
              Request unbranded partner brochure <span>→</span>
            </a>
          )}

          {property.unbrandedBrochure && brochureMode === "preview" && (
            <span className="brochure-pending brochure-attached">Unbranded partner brochure attached</span>
          )}

          {showEnquiry && (
            <a
              className="text-link"
              href={`mailto:enquiry@pfeuroasia.com?subject=${enquirySubject}`}
            >
              Enquire about this property <span>→</span>
            </a>
          )}
        </div>

        {detailMode && showEnquiry && (
          <div className="private-property-primary-actions">
            <a className="button button-gold private-viewing-button" href={`mailto:enquiry@pfeuroasia.com?subject=${viewingSubject}`}>
              Request a private viewing <span>→</span>
            </a>
            {whatsapp && (
              <a className="private-whatsapp-button" href={whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp {adviserName} <span>↗</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
