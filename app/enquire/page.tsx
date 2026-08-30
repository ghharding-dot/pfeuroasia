import { EnquiryFlow } from "../components/EnquiryFlow";
import { Header } from "../components/Header";
import { getPartnerReferralSlugByCode } from "../lib/partner-referrals";
import { readProperties } from "../lib/propertyStore";

type EnquirePageProps = {
  searchParams: Promise<{
    partner?: string | string[];
    property?: string | string[];
  }>;
};

export default async function EnquirePage({ searchParams }: EnquirePageProps) {
  const params = await searchParams;
  const requestedPartnerSlug = Array.isArray(params.partner) ? params.partner[0] : params.partner;
  const propertyId = Array.isArray(params.property) ? params.property[0] : params.property;
  const properties = propertyId ? await readProperties() : [];
  const property = properties.find(
    (item) =>
      item.id === propertyId &&
      item.status === "published" &&
      item.listingType === "new-development",
  );
  const partnerSlug = property
    ? getPartnerReferralSlugByCode(property.listingPartnerCode) || undefined
    : requestedPartnerSlug;
  const isAsiaPartner = partnerSlug?.toLowerCase() === "aims";
  const propertyContext = property
    ? {
        id: property.id,
        reference: property.reference,
        title: property.title,
        location: property.approximateLocation || property.location,
      }
    : undefined;

  return (
    <main className="enquiry-page">
      <Header />
      <EnquiryFlow
        partnerSlug={partnerSlug}
        propertyContext={propertyContext}
        journey={isAsiaPartner ? "asia" : "spain"}
        initialAsiaJurisdiction={isAsiaPartner ? "Labuan, Malaysia" : undefined}
      />
    </main>
  );
}
