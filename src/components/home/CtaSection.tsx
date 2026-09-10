import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import ButtonLink from '@/components/shared/ButtonLink';
import Reveal from '@/components/shared/Reveal';
import { site } from '@/data/site';

export default function CtaSection() {
  const t = useTranslations('cta');

  return (
    <Box component="section" className="no-print" sx={{ py: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        <Reveal>
          <Paper
            elevation={0}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '28px',
              px: { xs: 3, md: 8 },
              py: { xs: 6, md: 8 },
              textAlign: 'center',
              color: '#ffffff',
              background: 'linear-gradient(135deg, #5e17c9 0%, #872bff 55%, #a35bff 100%)',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: 340,
                height: 340,
                borderRadius: '50%',
                border: '1.5px solid rgba(255, 255, 255, 0.14)',
                top: -170,
                left: -110,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                width: 420,
                height: 420,
                borderRadius: '50%',
                border: '1.5px solid rgba(255, 255, 255, 0.12)',
                bottom: -230,
                right: -130,
              },
            }}
          >
            <Typography variant="h3" component="h2" sx={{ color: 'inherit' }}>
              {t('title')}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 1.5, color: 'rgba(255, 255, 255, 0.87)', fontSize: '1.05rem' }}
            >
              {t('text')}
            </Typography>
            <ButtonLink
              href="/contact"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                mt: 4,
                backgroundColor: '#ffffff',
                color: '#6a1fd0',
                px: 4,
                '&:hover': { backgroundColor: '#f3ecff' },
              }}
            >
              {t('button')}
            </ButtonLink>
            <Typography variant="body2" sx={{ mt: 2.5, color: 'rgba(255, 255, 255, 0.75)' }}>
              {t('or')}{' '}
              <MuiLink
                href={`mailto:${site.email}`}
                sx={{
                  color: '#ffffff',
                  fontWeight: 600,
                  textDecorationColor: 'rgba(255,255,255,0.5)',
                }}
                underline="always"
              >
                {site.email}
              </MuiLink>
            </Typography>
          </Paper>
        </Reveal>
      </Container>
    </Box>
  );
}
