import { createMetadata, RouteSeo } from "../lib/seo";
export const metadata = createMetadata("commercialEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="commercialEn">{children}</RouteSeo>; }
