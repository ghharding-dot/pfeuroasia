import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("relocationEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="relocationEn">{children}</RouteSeo>; }
