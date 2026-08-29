import { createMetadata, RouteSeo } from "../../lib/seo";

export const metadata = createMetadata("malaysiaResidencyOptionsEn");

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RouteSeo pageKey="malaysiaResidencyOptionsEn">{children}</RouteSeo>;
}
