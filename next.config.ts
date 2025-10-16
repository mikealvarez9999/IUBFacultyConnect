import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iub.ac.bd',
      },
    ],
  },
};

export default nextConfig;
