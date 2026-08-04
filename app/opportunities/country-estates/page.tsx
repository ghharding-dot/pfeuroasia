import type { Metadata } from "next";
import { EnquiryFlow } from "../../components/EnquiryFlow";
import { Header } from "../../components/Header";

export const metadata: Metadata = {
  title: "Country Estates in Andalusia | Property Facilitators EuroAsia",
  description:
    "Register requirements for substantial country estates, fincas, cortijos, equestrian and lifestyle properties in Andalusia with more than 20,000 m² of land.",
};

export default function CountryEstatesPage() {
  return (
    <main className="enquiry-page">
      <Header />
      <EnquiryFlow interest="country-estates" />
    </main>
  );
}
