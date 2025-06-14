import React from 'react';
import { 
  Button as MuiButton, 
  ButtonProps as MuiButtonProps, 
  CircularProgress,
  styled 
} from '@mui/material';
import { colors } from '../../theme';

// Styled Button variants
const GradientButton = styled(MuiButton)(({ theme }) => ({
  background: colors.gradients.primary,
  border: 'none',
  color: colors.neutral[50],
  fontWeight: 600,
  padding: '12px 24px',
  borderRadius: 12,
  boxShadow: '0 4px 14px 0 rgba(0, 102, 204, 0.2)',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: colors.gradients.primary,
    filter: 'brightness(1.1)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px 0 rgba(0, 102, 204, 0.3)',
  },
  '&:active': {
    transform: 'translateY(-1px)',
  },
  '&:disabled': {
    background: colors.neutral[300],
    color: colors.neutral[500],
    transform: 'none',
    boxShadow: 'none',
  },
}));

const GlassButton = styled(MuiButton)(({ theme }) => ({
  background: colors.glass.background,
  backdropFilter: colors.glass.backdropFilter,
  border: colors.glass.border,
  color: theme.palette.text.primary,
  fontWeight: 500,
  padding: '10px 20px',
  borderRadius: 10,
  boxShadow: colors.glass.shadow,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: colors.glass.background,
    transform: 'translateY(-1px)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.4)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

const NeumorphismButton = styled(MuiButton)(({ theme }) => ({
  background: theme.palette.background.paper,
  border: 'none',
  color: theme.palette.text.primary,
  fontWeight: 500,
  padding: '12px 24px',
  borderRadius: 16,
  boxShadow: `
    8px 8px 16px ${theme.palette.mode === 'light' ? '#d1d9e6' : '#1a1a1a'},
    -8px -8px 16px ${theme.palette.mode === 'light' ? '#ffffff' : '#2a2a2a'}
  `,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: `
      4px 4px 8px ${theme.palette.mode === 'light' ? '#d1d9e6' : '#1a1a1a'},
      -4px -4px 8px ${theme.palette.mode === 'light' ? '#ffffff' : '#2a2a2a'}
    `,
  },
  '&:active': {
    boxShadow: `
      inset 4px 4px 8px ${theme.palette.mode === 'light' ? '#d1d9e6' : '#1a1a1a'},
      inset -4px -4px 8px ${theme.palette.mode === 'light' ? '#ffffff' : '#2a2a2a'}
    `,
  },
}));

const FloatingButton = styled(MuiButton)(({ theme }) => ({
  borderRadius: '50%',
  minWidth: 56,
  width: 56,
  height: 56,
  padding: 0,
  background: colors.gradients.primary,
  color: colors.neutral[50],
  boxShadow: '0 6px 20px 0 rgba(0, 102, 204, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: colors.gradients.primary,
    filter: 'brightness(1.1)',
    transform: 'translateY(-4px) scale(1.1)',
    boxShadow: '0 12px 32px 0 rgba(0, 102, 204, 0.4)',
  },
  '&:active': {
    transform: 'translateY(-2px) scale(1.05)',
  },
}));

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'contained' | 'outlined' | 'text' | 'gradient' | 'glass' | 'neumorphism' | 'floating';
  loading?: boolean;
  loadingPosition?: 'start' | 'end' | 'center';
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'contained',
  loading = false,
  loadingPosition = 'center',
  children,
  disabled,
  startIcon,
  endIcon,
  ...props 
}) => {
  const getButtonComponent = () => {
    switch (variant) {
      case 'gradient':
        return GradientButton;
      case 'glass':
        return GlassButton;
      case 'neumorphism':
        return NeumorphismButton;  
      case 'floating':
        return FloatingButton;
      default:
        return MuiButton;
    }
  };

  const ButtonComponent = getButtonComponent();
  const isLoading = loading && !disabled;

  const loadingIndicator = (
    <CircularProgress
      size={16}
      color="inherit"
      sx={{ 
        color: variant === 'gradient' || variant === 'floating' ? colors.neutral[50] : 'inherit' 
      }}
    />
  );

  const getStartIcon = () => {
    if (isLoading && loadingPosition === 'start') return loadingIndicator;
    if (isLoading && loadingPosition === 'center') return null;
    return startIcon;
  };

  const getEndIcon = () => {
    if (isLoading && loadingPosition === 'end') return loadingIndicator;
    if (isLoading && loadingPosition === 'center') return null;
    return endIcon;
  };

  const getChildren = () => {
    if (isLoading && loadingPosition === 'center') {
      return loadingIndicator;
    }
    return children;
  };

  // Handle floating button special case
  if (variant === 'floating') {
    return (
      <ButtonComponent
        disabled={disabled || loading}
        {...props}
      >
        {isLoading ? loadingIndicator : children}
      </ButtonComponent>
    );
  }

  // Handle other variants
  const muiVariant = ['gradient', 'glass', 'neumorphism'].includes(variant) 
    ? 'contained' 
    : variant as 'contained' | 'outlined' | 'text';

  return (
    <ButtonComponent
      variant={muiVariant}
      disabled={disabled || loading}
      startIcon={getStartIcon()}
      endIcon={getEndIcon()}
      {...props}
    >
      {getChildren()}
    </ButtonComponent>
  );
};

export default Button; 