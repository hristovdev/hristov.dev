import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import AppLink from '@/components/shared/AppLink';
import { site } from '@/data/site';

const NAV_ITEMS = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

const SOCIALS = [
  { label: 'GitHub', href: site.social.github, icon: <GitHubIcon fontSize="small" /> },
  { label: 'LinkedIn', href: site.social.linkedin, icon: <LinkedInIcon fontSize="small" /> },
  { label: 'Facebook', href: site.social.facebook, icon: <FacebookIcon fontSize="small" /> },
] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tHero = useTranslations('hero');
  const year = String(new Date().getFullYear());

  return (
    <Box
      component="footer"
      className="site-footer"
      sx={{ borderTop: '1px solid', borderColor: 'divider', py: { xs: 5, md: 7 }, mt: 'auto' }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr' },
            gap: 4,
          }}
        >
          <Box>
            <Typography
              component="p"
              sx={{
                fontFamily: 'var(--font-mono), var(--font-mono-fallback)',
                fontWeight: 700,
                fontSize: '1.05rem',
                letterSpacing: '-0.02em',
              }}
            >
              hristov
              <Box component="span" sx={{ color: 'primary.main' }}>
                .dev
              </Box>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, maxWidth: 320 }}>
              {t('tagline')}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                mt: 1.5,
                display: 'block',
                fontFamily: 'var(--font-mono), var(--font-mono-fallback)',
              }}
            >
              {tHero('location')}
            </Typography>
          </Box>

          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.12em' }}>
              {t('nav')}
            </Typography>
            <Stack sx={{ mt: 1, alignItems: 'flex-start' }} spacing={1}>
              {NAV_ITEMS.map((item) => (
                <AppLink
                  key={item.key}
                  href={item.href}
                  variant="body2"
                  color="text.secondary"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  {tNav(item.key)}
                </AppLink>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.12em' }}>
              {t('contact')}
            </Typography>
            <Stack sx={{ mt: 1, alignItems: 'flex-start' }} spacing={1}>
              <MuiLink
                href={`mailto:${site.email}`}
                variant="body2"
                color="text.secondary"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                {site.email}
              </MuiLink>
              <MuiLink
                href={`tel:${site.phone}`}
                variant="body2"
                color="text.secondary"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                {site.phoneDisplay}
              </MuiLink>
            </Stack>
            <Stack direction="row" spacing={0.5} sx={{ mt: 1.5, ml: -1 }}>
              {SOCIALS.map((social) => (
                <IconButton
                  key={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  size="small"
                  sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {t('rights', { year })}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {t('madeWith')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
