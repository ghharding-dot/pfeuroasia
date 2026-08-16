import { EnquiryFlow } from "../../components/EnquiryFlow";
import { Header } from "../../components/Header";
import { createMetadata } from "../../lib/seo";

export const metadata = createMetadata("countryEstatesEn");

export default function CountryEstatesPage() {
  return (
    <main className="enquiry-page">
      <Header />
      <EnquiryFlow interest="country-estates" />
    </main>
  );
}
