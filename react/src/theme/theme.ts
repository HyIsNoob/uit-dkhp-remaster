import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import { colors } from './colors';
import { typography } from './typography';

// Breakpoints cho responsive design
const breakpoints = {
  values: {
    xs: 0,
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1536,
  },
};

// Spacing system (8px base)
const spacing = 8;

// Shadow system
const shadows = [
  'none',
  '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
  '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
  '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
  '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
  '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
  
  // Glassmorphism shadows
  '0px 8px 32px 0px rgba(31, 38, 135, 0.15)',
  '0px 12px 40px 0px rgba(31, 38, 135, 0.2)',
  '0px 16px 48px 0px rgba(31, 38, 135, 0.25)',
  
  // Soft shadows
  '0px 2px 8px 0px rgba(99, 99, 99, 0.2)',
  '0px 4px 12px 0px rgba(99, 99, 99, 0.15)',
  '0px 6px 16px 0px rgba(99, 99, 99, 0.1)',
  
  // Colored shadows
  '0px 4px 14px 0px rgba(0, 102, 204, 0.15)', // Primary shadow
  '0px 4px 14px 0px rgba(255, 107, 107, 0.15)', // Secondary shadow
  '0px 4px 14px 0px rgba(16, 185, 129, 0.15)', // Success shadow
  '0px 4px 14px 0px rgba(245, 158, 11, 0.15)', // Warning shadow
  '0px 4px 14px 0px rgba(239, 68, 68, 0.15)', // Error shadow
  
  // Special effects
  '0px 0px 20px 0px rgba(0, 102, 204, 0.3)', // Glow effect
  '0px 0px 30px 0px rgba(0, 102, 204, 0.2)', // Large glow
  
  // Mobile optimized
  '0px 1px 4px 0px rgba(0, 0, 0, 0.1)',
  '0px 2px 8px 0px rgba(0, 0, 0, 0.1)',
  '0px 4px 16px 0px rgba(0, 0, 0, 0.1)',
  '0px 8px 24px 0px rgba(0, 0, 0, 0.1)',
  '0px 16px 32px 0px rgba(0, 0, 0, 0.1)',
] as any;

// Border radius
const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

// Base theme options
const baseThemeOptions: ThemeOptions = {
  breakpoints,
  spacing,
  shadows,
  typography,
  
  shape: {
    borderRadius: borderRadius.md,
  },
  
  components: {
    // Global overrides
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          fontFamily: typography.fontFamily,
          lineHeight: 1.6,
        },
      },
    },
    
    // Button component
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.lg,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
          padding: '10px 20px',
          boxShadow: 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: colors.gradients.primary,
          '&:hover': {
            background: colors.gradients.primary,
            filter: 'brightness(1.1)',
          },
        },
        containedSecondary: {
          background: colors.gradients.secondary,
          '&:hover': {
            background: colors.gradients.secondary,
            filter: 'brightness(1.1)',
          },
        },
      },
    },
    
    // Card component
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.xl,
          boxShadow: shadows[3],
          border: `1px solid ${colors.neutral[200]}`,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: shadows[8],
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    
    // Paper component
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.lg,
        },
        elevation1: {
          boxShadow: shadows[1],
        },
        elevation2: {
          boxShadow: shadows[2],
        },
        elevation3: {
          boxShadow: shadows[3],
        },
      },
    },
    
    // Drawer component
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: `0 ${borderRadius.xl}px ${borderRadius.xl}px 0`,
          border: 'none',
          boxShadow: shadows[6],
        },
      },
    },
  },
};

// Light theme
export const lightTheme: Theme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary[500],
      light: colors.primary[400],
      dark: colors.primary[600],
      contrastText: colors.neutral[50],
    },
    secondary: {
      main: colors.secondary[400],
      light: colors.secondary[300],
      dark: colors.secondary[500],
      contrastText: colors.neutral[50],
    },
    success: {
      main: colors.success[500],
      light: colors.success[400],
      dark: colors.success[600],
      contrastText: colors.neutral[50],
    },
    warning: {
      main: colors.warning[500],
      light: colors.warning[400],
      dark: colors.warning[600],
      contrastText: colors.neutral[50],
    },
    error: {
      main: colors.error[500],
      light: colors.error[400],
      dark: colors.error[600],
      contrastText: colors.neutral[50],
    },
    background: {
      default: colors.background.secondary,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600],
      disabled: colors.neutral[400],
    },
    divider: colors.neutral[200],
    grey: {
      50: colors.neutral[50],
      100: colors.neutral[100],
      200: colors.neutral[200],
      300: colors.neutral[300],
      400: colors.neutral[400],
      500: colors.neutral[500],
      600: colors.neutral[600],
      700: colors.neutral[700],
      800: colors.neutral[800],
      900: colors.neutral[900],
    },
  },
});

// Dark theme  
export const darkTheme: Theme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary[400],
      light: colors.primary[300],
      dark: colors.primary[500],
      contrastText: colors.dark.text.primary,
    },
    secondary: {
      main: colors.secondary[400],
      light: colors.secondary[300],
      dark: colors.secondary[500],
      contrastText: colors.dark.text.primary,
    },
    success: {
      main: colors.success[400],
      light: colors.success[300],
      dark: colors.success[500],
      contrastText: colors.dark.text.primary,
    },
    warning: {
      main: colors.warning[400],
      light: colors.warning[300],
      dark: colors.warning[500],
      contrastText: colors.dark.text.primary,
    },
    error: {
      main: colors.error[400],
      light: colors.error[300],
      dark: colors.error[500],
      contrastText: colors.dark.text.primary,
    },
    background: {
      default: colors.dark.background.primary,
      paper: colors.dark.background.paper,
    },
    text: {
      primary: colors.dark.text.primary,
      secondary: colors.dark.text.secondary,
      disabled: colors.dark.text.disabled,
    },
    divider: colors.neutral[700],
    grey: {
      50: colors.neutral[900],
      100: colors.neutral[800],
      200: colors.neutral[700],
      300: colors.neutral[600],
      400: colors.neutral[500],
      500: colors.neutral[400],
      600: colors.neutral[300],
      700: colors.neutral[200],
      800: colors.neutral[100],
      900: colors.neutral[50],
    },
  },
});

// Theme utilities
export const themeUtils = {
  borderRadius,
  colors,
  typography,
  breakpoints,
  shadows,
};

// Default export
export default lightTheme; 