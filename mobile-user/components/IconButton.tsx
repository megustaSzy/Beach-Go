import React, { useRef } from 'react';
import { StyleSheet, Pressable, Animated, ViewStyle, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type IconButtonVariant = 'default' | 'filled' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

interface IconButtonProps {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  color?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function IconButton({
  iconName,
  onPress,
  variant = 'default',
  size = 'md',
  color,
  disabled = false,
  style,
}: IconButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const getSizeValue = (): { container: number; icon: number } => {
    switch (size) {
      case 'sm': return { container: 32, icon: 16 };
      case 'lg': return { container: 48, icon: 24 };
      case 'md':
      default: return { container: 40, icon: 20 };
    }
  };

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: colors.primary,
          borderWidth: 0,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
      case 'default':
      default:
        return {
          backgroundColor: colors.secondary,
          borderWidth: 1,
          borderColor: colors.border,
        };
    }
  };

  const getIconColor = (): string => {
    if (color) return color;
    if (disabled) return colors.mutedForeground;
    switch (variant) {
      case 'filled': return colors.primaryForeground;
      default: return colors.foreground;
    }
  };

  const sizeValues = getSizeValue();

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.container,
          getVariantStyles(),
          {
            width: sizeValues.container,
            height: sizeValues.container,
            borderRadius: sizeValues.container / 2,
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
      >
        <Ionicons name={iconName} size={sizeValues.icon} color={getIconColor()} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
});
