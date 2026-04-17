export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const sizes = {
  icon: {
    sm: 16,
    md: 24,
    lg: 32,
  },
  button: {
    sm: 32,
    md: 40,
    lg: 48,
  },
  avatar: {
    sm: 40,
    md: 64,
    lg: 96,
    xl: 128,
  },
} as const;

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;
