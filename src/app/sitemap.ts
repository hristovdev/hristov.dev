import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

const ROUTES = ['', '/about', '/contact'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${site.url}${route}` || site.url,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
    alternates: {
      languages: {
        en: `${site.url}${route}`,
        bg: `${site.url}/bg${route}`,
      },
    },
  }));
}
