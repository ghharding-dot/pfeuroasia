import { createMetadata, RouteSeo } from "../../../lib/seo";
export const metadata = createMetadata("zagaletaDa");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="zagaletaDa">{children}</RouteSeo>; }
