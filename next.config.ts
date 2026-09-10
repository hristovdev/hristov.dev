import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Self-contained server bundle for the production Docker image.
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
};

export default withNextIntl(nextConfig);
