import { EnquiryFlow } from "../../components/EnquiryFlow";
import { Header } from "../../components/Header";
import { createMetadata } from "../../lib/seo";

export const metadata = createMetadata("investmentEn");

export default function InvestmentOpportunitiesPage() {
  return (
    <main className="enquiry-page">
      <Header />
      <EnquiryFlow interest="investment-opportunities" />
    </main>
  );
}
