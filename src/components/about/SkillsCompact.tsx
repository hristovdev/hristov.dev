import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { skillGroups } from '@/data/content';

const MONO = 'var(--font-mono), var(--font-mono-fallback)';

export default function SkillsCompact() {
  const t = useTranslations('skills');
  const tAbout = useTranslations('about');

  return (
    <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '22px' }}>
      {skillGroups.map((group, index) => (
        <Box
          key={group.key}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '150px 1fr' },
            gap: { xs: 1, sm: 2 },
            alignItems: 'start',
            py: 1.75,
            borderBottom: index === skillGroups.length - 1 ? 'none' : '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 650, pt: 0.25 }}>
            {t(`groups.${group.key}.title`)}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {group.chips.map((chip) => (
              <Chip
                key={chip}
                label={chip}
                size="small"
                sx={{
                  fontFamily: MONO,
                  fontSize: '0.68rem',
                  height: 24,
                  backgroundColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.07)',
                }}
              />
            ))}
          </Box>
        </Box>
      ))}
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
        {tAbout('skillsNote')}
      </Typography>
    </Paper>
  );
}
