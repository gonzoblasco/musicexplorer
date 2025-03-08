/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para el modo estricto de React
  // Durante el desarrollo puede causar renderizados dobles para detectar efectos impuros
  reactStrictMode: false,

  // Configuración para permitir imágenes de dominios específicos
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

  // Configuraciones experimentales
  experimental: {
    // Optimización de CSS durante el build
    optimizeCss: true,
  },
};

module.exports = nextConfig;
