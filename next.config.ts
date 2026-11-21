import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Photos and logos are hotlinked from the original site's CDN.
    // Fine for local design practice; self-host them before sharing anywhere.
    remotePatterns: [{ protocol: "https", hostname: "cdn.prod.website-files.com" }],
  },
};

export default nextConfig;
