import { createMetadata, RouteSeo } from "../lib/seo";
export const metadata = createMetadata("enquireEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="enquireEn">{children}</RouteSeo>; }
