import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "w7.pngwing.com",
      },
      {
        protocol: "https",
        hostname: "www.svgrepo.com",
      },
      {
        protocol: "http",
        hostname: "www.svgrepo.com",
      },
    ],
  },
};

export default nextConfig;
