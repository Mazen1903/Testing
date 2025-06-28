import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, SignInCredentials, SignUpCredentials, MockUser, ApiResponse } from '@/shared/types';

// Mock data - move this to a separate file later
const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'password123',
    name: 'Demo User',
    avatar: 'https://via.placeholder.com/100',
  },
  {
    id: '2',
    email: 'test@example.com',
    password: 'test123',
    name: 'Test User',
  },
];

const STORAGE_KEYS = {
  USER: 'user',
} as const;

export class AuthService {
  private static async simulateApiDelay(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  static async loadUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to load user:', error);
      return null;
    }
  }

  private static async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user:', error);
      throw new Error('Failed to save user data');
    }
  }

  static async signInWithEmail(credentials: SignInCredentials): Promise<ApiResponse<User>> {
    try {
      await this.simulateApiDelay();
      
      const mockUser = MOCK_USERS.find(
        u => u.email === credentials.email && u.password === credentials.password
      );
      
      if (!mockUser) {
        return {
          success: false,
          error: 'Invalid email or password',
        };
      }
      
      const userData: User = {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        avatar: mockUser.avatar,
      };
      
      await this.saveUser(userData);
      
      return {
        success: true,
        data: userData,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Sign in failed',
      };
    }
  }

  static async signUpWithEmail(credentials: SignUpCredentials): Promise<ApiResponse<User>> {
    try {
      await this.simulateApiDelay();
      
      // Validation
      if (!credentials.email || !credentials.password || !credentials.name) {
        return {
          success: false,
          error: 'All fields are required',
        };
      }
      
      if (credentials.password.length < 6) {
        return {
          success: false,
          error: 'Password must be at least 6 characters',
        };
      }
      
      // Check if user exists
      const existingUser = MOCK_USERS.find(u => u.email === credentials.email);
      if (existingUser) {
        return {
          success: false,
          error: 'User with this email already exists',
        };
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.name,
      };
      
      await this.saveUser(newUser);
      
      return {
        success: true,
        data: newUser,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Sign up failed',
      };
    }
  }

  static async signOut(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  }
} 