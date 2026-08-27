import { createMetadata } from "../lib/seo";
import { HeaderLiveStrip, LanguageFlagBar } from "../components/HeaderLiveStrip";

export const metadata = createMetadata("homeAr");

export default function ArabicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="ar-SA" dir="rtl"><div className="language-layout-bars"><HeaderLiveStrip /><LanguageFlagBar /></div>{children}</div>;
}
