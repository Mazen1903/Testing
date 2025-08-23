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
  TextInput,
  Switch,
  Alert,
  FlatList,
} from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { ZikrSeries, ZikrCategory, DuaSubcategory } from '@/shared/types/supplications';
import { ZIKR_SERIES, ZIKR_CATEGORIES } from '@/shared/constants/supplications';
import { ExpandableText } from '@/src/components/ui/ExpandableText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';


const { width, height } = Dimensions.get('window');

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true, // add
    shouldShowList: true,   // add
  }),
});

interface ReminderSettings {
  id: string;
  supplicationId: string;
  supplicationTitle: string;
  time: string; // HH:MM format
  days: string[]; // Array of day names
  isEnabled: boolean;
  notificationId?: string;
}

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

type TabType = 'All' | 'Collections' | 'Reminders';

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
  const [reminders, setReminders] = useState<ReminderSettings[]>([]);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedSupplicationForReminder, setSelectedSupplicationForReminder] = useState<{id: string, title: string} | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminderTime, setReminderTime] = useState({ hour: 9, minute: 0 });
  const [reminderDays, setReminderDays] = useState<number[]>([1, 2, 3, 4, 5, 6, 0]); // All days selected by default
  const [reminderTitle, setReminderTitle] = useState('');
  const [selectedTime, setSelectedTime] = useState({ hour: 9, minute: 0 });
  const horizontalScrollRef = useRef<ScrollView>(null);

  // Request notification permissions on mount
  useEffect(() => {
    requestNotificationPermissions();
    loadReminders();
  }, []);

  const requestNotificationPermissions = async () => {
    if (Platform.OS === 'web') return;
    
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      Alert.alert(
        'Notification Permission',
        'Please enable notifications to receive supplication reminders.',
        [{ text: 'OK' }]
      );
    }
  };

  // Load bookmarks on component mount
  useEffect(() => {
    loadBookmarks();
    loadDisplaySettings();
  }, []);

  const loadReminders = async () => {
    try {
      const stored = await AsyncStorage.getItem('supplication_reminders');
      if (stored) {
        setReminders(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading reminders:', error);
    }
  };

  const saveReminders = async (newReminders: ReminderSettings[]) => {
    try {
      await AsyncStorage.setItem('supplication_reminders', JSON.stringify(newReminders));
      setReminders(newReminders);
    } catch (error) {
      console.error('Error saving reminders:', error);
    }
  };

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

  const scheduleNotification = async (reminder: ReminderSettings): Promise<string | null> => {
    if (Platform.OS === 'web') return null;
    
    try {
      const [hours, minutes] = reminder.time.split(':').map(Number);
      
      // Schedule for each selected day
      const notificationIds: string[] = [];
      
      for (const day of reminder.days) {
        const dayNumber = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day);
        
        const notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: '🤲 Time for Supplication',
            body: `Remember to recite: ${reminder.supplicationTitle}`,
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
            weekday: dayNumber + 1, // Expo uses 1-7 for Sunday-Saturday
            hour: hours,
            minute: minutes,
            repeats: true,
          },
        });
        
        notificationIds.push(notificationId);
      }
      
      return notificationIds[0]; // Return first ID as reference
    } catch (error) {
      console.error('Error scheduling notification:', error);
      return null;
    }
  };

  const cancelNotification = async (notificationId: string) => {
    if (Platform.OS === 'web') return;
    
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  };

  const handleCreateReminder = async (supplicationId: string, supplicationTitle: string, time: string, days: string[]) => {
    if (days.length === 0) {
      Alert.alert('Error', 'Please select at least one day for the reminder');
      return;
    }

    const newReminder: ReminderSettings = {
      id: Date.now().toString(),
      supplicationId,
      supplicationTitle,
      time,
      days,
      isEnabled: true,
    };

    // Schedule notification
    const notificationId = await scheduleNotification(newReminder);
    if (notificationId) {
      newReminder.notificationId = notificationId;
    }

    const updatedReminders = [...reminders, newReminder];
    await saveReminders(updatedReminders);
    
    setShowReminderModal(false);
    setSelectedSupplicationForReminder(null);
    
    Alert.alert('Success', 'Reminder created successfully!');
  };

  const handleToggleReminder = async (reminderId: string) => {
    const updatedReminders = reminders.map(reminder => {
      if (reminder.id === reminderId) {
        const updated = { ...reminder, isEnabled: !reminder.isEnabled };
        
        // Handle notification scheduling
        if (updated.isEnabled && !updated.notificationId) {
          // Schedule notification
          scheduleNotification(updated).then(notificationId => {
            if (notificationId) {
              updated.notificationId = notificationId;
              saveReminders(reminders.map(r => r.id === reminderId ? updated : r));
            }
          });
        } else if (!updated.isEnabled && updated.notificationId) {
          // Cancel notification
          cancelNotification(updated.notificationId);
          updated.notificationId = undefined;
        }
        
        return updated;
      }
      return reminder;
    });
    
    await saveReminders(updatedReminders);
  };

  const handleDeleteReminder = async (reminderId: string) => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const reminder = reminders.find(r => r.id === reminderId);
            if (reminder?.notificationId) {
              await cancelNotification(reminder.notificationId);
            }
            
            const updatedReminders = reminders.filter(r => r.id !== reminderId);
            await saveReminders(updatedReminders);
          }
        }
      ]
    );
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
      // Simple series with direct duas - start session directly
      // This would need implementation for direct dua sessions
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
  const getDayName = (dayIndex: number): string => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[dayIndex];
  };

  const toggleDay = (dayIndex: number) => {
    setReminderDays(prev => 
      prev.includes(dayIndex) 
        ? prev.filter(d => d !== dayIndex)
        : [...prev, dayIndex].sort()
    );
  };

  // Check if a category should have reminder functionality disabled
  const isReminderDisabled = (categoryName: string): boolean => {
    const disabledCategories = [
      'The Importance of Daily Supplications',
      'The Importance of Hadith-based Supplications', 
      'The importance of Quranic Supplications'
    ];
    return disabledCategories.includes(categoryName);
  };


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
                  {totalDuas} duas
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
            <View style={styles.actionButtons}>
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
              {!isReminderDisabled(subcategory.name) && (
                <TouchableOpacity 
                  style={[styles.reminderButton, { backgroundColor: colors.secondary + '15' }]}
                  onPress={(e) => {
                    e.stopPropagation();
                    setSelectedSupplicationForReminder({
                      id: subcategory.id,
                      title: subcategory.name
                    });
                    setShowReminderModal(true);
                  }}
                >
                  <Ionicons name="notifications-outline" size={16} color={colors.secondary} />
                </TouchableOpacity>
              )}
            </View>
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

  const renderRemindersTab = () => (
    <ScrollView 
      style={styles.tabContent} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <View style={styles.remindersHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>PRAYER REMINDERS</Text>
        <TouchableOpacity 
          style={[styles.addReminderButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            // Show supplication selection first
            Alert.alert(
              'Select Supplication',
              'Choose a supplication to set a reminder for',
              [
                { text: 'Cancel', style: 'cancel' },
                { 
                  text: 'Choose', 
                  onPress: () => {
                    // For demo, use first supplication
                    const firstSupplication = ZIKR_SERIES[0]?.subcategories?.[0];
                    if (firstSupplication) {
                      setSelectedSupplicationForReminder({
                        id: firstSupplication.id,
                        title: firstSupplication.name
                      });
                      setShowReminderModal(true);
                    }
                  }
                }
              ]
            );
          }}
        >
          <Ionicons name="add" size={16} color="#FFFFFF" />
          <Text style={styles.addReminderText}>Add Reminder</Text>
        </TouchableOpacity>
      </View>

      {reminders.length === 0 ? (
        <View style={styles.emptyReminders}>
          <Ionicons name="notifications-outline" size={64} color={colors.border} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No Reminders Set</Text>
          <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
            Set reminders to help you maintain consistent supplication practice
          </Text>
        </View>
      ) : (
        <View style={styles.remindersList}>
          {reminders.map((reminder) => (
            <View key={reminder.id} style={[styles.reminderCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.reminderHeader}>
                <View style={styles.reminderInfo}>
                  <Text style={[styles.reminderTitle, { color: colors.text }]} numberOfLines={1}>
                    {reminder.supplicationTitle}
                  </Text>
                  <Text style={[styles.reminderTime, { color: colors.primary }]}>
                    {reminder.time}
                  </Text>
                </View>
                <Switch
                  value={reminder.isEnabled}
                  onValueChange={() => handleToggleReminder(reminder.id)}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.card}
                />
              </View>
              
              <View style={styles.reminderDays}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
                  const fullDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][index];
                  const isSelected = reminder.days.includes(fullDay);
                  return (
                    <View 
                      key={day}
                      style={[
                        styles.dayChip,
                        { 
                          backgroundColor: isSelected ? colors.primary + '20' : colors.background,
                          borderColor: isSelected ? colors.primary : colors.border
                        }
                      ]}
                    >
                      <Text style={[
                        styles.dayText,
                        { color: isSelected ? colors.primary : colors.secondaryText }
                      ]}>
                        {day}
                      </Text>
                    </View>
                  );
                })}
              </View>
              
              <TouchableOpacity 
                style={styles.deleteReminderButton}
                onPress={() => handleDeleteReminder(reminder.id)}
              >
                <Ionicons name="trash-outline" size={16} color={colors.error} />
                <Text style={[styles.deleteReminderText, { color: colors.error }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
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
            {(['All', 'Collections', 'Reminders'] as TabType[]).map((tab) => (
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
                {tab === 'Reminders' && reminders.filter(r => r.isEnabled).length > 0 && (
                  <View style={[styles.tabBadge, { backgroundColor: colors.success }]}>
                    <Text style={styles.tabBadgeText}>{reminders.filter(r => r.isEnabled).length}</Text>
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
        ) : showSubcategories && activeTab === 'All' ? (
          <Animated.View entering={FadeInDown.delay(400)} style={styles.supplicationsSection}>
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
        ) : activeTab === 'Collections' ? (
          <Animated.View entering={FadeInDown.delay(400)} style={styles.supplicationsSection}>
            <Text style={[styles.sectionTitle, { color: manuscriptColors.brown }]}>
              BOOKMARKED SUPPLICATIONS ({bookmarkedSubcategories.size})
            </Text>
            {getBookmarkedSubcategories().length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="bookmark-outline" size={48} color={manuscriptColors.lightInk} />
                <Text style={[styles.emptyStateText, { color: manuscriptColors.lightInk }]}>
                  No bookmarked supplications
                </Text>
                <Text style={[styles.emptyStateSubtext, { color: manuscriptColors.lightInk }]}>
                  Bookmark your favorite duas to access them quickly
                </Text>
              </View>
            ) : (
              getBookmarkedSubcategories().map((subcategory: DuaSubcategory, index: number) => (
                <Animated.View key={subcategory.id} entering={FadeInDown.delay(400 + index * 100)}>
                  <SubcategoryCard subcategory={subcategory} />
                </Animated.View>
              ))
            )}
          </Animated.View>
        ) : activeTab === 'Reminders' ? (
          renderRemindersTab()
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

            {/* Display Controls Modal */}
            <Modal
              visible={showDisplayControls}
              animationType="slide"
              presentationStyle="pageSheet"
            >
              <LinearGradient
                colors={[manuscriptColors.parchment, manuscriptColors.darkParchment]}
                style={styles.controlsModalContainer}
              >
                <SafeAreaView style={{ flex: 1 }}>
                  {/* Controls Header */}
                  <View style={[styles.controlsHeader, { borderBottomColor: manuscriptColors.border }]}>
                    <TouchableOpacity onPress={() => setShowDisplayControls(false)}>
                      <Ionicons name="close" size={24} color={manuscriptColors.brown} />
                    </TouchableOpacity>
                    <Text style={[styles.controlsTitle, { color: manuscriptColors.ink }]}>
                      Display Settings
                    </Text>
                    <View style={{ width: 24 }} />
                  </View>

                  <ScrollView style={styles.controlsContent} showsVerticalScrollIndicator={false}>
                    {/* Font Size */}
                    <View style={styles.controlSection}>
                      <Text style={[styles.controlLabel, { color: manuscriptColors.ink }]}>
                        Font Size
                      </Text>
                      <View style={styles.sliderContainer}>
                        <Text style={[styles.sliderLabel, { color: manuscriptColors.brown }]}>A</Text>
                        <Slider
                          style={styles.slider}
                          minimumValue={12}
                          maximumValue={28}
                          value={fontSize}
                          onValueChange={setFontSize}
                          minimumTrackTintColor={manuscriptColors.brown}
                          maximumTrackTintColor={manuscriptColors.border}
                          thumbTintColor={manuscriptColors.brown}
                        />
                        <Text style={[styles.sliderLabel, { color: manuscriptColors.brown, fontSize: 20 }]}>A</Text>
                      </View>
                      <Text style={[styles.controlValue, { color: manuscriptColors.lightInk }]}>
                        {fontSize.toFixed(0)}px
                      </Text>
                    </View>

                    {/* Line Spacing */}
                    <View style={styles.controlSection}>
                      <Text style={[styles.controlLabel, { color: manuscriptColors.ink }]}>
                        Line Spacing
                      </Text>
                      <View style={styles.sliderContainer}>
                        <Text style={[styles.sliderLabel, { color: manuscriptColors.brown }]}>1.0</Text>
                        <Slider
                          style={styles.slider}
                          minimumValue={1.0}
                          maximumValue={2.5}
                          value={lineSpacing}
                          onValueChange={setLineSpacing}
                          minimumTrackTintColor={manuscriptColors.brown}
                          maximumTrackTintColor={manuscriptColors.border}
                          thumbTintColor={manuscriptColors.brown}
                        />
                        <Text style={[styles.sliderLabel, { color: manuscriptColors.brown }]}>2.5</Text>
                      </View>
                      <Text style={[styles.controlValue, { color: manuscriptColors.lightInk }]}>
                        {lineSpacing.toFixed(1)}x
                      </Text>
                    </View>

                    {/* Font Family */}
                    <View style={styles.controlSection}>
                      <Text style={[styles.controlLabel, { color: manuscriptColors.ink }]}>
                        Font Family
                      </Text>
                      <View style={styles.fontFamilyButtons}>
                        {(['System', 'Serif', 'Monospace'] as const).map((family) => (
                          <TouchableOpacity
                            key={family}
                            style={[
                              styles.fontFamilyButton,
                              {
                                backgroundColor: fontFamily === family ? manuscriptColors.brown : manuscriptColors.parchment,
                                borderColor: manuscriptColors.border
                              }
                            ]}
                            onPress={() => setFontFamily(family)}
                          >
                            <Text style={[
                              styles.fontFamilyText,
                              { color: fontFamily === family ? manuscriptColors.parchment : manuscriptColors.brown }
                            ]}>
                              {family}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    {/* Arabic Text Alignment */}
                    <View style={styles.controlSection}>
                      <Text style={[styles.controlLabel, { color: manuscriptColors.ink }]}>
                        Arabic Text Alignment
                      </Text>
                      <View style={styles.alignmentButtons}>
                        <TouchableOpacity
                          style={[
                            styles.alignmentButton,
                            {
                              backgroundColor: arabicTextAlign === 'right' ? manuscriptColors.brown : manuscriptColors.parchment,
                              borderColor: manuscriptColors.border
                            }
                          ]}
                          onPress={() => setArabicTextAlign('right')}
                        >
                          <Ionicons 
                            name="text" 
                            size={16} 
                            color={arabicTextAlign === 'right' ? manuscriptColors.parchment : manuscriptColors.brown} 
                          />
                          <Text style={[
                            styles.alignmentText,
                            { color: arabicTextAlign === 'right' ? manuscriptColors.parchment : manuscriptColors.brown }
                          ]}>
                            Right
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.alignmentButton,
                            {
                              backgroundColor: arabicTextAlign === 'center' ? manuscriptColors.brown : manuscriptColors.parchment,
                              borderColor: manuscriptColors.border
                            }
                          ]}
                          onPress={() => setArabicTextAlign('center')}
                        >
                          <Ionicons 
                            name="text" 
                            size={16} 
                            color={arabicTextAlign === 'center' ? manuscriptColors.parchment : manuscriptColors.brown} 
                          />
                          <Text style={[
                            styles.alignmentText,
                            { color: arabicTextAlign === 'center' ? manuscriptColors.parchment : manuscriptColors.brown }
                          ]}>
                            Center
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Text Display Toggles */}
                    <View style={styles.controlSection}>
                      <Text style={[styles.controlLabel, { color: manuscriptColors.ink }]}>
                        Text Display
                      </Text>
                      
                      <View style={styles.toggleRow}>
                        <View style={styles.toggleInfo}>
                          <Text style={[styles.toggleLabel, { color: manuscriptColors.ink }]}>
                            Show Arabic
                          </Text>
                          <Text style={[styles.toggleDescription, { color: manuscriptColors.lightInk }]}>
                            Display original Arabic text
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={[
                            styles.toggle,
                            { backgroundColor: showArabic ? manuscriptColors.brown : manuscriptColors.border }
                          ]}
                          onPress={() => setShowArabic(!showArabic)}
                        >
                          <View
                            style={[
                              styles.toggleHandle,
                              { 
                                backgroundColor: manuscriptColors.parchment,
                                transform: [{ translateX: showArabic ? 20 : 0 }]
                              }
                            ]}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.toggleRow}>
                        <View style={styles.toggleInfo}>
                          <Text style={[styles.toggleLabel, { color: manuscriptColors.ink }]}>
                            Show Transliteration
                          </Text>
                          <Text style={[styles.toggleDescription, { color: manuscriptColors.lightInk }]}>
                            Display pronunciation guide
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={[
                            styles.toggle,
                            { backgroundColor: showTransliteration ? manuscriptColors.brown : manuscriptColors.border }
                          ]}
                          onPress={() => setShowTransliteration(!showTransliteration)}
                        >
                          <View
                            style={[
                              styles.toggleHandle,
                              { 
                                backgroundColor: manuscriptColors.parchment,
                                transform: [{ translateX: showTransliteration ? 20 : 0 }]
                              }
                            ]}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.toggleRow}>
                        <View style={styles.toggleInfo}>
                          <Text style={[styles.toggleLabel, { color: manuscriptColors.ink }]}>
                            Show Translation
                          </Text>
                          <Text style={[styles.toggleDescription, { color: manuscriptColors.lightInk }]}>
                            Display English meaning
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={[
                            styles.toggle,
                            { backgroundColor: showTranslation ? manuscriptColors.brown : manuscriptColors.border }
                          ]}
                          onPress={() => setShowTranslation(!showTranslation)}
                        >
                          <View
                            style={[
                              styles.toggleHandle,
                              { 
                                backgroundColor: manuscriptColors.parchment,
                                transform: [{ translateX: showTranslation ? 20 : 0 }]
                              }
                            ]}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    
                    {/* Preview */}
                    <View style={styles.controlSection}>
                      <Text style={[styles.controlLabel, { color: manuscriptColors.ink }]}>
                        Preview
                      </Text>
                      <View style={[styles.previewContainer, { backgroundColor: manuscriptColors.parchment, borderColor: manuscriptColors.border }]}>
                        {showArabic && (
                          <Text style={[styles.previewArabic, { 
                            fontSize: fontSize,
                            lineHeight: fontSize * lineSpacing,
                            textAlign: arabicTextAlign,
                            fontFamily: fontFamily === 'System' ? 'System' : fontFamily === 'Serif' ? 'serif' : 'monospace',
                            color: manuscriptColors.ink
                          }]}>
                            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                          </Text>
                        )}
                        {showTransliteration && (
                          <Text style={[styles.previewText, { 
                            fontSize: fontSize * 0.9,
                            lineHeight: fontSize * 0.9 * lineSpacing,
                            fontFamily: fontFamily === 'System' ? 'System' : fontFamily === 'Serif' ? 'serif' : 'monospace',
                            color: manuscriptColors.lightInk,
                            fontStyle: 'italic'
                          }]}>
                            Bismillahi'r-rahmani'r-raheem
                          </Text>
                        )}
                        {showTranslation && (
                          <Text style={[styles.previewText, { 
                            fontSize: fontSize * 0.9,
                            lineHeight: fontSize * 0.9 * lineSpacing,
                            fontFamily: fontFamily === 'System' ? 'System' : fontFamily === 'Serif' ? 'serif' : 'monospace',
                            color: manuscriptColors.lightInk
                          }]}>
                            In the name of Allah, the Most Gracious, the Most Merciful
                          </Text>
                        )}
                      </View>
                    </View>
                  </ScrollView>
                </SafeAreaView>
              </LinearGradient>
            </Modal>

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
                      {showArabic && (
                        <View style={styles.arabicSection}>
                          <Text style={[styles.manuscriptArabic, { 
                            color: manuscriptColors.ink,
                            fontSize: fontSize,
                            lineHeight: fontSize * lineSpacing,
                            textAlign: arabicTextAlign,
                            fontFamily: fontFamily === 'System' ? 'System' : fontFamily === 'Serif' ? 'serif' : 'monospace'
                          }]}>
                            {dua.arabic || ''}
                          </Text>
                        </View>
                      )}

                      {/* Divider */}
                      {((showArabic && (showTransliteration || showTranslation)) || (showTransliteration && showTranslation)) && (
                        <View style={[styles.manuscriptDivider, { backgroundColor: manuscriptColors.border }]} />
                      )}

                      {/* Transliteration */}
                      {showTransliteration && (
                        <View style={styles.textSection}>
                          <Text style={[styles.manuscriptTransliteration, { 
                            color: manuscriptColors.lightInk,
                            fontSize: fontSize * 0.9,
                            lineHeight: fontSize * 0.9 * lineSpacing,
                            fontFamily: fontFamily === 'System' ? 'System' : fontFamily === 'Serif' ? 'serif' : 'monospace'
                          }]}>
                            {dua.transliteration || ''}
                          </Text>
                        </View>
                      )}

                      {/* Translation */}
                      {showTranslation && (
                        <View style={styles.textSection}>
                          <Text style={[styles.manuscriptTranslation, { 
                            color: manuscriptColors.lightInk,
                            fontSize: fontSize * 0.95,
                            lineHeight: fontSize * 0.95 * lineSpacing,
                            fontFamily: fontFamily === 'System' ? 'System' : fontFamily === 'Serif' ? 'serif' : 'monospace'
                          }]}>
                            {dua.translation || ''}
                          </Text>
                        </View>
                      )}

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
                </View>
              </View>
            )}
          </SafeAreaView>
        </LinearGradient>
      </Modal>

      {/* Time Picker Modal */}
      <Modal
        visible={showTimePicker}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.timePickerOverlay}>
          <View style={[styles.timePickerModal, { backgroundColor: colors.card }]}>
            <View style={[styles.timePickerHeader, { borderBottomColor: colors.border }]}>
              <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                <Text style={[styles.timePickerCancel, { color: colors.secondaryText }]}>Cancel</Text>
              </TouchableOpacity>
              <Text style={[styles.timePickerTitle, { color: colors.text }]}>Select Time</Text>
              <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                <Text style={[styles.timePickerDone, { color: colors.primary }]}>Done</Text>
              </TouchableOpacity>
            </View>
            
            {/* Custom Time Picker Implementation */}
            <View style={styles.timePickerContent}>
              <View style={styles.timePickerRow}>
                {/* Hour Picker */}
                <View style={styles.timePickerColumn}>
                  <Text style={[styles.timePickerLabel, { color: colors.secondaryText }]}>Hour</Text>
                  <ScrollView 
                    style={styles.timePickerScroll}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={40}
                    decelerationRate="fast"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.timePickerOption,
                          selectedTime.hour === i && { backgroundColor: colors.primary + '20' }
                        ]}
                        onPress={() => {
                          setSelectedTime({ ...selectedTime, hour: i });
                        }}
                      >
                        <Text style={[
                          styles.timePickerOptionText,
                          { color: selectedTime.hour === i ? colors.primary : colors.text }
                        ]}>
                          {i.toString().padStart(2, '0')}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                
                <Text style={[styles.timePickerSeparator, { color: colors.text }]}>:</Text>
                
                {/* Minute Picker */}
                <View style={styles.timePickerColumn}>
                  <Text style={[styles.timePickerLabel, { color: colors.secondaryText }]}>Minute</Text>
                  <ScrollView 
                    style={styles.timePickerScroll}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={40}
                    decelerationRate="fast"
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.timePickerOption,
                          selectedTime.minute === i && { backgroundColor: colors.primary + '20' }
                        ]}
                        onPress={() => {
                          setSelectedTime({ ...selectedTime, minute: i });
                        }}
                      >
                        <Text style={[
                          styles.timePickerOptionText,
                          { color: selectedTime.minute === i ? colors.primary : colors.text }
                        ]}>
                          {i.toString().padStart(2, '0')}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
              
              {/* Quick Time Presets */}
              <View style={styles.quickTimePresets}>
                <Text style={[styles.quickTimeLabel, { color: colors.secondaryText }]}>Quick Select:</Text>
                <View style={styles.quickTimeButtons}>
                  {[
                    { label: 'Fajr', hour: 5, minute: 30 },
                    { label: 'Dhuhr', hour: 12, minute: 30 },
                    { label: 'Asr', hour: 15, minute: 30 },
                    { label: 'Maghrib', hour: 18, minute: 30 },
                    { label: 'Isha', hour: 20, minute: 0 },
                  ].map((preset) => (
                    <TouchableOpacity
                      key={preset.label}
                      style={[styles.quickTimeButton, { backgroundColor: colors.background, borderColor: colors.border }]}
                      onPress={() => {
                        setSelectedTime({ hour: preset.hour, minute: preset.minute });
                      }}
                    >
                      <Text style={[styles.quickTimeButtonText, { color: colors.primary }]}>
                        {preset.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Reminder Creation Modal */}
      <ReminderModal
        visible={showReminderModal}
        onClose={() => {
          setShowReminderModal(false);
          setSelectedSupplicationForReminder(null);
        }}
        supplication={selectedSupplicationForReminder}
        onCreateReminder={handleCreateReminder}
      />
    </SafeAreaView>
  );
}

// Reminder Modal Component
function ReminderModal({ 
  visible, 
  onClose, 
  supplication, 
  onCreateReminder 
}: {
  visible: boolean;
  onClose: () => void;
  supplication: {id: string, title: string} | null;
  onCreateReminder: (supplicationId: string, supplicationTitle: string, time: string, days: string[]) => void;
}) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  
  const [selectedTime, setSelectedTime] = useState('07:00');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [reminderType, setReminderType] = useState<'daily' | 'custom'>('daily');

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const commonTimes = [
    { label: 'Fajr (5:30 AM)', value: '05:30' },
    { label: 'Morning (7:00 AM)', value: '07:00' },
    { label: 'Dhuhr (12:30 PM)', value: '12:30' },
    { label: 'Asr (4:00 PM)', value: '16:00' },
    { label: 'Maghrib (6:30 PM)', value: '18:30' },
    { label: 'Isha (8:00 PM)', value: '20:00' },
    { label: 'Before Sleep (10:00 PM)', value: '22:00' },
  ];

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSubmit = () => {
    if (!supplication) return;
    onCreateReminder(supplication.id, supplication.title, selectedTime, selectedDays);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.background }]}>
        <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: colors.text }]}>Set Reminder</Text>
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {/* Supplication Info */}
          <View style={[styles.supplicationInfo, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="book-outline" size={24} color={colors.primary} />
            <Text style={[styles.supplicationTitle, { color: colors.text }]}>
              {supplication?.title || 'Select Supplication'}
            </Text>
          </View>

          {/* Reminder Type */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>Reminder Type</Text>
            <View style={styles.reminderTypeButtons}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  reminderType === 'daily' && { backgroundColor: colors.primary + '20', borderColor: colors.primary }
                ]}
                onPress={() => {
                  setReminderType('daily');
                  setSelectedDays(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
                }}
              >
                <Text style={[
                  styles.typeButtonText,
                  { color: colors.text },
                  reminderType === 'daily' && { color: colors.primary }
                ]}>
                  Daily
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  reminderType === 'custom' && { backgroundColor: colors.primary + '20', borderColor: colors.primary }
                ]}
                onPress={() => {
                  setReminderType('custom');
                  setSelectedDays(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
                }}
              >
                <Text style={[
                  styles.typeButtonText,
                  { color: colors.text },
                  reminderType === 'custom' && { color: colors.primary }
                ]}>
                  Custom
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Time Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>Reminder Time</Text>
            <View style={styles.timeOptions}>
              {commonTimes.map((timeOption) => (
                <TouchableOpacity
                  key={timeOption.value}
                  style={[
                    styles.timeOption,
                    { backgroundColor: colors.card, borderColor: colors.border },
                    selectedTime === timeOption.value && { backgroundColor: colors.primary + '20', borderColor: colors.primary }
                  ]}
                  onPress={() => setSelectedTime(timeOption.value)}
                >
                  <Text style={[
                    styles.timeOptionText,
                    { color: colors.text },
                    selectedTime === timeOption.value && { color: colors.primary }
                  ]}>
                    {timeOption.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Days Selection */}
          {reminderType === 'custom' && (
            <View style={styles.section}>
              <Text style={[styles.sectionLabel, { color: colors.text }]}>Reminder Days</Text>
              <View style={styles.daysGrid}>
                {days.map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayButton,
                      { backgroundColor: colors.card, borderColor: colors.border },
                      selectedDays.includes(day) && { backgroundColor: colors.primary + '20', borderColor: colors.primary }
                    ]}
                    onPress={() => toggleDay(day)}
                  >
                    <Text style={[
                      styles.dayButtonText,
                      { color: colors.text },
                      selectedDays.includes(day) && { color: colors.primary }
                    ]}>
                      {day.slice(0, 3)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Preview */}
          <View style={[styles.reminderPreview, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="notifications" size={20} color={colors.primary} />
            <View style={styles.previewContent}>
              <Text style={[styles.previewTitle, { color: colors.text }]}>Reminder Preview</Text>
              <Text style={[styles.previewText, { color: colors.secondaryText }]}>
                You'll be reminded to recite "{supplication?.title}" at {selectedTime} on {selectedDays.join(', ')}
              </Text>
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
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkButton: {
    padding: 4,
    marginLeft: 8,
  },
  reminderButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
  // Reminders styles
  tabContent: {
    flex: 1,
  },
  remindersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  addReminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 4,
  },
  addReminderText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyReminders: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  remindersList: {
    gap: 12,
    paddingHorizontal: 20,
  },
  reminderCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  reminderTime: {
    fontSize: 14,
    fontWeight: '500',
  },
  reminderDays: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
  },
  dayChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '500',
  },
  deleteReminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
  },
  deleteReminderText: {
    fontSize: 12,
    fontWeight: '500',
  },
  // Reminder modal styles
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
  supplicationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
    gap: 12,
  },
  supplicationTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  reminderTypeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timeOptions: {
    gap: 8,
  },
  timeOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  timeOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  daysGrid: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 44,
    alignItems: 'center',
  },
  dayButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  reminderPreview: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  previewContent: {
    flex: 1,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  reminderModalContent: {
    maxHeight: '80%',
  },
  timePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  timePickerText: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  timePickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timePickerModal: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 16,
    overflow: 'hidden',
  },
  timePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  timePickerCancel: {
    fontSize: 16,
  },
  timePickerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  timePickerDone: {
    fontSize: 16,
    fontWeight: '600',
  },
  timePickerContent: {
    padding: 20,
  },
  timePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timePickerColumn: {
    alignItems: 'center',
  },
  timePickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  timePickerScroll: {
    height: 120,
    width: 60,
  },
  timePickerOption: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 2,
  },
  timePickerOptionText: {
    fontSize: 18,
    fontWeight: '500',
  },
  timePickerSeparator: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  quickTimePresets: {
    marginTop: 20,
  },
  quickTimeLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  quickTimeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickTimeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  quickTimeButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  reminderItem: {
  },
});

function handleCategorySelect(id: string): void {
  throw new Error('Function not implemented.');
}
