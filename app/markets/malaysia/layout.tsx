import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("malaysiaEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="malaysiaEn">{children}</RouteSeo>; }
