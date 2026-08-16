import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("zagaletaEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="zagaletaEn">{children}</RouteSeo>; }
