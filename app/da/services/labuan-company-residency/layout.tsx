import { createMetadata, RouteSeo } from "../../../lib/seo";
export const metadata = createMetadata("labuanDa");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="labuanDa">{children}</RouteSeo>; }
