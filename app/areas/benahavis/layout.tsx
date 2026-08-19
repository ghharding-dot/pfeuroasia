import { createMetadata, RouteSeo } from "../../lib/seo";

export const metadata = createMetadata("benahavisEn");

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RouteSeo pageKey="benahavisEn">{children}</RouteSeo>;
}
