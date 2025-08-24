import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { Dua } from '@/shared/types/supplications';

interface CollectionTabProps {
  manuscriptColors: any;
}

interface SavedCollection {
  id: string;
  name: string;
  description: string;
  duas: Dua[];
  createdAt: string;
  icon: string;
  color: string;
}

export default function CollectionTab({ manuscriptColors }: CollectionTabProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  
  // Mock saved collections
  const [savedCollections, setSavedCollections] = useState<SavedCollection[]>([
    {
      id: '1',
      name: 'My Daily Essentials',
      description: 'Morning and evening duas I recite daily',
      duas: [], // Would contain actual duas
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      icon: 'star',
      color: manuscriptColors.brown
    },
    {
      id: '2',
      name: 'Protection Collection',
      description: 'Duas for seeking Allah\'s protection',
      duas: [], // Would contain actual duas
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      icon: 'shield',
      color: colors.success
    },
    {
      id: '3',
      name: 'Travel Duas',
      description: 'Essential supplications for journeys',
      duas: [], // Would contain actual duas
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      icon: 'airplane',
      color: colors.secondary
    }
  ]);

  const [recentlyViewed, setRecentlyViewed] = useState<Dua[]>([
    // Mock recently viewed duas
  ]);

  const handleCreateCollection = () => {
    Alert.alert(
      'Create Collection',
      'This feature will allow you to create custom collections of your favorite duas.',
      [{ text: 'OK' }]
    );
  };

  const handleOpenCollection = (collection: SavedCollection) => {
    Alert.alert(
      collection.name,
      `Open collection with ${collection.duas.length} duas`,
      [{ text: 'OK' }]
    );
  };

  const CollectionCard = ({ collection, index }: { collection: SavedCollection; index: number }) => (
    <Animated.View entering={FadeInDown.delay(200 + index * 100)}>
      <TouchableOpacity
        style={styles.collectionCard}
        onPress={() => handleOpenCollection(collection)}
      >
        <LinearGradient
          colors={[manuscriptColors.parchment, manuscriptColors.darkParchment]}
          style={styles.cardGradient}
        >
          <View style={[styles.cardBorder, { borderColor: manuscriptColors.border }]}>
            <View style={styles.collectionHeader}>
              <View style={[styles.collectionIcon, { backgroundColor: collection.color + '20' }]}>
                <Ionicons name={collection.icon as any} size={24} color={collection.color} />
              </View>
              <View style={styles.collectionInfo}>
                <Text style={[styles.collectionName, { color: manuscriptColors.ink }]}>
                  {collection.name}
                </Text>
                <Text style={[styles.collectionDescription, { color: manuscriptColors.lightInk }]}>
                  {collection.description}
                </Text>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <Ionicons name="ellipsis-horizontal" size={20} color={manuscriptColors.lightInk} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.collectionFooter}>
              <View style={styles.collectionStats}>
                <Ionicons name="book" size={12} color={manuscriptColors.brown} />
                <Text style={[styles.collectionStatsText, { color: manuscriptColors.brown }]}>
                  {collection.duas.length} duas
                </Text>
              </View>
              <Text style={[styles.collectionDate, { color: manuscriptColors.lightInk }]}>
                Created {new Date(collection.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
        <Text style={[styles.headerTitle, { color: manuscriptColors.ink }]}>My Collections</Text>
        <Text style={[styles.headerSubtitle, { color: manuscriptColors.lightInk }]}>
          Your saved duas and custom collections
        </Text>
      </Animated.View>

      {/* Create New Collection Button */}
      <Animated.View entering={FadeInDown.delay(150)}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateCollection}
        >
          <LinearGradient
            colors={[manuscriptColors.brown, manuscriptColors.brown + 'DD']}
            style={styles.createButtonGradient}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.createButtonText}>Create New Collection</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Quick Access Section */}
      <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
        <Text style={[styles.sectionTitle, { color: manuscriptColors.brown }]}>
          QUICK ACCESS
        </Text>
        
        <View style={styles.quickAccessGrid}>
          <TouchableOpacity style={styles.quickAccessCard}>
            <LinearGradient
              colors={[manuscriptColors.parchment, manuscriptColors.darkParchment]}
              style={styles.cardGradient}
            >
              <View style={[styles.cardBorder, { borderColor: manuscriptColors.border }]}>
                <View style={[styles.quickAccessIcon, { backgroundColor: colors.success + '20' }]}>
                  <Ionicons name="heart" size={24} color={colors.success} />
                </View>
                <Text style={[styles.quickAccessTitle, { color: manuscriptColors.ink }]}>
                  Favorites
                </Text>
                <Text style={[styles.quickAccessCount, { color: manuscriptColors.lightInk }]}>
                  12 duas
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAccessCard}>
            <LinearGradient
              colors={[manuscriptColors.parchment, manuscriptColors.darkParchment]}
              style={styles.cardGradient}
            >
              <View style={[styles.cardBorder, { borderColor: manuscriptColors.border }]}>
                <View style={[styles.quickAccessIcon, { backgroundColor: colors.secondary + '20' }]}>
                  <Ionicons name="time" size={24} color={colors.secondary} />
                </View>
                <Text style={[styles.quickAccessTitle, { color: manuscriptColors.ink }]}>
                  Recent
                </Text>
                <Text style={[styles.quickAccessCount, { color: manuscriptColors.lightInk }]}>
                  8 duas
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Saved Collections */}
      <Animated.View entering={FadeInDown.delay(250)} style={styles.section}>
        <Text style={[styles.sectionTitle, { color: manuscriptColors.brown }]}>
          MY COLLECTIONS ({savedCollections.length})
        </Text>
        
        {savedCollections.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="bookmark-outline" size={48} color={manuscriptColors.border} />
            <Text style={[styles.emptyStateTitle, { color: manuscriptColors.ink }]}>
              No Collections Yet
            </Text>
            <Text style={[styles.emptyStateText, { color: manuscriptColors.lightInk }]}>
              Create your first collection to organize your favorite duas
            </Text>
          </View>
        ) : (
          savedCollections.map((collection, index) => (
            <CollectionCard key={collection.id} collection={collection} index={index} />
          ))
        )}
      </Animated.View>

      {/* Statistics Section */}
      <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
        <Text style={[styles.sectionTitle, { color: manuscriptColors.brown }]}>
          YOUR PROGRESS
        </Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={[manuscriptColors.parchment, manuscriptColors.darkParchment]}
              style={styles.cardGradient}
            >
              <View style={[styles.cardBorder, { borderColor: manuscriptColors.border }]}>
                <View style={[styles.statIcon, { backgroundColor: manuscriptColors.brown + '20' }]}>
                  <Ionicons name="calendar" size={20} color={manuscriptColors.brown} />
                </View>
                <Text style={[styles.statNumber, { color: manuscriptColors.ink }]}>7</Text>
                <Text style={[styles.statLabel, { color: manuscriptColors.lightInk }]}>Day Streak</Text>
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
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                </View>
                <Text style={[styles.statNumber, { color: manuscriptColors.ink }]}>45</Text>
                <Text style={[styles.statLabel, { color: manuscriptColors.lightInk }]}>Completed</Text>
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
                  <Ionicons name="time" size={20} color={colors.secondary} />
                </View>
                <Text style={[styles.statNumber, { color: manuscriptColors.ink }]}>2.5h</Text>
                <Text style={[styles.statLabel, { color: manuscriptColors.lightInk }]}>Total Time</Text>
              </View>
            </LinearGradient>
          </View>
        </View>
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
  createButton: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  createButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  quickAccessGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAccessCard: {
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
  quickAccessIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickAccessTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  quickAccessCount: {
    fontSize: 12,
  },
  collectionCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  collectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  collectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  collectionInfo: {
    flex: 1,
  },
  collectionName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  collectionDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  moreButton: {
    padding: 4,
  },
  collectionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collectionStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  collectionStatsText: {
    fontSize: 12,
    fontWeight: '500',
  },
  collectionDate: {
    fontSize: 11,
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
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
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
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
});