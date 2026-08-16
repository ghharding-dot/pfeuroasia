import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("madronalEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="madronalEn">{children}</RouteSeo>; }
