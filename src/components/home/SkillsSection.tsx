import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { skillGroups, type SkillGroupKey } from '@/data/content';
import Reveal from '@/components/shared/Reveal';
import Section from '@/components/shared/Section';

const ICONS: Record<SkillGroupKey, React.ReactNode> = {
  frontend: <CodeRoundedIcon />,
  backend: <StorageRoundedIcon />,
  devops: <RocketLaunchRoundedIcon />,
  testing: <VerifiedRoundedIcon />,
};

export default function SkillsSection() {
  const t = useTranslations('skills');

  return (
    <Section eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 2.5, md: 3 },
        }}
      >
        {skillGroups.map((group, index) => (
          <Reveal key={group.key} delay={index * 80}>
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
                {ICONS[group.key]}
              </Box>
              <Typography variant="h5" component="h3" sx={{ mt: 2 }}>
                {t(`groups.${group.key}.title`)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2.5 }}>
                {t(`groups.${group.key}.description`)}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {group.chips.map((chip) => (
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
              </Box>
            </Paper>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
