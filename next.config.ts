import type { NextConfig } from "next";

// Add your machine's LAN IP to .env.local as DEV_ORIGIN so phones on the
// same WiFi can hit the dev server without cross-origin errors.
// e.g.  DEV_ORIGIN=192.168.10.248
const devOrigins = process.env.DEV_ORIGIN ? [process.env.DEV_ORIGIN] : [];

const nextConfig: NextConfig = {
  ...(devOrigins.length > 0 && { allowedDevOrigins: devOrigins }),
  reactStrictMode: false,
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/resume.pdf",
        headers: [
          { key: "Content-Disposition", value: 'attachment; filename="Hanan Resume.pdf"' },
          { key: "Content-Type", value: "application/pdf" },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [72, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons/fi"],
  },
};

export default nextConfig;
