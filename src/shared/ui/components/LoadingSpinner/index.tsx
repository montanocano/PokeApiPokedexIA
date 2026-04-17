import React from 'react';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../tokens/colors';
import { sizes } from '../../tokens/spacing';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const sizeMap: Record<'sm' | 'md' | 'lg', number> = {
  sm: sizes.icon.sm,
  md: sizes.icon.md,
  lg: sizes.icon.lg,
};

export function LoadingSpinner({ size = 'md', color }: LoadingSpinnerProps) {
  return <ActivityIndicator size={sizeMap[size]} color={color ?? colors.primary.brand} />;
}
