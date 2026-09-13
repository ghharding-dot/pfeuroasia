import { EnquiryFlow } from "../../../components/EnquiryFlow";
import { Header } from "../../../components/Header";

export default function PrivateCollectionE15EnquiryPage() {
  return (
    <main className="enquiry-page">
      <Header enquireHref="/private-collection-preview/e15/enquire" enquireLabel="Private dossier" />
      <EnquiryFlow
        propertyContext={{
          id: "private-e15",
          reference: "E15",
          title: "Private La Zagaleta residence",
          location: "La Zagaleta, Benahavís",
        }}
      />
    </main>
  );
}
