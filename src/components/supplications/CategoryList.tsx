import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { ZikrSeries } from '@/shared/types';

interface CategoryListProps {
  categories: ZikrSeries[];
  onCategorySelect: (series: ZikrSeries) => void;
  onSetReminder: (supplication: any) => void;
}

export function CategoryList({ categories, onCategorySelect, onSetReminder }: CategoryListProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

  // Categories that should not have reminder icons (educational content)
  const disabledReminderCategories = [
    'The Importance of Daily Supplications',
    'The Importance of Hadith-based Supplications',
    'The importance of Quranic Supplications'
  ];

  const shouldShowReminderIcon = (categoryTitle: string) => {
    return !disabledReminderCategories.includes(categoryTitle);
  };

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {categories.map((series, index) => (
        <Animated.View
          key={series.id}
          entering={FadeInDown.delay(index * 100)}
          style={[
            styles.categoryCard,
            { backgroundColor: colors.card, borderColor: colors.border }
          ]}
        >
          <TouchableOpacity
            style={styles.categoryContent}
            onPress={() => onCategorySelect(series)}
          >
            <View style={styles.categoryHeader}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name={series.icon as any} size={24} color={colors.primary} />
              </View>
              <View style={styles.categoryInfo}>
                <Text style={[styles.categoryTitle, { color: colors.text }]}>
                  {series.title}
                </Text>
                <Text style={[styles.categoryDescription, { color: colors.secondaryText }]}>
                  {series.description}
                </Text>
              </View>
              {shouldShowReminderIcon(series.title) && (
                <TouchableOpacity
                  style={[styles.reminderButton, { backgroundColor: colors.primary + '15' }]}
                  onPress={(e) => {
                    e.stopPropagation();
                    onSetReminder({ 
                      id: series.id, 
                      title: series.title, 
                      category: series.title 
                    });
                  }}
                >
                  <Ionicons name="notifications-outline" size={20} color={colors.primary} />
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.categoryFooter}>
              <Text style={[styles.categoryCount, { color: colors.secondaryText }]}>
                {series.subcategories?.length || series.duas?.length || 0} items
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.secondaryText} />
            </View>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  categoryCard: {
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  categoryContent: {
    padding: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  reminderButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryCount: {
    fontSize: 12,
  },
});