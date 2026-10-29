import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Badge } from '@/components/badge';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { theme } from '@/theme';
import { Notice as NoticeType } from '@/types/notice';
import { formatDate } from '@/utils/date';


export interface NoticeProps {
  notice: NoticeType;
  isRead?: boolean;
  onPress?: (notice: NoticeType) => void;
}

export function Notice({ notice, isRead = notice.isRead ?? false, onPress }: NoticeProps) {
  const colors = useTheme();
  const [imageError, setImageError] = useState(false);

  const isHighPriority = notice.priority === 'high';


  return (
    <Pressable
      onPress={() => onPress?.(notice)}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
      {notice.image_url && !imageError ? (
        <Image
          source={{ uri: notice.image_url }}
          style={styles.thumbnail}
          contentFit="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <View
          style={[
            styles.thumbnail,
            styles.placeholder,
            { backgroundColor: colors.backgroundElement },
          ]}>
          <SymbolView
            name={{
              ios: 'bell.fill',
              android: 'notifications',
            }}
            size={22}
            tintColor={colors.textSecondary}
          />
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.metaRow}>
          {!isRead && (
            <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />
          )}

          <ThemedText style={styles.date} themeColor="textSecondary">
            {formatDate(notice.published_at)}
          </ThemedText>
        </View>

        <ThemedText
          type="default"
          numberOfLines={2}
          style={isRead ? styles.readTitle : styles.title}>
          {notice.title}
        </ThemedText>

        {isHighPriority && <Badge label="High Priority" variant="error" size="sm" />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  pressed: {
    opacity: 0.7,
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.sm,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    gap: theme.spacing.xxs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  date: {
    fontSize: theme.typography.sizes.xs,
    lineHeight: theme.typography.lineHeights.tight,
  },
  title: {
    fontWeight: theme.typography.weights.medium,
  },
  readTitle: {
    fontWeight: theme.typography.weights.regular,
    opacity: 0.8,
  },
});

