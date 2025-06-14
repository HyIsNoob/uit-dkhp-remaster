import React from 'react';
import { Card as MuiCard, CardProps as MuiCardProps, styled, SxProps, Theme } from '@mui/material';
import { colors } from '../../theme';

// Styled Card variants
const GlassCard = styled(MuiCard)(({ theme }) => ({
  background: colors.glass.background,
  backdropFilter: colors.glass.backdropFilter,
  border: colors.glass.border,
  boxShadow: colors.glass.shadow,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.4)',
  },
}));

const GradientCard = styled(MuiCard)(({ theme }) => ({
  background: colors.gradients.primary,
  color: colors.neutral[50],
  border: 'none',
  boxShadow: '0 8px 32px 0 rgba(0, 102, 204, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: '0 16px 48px 0 rgba(0, 102, 204, 0.4)',
  },
}));

const ElevatedCard = styled(MuiCard)(({ theme }) => ({
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 16,
  boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.15)',
    borderColor: theme.palette.primary.main,
  },
}));

const OutlineCard = styled(MuiCard)(({ theme }) => ({
  background: 'transparent',
  border: `2px solid ${theme.palette.divider}`,
  borderRadius: 12,
  boxShadow: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 4px ${theme.palette.primary.main}20`,
    transform: 'translateY(-1px)',
  },
}));

export interface CardProps extends Omit<MuiCardProps, 'variant'> {
  variant?: 'default' | 'glass' | 'gradient' | 'elevated' | 'outline';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  variant = 'default', 
  interactive = false,
  children,
  sx,
  ...props 
}) => {
  const getCardComponent = () => {
    switch (variant) {
      case 'glass':
        return GlassCard;
      case 'gradient':
        return GradientCard;
      case 'elevated':
        return ElevatedCard;
      case 'outline':
        return OutlineCard;
      default:
        return MuiCard;
    }
  };

  const CardComponent = getCardComponent();

  const interactiveSx: SxProps<Theme> = interactive ? {
    cursor: 'pointer',
    userSelect: 'none',
    '&:active': {
      transform: 'translateY(0) scale(0.98)',
    },
  } : {};

  const combinedSx: SxProps<Theme> = {
    ...interactiveSx,
    ...(sx || {}),
  };

  return (
    <CardComponent
      sx={combinedSx}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

export default Card; 