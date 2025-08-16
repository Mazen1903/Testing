import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ClerkProvider } from '@clerk/clerk-expo';
import { View, ActivityIndicator } from 'react-native';

import { ThemeProvider } from '@/shared/contexts/ThemeContext';
import { AuthProvider } from '@/shared/contexts/AuthContext';
import { clerkConfig } from '@/shared/config/clerk';
import { Colors } from '@/shared/constants/Colors';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simple initialization without blocking operations
    const initializeApp = async () => {
      try {
        // Small delay to ensure everything is loaded
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsReady(true);
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error('Error initializing app:', error);
        setIsReady(true); // Still show the app even if there's an error
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#8B4513" />
      </View>
    );
  }

  return (
    <NavigationThemeProvider value={DefaultTheme}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthProvider>
            <Stack 
              screenOptions={{ 
                headerShown: false,
                animation: 'fade'
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="auth/sign-in" />
              <Stack.Screen name="auth/sign-up" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="settings" />
              <Stack.Screen name="app-settings" />
              <Stack.Screen name="reading/[id]" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </AuthProvider>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  useFrameworkReady();
  return (
    <ClerkProvider 
      publishableKey={clerkConfig.publishableKey}
      tokenCache={clerkConfig.tokenCache}
    >
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </ClerkProvider>
  );
}
