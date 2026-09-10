import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/shared/Reveal';
import { experience } from '@/data/content';

const MONO = 'var(--font-mono), var(--font-mono-fallback)';

export default function ExperienceTimeline() {
  const t = useTranslations('about.experience');

  return (
    <Box
      component="ol"
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 5,
          top: 8,
          bottom: 8,
          width: 2,
          borderRadius: 1,
          background: 'linear-gradient(180deg, rgba(135, 43, 255, 0.75), rgba(135, 43, 255, 0.08))',
        },
      }}
    >
      {experience.map((job, index) => {
        const bullets = t.raw(`items.${job.key}.bullets`) as string[];
        const isLast = index === experience.length - 1;

        return (
          <Box
            key={job.key}
            component="li"
            sx={{ position: 'relative', pl: { xs: 3.5, sm: 4.5 }, pb: isLast ? 0 : 5 }}
          >
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                left: 0,
                top: 8,
                width: 12,
                height: 12,
                borderRadius: '50%',
                border: '2.5px solid',
                borderColor: 'primary.main',
                backgroundColor: 'background.default',
                boxShadow: job.current
                  ? '0 0 0 5px rgba(var(--mui-palette-primary-mainChannel) / 0.15)'
                  : 'none',
              }}
            />
            <Reveal delay={index * 60}>
              <Chip
                label={t(`items.${job.key}.period`)}
                size="small"
                sx={{
                  fontFamily: MONO,
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'primary.main',
                  backgroundColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.1)',
                }}
              />
              <Typography variant="h5" component="h3" sx={{ mt: 1.25 }}>
                {t(`items.${job.key}.role`)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {t(`items.${job.key}.company`)} · {t(`items.${job.key}.location`)}
              </Typography>
              <Box
                component="ul"
                sx={{ listStyle: 'none', m: 0, mt: 1.75, p: 0, display: 'grid', gap: 1 }}
              >
                {bullets.map((bullet) => (
                  <Typography
                    key={bullet}
                    component="li"
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: 'flex',
                      gap: 1.25,
                      lineHeight: 1.65,
                      '&::before': { content: '"▹"', color: 'primary.main', flexShrink: 0 },
                    }}
                  >
                    {bullet}
                  </Typography>
                ))}
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 2 }}>
                {job.tech.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontFamily: MONO,
                      fontSize: '0.68rem',
                      height: 24,
                      borderColor: 'divider',
                      color: 'text.secondary',
                    }}
                  />
                ))}
              </Box>
            </Reveal>
          </Box>
        );
      })}
    </Box>
  );
}
