import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/layout/JsonLd';
import { ResumeSidebar } from '@/components/resume/ResumeSidebar';
import { Skills } from '@/components/resume/Skills';
import { TechTicker } from '@/components/resume/TechTicker';
import { Experience, Education } from '@/components/resume/Experience';
import styles from '@/components/resume/Resume.module.scss';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, '/resume', 'resume');
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
      <JsonLd locale={locale} route="/resume" />
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
