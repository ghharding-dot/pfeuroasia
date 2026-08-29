import { EnquiryFlow } from "../../components/EnquiryFlow";
import { Header } from "../../components/Header";
import { createMetadata } from "../../lib/seo";

export const metadata = createMetadata("asiaEnquireEn");

type AsiaEnquirePageProps = {
  searchParams: Promise<{
    partner?: string | string[];
    jurisdiction?: string | string[];
    guide?: string | string[];
  }>;
};

export default async function AsiaEnquirePage({ searchParams }: AsiaEnquirePageProps) {
  const params = await searchParams;
  const partnerSlug = Array.isArray(params.partner) ? params.partner[0] : params.partner;
  const jurisdiction = Array.isArray(params.jurisdiction) ? params.jurisdiction[0] : params.jurisdiction;
  const guide = Array.isArray(params.guide) ? params.guide[0] : params.guide;

  return (
    <main className="enquiry-page">
      <Header enquireHref="/asia-gateway/enquire" enquireLabel="Asia enquiry" />
      <EnquiryFlow
        partnerSlug={partnerSlug}
        journey="asia"
        initialAsiaJurisdiction={jurisdiction}
        requestingGuide={guide === "company-residency"}
      />
    </main>
  );
}
