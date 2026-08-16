import { createMetadata, RouteSeo } from "../../../lib/seo";
export const metadata = createMetadata("malaysiaDa");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="malaysiaDa">{children}</RouteSeo>; }
