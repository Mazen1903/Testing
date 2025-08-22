import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { View, ActivityIndicator, Image } from 'react-native';
import { useEffect } from 'react';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { useAuth } from '@/shared/contexts/AuthContext';

type TabIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

// Simplified icon component to reduce load time
function TabIcon({ name, color, size, focused }: TabIconProps & { name: keyof typeof Ionicons.glyphMap | string }) {
  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: focused ? color + '20' : 'transparent',
    }}>
      {typeof name === 'string' && name.startsWith('custom-') ? (
        <Image 
          source={getCustomIcon(name)} 
          style={{ width: size, height: size, tintColor: color }}
        />
      ) : (
        <Ionicons 
          name={name as keyof typeof Ionicons.glyphMap} 
          size={size} 
          color={color}
        />
      )}
    </View>
  );
}

// Helper function to get custom icon sources
function getCustomIcon(iconName: string) {
  switch (iconName) {
    case 'custom-home':
      return require('../../assets/images/home.png');
    case 'custom-library':
      return require('../../assets/images/libarary.png');
    case 'custom-dua':
      return require('../../assets/images/dua.png');
    case 'custom-community':
      return require('../../assets/images/community.png');
    case 'custom-settings':
      return require('../../assets/images/settings.png');
    default:
      return require('../../assets/images/home.png');
  }
}

export default function TabLayout() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/auth/sign-in');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
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

  if (!user) {
    return null;
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
          tabBarIcon: (props) => (
            <TabIcon name="custom-home" {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: (props) => (
            <TabIcon name="custom-library" {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="supplications"
        options={{
          title: 'Duas',
          tabBarIcon: (props) => (
            <TabIcon name="custom-dua" {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: (props) => (
            <TabIcon name="custom-community" {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: (props) => (
            <TabIcon name="custom-settings" {...props} />
          ),
        }}
      />
    </Tabs>
  );
}