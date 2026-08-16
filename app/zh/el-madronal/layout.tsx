import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("madronalZh");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="madronalZh">{children}</RouteSeo>; }
