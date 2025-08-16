import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useAuth as useClerkAuth } from '@clerk/clerk-expo';

export default function IndexScreen() {
  const { isLoaded: isClerkLoaded, isSignedIn } = useClerkAuth();
  const router = useRouter();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (isClerkLoaded && !hasNavigated) {
      setHasNavigated(true);
      
      // Simple navigation without delays
      if (isSignedIn) {
        router.replace('/(tabs)');
      } else {
        router.replace('/auth/sign-in');
      }
    }
  }, [isClerkLoaded, isSignedIn, router, hasNavigated]);

  // Show loading screen while Clerk loads
  if (!isClerkLoaded || !hasNavigated) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#F5F1E8'
      }}>
        <ActivityIndicator size="large" color="#8B4513" />
        <Text style={{
          marginTop: 16,
          color: '#2F1B14',
          fontSize: 16,
        }}>
          Loading...
        </Text>
      </View>
    );
  }

  return null;
}