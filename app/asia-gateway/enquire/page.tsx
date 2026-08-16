import { EnquiryFlow } from "../../components/EnquiryFlow";
import { Header } from "../../components/Header";
import { createMetadata } from "../../lib/seo";

export const metadata = createMetadata("asiaEnquireEn");

type AsiaEnquirePageProps = {
  searchParams: Promise<{ partner?: string | string[] }>;
};

export default async function AsiaEnquirePage({ searchParams }: AsiaEnquirePageProps) {
  const params = await searchParams;
  const partnerSlug = Array.isArray(params.partner) ? params.partner[0] : params.partner;

  return (
    <main className="enquiry-page">
      <Header enquireHref="/asia-gateway/enquire" enquireLabel="Asia enquiry" />
      <EnquiryFlow partnerSlug={partnerSlug} journey="asia" />
    </main>
  );
}
