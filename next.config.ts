import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
        pathname: "/content/v1/62dfd00db50c2801dd8d0cd2/**",
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
