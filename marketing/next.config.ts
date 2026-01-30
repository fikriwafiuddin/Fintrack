import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
