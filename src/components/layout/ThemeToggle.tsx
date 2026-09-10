'use client';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import SettingsBrightnessRoundedIcon from '@mui/icons-material/SettingsBrightnessRounded';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useColorScheme } from '@mui/material/styles';
import { useTranslations } from 'next-intl';
import { useState, useSyncExternalStore } from 'react';

const MODES = ['light', 'dark', 'system'] as const;
type Mode = (typeof MODES)[number];

const ICONS: Record<Mode, React.ReactNode> = {
  light: <LightModeRoundedIcon fontSize="small" />,
  dark: <DarkModeRoundedIcon fontSize="small" />,
  system: <SettingsBrightnessRoundedIcon fontSize="small" />,
};

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const t = useTranslations('theme');
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  // Server and first client render agree on "not mounted", avoiding a hydration mismatch
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const current: Mode = mounted && mode ? mode : 'system';

  return (
    <>
      <Tooltip title={t('label')}>
        <IconButton
          aria-label={t('label')}
          onClick={(event) => setAnchorEl(event.currentTarget)}
          sx={{ color: 'text.secondary' }}
        >
          {ICONS[current]}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { minWidth: 170, borderRadius: 3 } } }}
      >
        {MODES.map((option) => (
          <MenuItem
            key={option}
            selected={current === option}
            onClick={() => {
              setMode(option);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon sx={{ color: current === option ? 'primary.main' : undefined }}>
              {ICONS[option]}
            </ListItemIcon>
            <ListItemText>{t(option)}</ListItemText>
            {current === option && (
              <CheckRoundedIcon fontSize="small" sx={{ ml: 1.5, color: 'primary.main' }} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
