// next.config.ts

/**
 * @type {import('next').NextConfig}
 * Configuración principal de Next.js para el proyecto.
 */
const nextConfig = {
  // Configuración para desactivar el modo estricto de React (opcional)
  // Durante el desarrollo o pruebas, desactiva reactStrictMode si hay problemas
  // relacionados con renderizados múltiples inesperados.
  reactStrictMode: false,

  // Configuración de imágenes remotas permitidas
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

  // Configuraciones experimentales (utilizar con precaución)
  experimental: {
    optimizeCss: true, // Habilita optimización de CSS en tiempo de compilación
  },
};

module.exports = nextConfig;
