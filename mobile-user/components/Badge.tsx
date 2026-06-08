/**
 * Reusable Badge Component
 * Displays small status indicators or counts with multiple styling variants.
 */
import React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'destructive' | 'outline';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({
  text,
  variant = 'default',
  size = 'sm',
  style,
  textStyle,
}: BadgeProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const getVariantStyles = (): { bg: string; text: string; border?: string } => {
    switch (variant) {
      case 'success':
        return {
          bg: colorScheme === 'dark' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.1)',
          text: '#22c55e',
        };
      case 'warning':
        return {
          bg: colorScheme === 'dark' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(234, 179, 8, 0.1)',
          text: '#eab308',
        };
      case 'destructive':
        return {
          bg: colorScheme === 'dark' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
          text: colors.destructive,
        };
      case 'outline':
        return {
          bg: 'transparent',
          text: colors.foreground,
          border: colors.border,
        };
      case 'default':
      default:
        return {
          bg: colors.secondary,
          text: colors.secondaryForeground,
        };
    }
  };

  const variantStyles = getVariantStyles();

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: 2, paddingHorizontal: 8, fontSize: 10 };
      case 'md':
        return { paddingVertical: 4, paddingHorizontal: 10, fontSize: 12 };
      default:
        return { paddingVertical: 2, paddingHorizontal: 8, fontSize: 10 };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: variantStyles.bg,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          borderWidth: variantStyles.border ? 1 : 0,
          borderColor: variantStyles.border || 'transparent',
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: variantStyles.text,
            fontSize: sizeStyles.fontSize,
            fontFamily: Fonts.semiBold,
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  text: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
