/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0ea5e9';
const tintColorDark = '#38bdf8';

export const Colors = {
  light: {
    background: '#f8fafc',
    foreground: '#0f172a',
    card: '#ffffff',
    cardForeground: '#0f172a',
    popover: '#ffffff',
    popoverForeground: '#0f172a',
    primary: '#0ea5e9',
    primaryForeground: '#ffffff',
    secondary: '#f0f9ff',
    secondaryForeground: '#0369a1',
    muted: '#f1f5f9',
    mutedForeground: '#64748b',
    accent: '#f0f9ff',
    accentForeground: '#0369a1',
    destructive: '#ef4444',
    border: '#e2e8f0',
    input: '#e2e8f0',
    ring: '#0ea5e9',
    // Theme defaults
    text: '#0f172a',
    tint: tintColorLight,
    icon: '#64748b',
    tabIconDefault: '#94a3b8',
    tabIconSelected: tintColorLight,
  },
  dark: {
    background: '#0c1929',
    foreground: '#f1f5f9',
    card: '#162032',
    cardForeground: '#f1f5f9',
    popover: '#162032',
    popoverForeground: '#f1f5f9',
    primary: '#38bdf8',
    primaryForeground: '#0c1929',
    secondary: '#1e3a5f',
    secondaryForeground: '#7dd3fc',
    muted: '#1e2d42',
    mutedForeground: '#94a3b8',
    accent: '#1e3a5f',
    accentForeground: '#7dd3fc',
    destructive: '#f87171',
    border: 'rgba(148, 163, 184, 0.12)',
    input: 'rgba(148, 163, 184, 0.15)',
    ring: '#38bdf8',
    // Theme defaults
    text: '#f1f5f9',
    tint: tintColorDark,
    icon: '#94a3b8',
    tabIconDefault: '#64748b',
    tabIconSelected: tintColorDark,
  },
};


export const Fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
};

