import { createMetadata, RouteSeo } from "../../../lib/seo";
export const metadata = createMetadata("labuanAdviserEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="labuanAdviserEn">{children}</RouteSeo>; }
