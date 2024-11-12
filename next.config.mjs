/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/data/:path*",
        destination: "http://127.0.0.1:5000/data/:path*", // Redirecciona al backend Flask
      },  
    ];
  },
};

export default nextConfig;