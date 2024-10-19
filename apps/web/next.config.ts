import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images-na.ssl-images-amazon.com",
      },
      {
        hostname: "images.gr-assets.com",
      },
    ],
  },
};

export default nextConfig;
