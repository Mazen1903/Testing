import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SettingsGearProps {
  onPress: () => void;
  manuscriptColors: any;
}

export default function SettingsGear({ onPress, manuscriptColors }: SettingsGearProps) {
  return (
    <TouchableOpacity
      style={[styles.settingsButton, {
        backgroundColor: manuscriptColors.parchment,
        borderColor: manuscriptColors.border
      }]}
      onPress={onPress}
    >
      <Ionicons name="settings" size={20} color={manuscriptColors.brown} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
});