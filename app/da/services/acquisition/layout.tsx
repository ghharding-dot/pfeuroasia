import { createMetadata, RouteSeo } from "../../../lib/seo";
export const metadata = createMetadata("acquisitionDa");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="acquisitionDa">{children}</RouteSeo>; }
