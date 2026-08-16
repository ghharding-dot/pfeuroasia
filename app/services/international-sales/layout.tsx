import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("salesEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="salesEn">{children}</RouteSeo>; }
