import type { Metadata } from "next";
import { EnquiryFlow } from "../../components/EnquiryFlow";
import { Header } from "../../components/Header";

export const metadata: Metadata = {
  title: "Asia Enquiry | Property Facilitators EuroAsia",
  description:
    "Discuss Asia property acquisition, residency, company setup or a professional partnership with Property Facilitators EuroAsia.",
};

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
