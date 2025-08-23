import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';

interface RemindersTabProps {
  reminders: any[];
  onRefresh: () => void;
}

export function RemindersTab({ reminders, onRefresh }: RemindersTabProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

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
            try {
              await Notifications.cancelScheduledNotificationAsync(reminderId);
              onRefresh();
            } catch (error) {
              console.error('Error deleting reminder:', error);
              Alert.alert('Error', 'Failed to delete reminder');
            }
          },
        },
      ]
    );
  };

  const formatReminderTime = (trigger: any) => {
    if (trigger?.hour !== undefined && trigger?.minute !== undefined) {
      const hour = trigger.hour;
      const minute = trigger.minute;
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
    }
    return 'Unknown time';
  };

  const formatReminderDays = (trigger: any) => {
    if (trigger?.weekday !== undefined) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[trigger.weekday] || 'Unknown day';
    }
    return 'Daily';
  };

  if (reminders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="notifications-off-outline" size={64} color={colors.border} />
        <Text style={[styles.emptyTitle, { color: colors.text }]}>No Reminders Set</Text>
        <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
          Go to Collections and tap the bell icon to set custom reminders for your supplications
        </Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Active Reminders</Text>
        <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
          <Ionicons name="refresh" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {reminders.map((reminder, index) => (
        <View
          key={reminder.identifier}
          style={[styles.reminderCard, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <View style={styles.reminderContent}>
            <View style={styles.reminderInfo}>
              <Text style={[styles.reminderTitle, { color: colors.text }]}>
                {reminder.content?.title || 'Supplication Reminder'}
              </Text>
              <Text style={[styles.reminderSubtitle, { color: colors.secondaryText }]}>
                {reminder.content?.body || 'Time for your supplication'}
              </Text>
              <View style={styles.reminderMeta}>
                <Text style={[styles.reminderTime, { color: colors.primary }]}>
                  {formatReminderTime(reminder.trigger)}
                </Text>
                <Text style={[styles.reminderDays, { color: colors.secondaryText }]}>
                  • {formatReminderDays(reminder.trigger)}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity
              style={[styles.deleteButton, { backgroundColor: colors.error + '15' }]}
              onPress={() => handleDeleteReminder(reminder.identifier)}
            >
              <Ionicons name="trash-outline" size={18} color={colors.error} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  refreshButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  reminderCard: {
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  reminderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  reminderSubtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  reminderMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderTime: {
    fontSize: 14,
    fontWeight: '600',
  },
  reminderDays: {
    fontSize: 12,
    marginLeft: 4,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});