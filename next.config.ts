import path from 'node:path';
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Self-contained server bundle for the production Docker image.
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  sassOptions: {
    // Lets every *.module.scss say `@use 'core' as *` regardless of depth.
    loadPaths: [path.join(import.meta.dirname, 'src/styles')],
  },
};

export default withNextIntl(nextConfig);
