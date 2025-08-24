import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

import { 
  SupplicationReminder, 
  CreateReminderRequest, 
  UpdateReminderRequest,
  ReminderStats,
  ReminderHistory,
  ReminderNotificationData 
} from '@/shared/types/reminders';
import { ApiResponse } from '@/shared/types';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class ReminderService {
  private readonly STORAGE_KEY = '@supplication_reminders';
  private readonly HISTORY_KEY = '@reminder_history';
  private readonly STATS_KEY = '@reminder_stats';

  constructor() {
    this.initializeNotifications();
  }

  private async initializeNotifications() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('supplications', {
        name: 'Supplication Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#8B4513',
        sound: 'default',
      });
    }
  }

  // Request notification permissions
  async requestPermissions(): Promise<boolean> {
    if (!Device.isDevice) {
      console.warn('Notifications only work on physical devices');
      return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  }

  // Storage helpers
  private async getReminders(): Promise<SupplicationReminder[]> {
    try {
      const data = await AsyncStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading reminders:', error);
      return [];
    }
  }

  private async saveReminders(reminders: SupplicationReminder[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(reminders));
    } catch (error) {
      console.error('Error saving reminders:', error);
      throw error;
    }
  }

  private async getHistory(): Promise<ReminderHistory[]> {
    try {
      const data = await AsyncStorage.getItem(this.HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading history:', error);
      return [];
    }
  }

  private async saveHistory(history: ReminderHistory[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  }

  // Calculate next trigger time based on frequency
  private calculateNextTrigger(reminder: SupplicationReminder): Date | null {
    const now = new Date();
    const scheduledTime = new Date(reminder.scheduledTime);
    
    switch (reminder.frequency) {
      case 'once':
        return scheduledTime > now ? scheduledTime : null;
        
      case 'daily':
        const nextDaily = new Date(scheduledTime);
        nextDaily.setDate(now.getDate());
        if (nextDaily <= now) {
          nextDaily.setDate(nextDaily.getDate() + 1);
        }
        return nextDaily;
        
      case 'weekly':
        if (!reminder.daysOfWeek || reminder.daysOfWeek.length === 0) return null;
        
        const nextWeekly = new Date(scheduledTime);
        const currentDay = now.getDay();
        const nextDay = reminder.daysOfWeek.find(day => day > currentDay) || 
                       reminder.daysOfWeek[0];
        
        if (nextDay > currentDay) {
          nextWeekly.setDate(now.getDate() + (nextDay - currentDay));
        } else {
          nextWeekly.setDate(now.getDate() + (7 - currentDay + nextDay));
        }
        return nextWeekly;
        
      case 'monthly':
        const nextMonthly = new Date(scheduledTime);
        nextMonthly.setMonth(now.getMonth());
        if (nextMonthly <= now) {
          nextMonthly.setMonth(nextMonthly.getMonth() + 1);
        }
        return nextMonthly;
        
      case 'custom':
        if (!reminder.customInterval) return null;
        const nextCustom = new Date(scheduledTime);
        nextCustom.setDate(now.getDate() + reminder.customInterval);
        return nextCustom;
        
      default:
        return null;
    }
  }

  // Schedule notification for a reminder
  private async scheduleNotification(reminder: SupplicationReminder): Promise<string | null> {
    const nextTrigger = this.calculateNextTrigger(reminder);
    if (!nextTrigger) return null;

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: reminder.title,
          body: reminder.notificationStyle === 'full' 
            ? reminder.supplicationText.translation || reminder.supplicationText.transliteration || 'Time for your supplication'
            : `Time for ${reminder.supplicationTitle}`,
          data: {
            reminderId: reminder.id,
            supplicationTitle: reminder.supplicationTitle,
            arabicText: reminder.supplicationText.arabic,
            transliteration: reminder.supplicationText.transliteration,
            translation: reminder.supplicationText.translation,
            scheduledTime: reminder.scheduledTime,
          } as ReminderNotificationData,
          sound: reminder.soundEnabled ? 'default' : false,
          vibrate: reminder.vibrationEnabled ? [0, 250, 250, 250] : [],
        },
        trigger: {
          date: nextTrigger,
        },
      });

      return notificationId;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      return null;
    }
  }

  // Public API methods
  async getAllReminders(): Promise<ApiResponse<SupplicationReminder[]>> {
    try {
      const reminders = await this.getReminders();
      return { success: true, data: reminders };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to load reminders' 
      };
    }
  }

  async createReminder(
    reminderData: CreateReminderRequest,
    supplicationData: { title: string; arabic?: string; transliteration?: string; translation?: string }
  ): Promise<ApiResponse<SupplicationReminder>> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return { success: false, error: 'Notification permissions required' };
      }

      const reminders = await this.getReminders();
      const newReminder: SupplicationReminder = {
        id: Date.now().toString(),
        title: `${supplicationData.title} Reminder`,
        supplicationId: reminderData.supplicationId,
        supplicationTitle: supplicationData.title,
        supplicationText: {
          arabic: supplicationData.arabic,
          transliteration: supplicationData.transliteration,
          translation: supplicationData.translation,
        },
        scheduledTime: reminderData.scheduledTime,
        frequency: reminderData.frequency,
        customInterval: reminderData.customInterval,
        daysOfWeek: reminderData.daysOfWeek,
        endDate: reminderData.endDate,
        isActive: true,
        isPaused: false,
        completionCount: 0,
        soundEnabled: reminderData.soundEnabled ?? true,
        vibrationEnabled: reminderData.vibrationEnabled ?? true,
        notificationStyle: reminderData.notificationStyle ?? 'preview',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: reminderData.category,
        tags: reminderData.tags,
      };

      // Calculate next trigger
      const nextTrigger = this.calculateNextTrigger(newReminder);
      if (nextTrigger) {
        newReminder.nextTrigger = nextTrigger.toISOString();
        await this.scheduleNotification(newReminder);
      }

      reminders.push(newReminder);
      await this.saveReminders(reminders);

      return { success: true, data: newReminder };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create reminder' 
      };
    }
  }

  async updateReminder(
    reminderId: string, 
    updates: UpdateReminderRequest
  ): Promise<ApiResponse<SupplicationReminder>> {
    try {
      const reminders = await this.getReminders();
      const index = reminders.findIndex(r => r.id === reminderId);
      
      if (index === -1) {
        return { success: false, error: 'Reminder not found' };
      }

      // Cancel existing notification
      await Notifications.cancelScheduledNotificationAsync(reminderId);

      // Update reminder
      const updatedReminder = {
        ...reminders[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      // Reschedule if active
      if (updatedReminder.isActive && !updatedReminder.isPaused) {
        const nextTrigger = this.calculateNextTrigger(updatedReminder);
        if (nextTrigger) {
          updatedReminder.nextTrigger = nextTrigger.toISOString();
          await this.scheduleNotification(updatedReminder);
        }
      }

      reminders[index] = updatedReminder;
      await this.saveReminders(reminders);

      return { success: true, data: updatedReminder };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update reminder' 
      };
    }
  }

  async deleteReminder(reminderId: string): Promise<ApiResponse<void>> {
    try {
      // Cancel notification
      await Notifications.cancelScheduledNotificationAsync(reminderId);

      // Remove from storage
      const reminders = await this.getReminders();
      const filteredReminders = reminders.filter(r => r.id !== reminderId);
      await this.saveReminders(filteredReminders);

      return { success: true, data: undefined };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete reminder' 
      };
    }
  }

  async toggleReminder(reminderId: string): Promise<ApiResponse<SupplicationReminder>> {
    const reminders = await this.getReminders();
    const reminder = reminders.find(r => r.id === reminderId);
    
    if (!reminder) {
      return { success: false, error: 'Reminder not found' };
    }

    return this.updateReminder(reminderId, { 
      isActive: !reminder.isActive,
      isPaused: false 
    });
  }

  async pauseReminder(reminderId: string): Promise<ApiResponse<SupplicationReminder>> {
    return this.updateReminder(reminderId, { isPaused: true });
  }

  async resumeReminder(reminderId: string): Promise<ApiResponse<SupplicationReminder>> {
    return this.updateReminder(reminderId, { isPaused: false });
  }

  async markReminderCompleted(reminderId: string): Promise<ApiResponse<void>> {
    try {
      const reminders = await this.getReminders();
      const reminder = reminders.find(r => r.id === reminderId);
      
      if (!reminder) {
        return { success: false, error: 'Reminder not found' };
      }

      // Update completion count and last triggered
      reminder.completionCount += 1;
      reminder.lastTriggered = new Date().toISOString();

      // Add to history
      const history = await this.getHistory();
      const historyEntry: ReminderHistory = {
        id: Date.now().toString(),
        reminderId,
        triggeredAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        wasCompleted: true,
        supplicationTitle: reminder.supplicationTitle,
      };
      history.push(historyEntry);
      await this.saveHistory(history);

      // Schedule next occurrence if recurring
      if (reminder.frequency !== 'once') {
        const nextTrigger = this.calculateNextTrigger(reminder);
        if (nextTrigger) {
          reminder.nextTrigger = nextTrigger.toISOString();
          await this.scheduleNotification(reminder);
        }
      } else {
        reminder.isActive = false;
      }

      await this.saveReminders(reminders);
      return { success: true, data: undefined };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to mark completed' 
      };
    }
  }

  async getReminderStats(): Promise<ApiResponse<ReminderStats>> {
    try {
      const reminders = await this.getReminders();
      const history = await this.getHistory();
      const now = new Date();
      
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      const completedToday = history.filter(h => 
        new Date(h.completedAt || h.triggeredAt) >= today && h.wasCompleted
      ).length;

      const completedThisWeek = history.filter(h => 
        new Date(h.completedAt || h.triggeredAt) >= weekStart && h.wasCompleted
      ).length;

      const completedThisMonth = history.filter(h => 
        new Date(h.completedAt || h.triggeredAt) >= monthStart && h.wasCompleted
      ).length;

      // Calculate streak
      let streakDays = 0;
      const sortedHistory = history
        .filter(h => h.wasCompleted)
        .sort((a, b) => new Date(b.completedAt || b.triggeredAt).getTime() - new Date(a.completedAt || a.triggeredAt).getTime());

      let currentDate = new Date(today);
      for (const entry of sortedHistory) {
        const entryDate = new Date(entry.completedAt || entry.triggeredAt);
        const entryDay = new Date(entryDate.getFullYear(), entryDate.getMonth(), entryDate.getDate());
        
        if (entryDay.getTime() === currentDate.getTime()) {
          streakDays++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }

      // Find favorite supplication
      const supplicationCounts = history.reduce((acc, h) => {
        acc[h.supplicationTitle] = (acc[h.supplicationTitle] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const favoriteSupplication = Object.entries(supplicationCounts)
        .sort(([,a], [,b]) => b - a)[0]?.[0];

      const stats: ReminderStats = {
        totalReminders: reminders.length,
        activeReminders: reminders.filter(r => r.isActive && !r.isPaused).length,
        completedToday,
        completedThisWeek,
        completedThisMonth,
        streakDays,
        favoriteSupplication,
      };

      return { success: true, data: stats };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get stats' 
      };
    }
  }

  async getReminderHistory(limit = 50): Promise<ApiResponse<ReminderHistory[]>> {
    try {
      const history = await this.getHistory();
      const sortedHistory = history
        .sort((a, b) => new Date(b.triggeredAt).getTime() - new Date(a.triggeredAt).getTime())
        .slice(0, limit);
      
      return { success: true, data: sortedHistory };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get history' 
      };
    }
  }

  // Cleanup expired reminders and notifications
  async cleanupExpiredReminders(): Promise<void> {
    try {
      const reminders = await this.getReminders();
      const now = new Date();
      
      const activeReminders = reminders.filter(reminder => {
        if (!reminder.endDate) return true;
        return new Date(reminder.endDate) > now;
      });

      // Cancel notifications for expired reminders
      const expiredReminders = reminders.filter(reminder => {
        if (!reminder.endDate) return false;
        return new Date(reminder.endDate) <= now;
      });

      for (const expired of expiredReminders) {
        await Notifications.cancelScheduledNotificationAsync(expired.id);
      }

      await this.saveReminders(activeReminders);
    } catch (error) {
      console.error('Error cleaning up expired reminders:', error);
    }
  }

  // Export reminders for backup
  async exportReminders(): Promise<string> {
    const reminders = await this.getReminders();
    const history = await this.getHistory();
    
    return JSON.stringify({
      reminders,
      history,
      exportedAt: new Date().toISOString(),
      version: '1.0',
    }, null, 2);
  }

  // Import reminders from backup
  async importReminders(backupData: string): Promise<ApiResponse<void>> {
    try {
      const data = JSON.parse(backupData);
      
      if (data.reminders && Array.isArray(data.reminders)) {
        await this.saveReminders(data.reminders);
        
        // Reschedule active reminders
        for (const reminder of data.reminders) {
          if (reminder.isActive && !reminder.isPaused) {
            await this.scheduleNotification(reminder);
          }
        }
      }
      
      if (data.history && Array.isArray(data.history)) {
        await this.saveHistory(data.history);
      }

      return { success: true, data: undefined };
    } catch (error) {
      return { 
        success: false, 
        error: 'Invalid backup data format' 
      };
    }
  }
}

export const reminderService = new ReminderService();