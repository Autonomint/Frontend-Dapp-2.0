import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cleanDistDir: true,
  images: {
    domains: ["www.google.com"],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-checkbox",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-label",
      "@radix-ui/react-popover",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-slot",
      "@radix-ui/react-tooltip",
      "lucide-react",
      "framer-motion"
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Reduce memory usage during development
    if (process.env.NODE_ENV === 'development') {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
