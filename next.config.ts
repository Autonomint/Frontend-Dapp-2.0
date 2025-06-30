import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cleanDistDir: true,
  images: {
    domains: ["www.google.com"],
  },
};

export default nextConfig;
