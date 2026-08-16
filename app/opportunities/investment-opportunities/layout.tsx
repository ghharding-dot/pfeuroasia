import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("investmentEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="investmentEn">{children}</RouteSeo>; }
