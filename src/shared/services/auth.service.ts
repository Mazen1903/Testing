import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithCredential,
  User as FirebaseUser
} from 'firebase/auth';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { auth } from '@/shared/config/firebase-init';
import { googleSignInConfig } from '@/shared/config/firebase';
import { User, SignInCredentials, SignUpCredentials, ApiResponse } from '@/shared/types';

// Complete auth session on web
WebBrowser.maybeCompleteAuthSession();

// Helper function to convert Firebase user to our User type
const mapFirebaseUserToUser = (firebaseUser: FirebaseUser): User => {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || 'User',
    avatar: firebaseUser.photoURL || undefined,
  };
};

export class AuthService {
  static async loadUser(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        unsubscribe(); // Clean up listener
        if (firebaseUser) {
          resolve(mapFirebaseUserToUser(firebaseUser));
        } else {
          resolve(null);
        }
      });
    });
  }

  static async signInWithEmail(credentials: SignInCredentials): Promise<ApiResponse<User>> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        credentials.email, 
        credentials.password
      );
      
      const userData = mapFirebaseUserToUser(userCredential.user);
      
      return {
        success: true,
        data: userData,
      };
    } catch (error: any) {
      console.error('Email sign-in failed:', error);
      
      let errorMessage = 'Sign in failed';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      }
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  static async signUpWithEmail(credentials: SignUpCredentials): Promise<ApiResponse<User>> {
    try {
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
      
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        credentials.email, 
        credentials.password
      );
      
      // Update the user's display name
      await updateProfile(userCredential.user, {
        displayName: credentials.name,
      });
      
      const userData = mapFirebaseUserToUser(userCredential.user);
      
      return {
        success: true,
        data: userData,
      };
    } catch (error: any) {
      console.error('Email sign-up failed:', error);
      
      let errorMessage = 'Sign up failed';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      }
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  static async signInWithGoogle(): Promise<ApiResponse<User>> {
    try {
      // Create redirect URL for OAuth flow
      const redirectUrl = AuthSession.makeRedirectUri();

      // Build the OAuth URL
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${googleSignInConfig.webClientId}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&response_type=id_token` +
        `&scope=${encodeURIComponent('openid profile email')}` +
        `&nonce=${Math.random().toString(36).substring(2, 15)}`;

      // Open the authentication session
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);

      if (result.type === 'success' && result.url) {
        // Parse the URL to extract the id_token
        const url = new URL(result.url);
        const fragment = url.hash.substring(1);
        const params = new URLSearchParams(fragment);
        const idToken = params.get('id_token');

        if (idToken) {
          // Create a Google credential with the ID token
          const googleCredential = GoogleAuthProvider.credential(idToken);
          
          // Sign-in the user with the credential
          const userCredential = await signInWithCredential(auth, googleCredential);
          
          const userData = mapFirebaseUserToUser(userCredential.user);
          
          return {
            success: true,
            data: userData,
          };
        }
      }

      return {
        success: false,
        error: 'Google sign in was cancelled or failed',
      };
    } catch (error: any) {
      console.error('Google sign-in failed:', error);
      
      let errorMessage = 'Google sign in failed';
      if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with this email using a different sign-in method';
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign in was cancelled';
      }
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  static async signOut(): Promise<void> {
    try {
      // Sign out from Firebase (this handles all authentication methods)
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  }
} 