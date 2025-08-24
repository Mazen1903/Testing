import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { CreateReminderRequest } from '@/shared/types/reminders';
import { DuaSubcategory } from '@/shared/types/supplications';

interface ReminderModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateReminder: (reminderData: CreateReminderRequest) => Promise<void>;
  selectedSubcategory: DuaSubcategory | null;
  isCreating: boolean;
}

const FREQUENCY_OPTIONS = [
  { value: 'once', label: 'One Time', icon: 'calendar-outline' },
  { value: 'daily', label: 'Daily', icon: 'today-outline' },
  { value: 'weekly', label: 'Weekly', icon: 'calendar-outline' },
  { value: 'monthly', label: 'Monthly', icon: 'calendar-outline' },
  { value: 'custom', label: 'Custom', icon: 'settings-outline' },
] as const;

const DAYS_OF_WEEK = [
  { value: 0, label: 'Sun', fullLabel: 'Sunday' },
  { value: 1, label: 'Mon', fullLabel: 'Monday' },
  { value: 2, label: 'Tue', fullLabel: 'Tuesday' },
  { value: 3, label: 'Wed', fullLabel: 'Wednesday' },
  { value: 4, label: 'Thu', fullLabel: 'Thursday' },
  { value: 5, label: 'Fri', fullLabel: 'Friday' },
  { value: 6, label: 'Sat', fullLabel: 'Saturday' },
];

const NOTIFICATION_STYLES = [
  { value: 'minimal', label: 'Minimal', description: 'Just the title' },
  { value: 'preview', label: 'Preview', description: 'Title + short preview' },
  { value: 'full', label: 'Full Text', description: 'Complete supplication' },
] as const;

export default function ReminderModal({
  visible,
  onClose,
  onCreateReminder,
  selectedSubcategory,
  isCreating,
}: ReminderModalProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

  // Form state
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [frequency, setFrequency] = useState<CreateReminderRequest['frequency']>('daily');
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [customInterval, setCustomInterval] = useState('');
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [reminderTitle, setReminderTitle] = useState('');
  
  // Notification settings
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [notificationStyle, setNotificationStyle] = useState<'minimal' | 'preview' | 'full'>('preview');

  const handleCreateReminder = async () => {
    if (!selectedSubcategory) {
      Alert.alert('Error', 'No supplication selected');
      return;
    }

    if (frequency === 'weekly' && selectedDays.length === 0) {
      Alert.alert('Error', 'Please select at least one day for weekly reminders');
      return;
    }

    if (frequency === 'custom' && (!customInterval || parseInt(customInterval) < 1)) {
      Alert.alert('Error', 'Please enter a valid custom interval');
      return;
    }

    const reminderData: CreateReminderRequest = {
      supplicationId: selectedSubcategory.id,
      scheduledTime: selectedTime.toISOString(),
      frequency,
      customInterval: frequency === 'custom' ? parseInt(customInterval) : undefined,
      daysOfWeek: frequency === 'weekly' ? selectedDays : undefined,
      endDate: endDate?.toISOString(),
      soundEnabled,
      vibrationEnabled,
      notificationStyle,
      category: selectedSubcategory.category,
    };

    await onCreateReminder(reminderData);
    
    // Reset form
    setSelectedTime(new Date());
    setFrequency('daily');
    setSelectedDays([]);
    setCustomInterval('');
    setEndDate(null);
    setReminderTitle('');
    setSoundEnabled(true);
    setVibrationEnabled(true);
    setNotificationStyle('preview');
  };

  const toggleDay = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day].sort()
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
          <Text style={[styles.headerTitle, { color: colors.text }]}>Set Reminder</Text>
          <TouchableOpacity 
            onPress={handleCreateReminder}
            style={[styles.createButton, { backgroundColor: colors.primary }]}
            disabled={isCreating}
          >
            <Text style={styles.createButtonText}>
              {isCreating ? 'Creating...' : 'Create'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Selected Supplication */}
          <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="book" size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Selected Supplication</Text>
            </View>
            <Text style={[styles.supplicationTitle, { color: colors.text }]}>
              {selectedSubcategory?.name || 'No supplication selected'}
            </Text>
            <Text style={[styles.supplicationDescription, { color: colors.secondaryText }]}>
              {selectedSubcategory?.description}
            </Text>
          </View>

          {/* Time Selection */}
          <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="time" size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Reminder Time</Text>
            </View>
            
            <TouchableOpacity
              style={[styles.timeButton, { backgroundColor: colors.background, borderColor: colors.border }]}
              onPress={() => setShowTimePicker(true)}
            >
              <Ionicons name="clock-outline" size={20} color={colors.primary} />
              <Text style={[styles.timeText, { color: colors.text }]}>
                {formatTime(selectedTime)}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.secondaryText} />
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                is24Hour={false}
                onChange={(event, date) => {
                  setShowTimePicker(false);
                  if (date) setSelectedTime(date);
                }}
              />
            )}
          </View>

          {/* Frequency Selection */}
          <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="repeat" size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Frequency</Text>
            </View>
            
            <View style={styles.frequencyGrid}>
              {FREQUENCY_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.frequencyOption,
                    {
                      backgroundColor: frequency === option.value ? colors.primary + '20' : colors.background,
                      borderColor: frequency === option.value ? colors.primary : colors.border,
                    }
                  ]}
                  onPress={() => setFrequency(option.value)}
                >
                  <Ionicons 
                    name={option.icon as any} 
                    size={20} 
                    color={frequency === option.value ? colors.primary : colors.secondaryText} 
                  />
                  <Text style={[
                    styles.frequencyText,
                    { color: frequency === option.value ? colors.primary : colors.text }
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Weekly Days Selection */}
            {frequency === 'weekly' && (
              <View style={styles.daysSelection}>
                <Text style={[styles.subsectionTitle, { color: colors.text }]}>Select Days</Text>
                <View style={styles.daysGrid}>
                  {DAYS_OF_WEEK.map((day) => (
                    <TouchableOpacity
                      key={day.value}
                      style={[
                        styles.dayButton,
                        {
                          backgroundColor: selectedDays.includes(day.value) ? colors.primary : colors.background,
                          borderColor: colors.border,
                        }
                      ]}
                      onPress={() => toggleDay(day.value)}
                    >
                      <Text style={[
                        styles.dayText,
                        { color: selectedDays.includes(day.value) ? '#FFFFFF' : colors.text }
                      ]}>
                        {day.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Custom Interval */}
            {frequency === 'custom' && (
              <View style={styles.customInterval}>
                <Text style={[styles.subsectionTitle, { color: colors.text }]}>Repeat Every</Text>
                <View style={styles.intervalRow}>
                  <TextInput
                    style={[styles.intervalInput, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                    placeholder="7"
                    placeholderTextColor={colors.secondaryText}
                    value={customInterval}
                    onChangeText={setCustomInterval}
                    keyboardType="numeric"
                    maxLength={3}
                  />
                  <Text style={[styles.intervalLabel, { color: colors.text }]}>days</Text>
                </View>
              </View>
            )}
          </View>

          {/* Notification Settings */}
          <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="notifications" size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Notification Settings</Text>
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="volume-high" size={18} color={colors.primary} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>Sound</Text>
              </View>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: colors.border, true: colors.primary + '40' }}
                thumbColor={soundEnabled ? colors.primary : colors.secondaryText}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="phone-portrait" size={18} color={colors.primary} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>Vibration</Text>
              </View>
              <Switch
                value={vibrationEnabled}
                onValueChange={setVibrationEnabled}
                trackColor={{ false: colors.border, true: colors.primary + '40' }}
                thumbColor={vibrationEnabled ? colors.primary : colors.secondaryText}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.notificationStyleSection}>
              <Text style={[styles.subsectionTitle, { color: colors.text }]}>Notification Style</Text>
              {NOTIFICATION_STYLES.map((style) => (
                <TouchableOpacity
                  key={style.value}
                  style={[
                    styles.styleOption,
                    {
                      backgroundColor: notificationStyle === style.value ? colors.primary + '20' : colors.background,
                      borderColor: notificationStyle === style.value ? colors.primary : colors.border,
                    }
                  ]}
                  onPress={() => setNotificationStyle(style.value)}
                >
                  <View style={styles.styleOptionContent}>
                    <Text style={[
                      styles.styleLabel,
                      { color: notificationStyle === style.value ? colors.primary : colors.text }
                    ]}>
                      {style.label}
                    </Text>
                    <Text style={[
                      styles.styleDescription,
                      { color: colors.secondaryText }
                    ]}>
                      {style.description}
                    </Text>
                  </View>
                  {notificationStyle === style.value && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* End Date (Optional) */}
          {frequency !== 'once' && (
            <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.sectionHeader}>
                <Ionicons name="calendar" size={20} color={colors.primary} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>End Date (Optional)</Text>
              </View>
              
              <TouchableOpacity
                style={[styles.dateButton, { backgroundColor: colors.background, borderColor: colors.border }]}
                onPress={() => setShowEndDatePicker(true)}
              >
                <Ionicons name="calendar-outline" size={20} color={colors.primary} />
                <Text style={[styles.dateText, { color: colors.text }]}>
                  {endDate ? endDate.toLocaleDateString() : 'No end date'}
                </Text>
                <TouchableOpacity
                  onPress={() => setEndDate(null)}
                  style={styles.clearButton}
                >
                  <Ionicons name="close-circle" size={16} color={colors.secondaryText} />
                </TouchableOpacity>
              </TouchableOpacity>

              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate || new Date()}
                  mode="date"
                  minimumDate={new Date()}
                  onChange={(event, date) => {
                    setShowEndDatePicker(false);
                    if (date) setEndDate(date);
                  }}
                />
              )}
            </View>
          )}

          {/* Preview */}
          <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="eye" size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Reminder Preview</Text>
            </View>
            
            <View style={[styles.previewCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <View style={styles.previewHeader}>
                <Ionicons name="notifications" size={16} color={colors.primary} />
                <Text style={[styles.previewTime, { color: colors.secondaryText }]}>
                  {formatTime(selectedTime)}
                </Text>
              </View>
              <Text style={[styles.previewTitle, { color: colors.text }]}>
                {selectedSubcategory?.name || 'Supplication Reminder'}
              </Text>
              <Text style={[styles.previewBody, { color: colors.secondaryText }]}>
                {notificationStyle === 'full' 
                  ? selectedSubcategory?.description || 'Time for your supplication'
                  : notificationStyle === 'preview'
                  ? `Time for ${selectedSubcategory?.name || 'your supplication'}`
                  : 'Supplication reminder'
                }
              </Text>
              <Text style={[styles.previewFrequency, { color: colors.primary }]}>
                {getFrequencyDescription()}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function getFrequencyDescription(): string {
    switch (frequency) {
      case 'once':
        return 'One time only';
      case 'daily':
        return 'Every day';
      case 'weekly':
        if (selectedDays.length === 0) return 'Weekly (select days)';
        const dayNames = selectedDays.map(d => DAYS_OF_WEEK[d].label).join(', ');
        return `Every ${dayNames}`;
      case 'monthly':
        return 'Every month';
      case 'custom':
        const interval = parseInt(customInterval) || 1;
        return `Every ${interval} day${interval > 1 ? 's' : ''}`;
      default:
        return '';
    }
  }
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
  createButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  supplicationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  supplicationDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  timeText: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  frequencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  frequencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    minWidth: '45%',
  },
  frequencyText: {
    fontSize: 14,
    fontWeight: '500',
  },
  daysSelection: {
    marginTop: 16,
  },
  daysGrid: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
  },
  customInterval: {
    marginTop: 16,
  },
  intervalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  intervalInput: {
    width: 80,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  intervalLabel: {
    fontSize: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  notificationStyleSection: {
    marginTop: 16,
  },
  styleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  styleOptionContent: {
    flex: 1,
  },
  styleLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  styleDescription: {
    fontSize: 14,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  dateText: {
    fontSize: 16,
    flex: 1,
  },
  clearButton: {
    padding: 4,
  },
  previewCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  previewTime: {
    fontSize: 12,
    fontWeight: '500',
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  previewBody: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  previewFrequency: {
    fontSize: 12,
    fontWeight: '600',
  },
});