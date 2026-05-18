import React, { useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  Pressable, 
  ActivityIndicator, 
  Animated, 
  ViewStyle, 
  TextStyle, 
  Platform 
} from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  onPress?: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  // Premium Spring Animation ref
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled || loading) return;
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled || loading) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  // Variant Background & Border styles
  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: colors.secondary,
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
      case 'primary':
      default:
        return {
          backgroundColor: colors.primary,
          borderWidth: 0,
        };
    }
  };

  // Variant Text Colors
  const getTextColor = (): string => {
    if (disabled) return colors.mutedForeground;
    switch (variant) {
      case 'secondary':
        return colors.secondaryForeground;
      case 'outline':
      case 'ghost':
        return colors.foreground;
      case 'primary':
      default:
        return colors.primaryForeground;
    }
  };

  // Size styling
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 6,
        };
      case 'lg':
        return {
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 8,
        };
      case 'md':
      default:
        return {
          paddingVertical: 11,
          paddingHorizontal: 18,
          borderRadius: 8,
        };
    }
  };

  const getFontSize = (): number => {
    switch (size) {
      case 'sm':
        return 13;
      case 'lg':
        return 16;
      case 'md':
      default:
        return 14;
    }
  };

  return (
    <Animated.View
      style={[
        { transform: [{ scale: scaleAnim }] },
        fullWidth && styles.fullWidth,
      ]}
    >
      <Pressable
        onPress={disabled || loading ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.base,
          getSizeStyles(),
          getVariantStyles(),
          disabled && { opacity: 0.5 },
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator 
            size="small" 
            color={getTextColor()} 
            style={styles.spinner} 
          />
        ) : (
          <Text
            style={[
              styles.text,
              { 
                color: getTextColor(), 
                fontSize: getFontSize(),
                fontFamily: Fonts.medium,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        userSelect: 'none',
      },
    }),
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
  spinner: {
    alignSelf: 'center',
  },
});
