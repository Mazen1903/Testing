import React, { createContext, useContext } from 'react';
import { useAuth as useClerkAuth, useUser, useSignIn, useSignUp, useOAuth } from '@clerk/clerk-expo';
import { User, AuthContextType } from '@/shared/types';
import { AuthService } from '@/shared/services/auth.service';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signInWithGoogle: async () => {},
  signInWithApple: async () => {},
  signInWithMicrosoft: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded, isSignedIn, signOut: clerkSignOut } = useClerkAuth();
  const { user: clerkUser } = useUser();
  const { signIn, setActive } = useSignIn();
  const { signUp, setActive: setActiveSignUp } = useSignUp();
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: startAppleOAuthFlow } = useOAuth({ strategy: 'oauth_apple' });
  const { startOAuthFlow: startMicrosoftOAuthFlow } = useOAuth({ strategy: 'oauth_microsoft' });

  // Convert Clerk user to our User type
  const user: User | null = clerkUser ? AuthService.mapClerkUserToUser(clerkUser) : null;
  
  // Loading state - true when Clerk is not loaded
  const isLoading = !isLoaded;

  // Remove the heavy Supabase sync operation from here
  // It will be handled lazily when needed

  const signInWithEmail = async (email: string, password: string) => {
    try {
      if (!signIn) throw new Error('Sign in not available');

      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
      } else {
        throw new Error('Sign in failed - please check your credentials');
      }
    } catch (error: any) {
      console.error('Email sign-in failed:', error);
      
      let errorMessage = 'Sign in failed';
      if (error?.errors?.[0]?.code === 'form_identifier_not_found') {
        errorMessage = 'No account found with this email';
      } else if (error?.errors?.[0]?.code === 'form_password_incorrect') {
        errorMessage = 'Invalid email or password';
      }
      
      throw new Error(errorMessage);
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    try {
      if (!signUp) throw new Error('Sign up not available');

      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      if (result.status === 'complete') {
        await setActiveSignUp({ session: result.createdSessionId });
      } else if (result.status === 'missing_requirements') {
        if (result.unverifiedFields.includes('email_address')) {
          await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
          throw new Error('Please check your email and verify your account');
        }
      } else {
        throw new Error('Sign up failed - please try again');
      }
    } catch (error: any) {
      console.error('Email sign-up failed:', error);
      
      let errorMessage = error.message || 'Sign up failed';
      if (error?.errors?.[0]?.code === 'form_identifier_exists') {
        errorMessage = 'An account with this email already exists';
      }
      
      throw new Error(errorMessage);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleOAuthFlow();
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
      } else {
        throw new Error('Google sign in failed');
      }
    } catch (error: any) {
      console.error('Google sign-in failed:', error);
      throw new Error('Google sign in failed');
    }
  };

  const signInWithApple = async () => {
    try {
      const { createdSessionId, setActive } = await startAppleOAuthFlow();
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
      } else {
        throw new Error('Apple sign in failed');
      }
    } catch (error: any) {
      console.error('Apple sign-in failed:', error);
      throw new Error('Apple sign in failed');
    }
  };

  const signInWithMicrosoft = async () => {
    try {
      const { createdSessionId, setActive } = await startMicrosoftOAuthFlow();
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
      } else {
        throw new Error('Microsoft sign in failed');
      }
    } catch (error: any) {
      console.error('Microsoft sign-in failed:', error);
      throw new Error('Microsoft sign in failed');
    }
  };

  const signOut = async () => {
    try {
      await clerkSignOut();
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithApple,
    signInWithMicrosoft,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};