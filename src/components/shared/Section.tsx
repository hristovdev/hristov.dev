import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

/** A page section with an optional eyebrow / title / subtitle header. */
export default function Section({ id, eyebrow, title, subtitle, children, sx }: SectionProps) {
  const hasHeader = Boolean(eyebrow ?? title ?? subtitle);

  return (
    <Box
      component="section"
      id={id}
      sx={[{ py: { xs: 7, md: 10 } }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Container maxWidth="lg">
        {hasHeader && (
          <Box sx={{ mb: { xs: 4, md: 6 }, maxWidth: 720 }}>
            {eyebrow && (
              <Typography
                component="p"
                sx={{
                  fontFamily: 'var(--font-mono), var(--font-mono-fallback)',
                  color: 'primary.main',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  mb: 1.5,
                }}
              >
                {'// '}
                {eyebrow}
              </Typography>
            )}
            {title && <Typography variant="h2">{title}</Typography>}
            {subtitle && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 1.5, fontSize: '1.05rem' }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        {children}
      </Container>
    </Box>
  );
}
