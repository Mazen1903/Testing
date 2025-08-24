import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { ZikrSeries, Dua } from '@/shared/types';
import { ExpandableText } from '@/src/components/ui/ExpandableText';

interface SupplicationsListProps {
  series: ZikrSeries;
  onBack: () => void;
  onSetReminder: (supplication: any) => void;
}

export function SupplicationsList({ series, onBack, onSetReminder }: SupplicationsListProps) {
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

  const renderDua = (dua: Dua, index: number) => (
    <Animated.View
      key={dua.id}
      entering={FadeInDown.delay(index * 50)}
      style={[styles.duaCard, { backgroundColor: colors.card, borderColor: colors.border }]}
    >
      <View style={styles.duaHeader}>
        <Text style={[styles.duaTitle, { color: colors.text }]}>{dua.title}</Text>
        {shouldShowReminderIcon(series.title) && (
          <TouchableOpacity
            style={[styles.reminderButton, { backgroundColor: colors.primary + '15' }]}
            onPress={() => onSetReminder({ 
              id: dua.id, 
              title: dua.title, 
              category: series.title 
            })}
          >
            <Ionicons name="notifications-outline" size={18} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.duaContent}>
        <Text style={[styles.arabicText, { color: colors.text }]}>{dua.arabic}</Text>
        
        <View style={styles.transliterationContainer}>
          <Text style={[styles.sectionLabel, { color: colors.primary }]}>Transliteration:</Text>
          <Text style={[styles.transliterationText, { color: colors.secondaryText }]}>
            {dua.transliteration}
          </Text>
        </View>
        
        <View style={styles.translationContainer}>
          <Text style={[styles.sectionLabel, { color: colors.primary }]}>Translation:</Text>
          <ExpandableText
            text={dua.translation}
            numberOfLines={3}
            style={[styles.translationText, { color: colors.text }]}
            textAlign="left"
          />
        </View>
        
        {dua.reference && (
          <View style={styles.referenceContainer}>
            <Text style={[styles.referenceText, { color: colors.secondaryText }]}>
              Reference: {dua.reference}
            </Text>
          </View>
        )}
        
        {dua.repetitions && (
          <View style={[styles.repetitionBadge, { backgroundColor: colors.primary + '15' }]}>
            <Text style={[styles.repetitionText, { color: colors.primary }]}>
              Repeat {dua.repetitions}x
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={2}>
          {series.title}
        </Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Series Description */}
        <View style={[styles.descriptionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.descriptionText, { color: colors.text }]}>
            {series.description}
          </Text>
        </View>

        {/* Render Subcategories or Direct Duas */}
        {series.subcategories ? (
          series.subcategories.map((subcategory, index) => (
            <View key={subcategory.id}>
              <Text style={[styles.subcategoryTitle, { color: colors.primary }]}>
                {subcategory.name}
              </Text>
              <Text style={[styles.subcategoryDescription, { color: colors.secondaryText }]}>
                {subcategory.description}
              </Text>
              {subcategory.duas.map((dua, duaIndex) => renderDua(dua, index * 10 + duaIndex))}
            </View>
          ))
        ) : (
          series.duas?.map((dua, index) => renderDua(dua, index))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  descriptionCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  subcategoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  subcategoryDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  duaCard: {
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  duaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  duaTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  reminderButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  duaContent: {
    padding: 16,
    paddingTop: 0,
  },
  arabicText: {
    fontSize: 20,
    lineHeight: 32,
    textAlign: 'right',
    marginBottom: 16,
    fontWeight: '500',
  },
  transliterationContainer: {
    marginBottom: 16,
  },
  translationContainer: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  transliterationText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  translationText: {
    fontSize: 14,
    lineHeight: 22,
  },
  referenceContainer: {
    marginBottom: 12,
  },
  referenceText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  repetitionBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  repetitionText: {
    fontSize: 12,
    fontWeight: '600',
  },
});