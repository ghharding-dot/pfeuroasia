import { createMetadata, RouteSeo } from "../lib/seo";
export const metadata = createMetadata("aboutEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="aboutEn">{children}</RouteSeo>; }
