import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { ResumeSidebar } from '@/components/resume/ResumeSidebar';
import { Skills } from '@/components/resume/Skills';
import { TechTicker } from '@/components/resume/TechTicker';
import { Experience, Education } from '@/components/resume/Experience';
import styles from '@/components/resume/Resume.module.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.resume' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === routing.defaultLocale ? '/resume' : `/${locale}/resume`,
      languages: { en: '/resume', bg: '/bg/resume' },
    },
  };
}

function About() {
  const t = useTranslations('resume.about');

  return (
    <section>
      <h2 className={styles.aboutTitle}>{t('title')}</h2>
      <p className={styles.aboutBody}>{t('p1')}</p>
      <p className={styles.aboutBody}>{t('p2')}</p>
    </section>
  );
}

export default async function ResumePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className={styles.layout}>
      <ResumeSidebar />

      <div className={styles.main}>
        <About />
        <Skills />
        <TechTicker />
        <Experience />
        <Education />
      </div>
    </div>
  );
}
