import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { theme } from '@/theme';
import { NoticeCategory } from '@/types/notice';

const CATEGORIES: { label: string; value?: NoticeCategory }[] = [
  { label: 'All', value: undefined },
  { label: 'General', value: 'general' },
  { label: 'Event', value: 'event' },
  { label: 'Service', value: 'service' },
  { label: 'Emergency', value: 'emergency' },
];

export interface CategoryFilterProps {
  selected?: NoticeCategory;
  onSelect: (category?: NoticeCategory) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const colors = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {CATEGORIES.map((cat) => {
        const isSelected = selected === cat.value;

        return (
          <Pressable
            key={cat.label}
            onPress={() => onSelect(cat.value)}
            style={({ pressed }) => [
              styles.pill,
              {
                backgroundColor: isSelected
                  ? colors.text
                  : colors.backgroundElement,
              },
              pressed && styles.pressed,
            ]}>
            <ThemedText
              type="small"
              style={[
                styles.pillText,
                { color: isSelected ? colors.background : colors.textSecondary },
              ]}>
              {cat.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  pill: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
  },
  pressed: {
    opacity: 0.7,
  },
  pillText: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
  },
});
