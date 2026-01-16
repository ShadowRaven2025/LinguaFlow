import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Using SSR with Netlify
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Ensure CSS is properly handled
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
