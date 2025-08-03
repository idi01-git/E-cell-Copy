/** @type {import('next').NextConfig} */
import createBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default withBundleAnalyzer(nextConfig);