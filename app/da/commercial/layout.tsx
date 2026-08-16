import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("commercialDa");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="commercialDa">{children}</RouteSeo>; }
