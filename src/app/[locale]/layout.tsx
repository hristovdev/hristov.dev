import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import ThemeRegistry from '@/components/ThemeRegistry';
import { site } from '@/data/site';
import { routing } from '@/i18n/routing';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
  display: 'swap',
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0910' },
  ],
};

export async function generateMetadata({
  params,
}: Omit<LayoutProps, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t('home.title'),
      template: `%s · ${site.name}`,
    },
    description: t('home.description'),
    alternates: {
      canonical: prefix || '/',
      languages: { en: '/', bg: '/bg' },
    },
    openGraph: {
      type: 'website',
      siteName: site.domain,
      title: t('home.title'),
      description: t('home.description'),
      locale: locale === 'bg' ? 'bg_BG' : 'en_US',
      url: prefix || '/',
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <InitColorSchemeScript attribute="class" defaultMode="system" />
        <ThemeRegistry>
          <NextIntlClientProvider>
            <JsonLd locale={locale} />
            <Header />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
