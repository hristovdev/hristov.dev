import { site } from '@/data/site';
import { pathFor, type Route } from '@/lib/metadata';

/**
 * Structured data, rendered into the static HTML from the locale layout.
 *
 * `Person` is the entity this site is about; `WebSite` and `WebPage` give it
 * somewhere to live. The nodes are linked by `@id` rather than repeated, so a
 * crawler resolves one person across all three pages instead of reading three
 * unrelated people who happen to share a name.
 */
export function JsonLd({ locale, route }: { locale: string; route: Route }) {
  const personId = `${site.url}/#person`;
  const siteId = `${site.url}/#website`;
  const pageUrl = new URL(pathFor(locale, route), site.url).toString();

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    jobTitle: 'Senior Full-Stack Developer',
    description: 'Senior full-stack developer working in React, TypeScript and Node.js.',
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
    '@type': 'WebSite',
    '@id': siteId,
    name: site.domain,
    url: site.url,
    inLanguage: locale,
    publisher: { '@id': personId },
    author: { '@id': personId },
  };

  /*
   * ProfilePage is the type Google documents for a page that is *about* a
   * person; the other two are ordinary WebPages that merely mention one.
   */
  const page = {
    '@type': route === '' ? 'ProfilePage' : 'WebPage',
    '@id': `${pageUrl}#page`,
    url: pageUrl,
    isPartOf: { '@id': siteId },
    about: { '@id': personId },
    inLanguage: locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [person, website, page],
        }),
      }}
    />
  );
}
