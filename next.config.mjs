// import {withSentryConfig} from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Enable compression
  compress: true,
  // Optimize bundle size
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['framer-motion', 'lucide-react', 'react-icons'],
  },
  // Reduce bundle size
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Tree shake unused exports
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    return config;
  },
  // Enable SWC minification
  swcMinify: true,
  // Optimize fonts
  optimizeFonts: true,
};

export default nextConfig;