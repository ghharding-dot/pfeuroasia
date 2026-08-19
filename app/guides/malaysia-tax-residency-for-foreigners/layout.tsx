import { createMetadata, RouteSeo } from "../../lib/seo";

export const metadata = createMetadata("malaysiaTaxResidencyEn");

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RouteSeo pageKey="malaysiaTaxResidencyEn">{children}</RouteSeo>;
}
