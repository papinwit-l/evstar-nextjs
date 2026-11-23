import type { NextConfig } from "next";

/** WordPress media host, taken from the GraphQL endpoint (e.g. cms.example.com). */
const wpUrl = process.env.WORDPRESS_GRAPHQL_URL
  ? new URL(process.env.WORDPRESS_GRAPHQL_URL)
  : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: wpUrl
      ? [
          {
            protocol: wpUrl.protocol.replace(":", "") as "http" | "https",
            hostname: wpUrl.hostname,
            port: wpUrl.port,
            pathname: "/wp-content/uploads/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
