import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import ButtonLink from '@/components/shared/ButtonLink';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 10, md: 16 }, textAlign: 'center' }}>
        <Typography
          component="p"
          className="gradient-text"
          sx={{
            fontFamily: 'var(--font-mono), var(--font-mono-fallback)',
            fontWeight: 800,
            fontSize: 'clamp(5rem, 16vw, 9rem)',
            lineHeight: 1,
          }}
        >
          {t('code')}
        </Typography>
        <Typography variant="h3" component="h1" sx={{ mt: 2 }}>
          {t('title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5 }}>
          {t('text')}
        </Typography>
        <ButtonLink href="/" variant="contained" size="large" sx={{ mt: 4 }}>
          {t('cta')}
        </ButtonLink>
      </Box>
    </Container>
  );
}
