import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Our CSS is ~5KB gzipped: inlining it removes a render-blocking request,
    // which matters most for first-time visitors on slow mobile connections.
    inlineCss: true,
  },
  images: {
    // Every image is self-hosted (see scripts/optimize-images.mjs), so no remotePatterns.
    // AVIF first: typically 30–50% smaller than WebP for photos.
    formats: ["image/avif", "image/webp"],
    // 60 for the hero behind its dark scrim; 75 (default) everywhere else.
    qualities: [60, 75],
    // Optimised variants of /public images rarely change; cache them for 31 days.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
