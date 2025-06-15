import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

export default function IndexScreen() {
  const { user, isLoading } = useAuth();
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const router = useRouter();
  const [isCheckingFirstTime, setIsCheckingFirstTime] = useState(true);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        
        if (!isLoading) {
          if (!hasSeenOnboarding) {
            // First time user - show onboarding
            router.replace('/onboarding');
          } else if (user) {
            // Returning user with account - go to main app
            router.replace('/(tabs)');
          } else {
            // Returning user without account - go to sign in
            router.replace('/auth/sign-in');
          }
        }
      } catch (error) {
        console.log('Error checking first time user:', error);
        // Fallback to normal flow
        if (!isLoading) {
          if (user) {
            router.replace('/(tabs)');
          } else {
            router.replace('/auth/sign-in');
          }
        }
      } finally {
        setIsCheckingFirstTime(false);
      }
    };

    checkFirstTimeUser();
  }, [user, isLoading, router]);

  if (isLoading || isCheckingFirstTime) {
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

  return null;
} 