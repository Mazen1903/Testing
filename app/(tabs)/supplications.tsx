import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { ZIKR_SERIES } from '@/shared/constants/supplications';
import { ExpandableText } from '@/src/components/ui/ExpandableText';

type TabType = 'All' | 'Collections';

interface DisplaySettings {
  showArabic: boolean;
  showTransliteration: boolean;
  showTranslation: boolean;
  fontSize: number;
  arabicTextAlign: 'right' | 'center';
  lineSpacing: number;
}

export default function SupplicationsScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedDua, setSelectedDua] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [showDisplayModal, setShowDisplayModal] = useState(false);
  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>({
    showArabic: true,
    showTransliteration: true,
    showTranslation: true,
    fontSize: 16,
    arabicTextAlign: 'right',
    lineSpacing: 1.5,
  });
  const [collections, setCollections] = useState<string[]>([]);

  const handleSeriesPress = (series: any) => {
    setSelectedSeries(series.id);
    setSelectedSubcategory(null);
    setSelectedDua(null);
  };

  const handleSubcategoryPress = (subcategory: any) => {
    setSelectedSubcategory(subcategory.id);
    setSelectedDua(null);
  };

  const handleDuaPress = (dua: any) => {
    setSelectedDua(dua);
  };

  const handleBackToSeries = () => {
    setSelectedSeries(null);
    setSelectedSubcategory(null);
    setSelectedDua(null);
  };

  const handleBackToSubcategories = () => {
    setSelectedSubcategory(null);
    setSelectedDua(null);
  };

  const toggleCollection = (duaId: string) => {
    setCollections(prev => 
      prev.includes(duaId) 
        ? prev.filter(id => id !== duaId)
        : [...prev, duaId]
    );
  };

  const renderAllContent = () => {
    if (selectedDua) {
      return (
        <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={handleBackToSubcategories}
          >
            <Ionicons name="chevron-back" size={20} color={colors.primary} />
            <Text style={[styles.backButtonText, { color: colors.primary }]}>Back</Text>
          </TouchableOpacity>

          <View style={[styles.duaDetailCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.duaDetailHeader}>
              <Text style={[styles.duaDetailTitle, { color: colors.text }]}>{selectedDua.title}</Text>
              <TouchableOpacity
                style={styles.collectionButton}
                onPress={() => toggleCollection(selectedDua.id)}
              >
                <Ionicons 
                  name={collections.includes(selectedDua.id) ? "bookmark" : "bookmark-outline"} 
                  size={20} 
                  color={collections.includes(selectedDua.id) ? colors.primary : colors.secondaryText} 
                />
              </TouchableOpacity>
            </View>

            {displaySettings.showArabic && selectedDua.arabic && (
              <View style={styles.arabicSection}>
                <Text style={[
                  styles.arabicText, 
                  { 
                    color: colors.text,
                    fontSize: displaySettings.fontSize + 4,
                    lineHeight: (displaySettings.fontSize + 4) * displaySettings.lineSpacing,
                    textAlign: displaySettings.arabicTextAlign,
                  }
                ]}>
                  {selectedDua.arabic}
                </Text>
              </View>
            )}

            {displaySettings.showTransliteration && selectedDua.transliteration && (
              <View style={styles.transliterationSection}>
                <Text style={[
                  styles.transliterationText, 
                  { 
                    color: colors.secondaryText,
                    fontSize: displaySettings.fontSize,
                    lineHeight: displaySettings.fontSize * displaySettings.lineSpacing,
                  }
                ]}>
                  {selectedDua.transliteration}
                </Text>
              </View>
            )}

            {displaySettings.showTranslation && selectedDua.translation && (
              <View style={styles.translationSection}>
                <Text style={[
                  styles.translationText, 
                  { 
                    color: colors.text,
                    fontSize: displaySettings.fontSize,
                    lineHeight: displaySettings.fontSize * displaySettings.lineSpacing,
                  }
                ]}>
                  {selectedDua.translation}
                </Text>
              </View>
            )}

            {selectedDua.reference && (
              <View style={[styles.referenceSection, { borderTopColor: colors.border }]}>
                {selectedDua.fullReference ? (
                  <ExpandableText
                    text={`Reference: ${selectedDua.reference}\n\n${selectedDua.fullReference}`}
                    numberOfLines={2}
                    style={[styles.referenceText, { color: colors.secondaryText }]}
                    expandStyle={[styles.referenceText, { color: colors.secondaryText }]}
                    buttonStyle={[styles.expandButton, { backgroundColor: colors.primary + '15' }]}
                  />
                ) : (
                  <Text style={[styles.referenceText, { color: colors.secondaryText }]}>
                    Reference: {selectedDua.reference}
                  </Text>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      );
    }

    if (selectedSubcategory) {
      const series = ZIKR_SERIES.find(s => s.id === selectedSeries);
      const subcategory = series?.subcategories?.find(sc => sc.id === selectedSubcategory);

      return (
        <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={handleBackToSeries}
          >
            <Ionicons name="chevron-back" size={20} color={colors.primary} />
            <Text style={[styles.backButtonText, { color: colors.primary }]}>Back to {series?.title}</Text>
          </TouchableOpacity>

          <View style={[styles.subcategoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.subcategoryHeader}>
              <Text style={[styles.subcategoryTitle, { color: colors.text }]}>{subcategory?.name}</Text>
              <Text style={[styles.subcategoryDescription, { color: colors.secondaryText }]}>{subcategory?.description}</Text>
            </View>
            {subcategory?.duas.map((dua, duaIndex) => (
              <TouchableOpacity
                key={duaIndex}
                style={[styles.duaItem, { backgroundColor: colors.background, borderColor: colors.border }]}
                onPress={() => handleDuaPress(dua)}
              >
                <View style={styles.duaItemHeader}>
                  <Text style={[styles.duaItemTitle, { color: colors.text }]}>{dua.title}</Text>
                  <TouchableOpacity
                    style={styles.collectionButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      toggleCollection(dua.id);
                    }}
                  >
                    <Ionicons 
                      name={collections.includes(dua.id) ? "bookmark" : "bookmark-outline"} 
                      size={16} 
                      color={collections.includes(dua.id) ? colors.primary : colors.secondaryText} 
                    />
                  </TouchableOpacity>
                </View>
                {dua.translation && (
                  <Text style={[styles.duaItemPreview, { color: colors.secondaryText }]} numberOfLines={2}>
                    {dua.translation}
                  </Text>
                )}
                <View style={styles.duaItemFooter}>
                  <Text style={[styles.duaItemReference, { color: colors.secondaryText }]}>
                    {dua.reference}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.secondaryText} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      );
    }

    if (selectedSeries) {
      const series = ZIKR_SERIES.find(s => s.id === selectedSeries);

      return (
        <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={handleBackToSeries}
          >
            <Ionicons name="chevron-back" size={20} color={colors.primary} />
            <Text style={[styles.backButtonText, { color: colors.primary }]}>Back to All</Text>
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>{series?.title}</Text>
          <Text style={[styles.sectionDescription, { color: colors.secondaryText }]}>{series?.description}</Text>

          {series?.subcategories?.map((subcategory, index) => (
            <Animated.View key={subcategory.id} entering={FadeInDown.delay(index * 100)}>
              <TouchableOpacity
                style={[styles.subcategoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => handleSubcategoryPress(subcategory)}
              >
                <View style={styles.subcategoryHeader}>
                  <View style={styles.subcategoryTitleRow}>
                    <Ionicons name={subcategory.icon as any} size={24} color={colors.primary} />
                    <Text style={[styles.subcategoryTitle, { color: colors.text }]}>{subcategory.name}</Text>
                  </View>
                  <Text style={[styles.subcategoryDescription, { color: colors.secondaryText }]}>{subcategory.description}</Text>
                </View>
                <View style={styles.subcategoryFooter}>
                  <Text style={[styles.subcategoryCount, { color: colors.secondaryText }]}>
                    {subcategory.duas.length} duas
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.secondaryText} />
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      );
    }

    return (
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Islamic Supplications</Text>
        <Text style={[styles.sectionDescription, { color: colors.secondaryText }]}>
          Discover authentic duas and dhikr from the Quran and Sunnah
        </Text>

        {ZIKR_SERIES.map((series, index) => (
          <Animated.View key={series.id} entering={FadeInDown.delay(index * 100)}>
            <TouchableOpacity
              style={[styles.seriesCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => handleSeriesPress(series)}
            >
              <View style={styles.seriesHeader}>
                <View style={styles.seriesTitleRow}>
                  <Ionicons name={series.icon as any} size={28} color={colors.primary} />
                  <Text style={[styles.seriesTitle, { color: colors.text }]}>{series.title}</Text>
                </View>
                <Text style={[styles.seriesDescription, { color: colors.secondaryText }]}>{series.description}</Text>
              </View>
              <View style={styles.seriesFooter}>
                <Text style={[styles.seriesCount, { color: colors.secondaryText }]}>
                  {series.subcategories?.length || 0} categories
                </Text>
                <Ionicons name="chevron-forward" size={20} color={colors.secondaryText} />
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    );
  };

  const renderCollectionsContent = () => {
    const collectedDuas: any[] = [];
    
    ZIKR_SERIES.forEach(series => {
      series.subcategories?.forEach(subcategory => {
        subcategory.duas.forEach(dua => {
          if (collections.includes(dua.id)) {
            collectedDuas.push({
              ...dua,
              seriesTitle: series.title,
              subcategoryName: subcategory.name
            });
          }
        });
      });
    });

    return (
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>My Collections</Text>
        <Text style={[styles.sectionDescription, { color: colors.secondaryText }]}>
          Your bookmarked supplications
        </Text>

        {collectedDuas.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="bookmark-outline" size={64} color={colors.border} />
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>No Collections Yet</Text>
            <Text style={[styles.emptyStateText, { color: colors.secondaryText }]}>
              Bookmark your favorite duas to access them quickly
            </Text>
          </View>
        ) : (
          collectedDuas.map((dua, index) => (
            <Animated.View key={dua.id} entering={FadeInDown.delay(index * 100)}>
              <TouchableOpacity
                style={[styles.duaItem, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => handleDuaPress(dua)}
              >
                <View style={styles.duaItemHeader}>
                  <Text style={[styles.duaItemTitle, { color: colors.text }]}>{dua.title}</Text>
                  <TouchableOpacity
                    style={styles.collectionButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      toggleCollection(dua.id);
                    }}
                  >
                    <Ionicons name="bookmark" size={16} color={colors.primary} />
                  </TouchableOpacity>
                </View>
                <Text style={[styles.duaItemCategory, { color: colors.primary }]}>
                  {dua.seriesTitle} • {dua.subcategoryName}
                </Text>
                {dua.translation && (
                  <Text style={[styles.duaItemPreview, { color: colors.secondaryText }]} numberOfLines={2}>
                    {dua.translation}
                  </Text>
                )}
                <View style={styles.duaItemFooter}>
                  <Text style={[styles.duaItemReference, { color: colors.secondaryText }]}>
                    {dua.reference}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.secondaryText} />
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))
        )}
      </ScrollView>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'All':
        return renderAllContent();
      case 'Collections':
        return renderCollectionsContent();
      default:
        return renderAllContent();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Supplications</Text>
        <TouchableOpacity
          style={[styles.settingsButton, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => setShowDisplayModal(true)}
        >
          <Ionicons name="options" size={20} color={colors.text} />
        </TouchableOpacity>
      </Animated.View>

      {/* Tab Navigation */}
      <View style={[styles.tabBar, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        {(['All', 'Collections'] as TabType[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && [styles.activeTabButton, { borderBottomColor: colors.primary }]
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabButtonText,
                { color: colors.secondaryText },
                activeTab === tab && [styles.activeTabButtonText, { color: colors.primary }]
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Display Settings Modal */}
      <Modal
        visible={showDisplayModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <TouchableOpacity onPress={() => setShowDisplayModal(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Display Settings</Text>
            <View style={{ width: 24 }} />
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.settingGroup}>
              <Text style={[styles.settingGroupTitle, { color: colors.text }]}>Text Display</Text>
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>Show Arabic</Text>
                  <Text style={[styles.settingDescription, { color: colors.secondaryText }]}>Display original Arabic text</Text>
                </View>
                <TouchableOpacity
                  style={[styles.toggle, { backgroundColor: displaySettings.showArabic ? colors.primary : colors.border }]}
                  onPress={() => setDisplaySettings(prev => ({ ...prev, showArabic: !prev.showArabic }))}
                >
                  <View style={[
                    styles.toggleHandle,
                    { 
                      backgroundColor: colors.card,
                      transform: [{ translateX: displaySettings.showArabic ? 20 : 0 }]
                    }
                  ]} />
                </TouchableOpacity>
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>Show Transliteration</Text>
                  <Text style={[styles.settingDescription, { color: colors.secondaryText }]}>Display pronunciation guide</Text>
                </View>
                <TouchableOpacity
                  style={[styles.toggle, { backgroundColor: displaySettings.showTransliteration ? colors.primary : colors.border }]}
                  onPress={() => setDisplaySettings(prev => ({ ...prev, showTransliteration: !prev.showTransliteration }))}
                >
                  <View style={[
                    styles.toggleHandle,
                    { 
                      backgroundColor: colors.card,
                      transform: [{ translateX: displaySettings.showTransliteration ? 20 : 0 }]
                    }
                  ]} />
                </TouchableOpacity>
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>Show Translation</Text>
                  <Text style={[styles.settingDescription, { color: colors.secondaryText }]}>Display English meaning</Text>
                </View>
                <TouchableOpacity
                  style={[styles.toggle, { backgroundColor: displaySettings.showTranslation ? colors.primary : colors.border }]}
                  onPress={() => setDisplaySettings(prev => ({ ...prev, showTranslation: !prev.showTranslation }))}
                >
                  <View style={[
                    styles.toggleHandle,
                    { 
                      backgroundColor: colors.card,
                      transform: [{ translateX: displaySettings.showTranslation ? 20 : 0 }]
                    }
                  ]} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomWidth: 2,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabButtonText: {
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 22,
  },
  seriesCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  seriesHeader: {
    marginBottom: 16,
  },
  seriesTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  seriesTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  seriesDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  seriesFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seriesCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  subcategoryCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  subcategoryHeader: {
    marginBottom: 12,
  },
  subcategoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  subcategoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  subcategoryDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  duaItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  duaItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  duaItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  duaItemCategory: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  duaItemPreview: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  duaItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duaItemReference: {
    fontSize: 12,
    fontWeight: '500',
  },
  subcategoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subcategoryCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    alignSelf: 'flex-start',
    gap: 8,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  duaDetailCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  duaDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  duaDetailTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  collectionButton: {
    padding: 4,
  },
  arabicSection: {
    marginBottom: 20,
  },
  arabicText: {
    fontSize: 20,
    lineHeight: 32,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  transliterationSection: {
    marginBottom: 16,
  },
  transliterationText: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  translationSection: {
    marginBottom: 16,
  },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
  },
  referenceSection: {
    paddingTop: 16,
    borderTopWidth: 1,
  },
  referenceText: {
    fontSize: 12,
    lineHeight: 18,
  },
  expandButton: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  settingGroup: {
    marginBottom: 32,
  },
  settingGroupTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
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
});