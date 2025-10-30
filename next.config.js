/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pet-hotel-api.onrender.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
    ],
    unoptimized: true, // ✅ necesario para static export
  },
  output: "export", // ✅ requerido para Render (Next 15)
};

export default nextConfig;
