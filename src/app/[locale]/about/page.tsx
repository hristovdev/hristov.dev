import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import AboutAside from '@/components/about/AboutAside';
import AboutHeader from '@/components/about/AboutHeader';
import ExperienceTimeline from '@/components/about/ExperienceTimeline';
import SkillsCompact from '@/components/about/SkillsCompact';
import ButtonLink from '@/components/shared/ButtonLink';
import Reveal from '@/components/shared/Reveal';
import { routing } from '@/i18n/routing';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;

  return {
    title: t('about.title'),
    description: t('about.description'),
    alternates: {
      canonical: `${prefix}/about`,
      languages: { en: '/about', bg: '/bg/about' },
    },
  };
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box
        aria-hidden
        sx={{ width: 38, height: 3, borderRadius: 2, background: 'var(--accent-grad)', mb: 1.5 }}
      />
      <Typography variant="h4" component="h2">
        {children}
      </Typography>
    </Box>
  );
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about' });
  const summary = t.raw('summary') as string[];

  return (
    <>
      <AboutHeader />
      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 11 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 2.1fr) minmax(0, 1fr)' },
            gap: { xs: 5, md: 6 },
            alignItems: 'start',
          }}
        >
          <Stack spacing={{ xs: 6, md: 8 }}>
            <Box component="section">
              <Stack spacing={2}>
                {summary.map((paragraph) => (
                  <Typography
                    key={paragraph.slice(0, 24)}
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: '1.05rem', lineHeight: 1.75 }}
                  >
                    {paragraph}
                  </Typography>
                ))}
              </Stack>
            </Box>

            <Box component="section">
              <SectionHeading>{t('experience.title')}</SectionHeading>
              <ExperienceTimeline />
            </Box>

            <Box component="section">
              <SectionHeading>{t('skillsTitle')}</SectionHeading>
              <SkillsCompact />
            </Box>

            <Reveal>
              <Paper
                variant="outlined"
                className="no-print"
                sx={{ p: { xs: 3, md: 4 }, borderRadius: '22px', textAlign: 'center' }}
              >
                <Typography variant="h5" component="h2">
                  {t('cta.title')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {t('cta.text')}
                </Typography>
                <ButtonLink
                  href="/contact"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{ mt: 3 }}
                >
                  {t('cta.button')}
                </ButtonLink>
              </Paper>
            </Reveal>
          </Stack>

          <Box component="aside" sx={{ position: { md: 'sticky' }, top: { md: 96 } }}>
            <AboutAside />
          </Box>
        </Box>
      </Container>
    </>
  );
}
