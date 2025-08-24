import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
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
  backgroundColor: 'default' | 'sepia' | 'dark' | 'highContrast';
  autoScroll: boolean;
  highlightMode: boolean;
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
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Reading Settings</Text>
          <TouchableOpacity onPress={resetToDefaults} style={styles.headerButton}>
            <Text style={[styles.resetText, { color: colors.primary }]}>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Display Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>What to Show</Text>
            
            <View style={[styles.settingCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Ionicons name="text" size={20} color={colors.primary} style={styles.settingIcon} />
                  <Text style={[styles.settingLabel, { color: colors.text }]}>Arabic Text</Text>
                </View>
                <Switch
                  value={settings.showArabic}
                  onValueChange={(value) => updateSetting('showArabic', value)}
                  trackColor={{ false: colors.border, true: colors.primary + '40' }}
                  thumbColor={settings.showArabic ? colors.primary : colors.secondaryText}
                />
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Ionicons name="chatbubble-outline" size={20} color={colors.primary} style={styles.settingIcon} />
                  <Text style={[styles.settingLabel, { color: colors.text }]}>Pronunciation</Text>
                </View>
                <Switch
                  value={settings.showTransliteration}
                  onValueChange={(value) => updateSetting('showTransliteration', value)}
                  trackColor={{ false: colors.border, true: colors.primary + '40' }}
                  thumbColor={settings.showTransliteration ? colors.primary : colors.secondaryText}
                />
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Ionicons name="language" size={20} color={colors.primary} style={styles.settingIcon} />
                  <Text style={[styles.settingLabel, { color: colors.text }]}>English Translation</Text>
                </View>
                <Switch
                  value={settings.showTranslation}
                  onValueChange={(value) => updateSetting('showTranslation', value)}
                  trackColor={{ false: colors.border, true: colors.primary + '40' }}
                  thumbColor={settings.showTranslation ? colors.primary : colors.secondaryText}
                />
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Ionicons name="book" size={20} color={colors.primary} style={styles.settingIcon} />
                  <Text style={[styles.settingLabel, { color: colors.text }]}>References</Text>
                </View>
                <Switch
                  value={settings.showReferences}
                  onValueChange={(value) => updateSetting('showReferences', value)}
                  trackColor={{ false: colors.border, true: colors.primary + '40' }}
                  thumbColor={settings.showReferences ? colors.primary : colors.secondaryText}
                />
              </View>
            </View>
          </View>

          {/* Font Size Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Text Size</Text>
            
            <View style={[styles.settingCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.sliderContainer}>
                <View style={styles.sliderHeader}>
                  <View style={styles.sliderLabelContainer}>
                    <Ionicons name="text" size={18} color={colors.primary} />
                    <Text style={[styles.sliderLabel, { color: colors.text }]}>Arabic</Text>
                  </View>
                  <View style={[styles.sizeIndicator, { backgroundColor: colors.primary + '20' }]}>
                    <Text style={[styles.sizeText, { color: colors.primary }]}>{settings.arabicFontSize}</Text>
                  </View>
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

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.sliderContainer}>
                <View style={styles.sliderHeader}>
                  <View style={styles.sliderLabelContainer}>
                    <Ionicons name="chatbubble-outline" size={18} color={colors.primary} />
                    <Text style={[styles.sliderLabel, { color: colors.text }]}>Pronunciation</Text>
                  </View>
                  <View style={[styles.sizeIndicator, { backgroundColor: colors.primary + '20' }]}>
                    <Text style={[styles.sizeText, { color: colors.primary }]}>{settings.transliterationFontSize}</Text>
                  </View>
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

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.sliderContainer}>
                <View style={styles.sliderHeader}>
                  <View style={styles.sliderLabelContainer}>
                    <Ionicons name="language" size={18} color={colors.primary} />
                    <Text style={[styles.sliderLabel, { color: colors.text }]}>Translation</Text>
                  </View>
                  <View style={[styles.sizeIndicator, { backgroundColor: colors.primary + '20' }]}>
                    <Text style={[styles.sizeText, { color: colors.primary }]}>{settings.translationFontSize}</Text>
                  </View>
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
            </View>
          </View>

          {/* Alignment Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Text Alignment</Text>
            
            <View style={[styles.settingCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.alignmentSection}>
                <View style={styles.alignmentHeader}>
                  <Ionicons name="text" size={18} color={colors.primary} />
                  <Text style={[styles.alignmentTitle, { color: colors.text }]}>Arabic Text</Text>
                </View>
                <View style={styles.alignmentButtons}>
                  {(['left', 'center', 'right'] as const).map((alignment) => (
                    <TouchableOpacity
                      key={alignment}
                      style={[
                        styles.alignmentButton,
                        {
                          backgroundColor: settings.arabicAlignment === alignment ? colors.primary : colors.background,
                          borderColor: colors.border,
                        }
                      ]}
                      onPress={() => updateSetting('arabicAlignment', alignment)}
                    >
                      <Text style={[
                        styles.alignmentText,
                        { color: settings.arabicAlignment === alignment ? '#FFFFFF' : colors.text }
                      ]}>
                        {alignment === 'left' ? 'Left' : alignment === 'center' ? 'Center' : 'Right'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.alignmentSection}>
                <View style={styles.alignmentHeader}>
                  <Ionicons name="language" size={18} color={colors.primary} />
                  <Text style={[styles.alignmentTitle, { color: colors.text }]}>Translation</Text>
                </View>
                <View style={styles.alignmentButtons}>
                  {(['left', 'center', 'right', 'justify'] as const).map((alignment) => (
                    <TouchableOpacity
                      key={alignment}
                      style={[
                        styles.alignmentButton,
                        {
                          backgroundColor: settings.textAlignment === alignment ? colors.primary : colors.background,
                          borderColor: colors.border,
                        }
                      ]}
                      onPress={() => updateSetting('textAlignment', alignment)}
                    >
                      <Text style={[
                        styles.alignmentText,
                        { color: settings.textAlignment === alignment ? '#FFFFFF' : colors.text }
                      ]}>
                        {alignment.charAt(0).toUpperCase() + alignment.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
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
  headerButton: {
    padding: 4,
    minWidth: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  resetText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginHorizontal: 20,
  },
  sliderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sliderLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  sizeIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 50,
    alignItems: 'center',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  alignmentSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  alignmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alignmentTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  alignmentButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  alignmentButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  alignmentText: {
    fontSize: 14,
    fontWeight: '500',
  },
  previewContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
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