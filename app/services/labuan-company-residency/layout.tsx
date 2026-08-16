import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("labuanEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="labuanEn">{children}</RouteSeo>; }
