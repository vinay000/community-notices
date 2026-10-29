import { Text, type TextProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { theme, ThemeColor } from '@/theme';

const presets = {
  heading: { fontSize: theme.typography.sizes['2xl'], lineHeight: theme.typography.lineHeights.xl, fontWeight: theme.typography.weights.semibold },
  subheading: { fontSize: theme.typography.sizes.xl, lineHeight: theme.typography.lineHeights.lg, fontWeight: theme.typography.weights.semibold },
  default: { fontSize: theme.typography.sizes.md, lineHeight: theme.typography.lineHeights.md, fontWeight: theme.typography.weights.medium },
  small: { fontSize: theme.typography.sizes.sm, lineHeight: theme.typography.lineHeights.sm, fontWeight: theme.typography.weights.medium },
} as const;

export type ThemedTextProps = TextProps & {
  type?: keyof typeof presets;
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const colors = useTheme();

  return (
    <Text
      style={[{ color: colors[themeColor ?? 'text'] }, presets[type], style]}
      {...rest}
    />
  );
}
