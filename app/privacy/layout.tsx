import { createMetadata, RouteSeo } from "../lib/seo";
export const metadata = createMetadata("privacyEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="privacyEn">{children}</RouteSeo>; }
