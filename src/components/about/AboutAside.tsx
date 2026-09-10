import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import AsideCard from '@/components/shared/AsideCard';

const MONO = 'var(--font-mono), var(--font-mono-fallback)';
const FACT_KEYS = [
  'location',
  'timezone',
  'experience',
  'availability',
  'engagement',
  'languages',
] as const;

export default function AboutAside() {
  const t = useTranslations('about');

  return (
    <Stack spacing={3}>
      <AsideCard title={t('facts.title')}>
        <Stack
          spacing={1.5}
          divider={<Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }} />}
        >
          {FACT_KEYS.map((key) => (
            <Box key={key}>
              <Typography variant="caption" color="text.secondary">
                {t(`facts.${key}.label`)}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {t(`facts.${key}.value`)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </AsideCard>

      <AsideCard title={t('education.title')}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {t('education.degree')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {t('education.school')}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontFamily: MONO, display: 'block', mt: 0.75 }}
        >
          {t('education.period')}
        </Typography>
      </AsideCard>

      <AsideCard title={t('languages.title')}>
        <Stack spacing={1.25}>
          {(['bulgarian', 'english'] as const).map((key) => (
            <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {t(`languages.${key}.name`)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t(`languages.${key}.level`)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </AsideCard>

      <AsideCard title={t('beyond.title')}>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
          {t('beyond.text')}
        </Typography>
      </AsideCard>
    </Stack>
  );
}
