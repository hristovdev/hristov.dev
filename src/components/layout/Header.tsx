'use client';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import LocaleSwitcher from '@/components/layout/LocaleSwitcher';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { Link, usePathname } from '@/i18n/navigation';

const NAV_ITEMS = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

function Logo() {
  return (
    <Typography
      component="span"
      sx={{
        fontFamily: 'var(--font-mono), var(--font-mono-fallback)',
        fontWeight: 700,
        fontSize: '1.05rem',
        letterSpacing: '-0.02em',
        color: 'text.primary',
      }}
    >
      hristov
      <Box component="span" sx={{ color: 'primary.main' }}>
        .dev
      </Box>
    </Typography>
  );
}

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <AppBar
      component="header"
      className="site-header"
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        backdropFilter: 'blur(14px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(14px) saturate(1.5)',
        backgroundColor: 'rgba(var(--mui-palette-background-defaultChannel) / 0.72)',
        borderBottom: '1px solid',
        borderBottomColor: scrolled ? 'divider' : 'transparent',
        transition: 'border-color 0.25s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: 0.5 }}>
          <Box
            component={Link}
            href="/"
            aria-label={t('home')}
            sx={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
          >
            <Logo />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Button
                  key={item.key}
                  component={Link}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  sx={{
                    px: 1.75,
                    color: active ? 'text.primary' : 'text.secondary',
                    fontWeight: active ? 650 : 500,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 14,
                      right: 14,
                      bottom: 6,
                      height: 2,
                      borderRadius: 1,
                      background: 'var(--accent-grad)',
                      transform: active ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.25s ease',
                    },
                    '&:hover': { color: 'text.primary', backgroundColor: 'transparent' },
                    '&:hover::after': { transform: 'scaleX(1)' },
                  }}
                >
                  {t(item.key)}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, ml: { md: 1.5 } }}>
            <ThemeToggle />
            <LocaleSwitcher />
            <IconButton
              aria-label={t('openMenu')}
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { md: 'none' }, color: 'text.secondary' }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 'min(320px, 86vw)',
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              backgroundImage: 'none',
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            pl: 3,
          }}
        >
          <Logo />
          <IconButton aria-label={t('menuTitle')} onClick={() => setDrawerOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 1.5 }}>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={active}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    px: 2,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(var(--mui-palette-primary-mainChannel) / 0.1)',
                    },
                  }}
                >
                  <ListItemText
                    primary={t(item.key)}
                    slotProps={{
                      primary: {
                        sx: { fontSize: '1.15rem', fontWeight: active ? 700 : 500 },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </AppBar>
  );
}
