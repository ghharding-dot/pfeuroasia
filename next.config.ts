import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.realdelaquinta.com",
        pathname: "/sites/default/files/**",
      },
    ],
  },
  async headers() {
    return [
      { source: "/da/:path*", headers: [{ key: "Content-Language", value: "da-DK" }] },
      { source: "/zh/:path*", headers: [{ key: "Content-Language", value: "zh-CN" }] },
      { source: "/ar/:path*", headers: [{ key: "Content-Language", value: "ar-SA" }] },
    ];
  },
};

export default nextConfig;
