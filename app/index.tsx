import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useAuth as useClerkAuth } from '@clerk/clerk-expo';

import { Colors } from '@/shared/constants/Colors';
import { useTheme } from '@/shared/contexts/ThemeContext';

export default function IndexScreen() {
  const { isLoaded: isClerkLoaded, isSignedIn } = useClerkAuth();
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const router = useRouter();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    // Simple, fast navigation logic
    const navigate = () => {
      if (isClerkLoaded && !hasNavigated) {
        setHasNavigated(true);
        
        if (isSignedIn) {
          router.replace('/(tabs)');
        } else {
          router.replace('/auth/sign-in');
        }
      }
    };

    // Use a small delay to ensure smooth transition
    const timer = setTimeout(navigate, 100);
    return () => clearTimeout(timer);
  }, [isClerkLoaded, isSignedIn, router, hasNavigated]);

  // Show minimal loading screen
  if (!isClerkLoaded || !hasNavigated) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: colors.background
      }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{
          marginTop: 16,
          color: colors.text,
          fontSize: 16,
        }}>
          Starting app...
        </Text>
      </View>
    );
  }

  return null;
}