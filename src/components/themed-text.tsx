import { Text, type TextProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { ThemeColor, Typography, type TypographyPreset } from '@/theme';

export type ThemedTextProps = TextProps & {
  type?: TypographyPreset;
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[{ color: theme[themeColor ?? 'text'] }, Typography.presets[type], style]}
      {...rest}
    />
  );
}
