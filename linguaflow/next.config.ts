import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    optimizeCss: true,
  },
  // Ensure CSS is properly handled in production
  productionBrowserSourceMaps: false,
};

export default nextConfig;
