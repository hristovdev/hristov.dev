import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { languagesFor, pathFor, ROUTES } from '@/lib/metadata';
import { routing } from '@/i18n/routing';

const absolute = (path: string) => new URL(path, site.url).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  // One entry per locale per route, each carrying the full alternate set —
  // Google asks for every language version to appear as its own <loc>, not
  // only as somebody else's hreflang.
  return ROUTES.flatMap((route) => {
    const languages = Object.fromEntries(
      Object.entries(languagesFor(route)).map(([lang, path]) => [lang, absolute(path)]),
    );

    return routing.locales.map((locale) => ({
      url: absolute(pathFor(locale, route)),
      // A fixed date, not `new Date()`. Stamping every build as "changed
      // today" teaches crawlers that lastModified here means nothing, and
      // they start discounting it on the pages where it would have mattered.
      lastModified: new Date(site.contentUpdated),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
      alternates: { languages },
    }));
  });
}
