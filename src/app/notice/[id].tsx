import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useNotice } from '@/hooks/use-notice';
import { useTheme } from '@/hooks/use-theme';
import { theme } from '@/theme';
import { formatDate } from '@/utils/date';

export default function NoticeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useTheme();
  const { notice, isLoading, error, refetch } = useNotice(id);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBar}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <SymbolView
              name={{
                ios: 'chevron.left',
                android: 'arrow_back',
                web: 'arrow_back',
              }}
              size={22}
              tintColor={colors.text}
            />
          </Pressable>
        </View>

        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : error || !notice ? (
          <View style={styles.centerContainer}>
            <ThemedText themeColor="textSecondary" style={styles.errorText}>
              {error ?? 'Notice not found'}
            </ThemedText>
            <Pressable
              onPress={() => refetch()}
              style={({ pressed }) => [
                styles.retryButton,
                { backgroundColor: colors.backgroundElement },
                pressed && styles.pressed,
              ]}>
              <ThemedText type="small">Try Again</ThemedText>
            </Pressable>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            <ThemedText type="heading" style={styles.title}>
              {notice.title}
            </ThemedText>

            <ThemedText style={styles.date} themeColor="textSecondary">
              {formatDate(notice.published_at)}
            </ThemedText>

            {notice.image_url ? (
              <Image
                source={{ uri: notice.image_url }}
                style={[
                  styles.image,
                  { backgroundColor: colors.backgroundElement },
                ]}
                contentFit="cover"
                transition={200}
              />
            ) : null}

            <ThemedText style={styles.description}>
              {notice.body}
            </ThemedText>
          </ScrollView>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: theme.spacing.xs,
    marginLeft: -theme.spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing['2xl'],
    gap: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.sizes['2xl'],
    lineHeight: theme.typography.lineHeights.xl,
    fontWeight: theme.typography.weights.semibold,
  },
  date: {
    fontSize: theme.typography.sizes.sm,
    lineHeight: theme.typography.lineHeights.sm,
    marginTop: -theme.spacing.xs,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: theme.borderRadius.md,
  },
  description: {
    fontSize: theme.typography.sizes.md,
    lineHeight: theme.typography.lineHeights.md,
  },
  centerContainer: {
    flex: 1,
    paddingVertical: theme.spacing['2xl'],
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  errorText: {
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
  },
  pressed: {
    opacity: 0.7,
  },
});
