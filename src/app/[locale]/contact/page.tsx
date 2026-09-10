import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ContactAside from '@/components/contact/ContactAside';
import ContactForm from '@/components/contact/ContactForm';
import { routing } from '@/i18n/routing';

const MONO = 'var(--font-mono), var(--font-mono-fallback)';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;

  return {
    title: t('contact.title'),
    description: t('contact.description'),
    alternates: {
      canonical: `${prefix}/contact`,
      languages: { en: '/contact', bg: '/bg/contact' },
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <Box component="section" sx={{ position: 'relative', overflow: 'hidden' }}>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          background:
            'radial-gradient(560px circle at 90% -10%, rgba(135, 43, 255, 0.1), transparent 60%)',
        }}
      />
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Box className="anim-fade-up" sx={{ maxWidth: 640 }}>
          <Typography
            component="p"
            sx={{
              fontFamily: MONO,
              color: 'primary.main',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              mb: 1.5,
            }}
          >
            {'// '}
            {t('eyebrow')}
          </Typography>
          <Typography variant="h2" component="h1">
            {t('title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, fontSize: '1.05rem' }}>
            {t('lead')}
          </Typography>
        </Box>

        <Box
          className="anim-fade-up"
          sx={{
            '--anim-delay': '150ms',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.7fr) minmax(0, 1fr)' },
            gap: { xs: 4, md: 5 },
            alignItems: 'start',
            mt: { xs: 4, md: 6 },
          }}
        >
          <ContactForm />
          <ContactAside />
        </Box>
      </Container>
    </Box>
  );
}
