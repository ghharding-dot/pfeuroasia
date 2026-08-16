import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("rentalsZh");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="rentalsZh">{children}</RouteSeo>; }
