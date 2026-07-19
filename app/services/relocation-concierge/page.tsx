import { ServicePage } from "../../components/ServicePage";

export default function RelocationConciergePage() {
  return <ServicePage
    number="03"
    title="Relocation & concierge"
    kicker="A trusted presence in Spain, from first orientation to everyday ownership."
    introduction="A successful move is about far more than the property. We coordinate the practical details, trusted local specialists and ongoing ownership needs that help international clients establish themselves smoothly in Southern Spain."
    imageClass="concierge-image"
    pillars={[
      { title: "Orientation", text: "Area familiarisation shaped around family, travel, schools, privacy and lifestyle." },
      { title: "Transition", text: "Support coordinating advisers, utilities, suppliers, improvements and the move itself." },
      { title: "Ownership", text: "A reliable local point of contact for property, people and practical problem-solving." },
    ]}
    process={[
      { step: "01", title: "Prepare", text: "We map the priorities, dependencies and professional support required." },
      { step: "02", title: "Coordinate", text: "We keep advisers, suppliers and deadlines moving in one direction." },
      { step: "03", title: "Support", text: "Our relationship continues after the keys change hands." },
    ]}
  />;
}
