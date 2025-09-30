/** @type {import('next').NextConfig} */
import createBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // PERFORMANCE: Enable React strict mode for better performance
  reactStrictMode: true,
  
  // PERFORMANCE: Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // PERFORMANCE: Enable compression
  compress: true,
  
  // PERFORMANCE: Optimize production builds
  productionBrowserSourceMaps: false,
  
  // PERFORMANCE: Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion', '@tabler/icons-react', 'react-icons', 'swiper'],
    webVitalsAttribution: ['CLS', 'LCP'],
    optimizeServerReact: true,
    serverMinification: true,
    serverSourceMaps: process.env.NODE_ENV === 'production', // Enable for Sentry in production
    esmExternals: true,
  },
  
  // PERFORMANCE: Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // PERFORMANCE: Enable caching in development
    if (dev) {
      config.cache = {
        type: 'filesystem',
      };
    }
    
    // PERFORMANCE: Optimize bundle splitting
    if (!isServer && !dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk (React, Next.js)
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // UI Libraries chunk
            ui: {
              name: 'ui-libs',
              test: /[\\/]node_modules[\\/](@tabler|lucide-react|react-icons|framer-motion)[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Utilities chunk
            utils: {
              name: 'utils',
              test: /[\\/]node_modules[\\/](@?clsx|tailwind-merge|class-variance-authority)[\\/]/,
              chunks: 'all',
              priority: 20,
            },
            // Vendor chunk
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 10,
            },
            // Common chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    
    // Bundle analysis in development
    if (dev && process.env.ANALYZE === 'true') {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.BUNDLE_ANALYZE': JSON.stringify('true'),
        })
      );
    }
    
    return config;
  },
  
  // Source Maps for Sentry
  productionBrowserSourceMaps: process.env.NODE_ENV === 'production',
  
  // Enhanced Compiler Options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  
  // TypeScript and ESLint
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Advanced Caching Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
      // Static Assets - 1 year cache
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|eot|otf)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // JavaScript and CSS - 1 year cache with revalidation
      {
        source: '/(.*)\\.(js|css)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      // API Routes - Short cache with revalidation
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, stale-while-revalidate=60',
          },
        ],
      },
    ];
  },
  
  // Output Configuration
  output: 'standalone',
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

// Sentry configuration options
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry webpack plugin
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  
  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,
  
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
  
  // Upload a larger set of source maps for better error reporting
  widenClientFileUpload: true,
  
  // Transpiles SDK to be compatible with IE11
  transpileClientSDK: true,
  
  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers
  tunnelRoute: "/monitoring",
  
  // Hides source maps from generated client bundles
  hideSourceMaps: true,
  
  // Automatically tree-shake Sentry logger statements for production
  disableLogger: true,
  
  // Enables automatic instrumentation of Vercel Cron Monitors
  automaticVercelMonitors: true,
};

// Apply configurations in the correct order
const configWithBundleAnalyzer = withBundleAnalyzer(nextConfig);

// Function to safely apply Sentry configuration
function applySentryConfig(config) {
  // Only apply Sentry in production or when explicitly enabled
  const shouldUseSentry = process.env.NODE_ENV === 'production' || process.env.SENTRY_ENABLED === 'true';
  
  if (!shouldUseSentry) {
    return config;
  }
  
  try {
    // Try to dynamically import Sentry
    const { withSentryConfig } = require('@sentry/nextjs');
    console.log('Applying Sentry configuration');
    return withSentryConfig(config, sentryWebpackPluginOptions);
  } catch (error) {
    console.log('Sentry not available, skipping Sentry configuration');
    return config;
  }
}

export default applySentryConfig(configWithBundleAnalyzer);