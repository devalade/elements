import path from "node:path";

import type { NextConfig } from "next";

import { createMDX } from "fumadocs-mdx/next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@registry": path.resolve(__dirname, "./registry"),
    };
    return config;
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
