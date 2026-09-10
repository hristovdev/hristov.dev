import { site } from '@/data/site';

/**
 * Person + WebSite structured data. Rendered once per page from the locale
 * layout; search engines read it from the static HTML.
 */
export function JsonLd({ locale }: { locale: string }) {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: 'Senior Full-Stack Developer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    sameAs: [site.social.github, site.social.linkedin],
    knowsLanguage: ['en', 'bg'],
    knowsAbout: ['React', 'TypeScript', 'Next.js', 'Node.js', 'Frontend architecture'],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.domain,
    url: site.url,
    inLanguage: locale,
    author: { '@type': 'Person', name: site.name },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([person, website]) }}
    />
  );
}
