'use client';

import CallRoundedIcon from '@mui/icons-material/CallRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import FacebookIcon from '@mui/icons-material/Facebook';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import AsideCard from '@/components/shared/AsideCard';
import { site } from '@/data/site';

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75 }}>
      <Box
        sx={{
          width: 38,
          height: 38,
          flexShrink: 0,
          display: 'grid',
          placeItems: 'center',
          borderRadius: '12px',
          color: 'primary.main',
          backgroundColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.1)',
        }}
      >
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          {label}
        </Typography>
        {children}
      </Box>
    </Box>
  );
}

export default function ContactAside() {
  const t = useTranslations('contact');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — the mailto link still works
    }
  };

  return (
    <Stack spacing={3}>
      <AsideCard title={t('direct.title')}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ContactRow
              icon={<MailOutlineRoundedIcon fontSize="small" />}
              label={t('direct.emailLabel')}
            >
              <MuiLink
                href={`mailto:${site.email}`}
                variant="body2"
                sx={{ fontWeight: 600, wordBreak: 'break-all' }}
              >
                {site.email}
              </MuiLink>
            </ContactRow>
            <Tooltip title={t('direct.copy')}>
              <IconButton
                size="small"
                onClick={copyEmail}
                aria-label={t('direct.copy')}
                sx={{ ml: 'auto' }}
              >
                <ContentCopyRoundedIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Tooltip>
          </Box>

          <ContactRow icon={<CallRoundedIcon fontSize="small" />} label={t('direct.phoneLabel')}>
            <MuiLink href={`tel:${site.phone}`} variant="body2" sx={{ fontWeight: 600 }}>
              {site.phoneDisplay}
            </MuiLink>
          </ContactRow>

          <ContactRow
            icon={<FmdGoodRoundedIcon fontSize="small" />}
            label={t('direct.locationLabel')}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {site.location.city}, {site.location.country}
              {' · '}
              <MuiLink
                href={site.location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="body2"
              >
                {t('direct.map')}
              </MuiLink>
            </Typography>
          </ContactRow>
        </Stack>
      </AsideCard>

      <AsideCard title={t('availability.title')}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
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
          <Typography variant="body2" sx={{ fontWeight: 650 }}>
            {t('availability.status')}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.65 }}>
          {t('availability.note')}
        </Typography>
      </AsideCard>

      <AsideCard title={t('socials.title')}>
        <Stack direction="row" spacing={1}>
          {[
            { label: 'GitHub', href: site.social.github, icon: <GitHubIcon fontSize="small" /> },
            {
              label: 'LinkedIn',
              href: site.social.linkedin,
              icon: <LinkedInIcon fontSize="small" />,
            },
            {
              label: 'Facebook',
              href: site.social.facebook,
              icon: <FacebookIcon fontSize="small" />,
            },
          ].map((social) => (
            <IconButton
              key={social.label}
              component="a"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              sx={{
                color: 'text.secondary',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
              }}
            >
              {social.icon}
            </IconButton>
          ))}
        </Stack>
      </AsideCard>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message={t('direct.copied')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Stack>
  );
}
