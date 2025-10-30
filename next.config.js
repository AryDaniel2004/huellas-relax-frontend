/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "pet-hotel-api.onrender.com",
        pathname: "/uploads/**",
      },
    ],
    unoptimized: true, // ← necesario para static export
  },
  output: "export", // ← la nueva forma en Next.js 15 para exportar sitio estático
};

export default nextConfig;
