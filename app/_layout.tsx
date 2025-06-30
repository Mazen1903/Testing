import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '@/shared/contexts/ThemeContext';
import { AuthProvider } from '@/shared/contexts/AuthContext';
import { useTheme } from '@/shared/contexts/ThemeContext';

// Initialize Firebase early
import '@/shared/config/firebase-init';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

    return (
    <ThemeProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { theme, isDark } = useTheme();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF' }
          }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth/sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="auth/sign-up" options={{ headerShown: false }} />
            <Stack.Screen name="reading/[id]" options={{ presentation: 'modal' }} />
            <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
            <Stack.Screen name="app-settings" options={{ presentation: 'modal' }} />
          </Stack>
          <StatusBar style={isDark ? 'light' : 'dark'} />
        </NavigationThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
