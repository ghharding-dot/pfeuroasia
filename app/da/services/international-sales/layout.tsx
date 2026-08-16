import { createMetadata, RouteSeo } from "../../../lib/seo";
export const metadata = createMetadata("salesDa");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="salesDa">{children}</RouteSeo>; }
