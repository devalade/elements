import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@registry": path.resolve(__dirname, "./registry"),
    };
    return config;
  },
};

export default nextConfig;
