import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';

interface CollectionTabProps {
  manuscriptColors: any;
}

export default function CollectionTab({ manuscriptColors }: CollectionTabProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  
  // Clean state - no mock data
  const [bookmarkedDuas] = useState<any[]>([]);
  const [recentlyViewed] = useState<any[]>([]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
        <Text style={[styles.headerTitle, { color: manuscriptColors.ink }]}>My Collection</Text>
        <Text style={[styles.headerSubtitle, { color: manuscriptColors.lightInk }]}>
          Your bookmarked supplications
        </Text>
      </Animated.View>

      {/* Quick Stats */}
      <Animated.View entering={FadeInDown.delay(150)} style={styles.statsContainer}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={[manuscriptColors.parchment, manuscriptColors.darkParchment]}
              style={styles.cardGradient}
            >
              <View style={[styles.cardBorder, { borderColor: manuscriptColors.border }]}>
                <View style={[styles.statIcon, { backgroundColor: manuscriptColors.brown + '20' }]}>
                  <Ionicons name="bookmark" size={20} color={manuscriptColors.brown} />
                </View>
                <Text style={[styles.statNumber, { color: manuscriptColors.ink }]}>
                  {bookmarkedDuas.length}
                </Text>
                <Text style={[styles.statLabel, { color: manuscriptColors.lightInk }]}>
                  Bookmarked
                </Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={[manuscriptColors.parchment, manuscriptColors.darkParchment]}
              style={styles.cardGradient}
            >
              <View style={[styles.cardBorder, { borderColor: manuscriptColors.border }]}>
                <View style={[styles.statIcon, { backgroundColor: colors.success + '20' }]}>
                  <Ionicons name="eye" size={20} color={colors.success} />
                </View>
                <Text style={[styles.statNumber, { color: manuscriptColors.ink }]}>
                  {recentlyViewed.length}
                </Text>
                <Text style={[styles.statLabel, { color: manuscriptColors.lightInk }]}>
                  Recent
                </Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={[manuscriptColors.parchment, manuscriptColors.darkParchment]}
              style={styles.cardGradient}
            >
              <View style={[styles.cardBorder, { borderColor: manuscriptColors.border }]}>
                <View style={[styles.statIcon, { backgroundColor: colors.secondary + '20' }]}>
                  <Ionicons name="calendar" size={20} color={colors.secondary} />
                </View>
                <Text style={[styles.statNumber, { color: manuscriptColors.ink }]}>0</Text>
                <Text style={[styles.statLabel, { color: manuscriptColors.lightInk }]}>
                  Day Streak
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Animated.View>

      {/* Recently Viewed Section */}
      {recentlyViewed.length > 0 && (
        <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: manuscriptColors.brown }]}>
            RECENTLY VIEWED
          </Text>
          {/* Recently viewed duas will be rendered here when data is available */}
        </Animated.View>
      )}

      {/* Bookmarked Duas Section */}
      <Animated.View entering={FadeInDown.delay(250)} style={styles.section}>
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
            <TouchableOpacity 
              style={[styles.browseButton, { backgroundColor: manuscriptColors.brown }]}
              onPress={() => {
                // This will be handled by parent component to switch tabs
              }}
            >
              <Ionicons name="library" size={16} color="#FFFFFF" />
              <Text style={styles.browseButtonText}>Browse Duas</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {/* Bookmarked duas will be rendered here when data is available */}
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
  statsContainer: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardGradient: {
    flex: 1,
  },
  cardBorder: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
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
    marginBottom: 24,
  },
  browseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});