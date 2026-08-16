import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("portfolioDa");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="portfolioDa">{children}</RouteSeo>; }
