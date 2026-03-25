import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['desirous-rodger-panlogistically.ngrok-free.dev'],
  async rewrites() {
    return [
      {
        source: "/chat/:path*",
        destination: "http://localhost:8080/chat/:path*",
      },
      
    ];
  },
};

export default nextConfig;
