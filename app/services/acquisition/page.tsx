import { ServicePage } from "../../components/ServicePage";

export default function AcquisitionPage() {
  return <ServicePage
    number="01"
    title="Acquisition advisory"
    kicker="Independent representation for buyers seeking exceptional property in Southern Spain."
    introduction="We act solely in your interest: translating your brief into a focused search, opening access to the public and private market, and giving you the local context to make a confident decision."
    imageClass="acquisition-image"
    pillars={[
      { title: "Private search", text: "A carefully qualified search across listed, quiet-market and direct-owner opportunities." },
      { title: "Local insight", text: "Clear advice on area, value, condition and the commercial realities behind each opportunity." },
      { title: "Buyer representation", text: "One experienced point of contact through viewings, negotiation, diligence and completion." },
    ]}
    process={[
      { step: "01", title: "Define", text: "We clarify the lifestyle, property and investment priorities that truly matter." },
      { step: "02", title: "Curate", text: "We inspect, filter and present a disciplined shortlist—saving your time." },
      { step: "03", title: "Secure", text: "We coordinate the commercial process and trusted professional advisers." },
    ]}
  />;
}
