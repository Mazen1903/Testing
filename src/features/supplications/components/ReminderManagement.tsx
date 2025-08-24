import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { SupplicationReminder, ReminderStats } from '@/shared/types/reminders';
import { reminderService } from '@/shared/services/reminder.service';

interface ReminderManagementProps {
  manuscriptColors: any;
}

export default function ReminderManagement({ manuscriptColors }: ReminderManagementProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  
  const [reminders, setReminders] = useState<SupplicationReminder[]>([]);
  const [stats, setStats] = useState<ReminderStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReminders();
    loadStats();
  }, []);

  const loadReminders = async () => {
    try {
      const response = await reminderService.getAllReminders();
      if (response.success && response.data) {
        setReminders(response.data);
      }
    } catch (error) {
      console.error('Error loading reminders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await reminderService.getReminderStats();
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleToggleReminder = async (reminderId: string) => {
    try {
      const response = await reminderService.toggleReminder(reminderId);
      if (response.success) {
        await loadReminders();
        await loadStats();
      } else {
        Alert.alert('Error', response.error || 'Failed to toggle reminder');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to toggle reminder');
    }
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
            try {
              const response = await reminderService.deleteReminder(reminderId);
              if (response.success) {
                await loadReminders();
                await loadStats();
              } else {
                Alert.alert('Error', response.error || 'Failed to delete reminder');
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to delete reminder');
            }
          },
        },
      ]
    );
  };

  const getFrequencyText = (reminder: SupplicationReminder): string => {
    switch (reminder.frequency) {
      case 'once':
        return 'One time';
      case 'daily':
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      case 'monthly':
        return 'Monthly';
      case 'custom':
        return `Every ${reminder.customInterval} days`;
      default:
        return 'Unknown';
    }
  };

  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getNextTriggerText = (reminder: SupplicationReminder): string => {
    if (!reminder.nextTrigger) return 'Not scheduled';
    
    const nextDate = new Date(reminder.nextTrigger);
    const now = new Date();
    const diffMs = nextDate.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `In ${diffDays} day${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `In ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else {
      return 'Soon';
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="notifications" size={48} color={manuscriptColors.border} />
        <Text style={[styles.loadingText, { color: manuscriptColors.lightInk }]}>
          Loading reminders...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Stats Overview */}
      {stats && (
        <Animated.View entering={FadeInDown.delay(100)} style={[styles.statsCard, { backgroundColor: manuscriptColors.parchment, borderColor: manuscriptColors.border }]}>
          <View style={styles.statsHeader}>
            <Ionicons name="analytics" size={20} color={manuscriptColors.brown} />
            <Text style={[styles.statsTitle, { color: manuscriptColors.ink }]}>Your Progress</Text>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: manuscriptColors.brown }]}>{stats.activeReminders}</Text>
              <Text style={[styles.statLabel, { color: manuscriptColors.lightInk }]}>Active</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: manuscriptColors.brown }]}>{stats.completedToday}</Text>
              <Text style={[styles.statLabel, { color: manuscriptColors.lightInk }]}>Today</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: manuscriptColors.brown }]}>{stats.streakDays}</Text>
              <Text style={[styles.statLabel, { color: manuscriptColors.lightInk }]}>Streak</Text>
            </View>
          </View>
        </Animated.View>
      )}

      {/* Reminders List */}
      <View style={styles.remindersSection}>
        <Text style={[styles.sectionTitle, { color: manuscriptColors.brown }]}>
          YOUR REMINDERS ({reminders.length})
        </Text>

        {reminders.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="alarm-outline" size={64} color={manuscriptColors.border} />
            <Text style={[styles.emptyStateTitle, { color: manuscriptColors.ink }]}>
              No Reminders Set
            </Text>
            <Text style={[styles.emptyStateText, { color: manuscriptColors.lightInk }]}>
              Create your first reminder to get notified for your favorite supplications
            </Text>
          </View>
        ) : (
          reminders.map((reminder, index) => (
            <Animated.View key={reminder.id} entering={FadeInDown.delay(200 + index * 100)}>
              <View style={[styles.reminderCard, { backgroundColor: manuscriptColors.parchment, borderColor: manuscriptColors.border }]}>
                <View style={styles.reminderHeader}>
                  <View style={styles.reminderInfo}>
                    <Text style={[styles.reminderTitle, { color: manuscriptColors.ink }]}>
                      {reminder.supplicationTitle}
                    </Text>
                    <View style={styles.reminderMeta}>
                      <Ionicons name="time" size={14} color={manuscriptColors.brown} />
                      <Text style={[styles.reminderTime, { color: manuscriptColors.brown }]}>
                        {formatTime(reminder.scheduledTime)}
                      </Text>
                      <Text style={[styles.reminderFrequency, { color: manuscriptColors.lightInk }]}>
                        • {getFrequencyText(reminder)}
                      </Text>
                    </View>
                  </View>
                  
                  <Switch
                    value={reminder.isActive && !reminder.isPaused}
                    onValueChange={() => handleToggleReminder(reminder.id)}
                    trackColor={{ false: manuscriptColors.border, true: manuscriptColors.brown + '40' }}
                    thumbColor={reminder.isActive && !reminder.isPaused ? manuscriptColors.brown : manuscriptColors.lightInk}
                  />
                </View>

                <View style={styles.reminderDetails}>
                  <View style={styles.reminderStatus}>
                    <View style={[
                      styles.statusIndicator,
                      { backgroundColor: reminder.isActive && !reminder.isPaused ? manuscriptColors.brown : manuscriptColors.border }
                    ]} />
                    <Text style={[styles.statusText, { color: manuscriptColors.lightInk }]}>
                      {reminder.isPaused ? 'Paused' : reminder.isActive ? getNextTriggerText(reminder) : 'Inactive'}
                    </Text>
                  </View>
                  
                  <View style={styles.reminderActions}>
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: manuscriptColors.brown + '15' }]}
                      onPress={() => {
                        // TODO: Open edit modal
                        console.log('Edit reminder:', reminder.id);
                      }}
                    >
                      <Ionicons name="create" size={16} color={manuscriptColors.brown} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: manuscriptColors.border + '30' }]}
                      onPress={() => handleDeleteReminder(reminder.id)}
                    >
                      <Ionicons name="trash" size={16} color={manuscriptColors.lightInk} />
                    </TouchableOpacity>
                  </View>
                </View>

                {reminder.completionCount > 0 && (
                  <View style={[styles.completionBadge, { backgroundColor: manuscriptColors.brown + '15' }]}>
                    <Ionicons name="checkmark-circle" size={14} color={manuscriptColors.brown} />
                    <Text style={[styles.completionText, { color: manuscriptColors.brown }]}>
                      Completed {reminder.completionCount} times
                    </Text>
                  </View>
                )}
              </View>
            </Animated.View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
  },
  statsCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  remindersSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  reminderCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  reminderMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reminderTime: {
    fontSize: 14,
    fontWeight: '500',
  },
  reminderFrequency: {
    fontSize: 14,
  },
  reminderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  reminderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 12,
    gap: 6,
  },
  completionText: {
    fontSize: 12,
    fontWeight: '500',
  },
});