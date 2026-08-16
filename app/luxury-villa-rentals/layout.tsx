import { createMetadata, RouteSeo } from "../lib/seo";
export const metadata = createMetadata("rentalsEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="rentalsEn">{children}</RouteSeo>; }
