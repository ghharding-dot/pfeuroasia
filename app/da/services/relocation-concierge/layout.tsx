import { createMetadata, RouteSeo } from "../../../lib/seo";
export const metadata = createMetadata("relocationDa");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="relocationDa">{children}</RouteSeo>; }
