// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.theaudiodb.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.theaudiodb.com",
        pathname: "**",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
