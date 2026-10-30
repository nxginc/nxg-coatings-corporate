/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NXG_DIST_DIR || ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "*.contentstack.io",
      },
    ],
  },
}

export default nextConfig
