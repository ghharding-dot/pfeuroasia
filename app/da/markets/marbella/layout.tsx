import { createMetadata, RouteSeo } from "../../../lib/seo";
export const metadata = createMetadata("marbellaDa");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="marbellaDa">{children}</RouteSeo>; }
