import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/da/:path*", headers: [{ key: "Content-Language", value: "da-DK" }] },
      { source: "/zh/:path*", headers: [{ key: "Content-Language", value: "zh-CN" }] },
      { source: "/ar/:path*", headers: [{ key: "Content-Language", value: "ar-SA" }] },
    ];
  },
};

export default nextConfig;
