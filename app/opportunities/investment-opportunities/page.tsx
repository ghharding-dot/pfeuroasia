import type { Metadata } from "next";
import { EnquiryFlow } from "../../components/EnquiryFlow";
import { Header } from "../../components/Header";

export const metadata: Metadata = {
  title: { absolute: "Private Investment Opportunities | Property Facilitators EuroAsia" },
  description:
    "Register interest in selected hotels, commercial property, development sites, land, refurbishment projects and income-producing assets.",
  alternates: {
    canonical: "https://pfeuroasia.com/opportunities/investment-opportunities",
  },
};

export default function InvestmentOpportunitiesPage() {
  return (
    <main className="enquiry-page">
      <Header />
      <EnquiryFlow interest="investment-opportunities" />
    </main>
  );
}
