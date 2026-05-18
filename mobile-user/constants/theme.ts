/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#2e2e2e';
const tintColorDark = '#fafafa';

export const Colors = {
  light: {
    background: '#ffffff',
    foreground: '#1e1e1e',
    card: '#ffffff',
    cardForeground: '#1e1e1e',
    popover: '#ffffff',
    popoverForeground: '#1e1e1e',
    primary: '#2e2e2e',
    primaryForeground: '#fafafa',
    secondary: '#f5f5f5',
    secondaryForeground: '#2e2e2e',
    muted: '#f5f5f5',
    mutedForeground: '#8e8e8e',
    accent: '#f5f5f5',
    accentForeground: '#2e2e2e',
    destructive: '#ef4444',
    border: '#e4e4e7',
    input: '#e4e4e7',
    ring: '#a1a1aa',
    // Theme defaults
    text: '#1e1e1e',
    tint: tintColorLight,
    icon: '#8e8e8e',
    tabIconDefault: '#8e8e8e',
    tabIconSelected: tintColorLight,
  },
  dark: {
    background: '#1e1e1e',
    foreground: '#fafafa',
    card: '#2e2e2e',
    cardForeground: '#fafafa',
    popover: '#2e2e2e',
    popoverForeground: '#fafafa',
    primary: '#fafafa',
    primaryForeground: '#2e2e2e',
    secondary: '#3f3f46',
    secondaryForeground: '#fafafa',
    muted: '#3f3f46',
    mutedForeground: '#a1a1aa',
    accent: '#3f3f46',
    accentForeground: '#fafafa',
    destructive: '#f87171',
    border: 'rgba(255, 255, 255, 0.1)',
    input: 'rgba(255, 255, 255, 0.15)',
    ring: '#a1a1aa',
    // Theme defaults
    text: '#fafafa',
    tint: tintColorDark,
    icon: '#a1a1aa',
    tabIconDefault: '#a1a1aa',
    tabIconSelected: tintColorDark,
  },
};


export const Fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
};

