import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { ZIKR_SERIES } from '@/shared/constants/supplications';
import { ZikrSeries } from '@/shared/types';

import { CategoryList } from './CategoryList';
import { SupplicationsList } from './SupplicationsList';
import { RemindersTab } from './RemindersTab';
import { ReminderModal } from './ReminderModal';

type TabType = 'Collections' | 'Reminders';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function SupplicationsScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  
  const [activeTab, setActiveTab] = useState<TabType>('Collections');
  const [selectedSeries, setSelectedSeries] = useState<ZikrSeries | null>(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedSupplicationForReminder, setSelectedSupplicationForReminder] = useState<any>(null);
  const [reminders, setReminders] = useState<any[]>([]);

  useEffect(() => {
    requestNotificationPermissions();
    loadReminders();
  }, []);

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Notification permissions are required for reminders to work.');
    }
  };

  const loadReminders = async () => {
    try {
      const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
      setReminders(scheduledNotifications);
    } catch (error) {
      console.error('Error loading reminders:', error);
    }
  };

  const handleCategorySelect = (series: ZikrSeries) => {
    setSelectedSeries(series);
  };

  const handleBackToCategories = () => {
    setSelectedSeries(null);
  };

  const handleSetReminder = (supplication: any) => {
    // Only allow reminders for actionable supplications, not educational content
    const disabledCategories = [
      'The Importance of Daily Supplications',
      'The Importance of Hadith-based Supplications', 
      'The importance of Quranic Supplications'
    ];
    
    if (disabledCategories.includes(supplication.category)) {
      return; // Don't show reminder for educational content
    }
    
    setSelectedSupplicationForReminder(supplication);
    setShowReminderModal(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Collections':
        if (selectedSeries) {
          return (
            <SupplicationsList
              series={selectedSeries}
              onBack={handleBackToCategories}
              onSetReminder={handleSetReminder}
            />
          );
        }
        return (
          <CategoryList
            categories={ZIKR_SERIES}
            onCategorySelect={handleCategorySelect}
            onSetReminder={handleSetReminder}
          />
        );
      case 'Reminders':
        return (
          <RemindersTab
            reminders={reminders}
            onRefresh={loadReminders}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Supplications</Text>
      </View>

      {/* Tab Navigation */}
      <View style={[styles.tabBar, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        {(['Collections', 'Reminders'] as TabType[]).map((tab) => (
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

      {/* Reminder Modal */}
      <ReminderModal
        visible={showReminderModal}
        onClose={() => setShowReminderModal(false)}
        supplication={selectedSupplicationForReminder}
        onReminderSet={loadReminders}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
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
});