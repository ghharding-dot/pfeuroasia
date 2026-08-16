import { createMetadata, RouteSeo } from "../lib/seo";
export const metadata = createMetadata("ownersEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="ownersEn">{children}</RouteSeo>; }
