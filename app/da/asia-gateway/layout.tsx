import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("asiaDa");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="asiaDa">{children}</RouteSeo>; }
