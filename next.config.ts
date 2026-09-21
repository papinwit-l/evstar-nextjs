import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // TODO: add the WordPress media host, e.g.
      // { protocol: "https", hostname: "cms.evstarthailand.com" },
    ],
  },
};

export default nextConfig;
