import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("countryEstatesEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="countryEstatesEn">{children}</RouteSeo>; }
