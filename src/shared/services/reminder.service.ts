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
} from '@/src/shared/types/reminder';
import { ApiResponse } from '@/shared/types';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

class ReminderService {
  private readonly STORAGE_KEY = '@supplication_reminders';
  private readonly HISTORY_KEY = '@reminder_history';
  private readonly STATS_KEY = '@reminder_stats';
  private isInitialized = false;

  constructor() {
    this.initializeNotifications();
  }

  private async initializeNotifications() {
    if (this.isInitialized) return;
    
    try {
      // Request permissions first
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        console.warn('Notification permissions not granted');
        return;
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('supplications', {
          name: 'Supplication Reminders',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#8B4513',
          sound: 'default',
          description: 'Notifications for your scheduled supplications',
        });
      }

      // Set up notification response listener
      Notifications.addNotificationResponseReceivedListener(this.handleNotificationResponse);
      
      this.isInitialized = true;
      console.log('✅ Notification system initialized');
    } catch (error) {
      console.error('❌ Error initializing notifications:', error);
    }
  }

  private handleNotificationResponse = (response: Notifications.NotificationResponse) => {
    const data = response.notification.request.content.data as unknown as ReminderNotificationData;
    console.log('📱 Notification tapped:', data);
    
    // Mark reminder as completed when notification is tapped
    if (data.reminderId) {
      this.markReminderCompleted(data.reminderId);
    }
  };

  // Request notification permissions
  async requestPermissions(): Promise<boolean> {
    try {
      if (!Device.isDevice) {
        console.warn('Notifications only work on physical devices');
        return false;
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        console.log('🔔 Requesting notification permissions...');
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      const granted = finalStatus === 'granted';
      console.log(granted ? '✅ Notification permissions granted' : '❌ Notification permissions denied');
      return granted;
    } catch (error) {
      console.error('❌ Error requesting permissions:', error);
      return false;
    }
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
    
    // Create a new date with today's date but the scheduled time
    const nextTrigger = new Date();
    nextTrigger.setHours(scheduledTime.getHours());
    nextTrigger.setMinutes(scheduledTime.getMinutes());
    nextTrigger.setSeconds(0);
    nextTrigger.setMilliseconds(0);
    
    switch (reminder.frequency) {
      case 'once':
        return scheduledTime > now ? scheduledTime : null;
        
      case 'daily':
        // If the time has passed today, schedule for tomorrow
        if (nextTrigger <= now) {
          nextTrigger.setDate(nextTrigger.getDate() + 1);
        }
        return nextTrigger;
        
      case 'weekly':
        if (!reminder.daysOfWeek || reminder.daysOfWeek.length === 0) return null;
        
        const currentDay = now.getDay();
        let nextDay = reminder.daysOfWeek.find((day: number) => {
          if (day > currentDay) return true;
          if (day === currentDay) {
            // Same day - check if time hasn't passed yet
            const todayTime = new Date();
            todayTime.setHours(scheduledTime.getHours());
            todayTime.setMinutes(scheduledTime.getMinutes());
            return todayTime > now;
          }
          return false;
        });
        
        if (!nextDay) {
          // No more days this week, get first day of next week
          nextDay = reminder.daysOfWeek[0];
          const daysUntilNext = (7 - currentDay + nextDay) % 7;
          nextTrigger.setDate(nextTrigger.getDate() + (daysUntilNext === 0 ? 7 : daysUntilNext));
        } else {
          // Found a day this week
          const daysUntilNext = nextDay - currentDay;
          nextTrigger.setDate(nextTrigger.getDate() + daysUntilNext);
        }
        
        return nextTrigger;
        
      case 'monthly':
        // If the time has passed this month, schedule for next month
        if (nextTrigger <= now) {
          nextTrigger.setMonth(nextTrigger.getMonth() + 1);
        }
        return nextTrigger;
        
      case 'custom':
        if (!reminder.customInterval) return null;
        // If the time has passed today, add the custom interval
        if (nextTrigger <= now) {
          nextTrigger.setDate(nextTrigger.getDate() + reminder.customInterval);
        }
        return nextTrigger;
        
      default:
        return null;
    }
  }

  // Schedule notification for a reminder
  private async scheduleNotification(reminder: SupplicationReminder): Promise<string | null> {
    const nextTrigger = this.calculateNextTrigger(reminder);
    if (!nextTrigger) {
      console.log('❌ No next trigger calculated for reminder:', reminder.id);
      return null;
    }

    try {
      console.log('📅 Scheduling notification for:', nextTrigger.toLocaleString());
      
      const notificationContent = this.getNotificationContent(reminder);
      
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: notificationContent.title,
          body: notificationContent.body,
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
          badge: 1,
        },
        trigger: {
          date: nextTrigger,
        },
      });

      console.log('✅ Notification scheduled with ID:', notificationId);
      return notificationId;
    } catch (error) {
      console.error('❌ Error scheduling notification:', error);
      return null;
    }
  }

  private getNotificationContent(reminder: SupplicationReminder): { title: string; body: string } {
    const title = `🤲 ${reminder.supplicationTitle}`;
    
    let body: string;
    switch (reminder.notificationStyle) {
      case 'minimal':
        body = 'Time for your supplication';
        break;
      case 'full':
        body = reminder.supplicationText.translation || 
               reminder.supplicationText.transliteration || 
               'Time for your supplication';
        break;
      case 'preview':
      default:
        body = `Time for ${reminder.supplicationTitle}`;
        break;
    }
    
    return { title, body };
  }

  // Public API methods
  async getAllReminders(): Promise<ApiResponse<SupplicationReminder[]>> {
    try {
      await this.initializeNotifications();
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
      await this.initializeNotifications();
      
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return { success: false, error: 'Notification permissions required. Please enable notifications in your device settings.' };
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

      // Calculate next trigger and schedule notification
      const nextTrigger = this.calculateNextTrigger(newReminder);
      if (nextTrigger) {
        newReminder.nextTrigger = nextTrigger.toISOString();
        const notificationId = await this.scheduleNotification(newReminder);
        
        if (!notificationId) {
          return { success: false, error: 'Failed to schedule notification' };
        }
        
        console.log('✅ Reminder created and notification scheduled');
      } else {
        console.log('⚠️ No next trigger calculated - reminder created but not scheduled');
      }

      reminders.push(newReminder);
      await this.saveReminders(reminders);

      return { success: true, data: newReminder };
    } catch (error) {
      console.error('❌ Error creating reminder:', error);
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
        .sort(([,a]: [string, number], [,b]: [string, number]) => b - a)[0]?.[0];

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

  // Test notification (for debugging)
  async testNotification(): Promise<ApiResponse<void>> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return { success: false, error: 'Notification permissions required' };
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🤲 Test Reminder',
          body: 'This is a test notification to verify the reminder system is working',
          data: { test: true },
          sound: 'default',
          vibrate: [0, 250, 250, 250],
          badge: 1,
        },
        trigger: {
          seconds: 2, // Fire in 2 seconds
        },
      });

      return { success: true, data: undefined };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send test notification' 
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