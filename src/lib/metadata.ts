import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { site } from '@/data/site';

/** The site's real routes, without a locale prefix. `''` is the home page. */
export type Route = '' | '/resume' | '/contact';

export const ROUTES = ['', '/resume', '/contact'] as const satisfies readonly Route[];

/**
 * Where `route` lives for `locale`.
 *
 * `localePrefix: 'as-needed'` leaves the default locale unprefixed, so the
 * English home page is plain `/` rather than `/en`.
 */
export function pathFor(locale: string, route: Route): string {
  if (locale === routing.defaultLocale) return route || '/';
  return `/${locale}${route}`;
}

/**
 * hreflang map for `route`.
 *
 * Includes `x-default`, which Google asks for whenever no version of a page is
 * language-neutral — without it the unprefixed English URL and the `en` URL are
 * the same document with no stated fallback for everyone else. Built from
 * `routing.locales`, so adding a locale needs no edit here.
 */
export function languagesFor(route: Route): Record<string, string> {
  return {
    ...Object.fromEntries(routing.locales.map((locale) => [locale, pathFor(locale, route)])),
    'x-default': pathFor(routing.defaultLocale, route),
  };
}

/** Open Graph wants a territory, not a bare language code. */
const OG_LOCALE = { en: 'en_GB', bg: 'bg_BG' } as const satisfies Record<Locale, string>;

/**
 * Per-page metadata.
 *
 * Every field that names *this* page has to be set on the page itself. Next
 * merges metadata by replacing whole objects rather than deep-merging them, so
 * a page that sets only `title` and `description` still inherits the layout's
 * entire `openGraph` block. That is what made /resume and /contact hand every
 * link preview the home page's og:title, og:description and og:url.
 */
export async function pageMetadata(
  locale: string,
  route: Route,
  namespace: 'home' | 'resume' | 'contact',
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `meta.${namespace}` });
  const title = t('title');
  const description = t('description');
  const path = pathFor(locale, route);

  /*
   * A preview card carries no site chrome to supply the rest of the name, so
   * og:title spells it out. `absolute` keeps the layout's `%s · Hristo
   * Hristov` template from appending it a second time.
   */
  const shareTitle = namespace === 'home' ? title : `${title} · ${site.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: languagesFor(route),
    },
    openGraph: {
      type: 'website',
      siteName: site.domain,
      locale: OG_LOCALE[locale as Locale],
      alternateLocale: routing.locales
        .filter((other) => other !== locale)
        .map((other) => OG_LOCALE[other]),
      title: { absolute: shareTitle },
      description,
      url: path,
    },
    twitter: {
      card: 'summary_large_image',
      title: { absolute: shareTitle },
      description,
    },
  };
}
