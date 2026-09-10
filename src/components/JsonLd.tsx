import { getTranslations } from 'next-intl/server';
import { site } from '@/data/site';

/** Person + WebSite structured data for search engines. */
export default async function JsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'meta' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: site.name,
        url: site.url,
        image: `${site.url}/images/portrait.jpg`,
        jobTitle: t('ogRole'),
        email: `mailto:${site.email}`,
        telephone: site.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.location.city,
          addressCountry: 'BG',
        },
        sameAs: [site.social.github, site.social.linkedin, site.social.facebook],
        knowsLanguage: ['bg', 'en'],
      },
      {
        '@type': 'WebSite',
        name: site.domain,
        url: site.url,
        inLanguage: locale,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
