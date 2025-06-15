/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    primary: '#6B8AFE',  // Light blue
    secondary: '#8B5CF6', // Purple
    background: '#FFFFFF',
    text: '#1A1A1A',
    secondaryText: '#666666',
    border: '#E5E5E5',
    card: '#F8F9FA',
    success: '#34D399',
    error: '#EF4444',
    warning: '#F59E0B',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: '#818CF8',  // Lighter blue for dark mode
    secondary: '#A78BFA', // Lighter purple for dark mode
    background: '#1A1A1A',
    text: '#FFFFFF',
    secondaryText: '#A1A1AA',
    border: '#2D2D2D',
    card: '#262626',
    success: '#34D399',
    error: '#EF4444',
    warning: '#F59E0B',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export type ThemeColors = typeof Colors.light;
