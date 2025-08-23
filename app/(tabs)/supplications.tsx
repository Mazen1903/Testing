import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
} from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { ZikrSeries, ZikrCategory, DuaSubcategory } from '@/shared/types/supplications';
import { ZIKR_SERIES, ZIKR_CATEGORIES } from '@/shared/constants/supplications';
import { ExpandableText } from '@/src/components/ui/ExpandableText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slider } from '@react-native-community/slider';

const { width, height } = Dimensions.get('window');

// Helper functions for handling mixed series (subcategories + direct duas)
const getAllDuasFromSeries = (series: ZikrSeries): any[] => {
  const allDuas: any[] = [];
  
  // Add direct duas first (if any)
  if (series.duas && series.duas.length > 0) {
    allDuas.push(...series.duas);
  }
  
  // Add duas from subcategories (if any)
  if (series.subcategories && series.subcategories.length > 0) {
    const subcategoryDuas = series.subcategories.flatMap(subcategory => subcategory.duas);
    allDuas.push(...subcategoryDuas);
  }
  
  return allDuas;
};

const hasSubcategories = (series: ZikrSeries): boolean => {
  return !!(series.subcategories && series.subcategories.length > 0);
};

const hasDirectDuas = (series: ZikrSeries): boolean => {
  return !!(series.duas && series.duas.length > 0);
};

const isMixedSeries = (series: ZikrSeries): boolean => {
  return hasSubcategories(series) && hasDirectDuas(series);
};

// Helper function to get manuscript-style colors based on theme
const getManuscriptColors = (isDark: boolean, themeColors: any) => ({
  parchment: isDark ? themeColors.background : '#F5F1E8',
  darkParchment: isDark ? themeColors.card : '#E8E0D0',
  brown: themeColors.primary,
  darkBrown: isDark ? themeColors.primary : themeColors.primary + 'CC',
  gold: themeColors.primary,
  darkGold: isDark ? themeColors.primary : themeColors.primary + 'DD',
  ink: themeColors.text,
  lightInk: themeColors.secondaryText,
  border: isDark ? themeColors.border : '#D2B48C',
  spiralBinding: themeColors.primary
});

type TabType = 'All' | 'Collections';

export default function SupplicationsScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const manuscriptColors = getManuscriptColors(isDark, colors);
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [selectedSeries, setSelectedSeries] = useState<ZikrSeries | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<DuaSubcategory | null>(null);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [zikrSessionVisible, setZikrSessionVisible] = useState(false);
  const [currentDuaIndex, setCurrentDuaIndex] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const [bookmarkedDuas, setBookmarkedDuas] = useState<Set<string>>(new Set());
  const [bookmarkedSubcategories, setBookmarkedSubcategories] = useState<Set<string>>(new Set());
  const [showDisplayControls, setShowDisplayControls] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState<'System' | 'Serif' | 'Monospace'>('System');
  const [showArabic, setShowArabic] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [arabicTextAlign, setArabicTextAlign] = useState<'right' | 'center'>('right');
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const horizontalScrollRef = useRef<ScrollView>(null);

  // Load bookmarks on component mount
  useEffect(() => {
    loadBookmarks();
    loadDisplaySettings();
  }, []);

  const loadBookmarks = async () => {
    try {
      const [duasData, subcategoriesData] = await Promise.all([
        AsyncStorage.getItem('bookmarked_duas'),
        AsyncStorage.getItem('bookmarked_subcategories')
      ]);
      
      if (duasData) {
        setBookmarkedDuas(new Set(JSON.parse(duasData)));
      }
      if (subcategoriesData) {
        setBookmarkedSubcategories(new Set(JSON.parse(subcategoriesData)));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const loadDisplaySettings = async () => {
    try {
      const [
        fontSizeData,
        fontFamilyData,
        showArabicData,
        showTransliterationData,
        showTranslationData,
        arabicAlignData,
        lineSpacingData
      ] = await Promise.all([
        AsyncStorage.getItem('supplication_font_size'),
        AsyncStorage.getItem('supplication_font_family'),
        AsyncStorage.getItem('supplication_show_arabic'),
        AsyncStorage.getItem('supplication_show_transliteration'),
        AsyncStorage.getItem('supplication_show_translation'),
        AsyncStorage.getItem('supplication_arabic_align'),
        AsyncStorage.getItem('supplication_line_spacing')
      ]);
      
      if (fontSizeData) setFontSize(JSON.parse(fontSizeData));
      if (fontFamilyData) setFontFamily(JSON.parse(fontFamilyData));
      if (showArabicData) setShowArabic(JSON.parse(showArabicData));
      if (showTransliterationData) setShowTransliteration(JSON.parse(showTransliterationData));
      if (showTranslationData) setShowTranslation(JSON.parse(showTranslationData));
      if (arabicAlignData) setArabicTextAlign(JSON.parse(arabicAlignData));
      if (lineSpacingData) setLineSpacing(JSON.parse(lineSpacingData));
    } catch (error) {
      console.error('Error loading display settings:', error);
    }
  };

  const saveDisplaySettings = async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem('supplication_font_size', JSON.stringify(fontSize)),
        AsyncStorage.setItem('supplication_font_family', JSON.stringify(fontFamily)),
        AsyncStorage.setItem('supplication_show_arabic', JSON.stringify(showArabic)),
        AsyncStorage.setItem('supplication_show_transliteration', JSON.stringify(showTransliteration)),
        AsyncStorage.setItem('supplication_show_translation', JSON.stringify(showTranslation)),
        AsyncStorage.setItem('supplication_arabic_align', JSON.stringify(arabicTextAlign)),
        AsyncStorage.setItem('supplication_line_spacing', JSON.stringify(lineSpacing))
      ]);
    } catch (error) {
      console.error('Error saving display settings:', error);
    }
  };

  // Save settings whenever they change
  useEffect(() => {
    saveDisplaySettings();
  }, [fontSize, fontFamily, showArabic, showTransliteration, showTranslation, arabicTextAlign, lineSpacing]);

  const saveBookmarks = async (duas: Set<string>, subcategories: Set<string>) => {
    try {
      await Promise.all([
        AsyncStorage.setItem('bookmarked_duas', JSON.stringify(Array.from(duas))),
        AsyncStorage.setItem('bookmarked_subcategories', JSON.stringify(Array.from(subcategories)))
      ]);
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  };

  const toggleBookmarkSubcategory = async (subcategoryId: string) => {
    const newBookmarksSet = new Set(bookmarkedSubcategories);
    if (newBookmarksSet.has(subcategoryId)) {
      newBookmarksSet.delete(subcategoryId);
    } else {
      newBookmarksSet.add(subcategoryId);
    }
    setBookmarkedSubcategories(newBookmarksSet);
    await saveBookmarks(bookmarkedDuas, newBookmarksSet);
  };

  const getBookmarkedSubcategories = () => {
    const bookmarked: DuaSubcategory[] = [];
    
    ZIKR_SERIES.forEach(series => {
      if (series.subcategories) {
        series.subcategories.forEach(subcategory => {
          if (bookmarkedSubcategories.has(subcategory.id)) {
            bookmarked.push(subcategory);
          }
        });
      }
    });
    
    return bookmarked;
  };

  const filteredSeries = ZIKR_SERIES;

  const handleSeriesSelect = (series: ZikrSeries) => {
    if (hasSubcategories(series) || isMixedSeries(series)) {
      // Complex or mixed series - show subcategories (and direct duas if mixed)
      setSelectedSeries(series);
      setShowSubcategories(true);
    } else {
      
    }
  };

  const startZikrSession = (subcategory: DuaSubcategory) => {
    setSelectedSubcategory(subcategory);
    setCurrentDuaIndex(0);
    setCurrentCount(0);
    setZikrSessionVisible(true);
  };

  const closeZikrSession = () => {
    setZikrSessionVisible(false);
    setSelectedSubcategory(null);
    setCurrentDuaIndex(0);
    setCurrentCount(0);
  };

  const goBackToSeries = () => {
    setShowSubcategories(false);
    setSelectedSeries(null);
  };

  const incrementCount = () => {
    if (!selectedSubcategory) return;

    const currentDua = selectedSubcategory.duas[currentDuaIndex];
    const newCount = currentCount + 1;

    if (newCount >= (currentDua.repetitions || 1)) {
      // Move to next dua
      if (currentDuaIndex < selectedSubcategory.duas.length - 1) {
        // Completed current dhikr, moving to next
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        const nextIndex = currentDuaIndex + 1;
        setCurrentDuaIndex(nextIndex);
        setCurrentCount(0);
        // Auto-scroll to next page
        horizontalScrollRef.current?.scrollTo({
          x: nextIndex * width,
          animated: true
        });
      } else {
        // Session complete - stronger celebration feedback
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          setTimeout(() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }, 200);
        }
        closeZikrSession();
      }
    } else {
      // Regular count increment - light tap feedback
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      setCurrentCount(newCount);
    }
  };

  const handlePageChange = (event: any) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    if (pageIndex !== currentDuaIndex && pageIndex >= 0 && pageIndex < (selectedSubcategory?.duas.length || 0)) {
      setCurrentDuaIndex(pageIndex);
      setCurrentCount(0); // Reset counter when manually swiping to different dua
      // Light haptic feedback for manual swipe
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  };

  const CategoryButton = ({ category, isSelected }: { category: ZikrCategory, isSelected: boolean }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        {
          backgroundColor: isSelected ? manuscriptColors.brown : manuscriptColors.parchment,
          borderColor: manuscriptColors.border,
          borderWidth: 1
        }
      ]}
      onPress={() => handleCategorySelect(category.id)}
    >
      <Ionicons
        name={category.icon as any}
        size={20}
        color={isSelected ? manuscriptColors.parchment : manuscriptColors.brown}
      />
      <Text style={[
        styles.categoryText,
        { color: isSelected ? manuscriptColors.parchment : manuscriptColors.brown }
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const SeriesCard = ({ series }: { series: ZikrSeries }) => {
    const totalDuas = getAllDuasFromSeries(series).length;
    const hasSubcats = hasSubcategories(series);
    
    return (
      <TouchableOpacity
        style={styles.manuscriptCard}
        onPress={() => handleSeriesSelect(series)}
      >
        <LinearGradient
          colors={[manuscriptColors.parchment, manuscriptColors.darkParchment]}
          style={styles.cardGradient}
        >
          <View style={[styles.cardBorder, { borderColor: manuscriptColors.border }]}>
            <View style={styles.duaHeader}>
              <Text style={[styles.duaTitle, { color: manuscriptColors.ink }]}>{series.title}</Text>
              <Ionicons name={series.icon as any} size={20} color={manuscriptColors.brown} />
            </View>
            <Text style={[styles.duaTranslation, { color: manuscriptColors.lightInk }]} numberOfLines={2}>
              {series.description}
            </Text>
            <View style={styles.duaFooter}>
              <View style={styles.duaFooterLeft}>
                <Ionicons name="book" size={12} color={manuscriptColors.brown} />
                <Text style={[styles.duaReference, { color: manuscriptColors.brown }]}>
                  {hasSubcats 
                    ? `${series.subcategories?.length || 0} categories • ${totalDuas} duas`
                    : `${totalDuas} duas`
                  }
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={manuscriptColors.brown} />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const SubcategoryCard = ({ subcategory }: { subcategory: DuaSubcategory }) => (
    <TouchableOpacity
      style={styles.manuscriptCard}
      onPress={() => startZikrSession(subcategory)}
    >
      <LinearGradient
        colors={[manuscriptColors.parchment, manuscriptColors.darkParchment]}
        style={styles.cardGradient}
      >
        <View style={[styles.cardBorder, { borderColor: manuscriptColors.border }]}>
          <View style={styles.subcategoryHeader}>
            <View style={styles.subcategoryTitleContainer}>
              <Text style={[styles.duaTitle, { color: manuscriptColors.ink }]}>{subcategory.name}</Text>
              <Ionicons name={subcategory.icon as any} size={20} color={manuscriptColors.brown} />
            </View>
            <TouchableOpacity
              style={styles.bookmarkButton}
              onPress={(e) => {
                e.stopPropagation();
                toggleBookmarkSubcategory(subcategory.id);
              }}
            >
              <Ionicons 
                name={bookmarkedSubcategories.has(subcategory.id) ? "bookmark" : "bookmark-outline"} 
                size={20} 
                color={bookmarkedSubcategories.has(subcategory.id) ? manuscriptColors.gold : manuscriptColors.brown} 
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.duaTranslation, { color: manuscriptColors.lightInk }]} numberOfLines={2}>
            {subcategory.description}
          </Text>
          <View style={styles.duaFooter}>
            <View style={styles.duaFooterLeft}>
              <Ionicons name="book" size={12} color={manuscriptColors.brown} />
              <Text style={[styles.duaReference, { color: manuscriptColors.brown }]}>
                {subcategory.duas.length} duas
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={manuscriptColors.brown} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  // Spiral binding component
  const SpiralBinding = () => (
    <View style={styles.spiralContainer}>
      {Array.from({ length: 18 }, (_, i) => (
        <View key={i} style={[styles.spiralHole, { backgroundColor: manuscriptColors.spiralBinding }]} />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: manuscriptColors.parchment }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <View>
            <View style={styles.greetingContainer}>
              <View style={[styles.greetingBadge, {
                backgroundColor: manuscriptColors.brown + '20',
                borderColor: manuscriptColors.border
              }]}>
                <Ionicons name="moon" size={16} color={manuscriptColors.brown} style={styles.greetingIcon} />
                <Text style={[styles.greeting, { color: manuscriptColors.brown }]}>Islamic Supplications</Text>
              </View>
            </View>
            <Text style={[styles.title, { color: manuscriptColors.lightInk }]}>Dua & Dhikr</Text>
          </View>
        </Animated.View>

        {/* Tab Navigation */}
        <Animated.View entering={FadeInDown.delay(500)} style={styles.tabContainer}>
          <View style={[styles.tabBar, { backgroundColor: manuscriptColors.parchment, borderColor: manuscriptColors.border }]}>
            {(['All', 'Collections'] as TabType[]).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && [styles.activeTabButton, { backgroundColor: manuscriptColors.brown }]
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    { color: manuscriptColors.brown },
                    activeTab === tab && [styles.activeTabButtonText, { color: manuscriptColors.parchment }]
                  ]}
                >
                  {tab}
                </Text>
                {tab === 'Collections' && bookmarkedSubcategories.size > 0 && (
                  <View style={[styles.tabBadge, { backgroundColor: manuscriptColors.gold }]}>
                    <Text style={[styles.tabBadgeText, { color: manuscriptColors.parchment }]}>
                      {bookmarkedSubcategories.size}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Zikr Series List or Subcategories */}
        {!showSubcategories && activeTab === 'All' ? (
          <Animated.View entering={FadeInDown.delay(600)} style={styles.supplicationsSection}>
            <Text style={[styles.sectionTitle, { color: manuscriptColors.brown }]}>
              SUPPLICATIONS ({filteredSeries.length})
            </Text>
            {filteredSeries.map((series: ZikrSeries, index: number) => (
              <Animated.View key={series.id} entering={FadeInDown.delay(700 + index * 100)}>
                <SeriesCard series={series} />
              </Animated.View>
            ))}
            {filteredSeries.length === 0 && (
              <View style={styles.emptyState}>
                <Ionicons name="book" size={48} color={manuscriptColors.lightInk} />
                <Text style={[styles.emptyStateText, { color: manuscriptColors.lightInk }]}>
                  No zikr series in this category
                </Text>
              </View>
            )}
          </Animated.View>
        ) : !showSubcategories && activeTab === 'Collections' ? (
          <Animated.View entering={FadeInDown.delay(600)} style={styles.supplicationsSection}>
            <Text style={[styles.sectionTitle, { color: manuscriptColors.brown }]}>
              MY COLLECTIONS ({bookmarkedSubcategories.size})
            </Text>
            {getBookmarkedSubcategories().length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="bookmark-outline" size={48} color={manuscriptColors.lightInk} />
                <Text style={[styles.emptyStateText, { color: manuscriptColors.lightInk }]}>
                  No bookmarked supplications yet
                </Text>
                <Text style={[styles.emptyStateSubtext, { color: manuscriptColors.lightInk }]}>
                  Tap the bookmark icon on any supplication to save it here
                </Text>
              </View>
            ) : (
              getBookmarkedSubcategories().map((subcategory: DuaSubcategory, index: number) => (
                <Animated.View key={subcategory.id} entering={FadeInDown.delay(700 + index * 100)}>
                  <SubcategoryCard subcategory={subcategory} />
                </Animated.View>
              ))
            )}
          </Animated.View>
        ) : showSubcategories ? (
          <Animated.View entering={FadeInDown.delay(300)} style={styles.supplicationsSection}>
            {/* Back Button */}
            <TouchableOpacity
              style={[styles.backButton, {
                backgroundColor: manuscriptColors.parchment,
                borderColor: manuscriptColors.border
              }]}
              onPress={goBackToSeries}
            >
              <Ionicons name="chevron-back" size={20} color={manuscriptColors.brown} />
              <Text style={[styles.backButtonText, { color: manuscriptColors.brown }]}>
                Back to Series
              </Text>
            </TouchableOpacity>

            <Text style={[styles.sectionTitle, { color: manuscriptColors.brown }]}>
              {selectedSeries?.title ? `${selectedSeries.title.toUpperCase()} CATEGORIES` : 'CATEGORIES'}
            </Text>
            {selectedSeries?.subcategories?.map((subcategory: DuaSubcategory, index: number) => (
              <Animated.View key={subcategory.id} entering={FadeInDown.delay(400 + index * 100)}>
                <SubcategoryCard subcategory={subcategory} />
              </Animated.View>
            ))}
          </Animated.View>
        ) : null}
      </ScrollView>

      {/* Zikr Session Modal - Islamic Manuscript Style */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={zikrSessionVisible}
        onRequestClose={closeZikrSession}
      >
        <LinearGradient
          colors={[manuscriptColors.parchment, manuscriptColors.darkParchment]}
          style={styles.manuscriptContainer}
        >
          <SafeAreaView style={styles.manuscriptSafeArea}>
            {/* Spiral Binding */}
            <SpiralBinding />

            {/* Manuscript Header */}
            <View style={[styles.manuscriptHeader, { borderBottomColor: manuscriptColors.border }]}>
              <TouchableOpacity
                style={[styles.closeButton, {
                  backgroundColor: manuscriptColors.parchment,
                  borderColor: manuscriptColors.border
                }]}
                onPress={closeZikrSession}
              >
                <Ionicons name="chevron-back" size={24} color={manuscriptColors.brown} />
              </TouchableOpacity>

              <View style={styles.titleContainer}>
                <Text style={[styles.manuscriptTitle, { color: manuscriptColors.ink }]}>
                  {selectedSubcategory?.name || 'دعاء'}
                </Text>
                <Text style={[styles.manuscriptSubtitle, { color: manuscriptColors.lightInk }]}>
                  {selectedSubcategory?.duas[currentDuaIndex]?.title || ''}
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.displayControlsButton, {
                  backgroundColor: manuscriptColors.parchment,
                  borderColor: manuscriptColors.border
                }]}
                onPress={() => setShowDisplayControls(true)}
              >
                <Ionicons name="options" size={24} color={manuscriptColors.brown} />
              </TouchableOpacity>
            </View>

            {/* Manuscript Content - Horizontal Swiping */}
            {selectedSubcategory && selectedSubcategory.duas && selectedSubcategory.duas.length > 0 && (
              <ScrollView
                ref={horizontalScrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handlePageChange}
                style={styles.horizontalScrollView}
                contentOffset={{ x: currentDuaIndex * width, y: 0 }}
              >
                {selectedSubcategory.duas.map((dua, index) => (
                  <ScrollView
                    key={index}
                    style={[styles.manuscriptScrollView, { width }]}
                    contentContainerStyle={styles.manuscriptContent}
                    showsVerticalScrollIndicator={false}
                  >
                    <TouchableOpacity
                      style={styles.tappableContent}
                      onPress={index === currentDuaIndex ? incrementCount : undefined}
                      activeOpacity={index === currentDuaIndex ? 0.8 : 1}
                    >
                      {/* Arabic Text */}
                      <View style={styles.arabicSection}>
                        <Text style={[styles.manuscriptArabic, { color: manuscriptColors.ink }]}>
                          {dua.arabic || ''}
                        </Text>
                      </View>

                      {/* Divider */}
                      <View style={[styles.manuscriptDivider, { backgroundColor: manuscriptColors.border }]} />

                      {/* Transliteration */}
                      <View style={styles.textSection}>
                        <Text style={[styles.manuscriptTransliteration, { color: manuscriptColors.lightInk }]}>
                          {dua.transliteration || ''}
                        </Text>
                      </View>

                      {/* Translation */}
                      <View style={styles.textSection}>
                        <Text style={[styles.manuscriptTranslation, { color: manuscriptColors.lightInk }]}>
                          {dua.translation || ''}
                        </Text>
                      </View>

                      {/* Reference */}
                      <View style={[styles.referenceSection, { borderTopColor: manuscriptColors.border }]}>
                        {(dua.fullReference && (dua.id === '1-2' || dua.id === '2-1' || dua.id === '2-2' || dua.id === '2-6' || dua.id === '2-8')) ? (
                          <ExpandableText
                            text={`Reference: ${dua.reference || ''}\n\n${dua.fullReference}`}
                            numberOfLines={2}
                            style={[styles.manuscriptReference, { color: manuscriptColors.brown }]}
                            expandStyle={[styles.manuscriptReference, { color: manuscriptColors.brown }]}
                            buttonStyle={[styles.learnMoreButton, {
                              backgroundColor: manuscriptColors.brown + '15',
                              borderColor: manuscriptColors.brown + '30'
                            }]}
                            textAlign="left"
                          />
                        ) : (
                          <Text style={[styles.manuscriptReference, { color: manuscriptColors.brown }]}>
                            {dua.reference || ''}
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                ))}
              </ScrollView>
            )}

            {/* Navigation Indicator */}
            {selectedSubcategory && (
              <View style={styles.swipeIndicatorContainer}>
                {selectedSubcategory.duas.length > 1 && (
                  <View style={styles.swipeDotsContainer}>
                    {selectedSubcategory.duas.map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.swipeDot,
                          {
                            backgroundColor: index === currentDuaIndex
                              ? manuscriptColors.brown
                              : manuscriptColors.border
                          }
                        ]}
                      />
                    ))}
                  </View>
                )}
                <Text style={[styles.swipeHint, { color: manuscriptColors.lightInk }]}>
                  {selectedSubcategory.duas.length > 1
                    ? 'Swipe left/right to navigate • Tap anywhere to count'
                    : 'Tap anywhere on the screen to count'
                  }
                </Text>
              </View>
            )}

            {/* Islamic Counter */}
            {/* Islamic Counter - Only show for non-importance sections */}
            {selectedSubcategory && !selectedSubcategory.name.toLowerCase().includes('importance') && (
              <View style={[styles.islamicCounterContainer, { borderTopColor: manuscriptColors.border }]}>
                {/* Counter Info Row */}
                <View style={styles.counterInfoRow}>
                  <View style={[styles.counterLabelContainer, {
                    backgroundColor: manuscriptColors.parchment + '80',
                    borderColor: manuscriptColors.border
                  }]}>
                    <Text style={[styles.counterLabelText, { color: manuscriptColors.brown }]}>
                      Dhikr {currentDuaIndex + 1} of {selectedSubcategory?.duas.length || 1}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.islamicCounterButton}
                    onPress={incrementCount}
                  >
                    <LinearGradient
                      colors={[manuscriptColors.gold, manuscriptColors.darkGold]}
                      style={[styles.counterButtonGradient, { borderColor: manuscriptColors.brown }]}
                    >
                      <Text style={[styles.counterButtonText, { color: manuscriptColors.ink }]}>
                        {currentCount + 1}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <View style={[styles.counterLabelContainer, {
                    backgroundColor: manuscriptColors.parchment + '80',
                    borderColor: manuscriptColors.border
                  }]}>
                    <Text style={[styles.counterLabelText, { color: manuscriptColors.brown }]}>
                      {selectedSubcategory?.duas[currentDuaIndex]?.repetitions === 1 ? 'Once' : `${selectedSubcategory?.duas[currentDuaIndex]?.repetitions || 1} times`}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </SafeAreaView>
        </LinearGradient>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  greetingContainer: {
    marginBottom: 8,
  },
  greetingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  greetingIcon: {
    marginRight: 6,
  },
  greeting: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
  },
  categoriesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  subCategoriesSection: {
    marginBottom: 20,
  },
  subCategoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  subCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 8,
    width: '45%', // Adjust as needed for grid layout
    aspectRatio: 1.2, // Make buttons slightly taller than wide
  },
  subCategoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  subCategoryContent: {
    flex: 1,
  },
  subCategoryName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  subCategoryDescription: {
    fontSize: 12,
    lineHeight: 18,
  },
  supplicationsSection: {
    paddingHorizontal: 20,
  },
  manuscriptCard: {
    marginBottom: 12,
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
  },
  duaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  duaTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  duaTranslation: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    marginTop: 12,
  },

  // Manuscript Modal Styles
  manuscriptContainer: {
    flex: 1,
  },
  manuscriptSafeArea: {
    flex: 1,
  },
  spiralContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  spiralHole: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  manuscriptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 2,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  manuscriptTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  manuscriptSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 2,
  },
  progressIndicator: {
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  horizontalScrollView: {
    flex: 1,
  },
  manuscriptScrollView: {
    flex: 1,
  },
  manuscriptContent: {
    padding: 20,
    paddingTop: 30,
    minHeight: height * 0.6,
  },
  tappableContent: {
    flex: 1,
    minHeight: height * 0.6,
  },
  arabicSection: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  manuscriptArabic: {
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 40,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'System',
  },
  manuscriptDivider: {
    height: 2,
    marginVertical: 20,
    marginHorizontal: width * 0.25,
  },
  textSection: {
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  manuscriptTransliteration: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    textAlign: 'justify',
  },
  manuscriptTranslation: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  referenceSection: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    paddingHorizontal: 10,
  },
  manuscriptReference: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'justify',
    fontWeight: '500',
  },
  swipeIndicatorContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  swipeDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  swipeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  swipeHint: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  islamicCounterContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopWidth: 2,
  },
  counterInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  counterLabelContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterLabelText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  islamicCounterButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  counterButtonGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
  },
  counterButtonText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  learnMoreButton: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 10,
    right: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  tabContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  activeTabButton: {
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabButtonText: {
  },
  tabBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  tabBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  subcategoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  subcategoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  bookmarkButton: {
    padding: 4,
    marginLeft: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  displayControlsButton: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  controlsModalContainer: {
    flex: 1,
  },
  controlsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  controlsTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  controlsContent: {
    flex: 1,
    padding: 20,
  },
  controlSection: {
    marginBottom: 32,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 12,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '500',
    minWidth: 24,
    textAlign: 'center',
  },
  controlValue: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  fontFamilyButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  fontFamilyButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  fontFamilyText: {
    fontSize: 14,
    fontWeight: '500',
  },
  alignmentButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  alignmentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  alignmentText: {
    fontSize: 14,
    fontWeight: '500',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  toggleInfo: {
    flex: 1,
    marginRight: 16,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 14,
  },
  toggle: {
    width: 51,
    height: 31,
    borderRadius: 15.5,
    padding: 2,
    justifyContent: 'center',
  },
  toggleHandle: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
  },
  previewContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  previewArabic: {
    marginBottom: 12,
    writingDirection: 'rtl',
  },
  previewText: {
    marginBottom: 8,
  },
});