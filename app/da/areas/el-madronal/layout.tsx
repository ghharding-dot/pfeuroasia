import { createMetadata, RouteSeo } from "../../../lib/seo";
export const metadata = createMetadata("madronalDa");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="madronalDa">{children}</RouteSeo>; }
