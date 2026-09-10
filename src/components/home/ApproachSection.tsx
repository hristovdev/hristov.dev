import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/shared/Reveal';
import Section from '@/components/shared/Section';

const ITEMS = ['clean', 'collab', 'polish', 'ownership'] as const;

export default function ApproachSection() {
  const t = useTranslations('approach');

  return (
    <Section eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
          gap: { xs: 3, md: 4 },
        }}
      >
        {ITEMS.map((item, index) => (
          <Reveal key={item} delay={index * 80}>
            <Box sx={{ height: '100%' }}>
              <Box
                aria-hidden
                sx={{
                  width: 38,
                  height: 3,
                  borderRadius: 2,
                  background: 'var(--accent-grad)',
                  mb: 2,
                }}
              />
              <Typography
                component="p"
                sx={{
                  fontFamily: 'var(--font-mono), var(--font-mono-fallback)',
                  color: 'primary.main',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  mb: 1,
                }}
              >
                {`0${index + 1}`}
              </Typography>
              <Typography variant="h6" component="h3">
                {t(`items.${item}.title`)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t(`items.${item}.text`)}
              </Typography>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
