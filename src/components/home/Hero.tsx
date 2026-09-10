import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ButtonLink from '@/components/shared/ButtonLink';
import { site } from '@/data/site';
import portrait from '../../../public/images/portrait.jpg';

const MONO = 'var(--font-mono), var(--font-mono-fallback)';

const FLOATING_CHIPS = [
  { label: 'React', sx: { top: 20, left: { xs: -6, sm: -24 } }, delay: '0ms' },
  { label: 'TypeScript', sx: { top: '44%', right: { xs: -8, sm: -30 } }, delay: '900ms' },
  { label: 'Next.js', sx: { bottom: 28, left: { xs: 2, sm: -14 } }, delay: '1800ms' },
] as const;

function QuickLink({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip title={label}>
      <IconButton
        component="a"
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        aria-label={label}
        sx={{
          color: 'text.secondary',
          border: '1px solid',
          borderColor: 'divider',
          transition: 'all 0.25s ease',
          '&:hover': {
            color: 'primary.main',
            borderColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.5)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
}

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <Box component="section" sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background: purple glows + fading dot grid */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          background:
            'radial-gradient(640px circle at 10% -5%, rgba(135, 43, 255, 0.12), transparent 60%), radial-gradient(720px circle at 100% 80%, rgba(135, 43, 255, 0.09), transparent 65%)',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          backgroundImage: 'radial-gradient(var(--dot-color) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 25%, transparent 78%)',
        }}
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.15fr 0.85fr' },
            alignItems: 'center',
            gap: { xs: 7, md: 6 },
            py: { xs: 8, md: 13 },
          }}
        >
          <Stack spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box
              className="anim-fade-up"
              sx={{
                '--anim-delay': '0ms',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 1.75,
                py: 0.75,
                borderRadius: 999,
                border: '1px solid',
                borderColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.35)',
                backgroundColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.08)',
              }}
            >
              <Box
                component="span"
                className="pulse-dot"
                sx={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  backgroundColor: 'success.main',
                  flexShrink: 0,
                }}
              />
              <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: '0.02em' }}>
                {t('availability')}
              </Typography>
            </Box>

            <Box className="anim-fade-up" sx={{ '--anim-delay': '80ms' }}>
              <Typography
                component="p"
                sx={{
                  fontFamily: MONO,
                  color: 'primary.main',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  mb: 1.5,
                }}
              >
                {t('eyebrow')}
              </Typography>
              <Typography variant="h1">
                Hristo{' '}
                <Box component="span" className="gradient-text">
                  Hristov
                </Box>
              </Typography>
            </Box>

            <Typography
              className="anim-fade-up"
              variant="h5"
              component="p"
              sx={{ '--anim-delay': '160ms', fontWeight: 550, maxWidth: 540 }}
            >
              {t('tagline')}
            </Typography>

            <Typography
              className="anim-fade-up"
              variant="body1"
              color="text.secondary"
              sx={{ '--anim-delay': '240ms', maxWidth: 560, fontSize: '1.05rem' }}
            >
              {t('intro')}
            </Typography>

            <Stack
              className="anim-fade-up"
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ '--anim-delay': '320ms', pt: 1, width: { xs: '100%', sm: 'auto' } }}
            >
              <ButtonLink
                href="/contact"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
              >
                {t('ctaContact')}
              </ButtonLink>
              <ButtonLink href="/about" variant="outlined" size="large">
                {t('ctaAbout')}
              </ButtonLink>
            </Stack>

            <Stack
              className="anim-fade-up"
              direction="row"
              spacing={1.25}
              sx={{
                '--anim-delay': '400ms',
                alignItems: 'center',
                pt: 1.5,
                flexWrap: 'wrap',
                rowGap: 1.5,
              }}
            >
              <QuickLink label={site.email} href={`mailto:${site.email}`}>
                <MailOutlineRoundedIcon fontSize="small" />
              </QuickLink>
              <QuickLink label={site.phoneDisplay} href={`tel:${site.phone}`}>
                <CallRoundedIcon fontSize="small" />
              </QuickLink>
              <QuickLink label="GitHub" href={site.social.github}>
                <GitHubIcon fontSize="small" />
              </QuickLink>
              <QuickLink label="LinkedIn" href={site.social.linkedin}>
                <LinkedInIcon fontSize="small" />
              </QuickLink>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontFamily: MONO, pl: 0.5 }}
              >
                {t('location')}
              </Typography>
            </Stack>
          </Stack>

          <Box
            className="anim-fade-up"
            sx={{
              '--anim-delay': '200ms',
              position: 'relative',
              justifySelf: { xs: 'center', md: 'end' },
              width: { xs: 'min(320px, 78vw)', md: 380 },
              mr: { md: 3 },
            }}
          >
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                inset: '-14%',
                background: 'var(--hero-glow)',
                filter: 'blur(28px)',
                borderRadius: '50%',
              }}
            />
            <Box
              sx={{
                position: 'relative',
                p: '3px',
                borderRadius: '32px',
                background:
                  'linear-gradient(140deg, rgba(135, 43, 255, 0.95), rgba(135, 43, 255, 0.15) 45%, rgba(179, 136, 255, 0.8))',
              }}
            >
              <Box
                sx={{
                  borderRadius: '29px',
                  overflow: 'hidden',
                  backgroundColor: 'background.paper',
                  lineHeight: 0,
                }}
              >
                <Image
                  src={portrait}
                  alt={t('photoAlt')}
                  priority
                  placeholder="blur"
                  sizes="(max-width: 900px) 320px, 380px"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </Box>
            </Box>
            {FLOATING_CHIPS.map((chip) => (
              <Chip
                key={chip.label}
                label={chip.label}
                className="anim-float"
                sx={{
                  ...chip.sx,
                  '--anim-delay': chip.delay,
                  position: 'absolute',
                  fontFamily: MONO,
                  fontWeight: 600,
                  fontSize: '0.72rem',
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: 'rgba(var(--mui-palette-background-paperChannel) / 0.82)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
