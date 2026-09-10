import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { stats } from '@/data/content';
import NumberTicker from '@/components/shared/NumberTicker';
import Reveal from '@/components/shared/Reveal';

export default function StatsSection() {
  const t = useTranslations('stats');

  return (
    <Box component="section" sx={{ py: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {stats.map((stat, index) => (
            <Reveal key={stat.key} delay={index * 70}>
              <Paper
                variant="outlined"
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderRadius: '20px',
                  height: '100%',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    borderColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.45)',
                  },
                }}
              >
                <Typography
                  variant="h3"
                  component="p"
                  className="gradient-text"
                  sx={{
                    fontFamily: 'var(--font-mono), var(--font-mono-fallback)',
                    fontWeight: 700,
                  }}
                >
                  <NumberTicker value={stat.value} />
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                  {t(stat.key)}
                </Typography>
              </Paper>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
