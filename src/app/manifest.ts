import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.domain} — ${site.name}`,
    short_name: site.domain,
    description: 'Senior full-stack developer working in React, TypeScript and Node.js.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0c0a0e',
    theme_color: '#ff3650',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
