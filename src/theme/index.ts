import '@/global.css';

import { Colors, Palette } from './colors';
import { BorderRadius } from './radii';
import { Shadows } from './shadows';
import { Spacing } from './spacing';
import { Fonts, Typography } from './typography';

export * from './colors';
export * from './radii';
export * from './shadows';
export * from './spacing';
export * from './typography';

export const theme = {
  palette: Palette,
  colors: Colors,
  spacing: Spacing,
  typography: Typography,
  fonts: Fonts,
  borderRadius: BorderRadius,
  shadows: Shadows,
} as const;

export type Theme = typeof theme;
