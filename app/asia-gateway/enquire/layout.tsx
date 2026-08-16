import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("asiaEnquireEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="asiaEnquireEn">{children}</RouteSeo>; }
