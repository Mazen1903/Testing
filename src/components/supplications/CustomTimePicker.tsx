import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';

interface CustomTimePickerProps {
  visible: boolean;
  onClose: () => void;
  selectedTime: { hour: number; minute: number };
  onTimeChange: (time: { hour: number; minute: number }) => void;
}

export function CustomTimePicker({ visible, onClose, selectedTime, onTimeChange }: CustomTimePickerProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const handleTimeChange = (hour?: number, minute?: number) => {
    onTimeChange({
      hour: hour !== undefined ? hour : selectedTime.hour,
      minute: minute !== undefined ? minute : selectedTime.minute,
    });
  };

  const handleDone = () => {
    onClose();
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
          <Text style={[styles.modalTitle, { color: colors.text }]}>Select Time</Text>
          <TouchableOpacity 
            style={[styles.doneButton, { backgroundColor: colors.primary }]}
            onPress={handleDone}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Selected Time Display */}
          <View style={[styles.timeDisplay, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.selectedTimeText, { color: colors.text }]}>
              {formatTime(selectedTime.hour, selectedTime.minute)}
            </Text>
          </View>

          {/* Time Pickers */}
          <View style={styles.pickersContainer}>
            {/* Hour Picker */}
            <View style={styles.pickerSection}>
              <Text style={[styles.pickerLabel, { color: colors.text }]}>Hour</Text>
              <ScrollView
                style={[styles.picker, { backgroundColor: colors.card, borderColor: colors.border }]}
                showsVerticalScrollIndicator={false}
                snapToInterval={40}
                decelerationRate="fast"
                contentContainerStyle={styles.pickerContent}
              >
                {hours.map((hour) => (
                  <TouchableOpacity
                    key={hour}
                    style={[
                      styles.pickerItem,
                      selectedTime.hour === hour && { backgroundColor: colors.primary + '20' }
                    ]}
                    onPress={() => handleTimeChange(hour, undefined)}
                  >
                    <Text
                      style={[
                        styles.pickerItemText,
                        { color: selectedTime.hour === hour ? colors.primary : colors.text }
                      ]}
                    >
                      {hour.toString().padStart(2, '0')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Minute Picker */}
            <View style={styles.pickerSection}>
              <Text style={[styles.pickerLabel, { color: colors.text }]}>Minute</Text>
              <ScrollView
                style={[styles.picker, { backgroundColor: colors.card, borderColor: colors.border }]}
                showsVerticalScrollIndicator={false}
                snapToInterval={40}
                decelerationRate="fast"
                contentContainerStyle={styles.pickerContent}
              >
                {minutes.map((minute) => (
                  <TouchableOpacity
                    key={minute}
                    style={[
                      styles.pickerItem,
                      selectedTime.minute === minute && { backgroundColor: colors.primary + '20' }
                    ]}
                    onPress={() => handleTimeChange(undefined, minute)}
                  >
                    <Text
                      style={[
                        styles.pickerItemText,
                        { color: selectedTime.minute === minute ? colors.primary : colors.text }
                      ]}
                    >
                      {minute.toString().padStart(2, '0')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
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
  doneButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  timeDisplay: {
    alignItems: 'center',
    paddingVertical: 24,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 32,
  },
  selectedTimeText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  pickersContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  pickerSection: {
    flex: 1,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  picker: {
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
  },
  pickerContent: {
    paddingVertical: 80,
  },
  pickerItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pickerItemText: {
    fontSize: 18,
    fontWeight: '500',
  },
});