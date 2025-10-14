/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['sporty-africa.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sporty-africa.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
