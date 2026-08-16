import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("marbellaEn");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="marbellaEn">{children}</RouteSeo>; }
