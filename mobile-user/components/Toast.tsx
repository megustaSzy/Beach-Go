import React, { useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Animated, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  visible: boolean;
  type?: ToastType;
  message: string;
  duration?: number;
  onDismiss?: () => void;
  onHide?: () => void;
}

const { width } = Dimensions.get('window');

export function Toast({
  visible,
  type = 'info',
  message,
  duration = 3000,
  onDismiss,
  onHide,
}: ToastProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const handleDismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onDismiss) onDismiss();
      if (onHide) onHide();
    });
  }, [translateY, opacity, onDismiss, onHide]);

  useEffect(() => {
    if (visible) {
      // Slide in
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          speed: 14,
          bounciness: 6,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto dismiss
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, handleDismiss, translateY, opacity]);

  const getTypeConfig = (): { icon: keyof typeof Ionicons.glyphMap; color: string; bg: string } => {
    switch (type) {
      case 'success':
        return {
          icon: 'checkmark-circle',
          color: '#22c55e',
          bg: colorScheme === 'dark' ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.1)',
        };
      case 'error':
        return {
          icon: 'close-circle',
          color: colors.destructive,
          bg: colorScheme === 'dark' ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.1)',
        };
      case 'warning':
        return {
          icon: 'warning',
          color: '#eab308',
          bg: colorScheme === 'dark' ? 'rgba(234,179,8,0.15)' : 'rgba(234,179,8,0.1)',
        };
      case 'info':
      default:
        return {
          icon: 'information-circle',
          color: '#3b82f6',
          bg: colorScheme === 'dark' ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)',
        };
    }
  };

  if (!visible) return null;

  const config = getTypeConfig();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <View
        style={[
          styles.toast,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderLeftColor: config.color,
          },
        ]}
      >
        <View style={[styles.iconContainer, { backgroundColor: config.bg }]}>
          <Ionicons name={config.icon} size={20} color={config.color} />
        </View>

        <Text
          numberOfLines={2}
          style={[
            styles.message,
            {
              color: colors.foreground,
              fontFamily: Fonts.medium,
            },
          ]}
        >
          {message}
        </Text>

        <Pressable
          onPress={handleDismiss}
          style={({ pressed }) => [
            styles.closeButton,
            pressed && { opacity: 0.6 },
          ]}
        >
          <Ionicons name="close" size={18} color={colors.mutedForeground} />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    zIndex: 9999,
    alignItems: 'center',
  },
  toast: {
    width: width - 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  message: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
});
