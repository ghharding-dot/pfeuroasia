import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { PrivatePropertyCard } from "../../components/PrivatePropertyCard";
import {
  normalizePropertyAccessLevel,
  readProperties,
} from "../../lib/propertyStore";
import {
  REGISTERED_PROPERTY_COOKIE_NAME,
  verifyRegisteredPropertySession,
} from "../../lib/registeredPropertyAuth";
import "../registered-property.css";
import "../../private-portfolio/portfolio-collection.css";

export const metadata: Metadata = {
  title: "Registered Property Details | Property Facilitators EuroAsia",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function RegisteredPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const properties = await readProperties();
  const property = properties.find(
    (item) =>
      item.id === id &&
      item.status === "published" &&
      normalizePropertyAccessLevel(item.accessLevel, item.visibility) === "registered",
  );

  if (!property) notFound();

  const cookieStore = await cookies();
  const session = verifyRegisteredPropertySession(
    cookieStore.get(REGISTERED_PROPERTY_COOKIE_NAME)?.value,
  );

  if (!session) redirect(`/properties/${property.id}/access`);

  return (
    <main className="registered-property-page">
      <Header />

      <section className="registered-property-hero site-shell">
        <div className="registered-property-notice">
          <div>
            <strong>Verified registered-listing access</strong>
            <p>
              Signed in as {session.fullName}. This access covers general registered listings for 30 days. Private off-market opportunities require a separate application and approval.
            </p>
          </div>
          <Link className="button button-gold" href="/private-portfolio">
            Explore Private Collection <span>→</span>
          </Link>
        </div>
      </section>

      <section className="private-collection-grid registered-property-grid site-shell">
        <PrivatePropertyCard property={property} brochureMode="enquiry" />
      </section>

      <Footer />
    </main>
  );
}
