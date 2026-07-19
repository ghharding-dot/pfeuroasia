import { ServicePage } from "../../components/ServicePage";

export default function InternationalSalesPage() {
  return <ServicePage
    number="02"
    title="International sales"
    kicker="Strategic positioning and discreet international access for exceptional Spanish property."
    introduction="We combine exacting local market knowledge with direct relationships across Europe and Asia—creating a controlled, credible sales process designed around the property, the owner and the right buyer."
    imageClass="sales-image"
    pillars={[
      { title: "Positioning", text: "An honest appraisal, clear audience strategy and presentation worthy of the asset." },
      { title: "Private reach", text: "Targeted introductions through established agent, adviser and client relationships." },
      { title: "Deal stewardship", text: "Qualified viewings, informed negotiation and careful coordination to completion." },
    ]}
    process={[
      { step: "01", title: "Understand", text: "We establish the commercial objectives, sensitivities and ideal sale profile." },
      { step: "02", title: "Position", text: "We shape the narrative, materials and route to qualified international demand." },
      { step: "03", title: "Transact", text: "We manage interest closely and keep every moving part aligned." },
    ]}
  />;
}
