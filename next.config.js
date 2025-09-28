/** @type {import('next').NextConfig} */
console.log('[next.config] Loaded Next.js config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [],
    formats: ['image/webp', 'image/avif']
  },
  compress: true,
  poweredByHeader: false,
  trailingSlash: false
};

module.exports = nextConfig;
