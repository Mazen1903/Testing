# Firebase to Clerk Migration Guide

This document explains the migration from Firebase Auth to Clerk in your React Native/Expo app.

## What Changed

### Removed
- Firebase SDK (`firebase` package)
- Firebase configuration files (`src/shared/config/firebase-init.ts`, `src/shared/config/firebase.ts`)
- OAuth-related packages (`expo-auth-session`, `expo-web-browser`, `expo-crypto`)
- Firebase-specific metro config settings

### Added
- Clerk SDK (`@clerk/clerk-expo`)
- New Clerk configuration (`src/shared/config/clerk.ts`)
- ClerkProvider in app layout
- Updated AuthContext using Clerk hooks

## Setup Instructions

### 1. Create a Clerk Account
1. Go to [https://clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application

### 2. Get Your Publishable Key
1. In your Clerk Dashboard, go to **API Keys**
2. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)

### 3. Configure Environment Variables
Create a `.env` file in your project root and add:

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
```

### 4. Update Clerk Configuration
Edit `src/shared/config/clerk.ts` and replace the placeholder with your actual publishable key:

```typescript
export const clerkConfig = {
  publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || 'your-actual-key-here',
};
```

### 5. Configure Authentication Options in Clerk Dashboard

#### Email/Password Authentication
1. In Clerk Dashboard, go to **User & Authentication** > **Email, Phone, Username**
2. Enable **Email address**
3. Enable **Password**

#### OAuth Providers (Optional)
1. Go to **User & Authentication** > **Social Connections**
2. Enable the providers you want:
   - **Google**: Enable and configure your Google OAuth app credentials
   - **Apple**: Enable Apple Sign-In (automatic configuration for most cases)
   - **Microsoft**: Enable and configure your Microsoft Azure app credentials
3. For each provider, follow Clerk's setup instructions for proper configuration

### 6. Test Your Setup
1. Run `npm start` or `expo start`
2. Try signing up with email/password
3. Try signing in with existing credentials
4. Test Google OAuth if enabled

## Features

### What Still Works
- ✅ Email/password authentication
- ✅ Google OAuth sign-in
- ✅ Apple Sign-In
- ✅ Microsoft OAuth sign-in
- ✅ User state management
- ✅ Automatic session handling
- ✅ Sign out functionality

### What's Improved
- ✅ Better error handling
- ✅ Automatic session management
- ✅ Built-in security features
- ✅ Real-time user updates
- ✅ Email verification (if enabled in Clerk)
- ✅ Multiple OAuth providers support
- ✅ Better developer experience
- ✅ Seamless provider switching

## Migration Benefits

1. **Reduced Complexity**: No need to manage Firebase SDK, OAuth flows, or session handling
2. **Better Security**: Clerk handles security best practices automatically
3. **Enhanced Features**: Built-in email verification, password reset, multi-factor auth, etc.
4. **Better Error Handling**: More descriptive error messages
5. **Real-time Updates**: User data updates automatically across your app

## Troubleshooting

### Common Issues

1. **App crashes on startup**
   - Make sure you've added the `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` environment variable
   - Check that ClerkProvider is properly configured in your app layout

2. **Authentication doesn't work**
   - Verify your publishable key is correct
   - Make sure email/password is enabled in Clerk Dashboard
   - Check Expo logs for specific error messages

3. **OAuth providers not working**
   - Ensure the provider (Google/Apple/Microsoft) is enabled in Clerk Dashboard
   - For Google: Configure OAuth redirect URIs in Google Console
   - For Apple: Ensure proper Apple Developer account setup
   - For Microsoft: Configure redirect URIs in Azure App Registration
   - Test on a physical device (OAuth might not work in simulator)

### Getting Help

1. Check [Clerk's Expo documentation](https://clerk.com/docs/quickstarts/expo)
2. Visit [Clerk's Discord community](https://discord.gg/clerk)
3. Check Expo logs for specific error messages

## Next Steps

Consider enabling additional Clerk features:
- Email verification
- Password reset
- Multi-factor authentication
- Additional social login providers (Facebook, GitHub, Discord, etc.)
- Phone number authentication
- User profile management
- Organization management
- Custom user fields
- Webhooks for user events

### OAuth Provider Setup Details

#### Google OAuth Setup
1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add your app's redirect URIs
5. Copy Client ID and Secret to Clerk Dashboard

#### Apple Sign-In Setup
1. Enable Sign In with Apple in your [Apple Developer Account](https://developer.apple.com/)
2. Configure your app's bundle identifier
3. Clerk handles most Apple Sign-In configuration automatically
4. Ensure your app has proper iOS capabilities

#### Microsoft OAuth Setup
1. Register your app in [Azure App Registration](https://portal.azure.com/)
2. Configure redirect URIs for your app
3. Generate client secret
4. Copy Application (client) ID and secret to Clerk Dashboard
5. Ensure proper Microsoft Graph permissions 