rs = await this.getReminders();
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