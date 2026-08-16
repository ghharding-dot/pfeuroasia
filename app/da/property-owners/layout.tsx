import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("ownersDa");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="ownersDa">{children}</RouteSeo>; }
