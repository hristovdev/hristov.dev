import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    // A stable id keeps an installed app pointing at the same entry even if
    // start_url ever changes.
    id: '/',
    name: `${site.domain} — ${site.name}`,
    short_name: site.domain,
    description: 'Senior full-stack developer working in React, TypeScript and Node.js.',
    lang: 'en',
    dir: 'ltr',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0c0a0e',
    // Matches the dark <meta name="theme-color">, so an installed window opens
    // in the page's own colour rather than flashing the accent red.
    theme_color: '#0c0a0e',
    categories: ['business', 'productivity'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
