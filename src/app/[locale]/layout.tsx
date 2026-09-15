import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Archivo, Inter, JetBrains_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { site } from '@/data/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeScript } from '@/components/layout/ThemeScript';
import '../globals.scss';

const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-archivo',
});

/**
 * Archivo ships no Cyrillic, so Bulgarian needs a second face. Inter is the
 * closest neo-grotesque on Google Fonts that covers it.
 *
 * Note this cannot be done by appending Inter to one shared stack: next/font
 * inserts a metric-adjusted *local* fallback ("Archivo Fallback") directly
 * after Archivo, and that local font does cover Cyrillic — so Bulgarian would
 * resolve to it and never reach Inter. `adjustFontFallback: false` is ignored
 * by the Turbopack font pipeline, so `tokens.css` selects the stack per locale
 * with `:lang(bg)` instead.
 */
const interCyrillic = Inter({
  subsets: ['cyrillic', 'cyrillic-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cyrillic',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono-src',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0c0a0e' },
    { media: '(prefers-color-scheme: light)', color: '#f6f4f9' },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  /*
   * Site-wide metadata only. Anything that names a particular page —
   * canonical, hreflang, the whole openGraph and twitter blocks — is set by
   * that page through `pageMetadata`, because Next replaces these objects
   * wholesale on merge rather than deep-merging them.
   */
  return {
    metadataBase: new URL(site.url),
    title: { default: t('home.title'), template: `%s · ${site.name}` },
    description: t('home.description'),
    applicationName: site.domain,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Opts every page under this layout into static rendering.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'common' });

  // Server Components read messages straight from the request config, so the
  // client provider only needs the namespaces used by Client Components —
  // here, the header and the error boundary. Passing the whole catalogue would
  // serialise every résumé and contact string into every page's payload.
  const { nav, theme, locale: localeMessages, error } = await getMessages();
  const clientMessages = { nav, theme, locale: localeMessages, error };

  return (
    <html
      lang={locale}
      className={`${archivo.variable} ${interCyrillic.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <NextIntlClientProvider messages={clientMessages}>
          <div className="pageField">
            <a className="srOnly" href="#main">
              {t('skipToContent')}
            </a>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
