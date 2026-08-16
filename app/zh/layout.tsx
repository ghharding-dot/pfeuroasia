import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "马贝拉豪宅与国际置业服务",
    template: "%s | Property Facilitators EuroAsia",
  },
  description: "为中文客户提供马贝拉、Benahavís及南西班牙豪宅的独立置业和私人咨询服务。",
};

export default function ChineseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="zh-CN">{children}</div>;
}
