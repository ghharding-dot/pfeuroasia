import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Footer } from "../../../../components/Footer";
import { Header } from "../../../../components/Header";
import { RegisteredPropertyAccess } from "../../../../components/RegisteredPropertyAccess";
import {
  normalizePropertyAccessLevel,
  readProperties,
} from "../../../../lib/propertyStore";
import {
  REGISTERED_PROPERTY_COOKIE_NAME,
  verifyRegisteredPropertySession,
} from "../../../../lib/registeredPropertyAuth";
import "../../registered-property.css";

export const metadata: Metadata = {
  title: "Registered Property Access | Property Facilitators EuroAsia",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function RegisteredPropertyAccessPage({
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

  if (session) redirect(`/properties/${property.id}`);

  return (
    <main className="registered-property-page">
      <Header />
      <section className="registered-access-shell site-shell">
        <RegisteredPropertyAccess
          propertyId={property.id}
          propertyTitle={property.publicTitle || property.title}
          propertyLocation={property.publicLocation || property.location}
        />
      </section>
      <Footer />
    </main>
  );
}
