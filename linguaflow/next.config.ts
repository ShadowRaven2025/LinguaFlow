import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure CSS is properly handled in production
  productionBrowserSourceMaps: false,
};

export default nextConfig;
