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
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "marbellavillacollection.com" }],
        destination: "https://www.pfeuroasia.com/luxury-villa-rentals",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.marbellavillacollection.com" }],
        destination: "https://www.pfeuroasia.com/luxury-villa-rentals",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "malaysiaresidencyoptions.com" }],
        destination: "https://www.pfeuroasia.com/guides/malaysia-residency-options",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.malaysiaresidencyoptions.com" }],
        destination: "https://www.pfeuroasia.com/guides/malaysia-residency-options",
        permanent: true,
      },
    ];
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
