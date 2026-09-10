import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/shared/Reveal';
import Section from '@/components/shared/Section';

const OPTIONS = [
  { key: 'b2b', icon: <BusinessCenterRoundedIcon /> },
  { key: 'fulltime', icon: <BadgeRoundedIcon /> },
] as const;

export default function EngagementSection() {
  const t = useTranslations('engagement');
  const chips = t.raw('timezone.chips') as string[];

  return (
    <Section eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 2.5, md: 3 },
        }}
      >
        {OPTIONS.map((option, index) => (
          <Reveal key={option.key} delay={index * 80}>
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 3, md: 3.5 },
                borderRadius: '22px',
                height: '100%',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.45)',
                  boxShadow: '0 18px 44px rgba(135, 43, 255, 0.12)',
                },
              }}
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: '14px',
                  color: 'primary.main',
                  backgroundColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.12)',
                }}
              >
                {option.icon}
              </Box>
              <Typography variant="h5" component="h3" sx={{ mt: 2 }}>
                {t(`${option.key}.title`)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {t(`${option.key}.text`)}
              </Typography>
            </Paper>
          </Reveal>
        ))}
      </Box>

      <Reveal delay={160} sx={{ mt: { xs: 2.5, md: 3 } }}>
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 3, md: 3.5 },
            borderRadius: '22px',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { md: 'center' },
            gap: { xs: 2, md: 3 },
          }}
        >
          <Box
            sx={{
              width: 46,
              height: 46,
              flexShrink: 0,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '14px',
              color: 'primary.main',
              backgroundColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.12)',
            }}
          >
            <PublicRoundedIcon />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h3">
              {t('timezone.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {t('timezone.text')}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
            {chips.map((chip) => (
              <Chip
                key={chip}
                label={chip}
                size="small"
                sx={{
                  fontFamily: 'var(--font-mono), var(--font-mono-fallback)',
                  fontSize: '0.72rem',
                  backgroundColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.07)',
                  border: '1px solid',
                  borderColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.18)',
                }}
              />
            ))}
          </Stack>
        </Paper>
      </Reveal>
    </Section>
  );
}
