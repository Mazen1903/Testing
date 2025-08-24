export interface SupplicationReminder {
  id: string;
  title: string;
  supplicationId: string;
  supplicationTitle: string;
  supplicationText: {
    arabic?: string;
    transliteration?: string;
    translation?: string;
  };
  
  // Scheduling
  scheduledTime: string; // ISO string for time
  frequency: 'once' | 'daily' | 'weekly' | 'monthly' | 'custom';
  customInterval?: number; // For custom frequency in days
  daysOfWeek?: number[]; // 0-6 for Sunday-Saturday (for weekly)
  endDate?: string; // When to stop recurring reminders
  
  // Status
  isActive: boolean;
  isPaused: boolean;
  lastTriggered?: string;
  nextTrigger?: string;
  completionCount: number;
  
  // Notification settings
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  notificationStyle: 'minimal' | 'full' | 'preview';
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  category?: string;
  tags?: string[];
}

export interface ReminderNotificationData {
  reminderId: string;
  supplicationTitle: string;
  arabicText?: string;
  transliteration?: string;
  translation?: string;
  scheduledTime: string;
  [key: string]: unknown; // Add index signature for Expo notifications
}

export interface CreateReminderRequest {
  supplicationId: string;
  scheduledTime: string;
  frequency: SupplicationReminder['frequency'];
  customInterval?: number;
  daysOfWeek?: number[];
  endDate?: string;
  soundEnabled?: boolean;
  vibrationEnabled?: boolean;
  notificationStyle?: SupplicationReminder['notificationStyle'];
  category?: string;
  tags?: string[];
}

export interface UpdateReminderRequest extends Partial<CreateReminderRequest> {
  isActive?: boolean;
  isPaused?: boolean;
}

export interface ReminderStats {
  totalReminders: number;
  activeReminders: number;
  completedToday: number;
  completedThisWeek: number;
  completedThisMonth: number;
  streakDays: number;
  favoriteSupplication?: string;
}

export interface ReminderHistory {
  id: string;
  reminderId: string;
  triggeredAt: string;
  completedAt?: string;
  wasCompleted: boolean;
  supplicationTitle: string;
}