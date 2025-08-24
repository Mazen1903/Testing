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

interface BookmarkedDua extends Dua {
  bookmarkedAt: string;
  category: string;
  subcategory: string;
}

export default function CollectionTab({ manuscriptColors }: CollectionTabProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  
  // Mock bookmarked duas
  const [bookmarkedDuas, setBookmarkedDuas] = useState<BookmarkedDua[]>([
    {
      id: '1-1',
      title: 'Upon Waking Up',
      arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
      transliteration: 'Alhamdu lillahil-ladhi ahyana ba\'da ma amatana wa ilayhin-nushur.',
      translation: 'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.',
      category: 'Daily Supplications',
      subcategory: 'Wakeup Supplications',
      occasion: 'Upon waking up',
      reference: 'Bukhari 6/350',
      repetitions: 1,
      bookmarkedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2-3',
      title: 'Before Eating',
      arabic: 'بِسْمِ اللَّهِ',
      transliteration: 'Bismillah.',
      translation: 'In the name of Allah.',
      category: 'Hadith-based Supplications',
      subcategory: 'Eating, Drinking & Fasting',
      occasion: 'Before eating',
      reference: 'Abu Dawud 3/347',
      repetitions: 1,
      bookmarkedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3-1',
      title: 'Prophet Adam\'s Repentance',
      arabic: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
      transliteration: 'Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakoonanna minal-khasireen.',
      translation: 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.',
      category: 'Quranic Supplications',
      subcategory: 'Prophet Adam',
      occasion: 'Seeking forgiveness',
      reference: 'Quran 7:23',
      repetitions: 3,
      bookmarkedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]);

  const [recentlyViewed, setRecentlyViewed] = useState<BookmarkedDua[]>([
    // Most recent duas viewed (subset of bookmarked)
    bookmarkedDuas[0], // Upon waking up
    bookmarkedDuas[2], // Prophet Adam's repentance
  ]);

  const handleDuaPress = (dua: BookmarkedDua) => {
    Alert.alert(
      dua.title,
      `From: ${dua.category} > ${dua.subcategory}\n\n${dua.translation}`,
      [
        { text: 'Remove Bookmark', style: 'destructive', onPress: () => removeDuaFromBookmarks(dua.id) },
        { text: 'Close', style: 'cancel' }
      ]
    );
  };

  const removeDuaFromBookmarks = (duaId: string) => {
    setBookmarkedDuas(prev => prev.filter(dua => dua.id !== duaId));
    setRecentlyViewed(prev => prev.filter(dua => dua.id !== duaId));
  };

  const BookmarkedDuaCard = ({ dua, index }: { dua: BookmarkedDua; index: number }) => (
    <Animated.View entering={FadeInDown.delay(200 + index * 100)}>
      <TouchableOpacity
        style={styles.duaCard}
        onPress={() => handleDuaPress(dua)}
      >
        <LinearGradient
          colors={[manuscriptColors.parchment, manuscriptColors.darkParchment]}
          style={styles.cardGradient}
        >
          <View style={[styles.cardBorder, { borderColor: manuscriptColors.border }]}>
            <View style={styles.duaHeader}>
              <View style={styles.duaInfo}>
                <Text style={[styles.duaTitle, { color: manuscriptColors.ink }]}>
                  {dua.title}
                </Text>
                <Text style={[styles.duaCategory, { color: manuscriptColors.brown }]}>
                  {dua.subcategory}
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.bookmarkButton}
                onPress={() => removeDuaFromBookmarks(dua.id)}
              >
                <Ionicons name="bookmark" size={20} color={manuscriptColors.brown} />
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.duaTranslation, { color: manuscriptColors.lightInk }]} numberOfLines={2}>
              {dua.translation}
            </Text>
            
            <View style={styles.duaFooter}>
              <View style={styles.duaFooterLeft}>
                <Ionicons name="time" size={12} color={manuscriptColors.brown} />
                <Text style={[styles.duaReference, { color: manuscriptColors.brown }]}>
                  {dua.repetitions === 1 ? 'Once' : `${dua.repetitions}x`}
                </Text>
              </View>
              <Text style={[styles.bookmarkedDate, { color: manuscriptColors.lightInk }]}>
                {new Date(dua.bookmarkedAt).toLocaleDateString()}
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
        <Text style={[styles.headerTitle, { color: manuscriptColors.ink }]}>Bookmarked Duas</Text>
        <Text style={[styles.headerSubtitle, { color: manuscriptColors.lightInk }]}>
          Your saved supplications for quick access
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
                <Text style={[styles.statNumber, { color: manuscriptColors.ink }]}>7</Text>
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
          {recentlyViewed.map((dua, index) => (
            <BookmarkedDuaCard key={`recent-${dua.id}`} dua={dua} index={index} />
          ))}
        </Animated.View>
      )}

      {/* All Bookmarked Duas */}
      <Animated.View entering={FadeInDown.delay(250)} style={styles.section}>
        <Text style={[styles.sectionTitle, { color: manuscriptColors.brown }]}>
          ALL BOOKMARKS ({bookmarkedDuas.length})
        </Text>
        
        {bookmarkedDuas.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="bookmark-outline" size={48} color={manuscriptColors.border} />
            <Text style={[styles.emptyStateTitle, { color: manuscriptColors.ink }]}>
              No Bookmarked Duas
            </Text>
            <Text style={[styles.emptyStateText, { color: manuscriptColors.lightInk }]}>
              Bookmark your favorite duas while browsing to access them quickly here
            </Text>
          </View>
        ) : (
          bookmarkedDuas.map((dua, index) => (
            <BookmarkedDuaCard key={dua.id} dua={dua} index={index} />
          ))
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
  duaCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  duaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  duaInfo: {
    flex: 1,
  },
  duaTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  duaCategory: {
    fontSize: 12,
    fontWeight: '500',
  },
  bookmarkButton: {
    padding: 4,
  },
  duaTranslation: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  duaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duaFooterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duaReference: {
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 4,
  },
  bookmarkedDate: {
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
});