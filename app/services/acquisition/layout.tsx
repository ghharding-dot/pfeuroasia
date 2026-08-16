import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("acquisitionEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="acquisitionEn">{children}</RouteSeo>; }
