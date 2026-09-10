import CallRoundedIcon from '@mui/icons-material/CallRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import DownloadCvButton from '@/components/about/DownloadCvButton';
import { site } from '@/data/site';
import portrait from '../../../public/images/portrait.jpg';

const MONO = 'var(--font-mono), var(--font-mono-fallback)';

export default function AboutHeader() {
  const t = useTranslations('about');
  const tHero = useTranslations('hero');

  const contactChips = [
    {
      key: 'location',
      icon: <FmdGoodRoundedIcon />,
      label: `${site.location.city}, ${site.location.country}`,
      href: site.location.mapUrl,
    },
    {
      key: 'email',
      icon: <MailOutlineRoundedIcon />,
      label: site.email,
      href: `mailto:${site.email}`,
    },
    {
      key: 'phone',
      icon: <CallRoundedIcon />,
      label: site.phoneDisplay,
      href: `tel:${site.phone}`,
    },
  ];

  return (
    <Box component="section" sx={{ position: 'relative', overflow: 'hidden' }}>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          background:
            'radial-gradient(560px circle at 8% -10%, rgba(135, 43, 255, 0.1), transparent 60%)',
        }}
      />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
            alignItems: 'center',
            gap: { xs: 4, md: 6 },
            py: { xs: 6, md: 9 },
          }}
        >
          <Box className="anim-fade-up">
            <Typography
              component="p"
              sx={{
                fontFamily: MONO,
                color: 'primary.main',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                mb: 1.5,
              }}
            >
              {'// '}
              {t('eyebrow')}
            </Typography>
            <Typography variant="h2" component="h1">
              {site.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1, fontSize: '1.05rem' }}>
              {t('role')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
              {contactChips.map((chip) => (
                <Chip
                  key={chip.key}
                  icon={chip.icon}
                  label={chip.label}
                  component="a"
                  href={chip.href}
                  target={chip.href.startsWith('http') ? '_blank' : undefined}
                  clickable
                  variant="outlined"
                  sx={{
                    '& .MuiChip-icon': { color: 'primary.main', fontSize: '1.05rem' },
                    borderColor: 'divider',
                  }}
                />
              ))}
            </Box>
            <Box sx={{ mt: 3 }}>
              <DownloadCvButton label={t('downloadCv')} />
            </Box>
          </Box>

          <Box
            className="anim-fade-up"
            sx={{
              '--anim-delay': '150ms',
              justifySelf: { xs: 'start', md: 'end' },
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <Box
              sx={{
                p: '3px',
                borderRadius: '50%',
                background:
                  'linear-gradient(140deg, rgba(135, 43, 255, 0.95), rgba(135, 43, 255, 0.2) 50%, rgba(179, 136, 255, 0.8))',
              }}
            >
              <Box sx={{ borderRadius: '50%', overflow: 'hidden', lineHeight: 0 }}>
                <Image
                  src={portrait}
                  alt={tHero('photoAlt')}
                  width={148}
                  height={148}
                  placeholder="blur"
                  style={{ display: 'block' }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
