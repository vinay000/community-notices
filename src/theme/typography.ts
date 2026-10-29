import { Platform, type TextStyle } from 'react-native';

import { Palette } from './colors';

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
} as const;

export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;

export const LineHeights = {
  tight: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  '2xl': 44,
  '3xl': 52,
  relaxed: 30,
} as const;

const typographyPresets = {
  title: {
    fontSize: FontSizes['5xl'],
    lineHeight: LineHeights['3xl'],
    fontWeight: FontWeights.semibold,
  },
  subtitle: {
    fontSize: FontSizes['3xl'],
    lineHeight: LineHeights['2xl'],
    fontWeight: FontWeights.semibold,
  },
  heading: {
    fontSize: FontSizes['2xl'],
    lineHeight: LineHeights.xl,
    fontWeight: FontWeights.semibold,
  },
  subheading: {
    fontSize: FontSizes.xl,
    lineHeight: LineHeights.lg,
    fontWeight: FontWeights.semibold,
  },
  default: {
    fontSize: FontSizes.md,
    lineHeight: LineHeights.md,
    fontWeight: FontWeights.medium,
  },
  body: {
    fontSize: FontSizes.md,
    lineHeight: LineHeights.md,
    fontWeight: FontWeights.regular,
  },
  bodyMedium: {
    fontSize: FontSizes.md,
    lineHeight: LineHeights.md,
    fontWeight: FontWeights.medium,
  },
  small: {
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
    fontWeight: FontWeights.medium,
  },
  smallBold: {
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
    fontWeight: FontWeights.bold,
  },
  caption: {
    fontSize: FontSizes.xs,
    lineHeight: LineHeights.tight,
    fontWeight: FontWeights.regular,
  },
  link: {
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.relaxed,
    fontWeight: FontWeights.regular,
  },
  linkPrimary: {
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.relaxed,
    fontWeight: FontWeights.medium,
    color: Palette.brand.link,
  },
  code: {
    fontFamily: Fonts?.mono,
    fontSize: FontSizes.xs,
    fontWeight: Platform.select({ android: FontWeights.bold }) ?? FontWeights.medium,
  },
} as const satisfies Record<string, TextStyle>;

export const Typography = {
  fonts: Fonts,
  sizes: FontSizes,
  weights: FontWeights,
  lineHeights: LineHeights,
  presets: typographyPresets,
} as const;

export type TypographyPreset = keyof typeof typographyPresets;
