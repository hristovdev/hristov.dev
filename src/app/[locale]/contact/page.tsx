import type { Metadata } from 'next';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { Kicker } from '@/components/shared/Section';
import { Channels } from '@/components/contact/Channels';
import { ContactForm } from '@/components/contact/ContactForm';
import styles from '@/components/contact/Contact.module.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.contact' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === routing.defaultLocale ? '/contact' : `/${locale}/contact`,
      languages: { en: '/contact', bg: '/bg/contact' },
    },
  };
}

function Intro() {
  const t = useTranslations('contact');
  const common = useTranslations('common');

  return (
    <div className={styles.intro}>
      <Kicker>{common('availability')}</Kicker>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.lead}>{t('lead')}</p>
    </div>
  );
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // The form is the only Client Component on this page, so it gets its own
  // narrow provider rather than widening the one in the layout.
  const messages = await getMessages();
  const formMessages = { contact: { form: (messages.contact as { form: unknown }).form } };

  return (
    <div className={styles.wrap}>
      <Intro />

      <div className={styles.columns}>
        <Channels />
        <NextIntlClientProvider messages={formMessages}>
          <ContactForm />
        </NextIntlClientProvider>
      </div>
    </div>
  );
}
