import { createMetadata, RouteSeo } from "../../lib/seo";
export const metadata = createMetadata("rentalsDa");
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <RouteSeo pageKey="rentalsDa">{children}</RouteSeo>; }
