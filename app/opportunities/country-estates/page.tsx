import type { Metadata } from "next";
import { EnquiryFlow } from "../../components/EnquiryFlow";
import { Header } from "../../components/Header";

export const metadata: Metadata = {
  title: { absolute: "Country Estates in Andalusia | Property Facilitators EuroAsia" },
  description:
    "Register requirements for substantial country estates, fincas, cortijos, equestrian and lifestyle properties in Andalusia with more than 20,000 m² of land.",
  alternates: {
    canonical: "https://pfeuroasia.com/opportunities/country-estates",
  },
};

export default function CountryEstatesPage() {
  return (
    <main className="enquiry-page">
      <Header />
      <EnquiryFlow interest="country-estates" />
    </main>
  );
}
