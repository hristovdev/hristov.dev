'use client';

import { createTheme } from '@mui/material/styles';

/**
 * Brand: #872bff on strongly contrasting neutrals.
 * CSS variables + color schemes give flash-free light/dark/system switching.
 */
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#872bff',
          light: '#a35bff',
          dark: '#6a1fd0',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#171522',
          contrastText: '#ffffff',
        },
        background: {
          default: '#fafafc',
          paper: '#ffffff',
        },
        text: {
          primary: '#171522',
          secondary: '#5d5971',
        },
        divider: 'rgba(23, 21, 34, 0.1)',
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#9d5bff',
          light: '#b388ff',
          dark: '#7a22ea',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#f4f2fa',
          contrastText: '#171522',
        },
        background: {
          default: '#0a0910',
          paper: '#13111b',
        },
        text: {
          primary: '#f4f2fa',
          secondary: '#a9a4be',
        },
        divider: 'rgba(244, 242, 250, 0.09)',
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'var(--font-inter), var(--font-sans-fallback)',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1.04,
      fontSize: 'clamp(2.75rem, 6vw, 4.375rem)',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.15,
      fontSize: 'clamp(1.9rem, 4vw, 2.65rem)',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      fontSize: 'clamp(1.55rem, 3vw, 2.05rem)',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.015em',
    },
    h5: {
      fontWeight: 650,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: 0,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 20,
        },
        sizeLarge: {
          paddingBlock: 12,
          paddingInline: 28,
          fontSize: '1rem',
        },
        contained: {
          '&:hover': {
            boxShadow: '0 10px 30px rgba(135, 43, 255, 0.35)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.75rem',
        },
      },
    },
  },
});

export default theme;
