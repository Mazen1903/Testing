import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';

import { ZIKR_SERIES } from '@/shared/constants/supplications';
import { ZikrSeries, DuaSubcategory } from '@/shared/types/supplications';

interface CollectionTabProps {
  manuscriptColors: any;
  bookmarkedDuas: string[];
  onRemoveBookmark: (duaId: string) => void;
}

// Helper function to find bookmarked items
const findBookmarkedItem = (id: string): { type: 'series' | 'subcategory', item: ZikrSeries | DuaSubcategory } | null => {
  // Check if it's a series
  const series = ZIKR_SERIES.find(s => s.id === id);
  if (series) {
    return { type: 'series', item: series };
  }
  
  // Check if it's a subcategory
  for (const series of ZIKR_SERIES) {
    if (series.subcategories) {
      const subcategory = series.subcategories.find(sub => sub.id === id);
      if (subcategory) {
        return { type: 'subcategory', item: subcategory };
      }
    }
  }
  
  return null;
};

export default function CollectionTab({ manuscriptColors, bookmarkedDuas, onRemoveBookmark }: CollectionTabProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
        <Text style={[styles.headerTitle, { color: manuscriptColors.ink }]}>My Collection</Text>
        <Text style={[styles.headerSubtitle, { color: manuscriptColors.lightInk }]}>
          Your bookmarked supplications
        </Text>
      </Animated.View>

      {/* Bookmarked Duas Section */}
      <Animated.View entering={FadeInDown.delay(150)} style={styles.section}>
        <Text style={[styles.sectionTitle, { color: manuscriptColors.brown }]}>
          BOOKMARKED DUAS ({bookmarkedDuas.length})
        </Text>
        
        {bookmarkedDuas.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="bookmark-outline" size={64} color={manuscriptColors.border} />
            <Text style={[styles.emptyStateTitle, { color: manuscriptColors.ink }]}>
              No Bookmarked Duas
            </Text>
            <Text style={[styles.emptyStateText, { color: manuscriptColors.lightInk }]}>
              Bookmark your favorite duas while browsing to access them quickly here
            </Text>
          </View>
        ) : (
          <View style={styles.bookmarkedList}>
            {bookmarkedDuas.map((duaId, index) => {
              const bookmarkedItem = findBookmarkedItem(duaId);
              if (!bookmarkedItem) return null;
              
              const { type, item } = bookmarkedItem;
              const isSubcategory = type === 'subcategory';
              const subcategory = isSubcategory ? item as DuaSubcategory : null;
              const series = isSubcategory ? null : item as ZikrSeries;
              
              return (
                <Animated.View key={duaId} entering={FadeInDown.delay(index * 100)}>
                  <View style={[styles.bookmarkedCard, { 
                    backgroundColor: manuscriptColors.parchment,
                    borderColor: manuscriptColors.border 
                  }]}>
                    <View style={styles.bookmarkedHeader}>
                      <View style={styles.bookmarkedInfo}>
                        <Text style={[styles.bookmarkedTitle, { color: manuscriptColors.ink }]}>
                          {isSubcategory ? subcategory?.name : series?.title}
                        </Text>
                        <Text style={[styles.bookmarkedCategory, { color: manuscriptColors.lightInk }]}>
                          {isSubcategory 
                            ? `${subcategory?.duas.length || 0} duas`
                            : `${series?.subcategories?.length || 0} categories`
                          }
                        </Text>
                      </View>
                      
                      <View style={styles.bookmarkedActions}>
                        <View style={[styles.bookmarkedIcon, { backgroundColor: manuscriptColors.brown + '20' }]}>
                          <Ionicons 
                            name={(isSubcategory ? subcategory?.icon : series?.icon) as any} 
                            size={20} 
                            color={manuscriptColors.brown} 
                          />
                        </View>
                        
                        <TouchableOpacity
                          style={[styles.removeBookmarkButton, { borderColor: manuscriptColors.border }]}
                          onPress={() => onRemoveBookmark(duaId)}
                        >
                          <Ionicons name="bookmark" size={16} color={manuscriptColors.brown} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    
                    <Text style={[styles.bookmarkedDescription, { color: manuscriptColors.lightInk }]} numberOfLines={2}>
                      {isSubcategory ? subcategory?.description : series?.description}
                    </Text>
                  </View>
                </Animated.View>
              );
            })}
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  placeholderText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bookmarkedList: {
    gap: 12,
  },
  bookmarkedCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  bookmarkedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bookmarkedInfo: {
    flex: 1,
  },
  bookmarkedTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookmarkedCategory: {
    fontSize: 12,
    fontWeight: '500',
  },
  bookmarkedActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookmarkedIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBookmarkButton: {
    padding: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  bookmarkedDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
});