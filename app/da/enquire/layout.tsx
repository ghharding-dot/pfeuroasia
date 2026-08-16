import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("enquireDa");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="enquireDa">{children}</RouteSeo>; }
