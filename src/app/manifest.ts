import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.domain} — ${site.name}`,
    short_name: site.domain,
    description: 'Freelance full-stack developer specializing in React and TypeScript.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0910',
    theme_color: '#872bff',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
