import { createMetadata, RouteSeo } from "../lib/seo";
export const metadata = createMetadata("asiaEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="asiaEn">{children}</RouteSeo>; }
