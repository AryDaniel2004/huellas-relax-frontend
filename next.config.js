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
    unoptimized: true, 
  },
  output: "export", 
};

export default nextConfig;
