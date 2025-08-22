import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
} from 'react-native';
import Animated, { FadeInDown, FadeInRight, SlideInUp, FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { ZikrSeries, ZikrCategory, DuaSubcategory } from '@/shared/types/supplications';
import { ZIKR_SERIES, ZIKR_CATEGORIES } from '@/shared/constants/supplications';
import { ExpandableText } from '@/src/components/ui/ExpandableText';

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

// Helper function to get elegant Islamic colors based on theme
const getIslamicColors = (isDark: boolean, themeColors: any) => ({
  // Primary Islamic colors
  emerald: isDark ? '#10B981' : '#059669',
  gold: isDark ? '#F59E0B' : '#D97706',
  sapphire: isDark ? '#3B82F6' : '#2563EB',
  
  // Elegant backgrounds
  mosque: isDark ? '#1F2937' : '#F8FAFC',
  prayer: isDark ? '#374151' : '#F1F5F9',
  sacred: isDark ? '#4B5563' : '#E2E8F0',
  
  // Text colors
  verse: isDark ? '#F9FAFB' : '#1F2937',
  translation: isDark ? '#D1D5DB' : '#4B5563',
  reference: isDark ? '#9CA3AF' : '#6B7280',
  
  // Accent colors
  crescent: isDark ? '#FBBF24' : '#F59E0B',
  minaret: isDark ? '#34D399' : '#10B981',
  
  // Gradients
  dawn: isDark ? ['#1F2937', '#374151'] : ['#FEF3C7', '#FDE68A'],
  dusk: isDark ? ['#374151', '#4B5563'] : ['#DBEAFE', '#BFDBFE'],
  night: isDark ? ['#111827', '#1F2937'] : ['#F3F4F6', '#E5E7EB'],
});

export default function SupplicationsScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const islamicColors = getIslamicColors(isDark, colors);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeries, setSelectedSeries] = useState<ZikrSeries | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<DuaSubcategory | null>(null);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [zikrSessionVisible, setZikrSessionVisible] = useState(false);
  const [currentDuaIndex, setCurrentDuaIndex] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const horizontalScrollRef = useRef<ScrollView>(null);

  const filteredSeries = ZIKR_SERIES.filter((series: ZikrSeries) => {
    const matchesCategory = selectedCategory === 'all' || series.categories.includes(selectedCategory);
    return matchesCategory;
  });

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSeriesSelect = (series: ZikrSeries) => {
    if (hasSubcategories(series) || isMixedSeries(series)) {
      setSelectedSeries(series);
      setShowSubcategories(true);
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
      if (currentDuaIndex < selectedSubcategory.duas.length - 1) {
        const nextIndex = currentDuaIndex + 1;
        setCurrentDuaIndex(nextIndex);
        setCurrentCount(0);
        horizontalScrollRef.current?.scrollTo({
          x: nextIndex * width,
          animated: true
        });
      } else {
        closeZikrSession();
      }
    } else {
      setCurrentCount(newCount);
    }
  };

  const handlePageChange = (event: any) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    if (pageIndex !== currentDuaIndex && pageIndex >= 0 && pageIndex < (selectedSubcategory?.duas.length || 0)) {
      setCurrentDuaIndex(pageIndex);
      setCurrentCount(0);
    }
  };

  // Elegant Islamic decorative elements
  const IslamicPattern = ({ size = 24, color = islamicColors.gold }) => (
    <View style={[styles.islamicPattern, { width: size, height: size }]}>
      <View style={[styles.patternDot, { backgroundColor: color }]} />
      <View style={[styles.patternDot, { backgroundColor: color, opacity: 0.6 }]} />
      <View style={[styles.patternDot, { backgroundColor: color, opacity: 0.3 }]} />
    </View>
  );

  const CategoryButton = ({ category, isSelected }: { category: ZikrCategory, isSelected: boolean }) => (
    <Animated.View entering={FadeInRight.delay(300)}>
      <TouchableOpacity
        style={[
          styles.elegantCategoryButton,
          {
            backgroundColor: isSelected ? islamicColors.emerald : islamicColors.mosque,
            borderColor: isSelected ? islamicColors.emerald : islamicColors.sacred,
            shadowColor: isSelected ? islamicColors.emerald : '#000',
          }
        ]}
        onPress={() => handleCategorySelect(category.id)}
      >
        <LinearGradient
          colors={isSelected ? [islamicColors.emerald, islamicColors.minaret] : [islamicColors.mosque, islamicColors.prayer]}
          style={styles.categoryGradient}
        >
          <View style={[styles.categoryIconContainer, { backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : islamicColors.sacred }]}>
            <Ionicons
              name={category.icon as any}
              size={20}
              color={isSelected ? '#FFFFFF' : islamicColors.emerald}
            />
          </View>
          <Text style={[
            styles.elegantCategoryText,
            { color: isSelected ? '#FFFFFF' : islamicColors.verse }
          ]}>
            {category.name}
          </Text>
          {isSelected && <IslamicPattern size={16} color="rgba(255,255,255,0.4)" />}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  const SeriesCard = ({ series, index }: { series: ZikrSeries, index: number }) => {
    const totalDuas = getAllDuasFromSeries(series).length;
    const hasSubcats = hasSubcategories(series);
    
    return (
      <Animated.View entering={FadeInDown.delay(400 + index * 100)}>
        <TouchableOpacity
          style={styles.elegantSeriesCard}
          onPress={() => handleSeriesSelect(series)}
        >
          <LinearGradient
            colors={islamicColors.dawn}
            style={styles.seriesCardGradient}
          >
            <View style={[styles.seriesCardBorder, { borderColor: islamicColors.sacred }]}>
              {/* Decorative header */}
              <View style={styles.seriesCardHeader}>
                <IslamicPattern size={20} color={islamicColors.gold} />
                <View style={[styles.seriesIconContainer, { backgroundColor: islamicColors.emerald + '20' }]}>
                  <Ionicons name={series.icon as any} size={24} color={islamicColors.emerald} />
                </View>
                <IslamicPattern size={20} color={islamicColors.gold} />
              </View>

              {/* Content */}
              <View style={styles.seriesCardContent}>
                <Text style={[styles.elegantSeriesTitle, { color: islamicColors.verse }]}>
                  {series.title}
                </Text>
                <Text style={[styles.elegantSeriesDescription, { color: islamicColors.translation }]} numberOfLines={2}>
                  {series.description}
                </Text>
                
                {/* Stats */}
                <View style={styles.seriesStats}>
                  <View style={[styles.statBadge, { backgroundColor: islamicColors.emerald + '15' }]}>
                    <Ionicons name="book" size={12} color={islamicColors.emerald} />
                    <Text style={[styles.statText, { color: islamicColors.emerald }]}>
                      {hasSubcats 
                        ? `${series.subcategories?.length || 0} categories`
                        : `${totalDuas} duas`
                      }
                    </Text>
                  </View>
                  <View style={[styles.statBadge, { backgroundColor: islamicColors.gold + '15' }]}>
                    <Ionicons name="time" size={12} color={islamicColors.gold} />
                    <Text style={[styles.statText, { color: islamicColors.gold }]}>
                      {totalDuas} duas
                    </Text>
                  </View>
                </View>
              </View>

              {/* Footer with arrow */}
              <View style={styles.seriesCardFooter}>
                <View style={[styles.decorativeLine, { backgroundColor: islamicColors.sacred }]} />
                <View style={[styles.arrowContainer, { backgroundColor: islamicColors.emerald }]}>
                  <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const SubcategoryCard = ({ subcategory, index }: { subcategory: DuaSubcategory, index: number }) => (
    <Animated.View entering={FadeInDown.delay(300 + index * 100)}>
      <TouchableOpacity
        style={styles.elegantSubcategoryCard}
        onPress={() => startZikrSession(subcategory)}
      >
        <LinearGradient
          colors={islamicColors.dusk}
          style={styles.subcategoryGradient}
        >
          <View style={[styles.subcategoryBorder, { borderColor: islamicColors.sacred }]}>
            <View style={styles.subcategoryHeader}>
              <View style={[styles.subcategoryIconContainer, { backgroundColor: islamicColors.sapphire + '20' }]}>
                <Ionicons name={subcategory.icon as any} size={20} color={islamicColors.sapphire} />
              </View>
              <View style={styles.subcategoryTitleContainer}>
                <Text style={[styles.elegantSubcategoryTitle, { color: islamicColors.verse }]}>
                  {subcategory.name}
                </Text>
                <Text style={[styles.elegantSubcategoryDescription, { color: islamicColors.translation }]} numberOfLines={1}>
                  {subcategory.description}
                </Text>
              </View>
              <View style={[styles.duaCountBadge, { backgroundColor: islamicColors.sapphire }]}>
                <Text style={styles.duaCountText}>{subcategory.duas.length}</Text>
              </View>
            </View>
            
            <View style={[styles.subcategoryDivider, { backgroundColor: islamicColors.sacred }]} />
            
            <View style={styles.subcategoryFooter}>
              <Text style={[styles.subcategoryHint, { color: islamicColors.reference }]}>
                Tap to begin dhikr session
              </Text>
              <Ionicons name="arrow-forward" size={14} color={islamicColors.sapphire} />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  // Elegant Islamic geometric pattern for background
  const GeometricPattern = () => (
    <View style={styles.geometricPattern}>
      {Array.from({ length: 8 }, (_, i) => (
        <View key={i} style={[styles.geometricShape, { 
          backgroundColor: islamicColors.sacred + '10',
          transform: [{ rotate: `${i * 45}deg` }]
        }]} />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: islamicColors.mosque }]}>
      <LinearGradient
        colors={[islamicColors.mosque, islamicColors.prayer]}
        style={styles.backgroundGradient}
      >
        <GeometricPattern />
        
        <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 120 }}>
          {/* Elegant Header */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.elegantHeader}>
            <View style={styles.headerDecoration}>
              <IslamicPattern size={32} color={islamicColors.gold} />
            </View>
            <View style={styles.headerContent}>
              <Text style={[styles.arabicTitle, { color: islamicColors.verse }]}>الأدعية والأذكار</Text>
              <Text style={[styles.englishTitle, { color: islamicColors.translation }]}>Supplications & Remembrance</Text>
              <View style={[styles.titleUnderline, { backgroundColor: islamicColors.gold }]} />
            </View>
            <View style={styles.headerDecoration}>
              <IslamicPattern size={32} color={islamicColors.gold} />
            </View>
          </Animated.View>

          {/* Elegant Categories */}
          <Animated.View entering={FadeInDown.delay(200)} style={styles.categoriesSection}>
            <View style={styles.sectionHeaderContainer}>
              <View style={[styles.sectionDivider, { backgroundColor: islamicColors.sacred }]} />
              <Text style={[styles.elegantSectionTitle, { color: islamicColors.emerald }]}>CATEGORIES</Text>
              <View style={[styles.sectionDivider, { backgroundColor: islamicColors.sacred }]} />
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
              <View style={styles.categoriesContainer}>
                {ZIKR_CATEGORIES.map((category: ZikrCategory, index: number) => (
                  <CategoryButton
                    key={category.id}
                    category={category}
                    isSelected={selectedCategory === category.id}
                  />
                ))}
              </View>
            </ScrollView>
          </Animated.View>

          {/* Zikr Series List or Subcategories */}
          {!showSubcategories ? (
            <Animated.View entering={FadeInDown.delay(300)} style={styles.seriesSection}>
              <View style={styles.sectionHeaderContainer}>
                <View style={[styles.sectionDivider, { backgroundColor: islamicColors.sacred }]} />
                <Text style={[styles.elegantSectionTitle, { color: islamicColors.emerald }]}>
                  ZIKR COLLECTIONS ({filteredSeries.length})
                </Text>
                <View style={[styles.sectionDivider, { backgroundColor: islamicColors.sacred }]} />
              </View>
              
              {filteredSeries.map((series: ZikrSeries, index: number) => (
                <SeriesCard key={series.id} series={series} index={index} />
              ))}
              
              {filteredSeries.length === 0 && (
                <Animated.View entering={FadeIn.delay(500)} style={styles.elegantEmptyState}>
                  <View style={[styles.emptyStateIcon, { backgroundColor: islamicColors.sacred }]}>
                    <Ionicons name="book" size={48} color={islamicColors.translation} />
                  </View>
                  <Text style={[styles.emptyStateTitle, { color: islamicColors.verse }]}>
                    No collections found
                  </Text>
                  <Text style={[styles.emptyStateText, { color: islamicColors.translation }]}>
                    Try selecting a different category
                  </Text>
                </Animated.View>
              )}
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInDown.delay(200)} style={styles.subcategoriesSection}>
              {/* Elegant Back Button */}
              <TouchableOpacity
                style={[styles.elegantBackButton, {
                  backgroundColor: islamicColors.mosque,
                  borderColor: islamicColors.sacred
                }]}
                onPress={goBackToSeries}
              >
                <LinearGradient
                  colors={[islamicColors.mosque, islamicColors.prayer]}
                  style={styles.backButtonGradient}
                >
                  <Ionicons name="chevron-back" size={20} color={islamicColors.emerald} />
                  <Text style={[styles.elegantBackButtonText, { color: islamicColors.emerald }]}>
                    Back to Collections
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.sectionHeaderContainer}>
                <View style={[styles.sectionDivider, { backgroundColor: islamicColors.sacred }]} />
                <Text style={[styles.elegantSectionTitle, { color: islamicColors.emerald }]}>
                  {selectedSeries?.title?.toUpperCase() || 'SUBCATEGORIES'}
                </Text>
                <View style={[styles.sectionDivider, { backgroundColor: islamicColors.sacred }]} />
              </View>
              
              {selectedSeries?.subcategories?.map((subcategory: DuaSubcategory, index: number) => (
                <SubcategoryCard key={subcategory.id} subcategory={subcategory} index={index} />
              ))}
            </Animated.View>
          )}
        </ScrollView>
      </LinearGradient>

      {/* Elegant Zikr Session Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={zikrSessionVisible}
        onRequestClose={closeZikrSession}
      >
        <LinearGradient
          colors={islamicColors.night}
          style={styles.modalContainer}
        >
          <SafeAreaView style={styles.modalSafeArea}>
            {/* Elegant Modal Header */}
            <Animated.View entering={SlideInUp.delay(100)} style={[styles.elegantModalHeader, { borderBottomColor: islamicColors.sacred }]}>
              <TouchableOpacity
                style={[styles.elegantCloseButton, {
                  backgroundColor: islamicColors.mosque,
                  borderColor: islamicColors.sacred
                }]}
                onPress={closeZikrSession}
              >
                <Ionicons name="chevron-back" size={24} color={islamicColors.emerald} />
              </TouchableOpacity>

              <View style={styles.modalTitleContainer}>
                <Text style={[styles.elegantModalTitle, { color: islamicColors.verse }]}>
                  {selectedSubcategory?.name || 'دعاء'}
                </Text>
                <Text style={[styles.elegantModalSubtitle, { color: islamicColors.translation }]}>
                  {selectedSubcategory?.duas[currentDuaIndex]?.title || ''}
                </Text>
                <View style={[styles.modalTitleUnderline, { backgroundColor: islamicColors.gold }]} />
              </View>

              <View style={[styles.progressIndicator, { 
                backgroundColor: islamicColors.emerald + '20',
                borderColor: islamicColors.emerald
              }]}>
                <Text style={[styles.progressText, { color: islamicColors.emerald }]}>
                  {currentDuaIndex + 1}/{selectedSubcategory?.duas.length || 1}
                </Text>
              </View>
            </Animated.View>

            {/* Elegant Content - Horizontal Swiping */}
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
                    style={[styles.duaScrollView, { width }]}
                    contentContainerStyle={styles.duaContent}
                    showsVerticalScrollIndicator={false}
                  >
                    <TouchableOpacity
                      style={styles.tappableContent}
                      onPress={index === currentDuaIndex ? incrementCount : undefined}
                      activeOpacity={index === currentDuaIndex ? 0.9 : 1}
                    >
                      <Animated.View entering={FadeIn.delay(200)} style={styles.duaContainer}>
                        {/* Decorative top border */}
                        <View style={styles.duaTopDecoration}>
                          <IslamicPattern size={24} color={islamicColors.gold} />
                          <View style={[styles.decorativeLine, { backgroundColor: islamicColors.gold }]} />
                          <IslamicPattern size={24} color={islamicColors.gold} />
                        </View>

                        {/* Arabic Text */}
                        <View style={[styles.arabicContainer, { backgroundColor: islamicColors.sacred + '10' }]}>
                          <Text style={[styles.elegantArabic, { color: islamicColors.verse }]}>
                            {dua.arabic || ''}
                          </Text>
                        </View>

                        {/* Elegant Divider */}
                        <View style={styles.elegantDivider}>
                          <View style={[styles.dividerLine, { backgroundColor: islamicColors.sacred }]} />
                          <View style={[styles.dividerCenter, { backgroundColor: islamicColors.gold }]} />
                          <View style={[styles.dividerLine, { backgroundColor: islamicColors.sacred }]} />
                        </View>

                        {/* Transliteration */}
                        <View style={styles.textContainer}>
                          <Text style={[styles.elegantTransliteration, { color: islamicColors.translation }]}>
                            {dua.transliteration || ''}
                          </Text>
                        </View>

                        {/* Translation */}
                        <View style={styles.textContainer}>
                          <Text style={[styles.elegantTranslation, { color: islamicColors.verse }]}>
                            {dua.translation || ''}
                          </Text>
                        </View>

                        {/* Reference */}
                        <View style={[styles.referenceContainer, { 
                          backgroundColor: islamicColors.sacred + '10',
                          borderTopColor: islamicColors.sacred 
                        }]}>
                          {(dua.fullReference && (dua.id === '1-2' || dua.id === '2-1' || dua.id === '2-2' || dua.id === '2-6' || dua.id === '2-8')) ? (
                            <ExpandableText
                              text={`Reference: ${dua.reference || ''}\n\n${dua.fullReference}`}
                              numberOfLines={2}
                              style={[styles.elegantReference, { color: islamicColors.reference }]}
                              expandStyle={[styles.elegantReference, { color: islamicColors.reference }]}
                              buttonStyle={[styles.expandButton, {
                                backgroundColor: islamicColors.emerald + '15',
                                borderColor: islamicColors.emerald + '30'
                              }]}
                              textAlign="center"
                            />
                          ) : (
                            <Text style={[styles.elegantReference, { color: islamicColors.reference }]}>
                              {dua.reference || ''}
                            </Text>
                          )}
                        </View>

                        {/* Decorative bottom border */}
                        <View style={styles.duaBottomDecoration}>
                          <IslamicPattern size={20} color={islamicColors.gold} />
                          <View style={[styles.decorativeLine, { backgroundColor: islamicColors.gold }]} />
                          <IslamicPattern size={20} color={islamicColors.gold} />
                        </View>
                      </Animated.View>
                    </TouchableOpacity>
                  </ScrollView>
                ))}
              </ScrollView>
            )}

            {/* Elegant Navigation Indicator */}
            {selectedSubcategory && (
              <Animated.View entering={FadeIn.delay(300)} style={styles.navigationContainer}>
                {selectedSubcategory.duas.length > 1 && (
                  <View style={styles.elegantDotsContainer}>
                    {selectedSubcategory.duas.map((_, index) => (
                      <Animated.View
                        key={index}
                        style={[
                          styles.elegantDot,
                          {
                            backgroundColor: index === currentDuaIndex
                              ? islamicColors.gold
                              : islamicColors.sacred,
                            transform: [{ scale: index === currentDuaIndex ? 1.2 : 1 }]
                          }
                        ]}
                      />
                    ))}
                  </View>
                )}
                <Text style={[styles.elegantHint, { color: islamicColors.translation }]}>
                  {selectedSubcategory.duas.length > 1
                    ? 'Swipe to navigate • Tap to count dhikr'
                    : 'Tap anywhere to count dhikr'
                  }
                </Text>
              </Animated.View>
            )}

            {/* Elegant Islamic Counter */}
            <Animated.View entering={SlideInUp.delay(400)} style={[styles.elegantCounterContainer, { 
              backgroundColor: islamicColors.prayer,
              borderTopColor: islamicColors.sacred 
            }]}>
              <View style={styles.counterDecoration}>
                <IslamicPattern size={28} color={islamicColors.gold} />
              </View>
              
              <View style={styles.counterContent}>
                <View style={[styles.counterLabelContainer, {
                  backgroundColor: islamicColors.mosque,
                  borderColor: islamicColors.sacred
                }]}>
                  <Text style={[styles.counterLabel, { color: islamicColors.emerald }]}>
                    Dhikr {currentDuaIndex + 1}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.elegantCounterButton}
                  onPress={incrementCount}
                >
                  <LinearGradient
                    colors={[islamicColors.gold, islamicColors.crescent]}
                    style={[styles.counterButtonGradient, { borderColor: islamicColors.emerald }]}
                  >
                    <View style={styles.counterButtonInner}>
                      <Text style={[styles.elegantCounterText, { color: islamicColors.verse }]}>
                        {currentCount + 1}
                      </Text>
                      <View style={[styles.counterRing, { borderColor: islamicColors.emerald + '40' }]} />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>

                <View style={[styles.counterLabelContainer, {
                  backgroundColor: islamicColors.mosque,
                  borderColor: islamicColors.sacred
                }]}>
                  <Text style={[styles.counterLabel, { color: islamicColors.emerald }]}>
                    of {selectedSubcategory?.duas[currentDuaIndex]?.repetitions || 1}
                  </Text>
                </View>
              </View>
              
              <View style={styles.counterDecoration}>
                <IslamicPattern size={28} color={islamicColors.gold} />
              </View>
            </Animated.View>
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
  backgroundGradient: {
    flex: 1,
  },
  geometricPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.03,
  },
  geometricShape: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'currentColor',
  },
  scrollView: {
    flex: 1,
  },
  
  // Elegant Header Styles
  elegantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headerDecoration: {
    flex: 0.2,
    alignItems: 'center',
  },
  headerContent: {
    flex: 0.6,
    alignItems: 'center',
  },
  arabicTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  englishTitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 1,
  },
  titleUnderline: {
    width: 60,
    height: 2,
    marginTop: 8,
    borderRadius: 1,
  },
  
  // Islamic Pattern Styles
  islamicPattern: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  patternDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 1,
  },
  
  // Section Header Styles
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionDivider: {
    flex: 1,
    height: 1,
  },
  elegantSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginHorizontal: 16,
    textAlign: 'center',
  },
  
  // Categories Styles
  categoriesSection: {
    marginBottom: 30,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  elegantCategoryButton: {
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  elegantCategoryText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  
  // Series Card Styles
  seriesSection: {
    paddingHorizontal: 20,
  },
  elegantSeriesCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  seriesCardGradient: {
    flex: 1,
  },
  seriesCardBorder: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
  },
  seriesCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  seriesIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seriesCardContent: {
    marginBottom: 16,
  },
  elegantSeriesTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  elegantSeriesDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  seriesStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
  },
  seriesCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorativeLine: {
    flex: 1,
    height: 1,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  
  // Subcategory Styles
  subcategoriesSection: {
    paddingHorizontal: 20,
  },
  elegantBackButton: {
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  backButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  elegantBackButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  elegantSubcategoryCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  subcategoryGradient: {
    flex: 1,
  },
  subcategoryBorder: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 16,
  },
  subcategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subcategoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  subcategoryTitleContainer: {
    flex: 1,
  },
  elegantSubcategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  elegantSubcategoryDescription: {
    fontSize: 12,
  },
  duaCountBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  duaCountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  subcategoryDivider: {
    height: 1,
    marginVertical: 12,
  },
  subcategoryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subcategoryHint: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  
  // Empty State Styles
  elegantEmptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
  },
  modalSafeArea: {
    flex: 1,
  },
  elegantModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  elegantCloseButton: {
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  modalTitleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  elegantModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  elegantModalSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalTitleUnderline: {
    width: 40,
    height: 2,
    borderRadius: 1,
  },
  progressIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
  },
  
  // Dua Content Styles
  horizontalScrollView: {
    flex: 1,
  },
  duaScrollView: {
    flex: 1,
  },
  duaContent: {
    padding: 20,
    paddingTop: 30,
    minHeight: height * 0.6,
  },
  tappableContent: {
    flex: 1,
    minHeight: height * 0.6,
  },
  duaContainer: {
    flex: 1,
  },
  duaTopDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  duaBottomDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  arabicContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderRadius: 16,
    marginBottom: 20,
  },
  elegantArabic: {
    fontSize: 26,
    fontWeight: '400',
    lineHeight: 42,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  elegantDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerCenter: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  textContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  elegantTransliteration: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 26,
    textAlign: 'center',
  },
  elegantTranslation: {
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    fontWeight: '400',
  },
  referenceContainer: {
    marginTop: 20,
    paddingTop: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderRadius: 12,
  },
  elegantReference: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  expandButton: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 10,
  },
  
  // Navigation Styles
  navigationContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  elegantDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  elegantDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  elegantHint: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
  
  // Counter Styles
  elegantCounterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },
  counterDecoration: {
    flex: 0.15,
    alignItems: 'center',
  },
  counterContent: {
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counterLabelContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
  },
  counterLabel: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  elegantCounterButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  counterButtonGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  counterButtonInner: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  elegantCounterText: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  counterRing: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
  },
});