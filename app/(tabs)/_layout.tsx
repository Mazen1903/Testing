import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { useAuth } from '@/shared/contexts/AuthContext';

type TabIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

export default function TabLayout() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const { user, isLoading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simple initialization
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !isReady) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: colors.background 
      }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 25,
          right: 25,
          backgroundColor: colors.card,
          borderRadius: 30,
          height: 64,
          paddingBottom: 0,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          borderWidth: 1,
          borderColor: colors.border,
          marginHorizontal: 10,
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 0,
          marginBottom: 8,
          fontWeight: '600',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: focused ? color + '20' : 'transparent',
            }}>
              <Ionicons name="home" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: focused ? color + '20' : 'transparent',
            }}>
              <Ionicons name="library" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="supplications"
        options={{
          title: 'Duas',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: focused ? color + '20' : 'transparent',
            }}>
              <Ionicons name="moon" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: focused ? color + '20' : 'transparent',
            }}>
              <Ionicons name="people" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: focused ? color + '20' : 'transparent',
            }}>
              <Ionicons name="person" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}