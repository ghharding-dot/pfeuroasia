import { createMetadata, RouteSeo } from "../../lib/seo";

export const metadata = createMetadata("malaysiaCompanyFormationEn");

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RouteSeo pageKey="malaysiaCompanyFormationEn">{children}</RouteSeo>;
}
