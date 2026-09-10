import { setRequestLocale } from 'next-intl/server';
import ApproachSection from '@/components/home/ApproachSection';
import CtaSection from '@/components/home/CtaSection';
import EngagementSection from '@/components/home/EngagementSection';
import Hero from '@/components/home/Hero';
import SkillsSection from '@/components/home/SkillsSection';
import StatsSection from '@/components/home/StatsSection';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <StatsSection />
      <SkillsSection />
      <ApproachSection />
      <EngagementSection />
      <CtaSection />
    </>
  );
}
