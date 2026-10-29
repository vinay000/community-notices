export const Colors = {
  light: {
    text: '#000000',
    background: '#FFFFFF',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    textTertiary: '#9CA3AF',
    primary: '#208AEF',
    border: '#E0E1E6',
    error: '#DC2626',
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    textTertiary: '#60646C',
    primary: '#76A9FA',
    border: '#2E3135',
    error: '#F87171',
  },
} as const;


const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const;



const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    xl: 20,
    '2xl': 24,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
  },
  lineHeights: {
    tight: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
  },
} as const;


const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  full: 9999,
} as const;


export const theme = {
  spacing,
  typography,
  borderRadius,
} as const;

export type Theme = typeof theme;
export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;


