import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("zagaletaZh");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="zagaletaZh">{children}</RouteSeo>; }
