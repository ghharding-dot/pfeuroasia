import { EnquiryFlow } from "../components/EnquiryFlow";
import { Header } from "../components/Header";

type EnquirePageProps = {
  searchParams: Promise<{ partner?: string | string[] }>;
};

export default async function EnquirePage({ searchParams }: EnquirePageProps) {
  const params = await searchParams;
  const partnerSlug = Array.isArray(params.partner) ? params.partner[0] : params.partner;

  return (
    <main className="enquiry-page">
      <Header />
      <EnquiryFlow partnerSlug={partnerSlug} />
    </main>
  );
}
