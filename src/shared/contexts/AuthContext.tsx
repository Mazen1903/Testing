import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthContextType } from '@/shared/types';
import { AuthService } from '@/shared/services/auth.service';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from storage on app start
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AuthService.loadUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const response = await AuthService.signInWithEmail({ email, password });
      
      if (!response.success) {
        throw new Error(response.error);
      }
      
      if (response.data) {
        setUser(response.data);
      }
    } catch (error: any) {
      console.error('Email sign-in failed:', error);
      throw new Error(error.message || 'Sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      
      const response = await AuthService.signUpWithEmail({ email, password, name });
      
      if (!response.success) {
        throw new Error(response.error);
      }
      
      if (response.data) {
        setUser(response.data);
      }
    } catch (error: any) {
      console.error('Email sign-up failed:', error);
      throw new Error(error.message || 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await AuthService.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signInWithEmail,
    signUpWithEmail,
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