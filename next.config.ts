import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "raw.githubusercontent.com",
      "upload.wikimedia.org",
      "res.cloudinary.com",
      "w7.pngwing.com",
    ],
  },
};

export default nextConfig;
