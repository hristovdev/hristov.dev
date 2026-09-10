'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Link } from '@/i18n/navigation';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t = useTranslations('error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 10, md: 16 }, textAlign: 'center' }}>
        <Typography variant="h3" component="h1">
          {t('title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5 }}>
          {t('text')}
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ justifyContent: 'center', mt: 4 }}
        >
          <Button variant="contained" size="large" onClick={reset}>
            {t('retry')}
          </Button>
          <Button component={Link} href="/" variant="outlined" size="large">
            {t('home')}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
