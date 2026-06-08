/**
 * Reusable Avatar Component
 * Displays user profile image or name initials with custom size options.
 */
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  imageUrl?: string;
  name?: string;
  size?: AvatarSize;
  style?: ViewStyle;
}

export function Avatar({
  imageUrl,
  name,
  size = 'md',
  style,
}: AvatarProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const getSizeValue = (): number => {
    switch (size) {
      case 'sm': return 32;
      case 'md': return 44;
      case 'lg': return 64;
      case 'xl': return 96;
      default: return 44;
    }
  };

  const getFontSize = (): number => {
    switch (size) {
      case 'sm': return 12;
      case 'md': return 16;
      case 'lg': return 24;
      case 'xl': return 36;
      default: return 16;
    }
  };

  const sizeValue = getSizeValue();

  // Generate initials from name
  const getInitials = (): string => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: sizeValue,
          height: sizeValue,
          borderRadius: sizeValue / 2,
          backgroundColor: colors.secondary,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={[
            styles.image,
            {
              width: sizeValue,
              height: sizeValue,
              borderRadius: sizeValue / 2,
            },
          ]}
          contentFit="cover"
          transition={200}
        />
      ) : (
        <Text
          style={[
            styles.initials,
            {
              color: colors.mutedForeground,
              fontSize: getFontSize(),
              fontFamily: Fonts.bold,
            },
          ]}
        >
          {getInitials()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    textAlign: 'center',
  },
});
