import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryFilter } from '@/components/category-filter';
import { Notice } from '@/components/notice';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useNotices } from '@/hooks/use-notices';
import { useTheme } from '@/hooks/use-theme';
import { theme } from '@/theme';
import { Notice as NoticeType, NoticeCategory } from '@/types/notice';

export default function HomeScreen() {
  const colors = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory | undefined>(undefined);
  const {
    notices,
    isLoading,
    isRefreshing,
    isLoadingMore,
    error,
    isEmpty,
    refetch,
    loadMore,
    markAsRead,
  } = useNotices({ category: selectedCategory });

  const handlePressNotice = (notice: NoticeType) => {
    markAsRead(notice.id);
    router.push(`/notice/${notice.id}`);
  };

  const renderItem = ({ item }: { item: NoticeType }) => (
    <Notice notice={item} onPress={handlePressNotice} />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <ThemedText type="subheading">Notices</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        Community announcements and updates
      </ThemedText>
      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
    </View>
  );

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <ThemedText themeColor="textSecondary" style={styles.errorText}>
            {error}
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
      );
    }

    if (isEmpty) {
      return (
        <View style={styles.centerContainer}>
          <ThemedText themeColor="textSecondary">No notices found</ThemedText>
        </View>
      );
    }

    return null;
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={isLoading || error ? [] : notices}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={
            isLoadingMore ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            ) : undefined
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => refetch(true)}
              tintColor={colors.primary}
            />
          }
        />
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
    paddingHorizontal: theme.spacing.lg,
  },
  header: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    paddingVertical: theme.spacing['2xl'],
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  footerLoader: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
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
