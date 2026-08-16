import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("middleEastEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="middleEastEn">{children}</RouteSeo>; }
