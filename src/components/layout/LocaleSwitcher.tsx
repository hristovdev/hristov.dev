'use client';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

const SHORT_LABELS: Record<Locale, string> = {
  en: 'EN',
  bg: 'БГ',
};

export default function LocaleSwitcher() {
  const t = useTranslations('locale');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const switchTo = (nextLocale: Locale) => {
    setAnchorEl(null);
    if (nextLocale !== locale) {
      router.replace(pathname, { locale: nextLocale });
    }
  };

  return (
    <>
      <Tooltip title={t('label')}>
        <Button
          aria-label={t('label')}
          onClick={(event) => setAnchorEl(event.currentTarget)}
          startIcon={<TranslateRoundedIcon sx={{ fontSize: '1.1rem !important' }} />}
          sx={{ color: 'text.secondary', minWidth: 0, px: 1.25, fontWeight: 600 }}
        >
          {SHORT_LABELS[locale]}
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { minWidth: 170, borderRadius: 3 } } }}
      >
        {routing.locales.map((option) => (
          <MenuItem key={option} selected={option === locale} onClick={() => switchTo(option)}>
            <ListItemText>{t(option)}</ListItemText>
            {option === locale && (
              <CheckRoundedIcon fontSize="small" sx={{ ml: 1.5, color: 'primary.main' }} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
