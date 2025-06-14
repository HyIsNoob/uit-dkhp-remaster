// Color Palette cho Website ĐKHP UIT - 2024 Modern Design
export const colors = {
  // UIT Brand Colors
  primary: {
    50: '#EBF8FF',
    100: '#BEE3F8', 
    200: '#90CDF4',
    300: '#63B3ED',
    400: '#4299E1',
    500: '#0066CC', // UIT Main Blue
    600: '#0052A3',
    700: '#003D7A',
    800: '#002952',
    900: '#001529',
    main: '#0066CC', // Alias for 500
  },
  
  // Secondary Colors
  secondary: {
    50: '#FFF5F5',
    100: '#FFE5E5',
    200: '#FFB3B3',
    300: '#FF8080',
    400: '#FF6B6B', // Coral
    500: '#FF5252',
    600: '#E04545',
    700: '#C53030',
    800: '#A12727',
    900: '#7F1D1D',
    main: '#FF5252', // Alias for 500
  },

  // Success Colors  
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#10B981', // Main Success
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
    main: '#10B981', // Alias for 500
  },

  // Warning Colors
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Main Warning
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
    main: '#F59E0B', // Alias for 500
  },

  // Error Colors
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444', // Main Error
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    main: '#EF4444', // Alias for 500
  },

  // Neutral/Gray Colors
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },

  // Accent Colors
  accent: {
    yellow: '#FFE066',
    purple: '#8B5CF6',
    pink: '#EC4899',
    cyan: '#06B6D4',
    orange: '#F97316',
    lime: '#84CC16',
  },

  // Background Colors
  background: {
    default: '#F8FAFC', // Default background
    primary: '#FFFFFF',
    secondary: '#F8FAFC',
    tertiary: '#F1F5F9',
    paper: '#FFFFFF',
    card: '#FFFFFF',
    overlay: 'rgba(15, 23, 42, 0.1)',
  },

  // Dark Mode Colors
  dark: {
    background: {
      primary: '#0F172A',
      secondary: '#1E293B', 
      tertiary: '#334155',
      paper: '#1E293B',
      card: '#334155',
      overlay: 'rgba(0, 0, 0, 0.8)',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#CBD5E1',
      disabled: '#64748B',
    }
  },

  // Glassmorphism Effects
  glass: {
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },

  // Gradient Colors
  gradients: {
    primary: 'linear-gradient(135deg, #0066CC 0%, #4FC3F7 100%)',
    secondary: 'linear-gradient(135deg, #FF6B6B 0%, #FFE066 100%)',
    success: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    warm: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
    cool: 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)',
    sunset: 'linear-gradient(135deg, #FF6B6B 0%, #FFE066 50%, #4FC3F7 100%)',
    oceanic: 'linear-gradient(135deg, #0066CC 0%, #06B6D4 50%, #10B981 100%)',
  }
} as const;

// Color utilities
export const colorUtils = {
  // Get color with opacity
  withOpacity: (color: string, opacity: number) => {
    if (color.startsWith('#')) {
      const hex = color.substring(1);
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  },

  // Get contrast color (black or white)
  getContrastColor: (color: string) => {
    // Simple contrast calculation
    if (color.includes('#')) {
      const hex = color.substring(1);
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.5 ? '#0F172A' : '#F8FAFC';
    }
    return '#0F172A';
  }
};

// Export individual color sets for easy importing
export const {
  primary,
  secondary, 
  success,
  warning,
  error,
  neutral,
  accent,
  background,
  dark,
  glass,
  gradients
} = colors; 