import React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface DividerProps {
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  spacing?: number;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export function Divider({
  label,
  orientation = 'horizontal',
  spacing = 16,
  style,
  labelStyle,
}: DividerProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  if (orientation === 'vertical') {
    return (
      <View
        style={[
          styles.vertical,
          {
            backgroundColor: colors.border,
            marginHorizontal: spacing,
          },
          style,
        ]}
      />
    );
  }

  // Horizontal with optional label
  if (label) {
    return (
      <View style={[styles.labelContainer, { marginVertical: spacing }, style]}>
        <View style={[styles.line, { backgroundColor: colors.border }]} />
        <Text
          style={[
            styles.label,
            {
              color: colors.mutedForeground,
              fontFamily: Fonts.medium,
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
        <View style={[styles.line, { backgroundColor: colors.border }]} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.horizontal,
        {
          backgroundColor: colors.border,
          marginVertical: spacing,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    width: '100%',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
  },
  label: {
    fontSize: 12,
    paddingHorizontal: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
