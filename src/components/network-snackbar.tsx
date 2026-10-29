import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useNetworkInfo } from '@/hooks/use-network-info';
import { useTheme } from '@/hooks/use-theme';
import { theme } from '@/theme';

export function NetworkSnackbar() {
  const { isOffline, isPoorNetwork } = useNetworkInfo();
  const insets = useSafeAreaInsets();
  const colors = useTheme();

  if (!isOffline && !isPoorNetwork) {
    return null;
  }

  return (
    <View
      pointerEvents="none"
      style={[
        styles.container,
        {
          bottom: insets.bottom + theme.spacing.md,
          backgroundColor: colors.text,
        },
      ]}>
      <ThemedText
        type="small"
        style={{ color: colors.background }}>
        {isOffline ? 'No internet connection' : 'Slow connection'}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 2,
    borderRadius: theme.borderRadius.full,
  },
});
