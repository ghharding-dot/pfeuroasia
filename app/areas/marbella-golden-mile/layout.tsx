import { createMetadata, RouteSeo } from "../../lib/seo";

export const metadata = createMetadata("goldenMileEn");

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RouteSeo pageKey="goldenMileEn">{children}</RouteSeo>;
}
