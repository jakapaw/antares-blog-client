import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
        search: '',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.25',
        port: '1337',
        pathname: '/uploads/**',
        search: '',
      },
      {
        protocol: 'http',
        hostname: '203.194.112.107',
        port: '1337',
        pathname: '/uploads/**',
        search: '',
      },
    ],
  }
};

export default nextConfig;
