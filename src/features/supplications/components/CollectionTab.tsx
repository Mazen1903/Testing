import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';

interface CollectionTabProps {
  manuscriptColors: any;
  bookmarkedDuas: string[];
  onRemoveBookmark: (duaId: string) => void;
}

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
          <View>
            {/* TODO: Render actual bookmarked duas here */}
            <Text style={[styles.placeholderText, { color: manuscriptColors.lightInk }]}>
              Bookmarked duas will appear here
            </Text>
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
});