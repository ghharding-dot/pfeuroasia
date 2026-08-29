import { createMetadata, RouteSeo } from "../../lib/seo";

export const metadata = createMetadata("asiaCompanyFormationEn");

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RouteSeo pageKey="asiaCompanyFormationEn">{children}</RouteSeo>;
}
