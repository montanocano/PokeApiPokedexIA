import React from 'react';
import { styled, Stack } from '@tamagui/core';

const CardFrame = styled(Stack, {
  backgroundColor: '$lightSurface',
  borderRadius: '$3',

  variants: {
    elevation: {
      none: {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      },
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
      },
      md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 3,
      },
      lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 6,
      },
    },
  } as const,

  defaultVariants: {
    elevation: 'md',
  },
});

export interface CardProps {
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  onPress?: () => void;
  children: React.ReactNode;
  padding?: number | string;
}

export function Card({ elevation = 'md', onPress, children, padding }: CardProps) {
  return (
    <CardFrame
      elevation={elevation}
      onPress={onPress}
      pressStyle={onPress ? { opacity: 0.85 } : undefined}
      padding={padding ?? '$4'}
    >
      {children}
    </CardFrame>
  );
}
