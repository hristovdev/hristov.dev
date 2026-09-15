import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/layout/JsonLd';
import { Reveal } from '@/components/shared/Reveal';
import { Hero } from '@/components/home/Hero';
import { FactsStrip } from '@/components/home/FactsStrip';
import { SelectedWork } from '@/components/home/SelectedWork';
import { Process } from '@/components/home/Process';
import { Principles } from '@/components/home/Principles';
import { Engagement } from '@/components/home/Engagement';
import { ClosingCta } from '@/components/home/ClosingCta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, '', 'home');
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd locale={locale} route="" />
      {/* The hero is above the fold, so it uses the page fade rather than a
          scroll reveal — nothing should wait for a scroll that never happens. */}
      <Hero />
      <FactsStrip />
      <Reveal>
        <SelectedWork />
      </Reveal>
      <Reveal>
        <Process />
      </Reveal>
      <Reveal>
        <Principles />
      </Reveal>
      <Reveal>
        <Engagement />
      </Reveal>
      <Reveal>
        <ClosingCta />
      </Reveal>
    </>
  );
}
