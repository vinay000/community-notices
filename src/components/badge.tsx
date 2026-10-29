import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { theme } from '@/theme';

export interface BadgeProps {
  label: string;
  variant?: 'default' | 'primary' | 'error';
  size?: 'sm' | 'md';
}

export function Badge({ label, variant = 'default', size = 'sm' }: BadgeProps) {
  const colors = useTheme();

  const colorMap = {
    default: { bg: colors.backgroundElement, text: colors.textSecondary },
    primary: { bg: colors.backgroundElement, text: colors.primary },
    error: { bg: colors.error, text: '#FFFFFF' },
  }[variant];

  return (
    <View
      style={[
        styles.badge,
        size === 'md' ? styles.sizeMd : styles.sizeSm,
        { backgroundColor: colorMap.bg },
      ]}>
      <ThemedText
        style={[
          styles.text,
          size === 'md' ? styles.textMd : styles.textSm,
          { color: colorMap.text },
        ]}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: theme.borderRadius.xs,
    alignSelf: 'flex-start',
  },
  sizeSm: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  sizeMd: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 3,
  },
  text: {
    fontWeight: theme.typography.weights.medium,
  },
  textSm: {
    fontSize: 10,
    lineHeight: 12,
  },
  textMd: {
    fontSize: theme.typography.sizes.xs,
    lineHeight: 16,
  },
});
