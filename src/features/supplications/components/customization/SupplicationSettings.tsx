import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';

export interface SupplicationDisplaySettings {
  showArabic: boolean;
  showTransliteration: boolean;
  showTranslation: boolean;
  arabicFontSize: number;
  transliterationFontSize: number;
  translationFontSize: number;
  fontFamily: 'System' | 'Serif' | 'Monospace';
  lineHeight: number;
  textAlignment: 'left' | 'center' | 'right';
  arabicAlignment: 'left' | 'center' | 'right';
  backgroundColor: 'default' | 'sepia' | 'dark' | 'high-contrast';
  autoScroll: boolean;
  showReferences: boolean;
  highlightMode: boolean;
}

interface SupplicationSettingsProps {
  visible: boolean;
  onClose: () => void;
  settings: SupplicationDisplaySettings;
  onSettingsChange: (settings: SupplicationDisplaySettings) => void;
  manuscriptColors: any;
}

const FONT_FAMILIES = [
  { id: 'System', name: 'System Default', preview: 'Aa' },
  { id: 'Serif', name: 'Serif', preview: 'Aa' },
  { id: 'Monospace', name: 'Monospace', preview: 'Aa' },
];

const BACKGROUND_THEMES = [
  { id: 'default', name: 'Default', color: '#F5F1E8' },
  { id: 'sepia', name: 'Sepia', color: '#F4F1E8' },
  { id: 'dark', name: 'Dark', color: '#1C1612' },
  { id: 'high-contrast', name: 'High Contrast', color: '#FFFFFF' },
];

const FONT_SIZES = {
  arabic: { min: 18, max: 36, step: 2 },
  transliteration: { min: 12, max: 24, step: 1 },
  translation: { min: 12, max: 24, step: 1 },
};

export default function SupplicationSettings({
  visible,
  onClose,
  settings,
  onSettingsChange,
  manuscriptColors,
}: SupplicationSettingsProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const [activeSection, setActiveSection] = useState<'display' | 'text' | 'appearance'>('display');

  const updateSetting = <K extends keyof SupplicationDisplaySettings>(
    key: K,
    value: SupplicationDisplaySettings[K]
  ) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  const FontSizeSlider = ({ 
    label, 
    value, 
    onChange, 
    min, 
    max, 
    step 
  }: { 
    label: string; 
    value: number; 
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
  }) => {
    const percentage = ((value - min) / (max - min)) * 100;
    
    return (
      <View style={styles.sliderContainer}>
        <View style={styles.sliderHeader}>
          <Text style={[styles.sliderLabel, { color: colors.text }]}>{label}</Text>
          <Text style={[styles.sliderValue, { color: colors.primary }]}>{value}px</Text>
        </View>
        <View style={[styles.sliderTrack, { backgroundColor: colors.border }]}>
          <View 
            style={[
              styles.sliderFill, 
              { 
                width: `${percentage}%`, 
                backgroundColor: colors.primary 
              }
            ]} 
          />
          <TouchableOpacity
            style={[
              styles.sliderThumb,
              { 
                left: `${percentage}%`,
                backgroundColor: colors.primary,
                borderColor: colors.background
              }
            ]}
          />
        </View>
        <View style={styles.sliderButtons}>
          <TouchableOpacity
            style={[styles.sliderButton, { backgroundColor: colors.card }]}
            onPress={() => onChange(Math.max(min, value - step))}
            disabled={value <= min}
          >
            <Ionicons name="remove" size={16} color={value <= min ? colors.border : colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sliderButton, { backgroundColor: colors.card }]}
            onPress={() => onChange(Math.min(max, value + step))}
            disabled={value >= max}
          >
            <Ionicons name="add" size={16} color={value >= max ? colors.border : colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderDisplaySection = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Text Display</Text>
      
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

      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>Auto Scroll</Text>
          <Text style={[styles.settingDescription, { color: colors.secondaryText }]}>
            Automatically scroll to next dua
          </Text>
        </View>
        <Switch
          value={settings.autoScroll}
          onValueChange={(value) => updateSetting('autoScroll', value)}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.background}
        />
      </View>

      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>Highlight Mode</Text>
          <Text style={[styles.settingDescription, { color: colors.secondaryText }]}>
            Highlight current verse
          </Text>
        </View>
        <Switch
          value={settings.highlightMode}
          onValueChange={(value) => updateSetting('highlightMode', value)}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.background}
        />
      </View>
    </View>
  );

  const renderTextSection = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Text Formatting</Text>
      
      <FontSizeSlider
        label="Arabic Text Size"
        value={settings.arabicFontSize}
        onChange={(value) => updateSetting('arabicFontSize', value)}
        min={FONT_SIZES.arabic.min}
        max={FONT_SIZES.arabic.max}
        step={FONT_SIZES.arabic.step}
      />

      <FontSizeSlider
        label="Transliteration Size"
        value={settings.transliterationFontSize}
        onChange={(value) => updateSetting('transliterationFontSize', value)}
        min={FONT_SIZES.transliteration.min}
        max={FONT_SIZES.transliteration.max}
        step={FONT_SIZES.transliteration.step}
      />

      <FontSizeSlider
        label="Translation Size"
        value={settings.translationFontSize}
        onChange={(value) => updateSetting('translationFontSize', value)}
        min={FONT_SIZES.translation.min}
        max={FONT_SIZES.translation.max}
        step={FONT_SIZES.translation.step}
      />

      <View style={styles.settingGroup}>
        <Text style={[styles.settingLabel, { color: colors.text }]}>Font Family</Text>
        <View style={styles.fontFamilyGrid}>
          {FONT_FAMILIES.map((font) => (
            <TouchableOpacity
              key={font.id}
              style={[
                styles.fontFamilyOption,
                {
                  backgroundColor: settings.fontFamily === font.id ? colors.primary + '20' : colors.card,
                  borderColor: settings.fontFamily === font.id ? colors.primary : colors.border,
                }
              ]}
              onPress={() => updateSetting('fontFamily', font.id as any)}
            >
              <Text style={[
                styles.fontPreview,
                { 
                  color: settings.fontFamily === font.id ? colors.primary : colors.text,
                  fontFamily: font.id === 'System' ? 'System' : font.id === 'Serif' ? 'serif' : 'monospace'
                }
              ]}>
                {font.preview}
              </Text>
              <Text style={[
                styles.fontName,
                { color: settings.fontFamily === font.id ? colors.primary : colors.text }
              ]}>
                {font.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.settingGroup}>
        <Text style={[styles.settingLabel, { color: colors.text }]}>Text Alignment</Text>
        <View style={styles.alignmentButtons}>
          {(['left', 'center', 'right'] as const).map((alignment) => (
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
              <Ionicons
                name={
                  alignment === 'left' ? 'text-outline' :
                  alignment === 'center' ? 'text-outline' : 'text-outline'
                }
                size={20}
                color={settings.textAlignment === alignment ? colors.primary : colors.text}
              />
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
                size={20}
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
    </View>
  );

  const renderAppearanceSection = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
      
      <View style={styles.settingGroup}>
        <Text style={[styles.settingLabel, { color: colors.text }]}>Background Theme</Text>
        <View style={styles.backgroundGrid}>
          {BACKGROUND_THEMES.map((theme) => (
            <TouchableOpacity
              key={theme.id}
              style={[
                styles.backgroundOption,
                {
                  backgroundColor: theme.color,
                  borderColor: settings.backgroundColor === theme.id ? colors.primary : colors.border,
                  borderWidth: settings.backgroundColor === theme.id ? 3 : 1,
                }
              ]}
              onPress={() => updateSetting('backgroundColor', theme.id as any)}
            >
              {settings.backgroundColor === theme.id && (
                <View style={styles.selectedOverlay}>
                  <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.backgroundLabels}>
          {BACKGROUND_THEMES.map((theme) => (
            <Text
              key={theme.id}
              style={[
                styles.backgroundLabel,
                { 
                  color: settings.backgroundColor === theme.id ? colors.primary : colors.secondaryText,
                  fontWeight: settings.backgroundColor === theme.id ? '600' : '400'
                }
              ]}
            >
              {theme.name}
            </Text>
          ))}
        </View>
      </View>

      <FontSizeSlider
        label="Line Height"
        value={settings.lineHeight}
        onChange={(value) => updateSetting('lineHeight', value)}
        min={1.2}
        max={2.0}
        step={0.1}
      />
    </View>
  );

  const resetToDefaults = () => {
    const defaultSettings: SupplicationDisplaySettings = {
      showArabic: true,
      showTransliteration: true,
      showTranslation: true,
      arabicFontSize: 24,
      transliterationFontSize: 16,
      translationFontSize: 16,
      fontFamily: 'System',
      lineHeight: 1.5,
      textAlignment: 'left',
      arabicAlignment: 'right',
      backgroundColor: 'default',
      autoScroll: false,
      showReferences: true,
      highlightMode: false,
    };
    onSettingsChange(defaultSettings);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
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

        {/* Tab Navigation */}
        <View style={[styles.tabContainer, { backgroundColor: colors.card }]}>
          {[
            { id: 'display', label: 'Display', icon: 'eye-outline' },
            { id: 'text', label: 'Text', icon: 'text-outline' },
            { id: 'appearance', label: 'Theme', icon: 'color-palette-outline' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                activeSection === tab.id && [styles.activeTab, { backgroundColor: colors.primary }]
              ]}
              onPress={() => setActiveSection(tab.id as any)}
            >
              <Ionicons
                name={tab.icon as any}
                size={16}
                color={activeSection === tab.id ? '#FFFFFF' : colors.secondaryText}
              />
              <Text
                style={[
                  styles.tabText,
                  { color: activeSection === tab.id ? '#FFFFFF' : colors.secondaryText }
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {activeSection === 'display' && renderDisplaySection()}
          {activeSection === 'text' && renderTextSection()}
          {activeSection === 'appearance' && renderAppearanceSection()}
        </ScrollView>

        {/* Preview Section */}
        <View style={[styles.previewSection, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <Text style={[styles.previewLabel, { color: colors.text }]}>Preview</Text>
          <View style={[styles.previewContainer, { backgroundColor: colors.background }]}>
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
          </View>
        </View>
      </View>
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
  tabContainer: {
    flexDirection: 'row',
    margin: 16,
    borderRadius: 12,
    padding: 4,
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
  activeTab: {},
  tabText: {
    fontSize: 12,
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
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
  sliderTrack: {
    height: 4,
    borderRadius: 2,
    position: 'relative',
    marginBottom: 12,
  },
  sliderFill: {
    height: '100%',
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    top: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginLeft: -8,
  },
  sliderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontFamilyGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  fontFamilyOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
  },
  fontPreview: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  fontName: {
    fontSize: 12,
    fontWeight: '500',
  },
  alignmentButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  alignmentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  alignmentText: {
    fontSize: 12,
    fontWeight: '500',
  },
  backgroundGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  backgroundOption: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 12,
  },
  backgroundLabels: {
    flexDirection: 'row',
    gap: 12,
  },
  backgroundLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  previewSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  previewContainer: {
    padding: 16,
    borderRadius: 12,
    gap: 8,
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
});