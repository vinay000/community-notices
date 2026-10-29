import { View, type ViewProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { ThemeColor } from '@/theme';

export type ThemedViewProps = ViewProps & {
  type?: ThemeColor;
};

export function ThemedView({ style, type, ...otherProps }: ThemedViewProps) {
  const colors = useTheme();

  return <View style={[{ backgroundColor: colors[type ?? 'background'] }, style]} {...otherProps} />;
}
