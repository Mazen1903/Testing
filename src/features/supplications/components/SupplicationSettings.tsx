import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Switch, Slider } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';

export interface SupplicationDisplaySettings {
  showArabic: boolean;
  showTransliteration: boolean;
  showTranslation: boolean;
  showReferences: boolean;
  arabicFontSize: number;
  transliterationFontSize: number;
  translationFontSize: number;
  lineHeight: number;
  arabicAlignment: 'left' | 'center' | 'right';
  textAlignment: 'left' | 'center' | 'right' | 'justify';
  fontFamily: string;
}

interface SupplicationSettingsProps {
  visible: boolean;
  onClose: () => void;
  settings: SupplicationDisplaySettings;
  onSettingsChange: (settings: SupplicationDisplaySettings) => void;
  manuscriptColors: any;
}

export default function SupplicationSettings({
  visible,
  onClose,
  settings,
  onSettingsChange,
  manuscriptColors,
}: SupplicationSettingsProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

  const updateSetting = <K extends keyof SupplicationDisplaySettings>(
    key: K,
    value: SupplicationDisplaySettings[K]
  ) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  const resetToDefaults = () => {
    const defaultSettings: SupplicationDisplaySettings = {
      showArabic: true,
      showTransliteration: true,
      showTranslation: true,
      showReferences: true,
      arabicFontSize: 24,
      transliterationFontSize: 16,
      translationFontSize: 16,
      lineHeight: 1.6,
      arabicAlignment: 'right',
      textAlignment: 'justify',
      fontFamily: 'System',
      backgroundColor: 'default',
      autoScroll: false,
      highlightMode: false
    };
    onSettingsChange(defaultSettings);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Reading Settings</Text>
          <TouchableOpacity onPress={resetToDefaults} style={styles.resetButton}>
            <Text style={[styles.resetText, { color: colors.primary }]}>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Display Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Display Options</Text>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Show Arabic Text</Text>
                <Text style={[styles.settingDescription, { color: colors.secondaryText }]}>
                  Display original Arabic text
                </Text>
              </View>
              <Switch
                value={settings.showArabic}
                onValueChange={(value) => updateSetting('showArabic', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Show Transliteration</Text>
                <Text style={[styles.settingDescription, { color: colors.secondaryText }]}>
                  Display phonetic pronunciation
                </Text>
              </View>
              <Switch
                value={settings.showTransliteration}
                onValueChange={(value) => updateSetting('showTransliteration', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Show Translation</Text>
                <Text style={[styles.settingDescription, { color: colors.secondaryText }]}>
                  Display English translation
                </Text>
              </View>
              <Switch
                value={settings.showTranslation}
                onValueChange={(value) => updateSetting('showTranslation', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Show References</Text>
                <Text style={[styles.settingDescription, { color: colors.secondaryText }]}>
                  Display hadith references
                </Text>
              </View>
              <Switch
                value={settings.showReferences}
                onValueChange={(value) => updateSetting('showReferences', value)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>
          </View>

          {/* Font Size Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Font Sizes</Text>
            
            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <Text style={[styles.sliderLabel, { color: colors.text }]}>Arabic Text Size</Text>
                <Text style={[styles.sliderValue, { color: colors.primary }]}>{settings.arabicFontSize}px</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={18}
                maximumValue={36}
                step={2}
                value={settings.arabicFontSize}
                onValueChange={(value) => updateSetting('arabicFontSize', value)}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.border}
                thumbTintColor={colors.primary}
              />
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <Text style={[styles.sliderLabel, { color: colors.text }]}>Transliteration Size</Text>
                <Text style={[styles.sliderValue, { color: colors.primary }]}>{settings.transliterationFontSize}px</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={12}
                maximumValue={24}
                step={1}
                value={settings.transliterationFontSize}
                onValueChange={(value) => updateSetting('transliterationFontSize', value)}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.border}
                thumbTintColor={colors.primary}
              />
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <Text style={[styles.sliderLabel, { color: colors.text }]}>Translation Size</Text>
                <Text style={[styles.sliderValue, { color: colors.primary }]}>{settings.translationFontSize}px</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={12}
                maximumValue={24}
                step={1}
                value={settings.translationFontSize}
                onValueChange={(value) => updateSetting('translationFontSize', value)}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.border}
                thumbTintColor={colors.primary}
              />
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <Text style={[styles.sliderLabel, { color: colors.text }]}>Line Height</Text>
                <Text style={[styles.sliderValue, { color: colors.primary }]}>{settings.lineHeight.toFixed(1)}x</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={1.2}
                maximumValue={2.0}
                step={0.1}
                value={settings.lineHeight}
                onValueChange={(value) => updateSetting('lineHeight', value)}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.border}
                thumbTintColor={colors.primary}
              />
            </View>
          </View>

          {/* Alignment Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Text Alignment</Text>
            
            <View style={styles.settingGroup}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Arabic Text Alignment</Text>
              <View style={styles.alignmentButtons}>
                {(['left', 'center', 'right'] as const).map((alignment) => (
                  <TouchableOpacity
                    key={alignment}
                    style={[
                      styles.alignmentButton,
                      {
                        backgroundColor: settings.arabicAlignment === alignment ? colors.primary + '20' : colors.card,
                        borderColor: settings.arabicAlignment === alignment ? colors.primary : colors.border,
                      }
                    ]}
                    onPress={() => updateSetting('arabicAlignment', alignment)}
                  >
                    <Ionicons
                      name={
                        alignment === 'left' ? 'text-outline' :
                        alignment === 'center' ? 'text-outline' : 'text-outline'
                      }
                      size={16}
                      color={settings.arabicAlignment === alignment ? colors.primary : colors.text}
                    />
                    <Text style={[
                      styles.alignmentText,
                      { color: settings.arabicAlignment === alignment ? colors.primary : colors.text }
                    ]}>
                      {alignment.charAt(0).toUpperCase() + alignment.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.settingGroup}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Translation Alignment</Text>
              <View style={styles.alignmentButtons}>
                {(['left', 'center', 'right', 'justify'] as const).map((alignment) => (
                  <TouchableOpacity
                    key={alignment}
                    style={[
                      styles.alignmentButton,
                      {
                        backgroundColor: settings.textAlignment === alignment ? colors.primary + '20' : colors.card,
                        borderColor: settings.textAlignment === alignment ? colors.primary : colors.border,
                      }
                    ]}
                    onPress={() => updateSetting('textAlignment', alignment)}
                  >
                    <Text style={[
                      styles.alignmentText,
                      { color: settings.textAlignment === alignment ? colors.primary : colors.text }
                    ]}>
                      {alignment.charAt(0).toUpperCase() + alignment.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Preview Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Preview</Text>
            <View style={[styles.previewContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {settings.showArabic && (
                <Text style={[
                  styles.previewArabic,
                  {
                    fontSize: settings.arabicFontSize,
                    textAlign: settings.arabicAlignment,
                    color: colors.text,
                    lineHeight: settings.arabicFontSize * settings.lineHeight,
                    fontFamily: settings.fontFamily === 'System' ? 'System' : settings.fontFamily.toLowerCase()
                  }
                ]}>
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </Text>
              )}
              {settings.showTransliteration && (
                <Text style={[
                  styles.previewTransliteration,
                  {
                    fontSize: settings.transliterationFontSize,
                    textAlign: settings.textAlignment,
                    color: colors.secondaryText,
                    lineHeight: settings.transliterationFontSize * settings.lineHeight,
                    fontFamily: settings.fontFamily === 'System' ? 'System' : settings.fontFamily.toLowerCase()
                  }
                ]}>
                  Bismillahi'r-Rahmani'r-Raheem
                </Text>
              )}
              {settings.showTranslation && (
                <Text style={[
                  styles.previewTranslation,
                  {
                    fontSize: settings.translationFontSize,
                    textAlign: settings.textAlignment,
                    color: colors.text,
                    lineHeight: settings.translationFontSize * settings.lineHeight,
                    fontFamily: settings.fontFamily === 'System' ? 'System' : settings.fontFamily.toLowerCase()
                  }
                ]}>
                  In the name of Allah, the Most Gracious, the Most Merciful
                </Text>
              )}
              {settings.showReferences && (
                <Text style={[styles.previewReference, { color: colors.primary }]}>
                  Reference: Quran 1:1
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  resetButton: {
    padding: 4,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 8,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  settingGroup: {
    marginBottom: 24,
  },
  sliderContainer: {
    marginBottom: 24,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  alignmentButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  alignmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
    minWidth: 70,
    justifyContent: 'center',
  },
  alignmentText: {
    fontSize: 12,
    fontWeight: '500',
  },
  previewContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  previewArabic: {
    fontWeight: '400',
    writingDirection: 'rtl',
  },
  previewTransliteration: {
    fontStyle: 'italic',
  },
  previewTranslation: {
    fontWeight: '400',
  },
  previewReference: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
  },
});