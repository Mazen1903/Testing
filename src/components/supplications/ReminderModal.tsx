import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { CustomTimePicker } from './CustomTimePicker';

interface ReminderModalProps {
  visible: boolean;
  onClose: () => void;
  supplication: any;
  onReminderSet: () => void;
}

export function ReminderModal({ visible, onClose, supplication, onReminderSet }: ReminderModalProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

  const [reminderTitle, setReminderTitle] = useState('');
  const [selectedTime, setSelectedTime] = useState({ hour: 9, minute: 0 });
  const [selectedDays, setSelectedDays] = useState<boolean[]>([true, true, true, true, true, true, true]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  React.useEffect(() => {
    if (supplication) {
      setReminderTitle(`${supplication.title} Reminder`);
    }
  }, [supplication]);

  const toggleDay = (index: number) => {
    const newDays = [...selectedDays];
    newDays[index] = !newDays[index];
    setSelectedDays(newDays);
  };

  const selectAllDays = () => {
    setSelectedDays([true, true, true, true, true, true, true]);
  };

  const selectWeekdays = () => {
    setSelectedDays([false, true, true, true, true, true, false]);
  };

  const selectWeekends = () => {
    setSelectedDays([true, false, false, false, false, false, true]);
  };

  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const getScheduleText = () => {
    const activeDays = selectedDays.filter(Boolean).length;
    
    if (activeDays === 7) {
      return 'Daily';
    } else if (activeDays === 5 && selectedDays.slice(1, 6).every(Boolean) && !selectedDays[0] && !selectedDays[6]) {
      return 'Weekdays';
    } else if (activeDays === 2 && selectedDays[0] && selectedDays[6]) {
      return 'Weekends';
    } else {
      const activeDayNames = dayNames.filter((_, index) => selectedDays[index]);
      return activeDayNames.join(', ');
    }
  };

  const handleCreateReminder = async () => {
    if (!reminderTitle.trim()) {
      Alert.alert('Error', 'Please enter a reminder title');
      return;
    }

    const activeDays = selectedDays.map((isActive, index) => isActive ? index : -1).filter(day => day !== -1);
    
    if (activeDays.length === 0) {
      Alert.alert('Error', 'Please select at least one day');
      return;
    }

    try {
      setIsCreating(true);

      // Create notifications for each selected day
      for (const dayIndex of activeDays) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: reminderTitle,
            body: `Time for your ${supplication?.title || 'supplication'}`,
            data: {
              type: 'supplication_reminder',
              supplicationId: supplication?.id,
              categoryId: supplication?.category,
            },
          },
          trigger: {
            type: 'calendar',
            weekday: dayIndex + 1, // Expo uses 1-7 for Sunday-Saturday
            hour: selectedTime.hour,
            minute: selectedTime.minute,
            repeats: true,
          },
        });
      }

      Alert.alert('Success', 'Custom reminder set successfully!');
      onReminderSet();
      onClose();
      
      // Reset form
      setReminderTitle('');
      setSelectedTime({ hour: 9, minute: 0 });
      setSelectedDays([true, true, true, true, true, true, true]);
    } catch (error) {
      console.error('Error creating reminder:', error);
      Alert.alert('Error', 'Failed to create reminder');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
        <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: colors.text }]}>Set Custom Reminder</Text>
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleCreateReminder}
            disabled={isCreating}
          >
            <Text style={styles.saveButtonText}>
              {isCreating ? 'Creating...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {/* Reminder Title */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>Reminder Title</Text>
            <TextInput
              style={[styles.titleInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              placeholder="Enter reminder title..."
              placeholderTextColor={colors.secondaryText}
              value={reminderTitle}
              onChangeText={setReminderTitle}
            />
          </View>

          {/* Custom Time Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>Time</Text>
            <TouchableOpacity
              style={[styles.timeButton, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={[styles.timeButtonText, { color: colors.text }]}>
                {formatTime(selectedTime.hour, selectedTime.minute)}
              </Text>
              <Ionicons name="time-outline" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Day Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>Days</Text>
            
            {/* Quick Selection Buttons */}
            <View style={styles.quickSelectContainer}>
              <TouchableOpacity
                style={[styles.quickSelectButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={selectAllDays}
              >
                <Text style={[styles.quickSelectText, { color: colors.primary }]}>Every Day</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.quickSelectButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={selectWeekdays}
              >
                <Text style={[styles.quickSelectText, { color: colors.primary }]}>Weekdays</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.quickSelectButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={selectWeekends}
              >
                <Text style={[styles.quickSelectText, { color: colors.primary }]}>Weekends</Text>
              </TouchableOpacity>
            </View>

            {/* Individual Day Toggles */}
            <View style={styles.daysContainer}>
              {dayNames.map((day, index) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    {
                      backgroundColor: selectedDays[index] ? colors.primary : colors.card,
                      borderColor: colors.border,
                    }
                  ]}
                  onPress={() => toggleDay(index)}
                >
                  <Text
                    style={[
                      styles.dayButtonText,
                      { color: selectedDays[index] ? '#FFFFFF' : colors.text }
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Preview */}
          <View style={[styles.previewContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.previewLabel, { color: colors.secondaryText }]}>Preview</Text>
            <View style={styles.previewNotification}>
              <Ionicons name="notifications" size={20} color={colors.primary} />
              <View style={styles.previewContent}>
                <Text style={[styles.previewTitle, { color: colors.text }]}>
                  {reminderTitle || 'Reminder Title'}
                </Text>
                <Text style={[styles.previewBody, { color: colors.secondaryText }]}>
                  Time for your {supplication?.title || 'supplication'}
                </Text>
                <Text style={[styles.previewSchedule, { color: colors.primary }]}>
                  {getScheduleText()} at {formatTime(selectedTime.hour, selectedTime.minute)}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Custom Time Picker Modal */}
        <CustomTimePicker
          visible={showTimePicker}
          onClose={() => setShowTimePicker(false)}
          selectedTime={selectedTime}
          onTimeChange={setSelectedTime}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  modalContent: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  titleInput: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  timeButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  quickSelectContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  quickSelectButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  quickSelectText: {
    fontSize: 12,
    fontWeight: '600',
  },
  daysContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dayButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  dayButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  previewContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  previewLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  previewNotification: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  previewContent: {
    flex: 1,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  previewBody: {
    fontSize: 14,
    marginBottom: 8,
  },
  previewSchedule: {
    fontSize: 12,
    fontWeight: '600',
  },
});