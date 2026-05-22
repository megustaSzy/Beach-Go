import React, { useRef } from 'react';
import { StyleSheet, Text, Pressable, Animated, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export function Chip({
  label,
  selected = false,
  onPress,
  onRemove,
  iconName,
  style,
  labelStyle,
}: ChipProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.container,
          {
            backgroundColor: selected ? colors.primary : colors.secondary,
            borderColor: selected ? colors.primary : colors.border,
          },
          style,
        ]}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={14}
            color={selected ? colors.primaryForeground : colors.mutedForeground}
            style={styles.icon}
          />
        )}

        <Text
          style={[
            styles.label,
            {
              color: selected ? colors.primaryForeground : colors.foreground,
              fontFamily: Fonts.medium,
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>

        {onRemove && (
          <Pressable onPress={onRemove} style={styles.removeBtn}>
            <Ionicons
              name="close-circle"
              size={16}
              color={selected ? colors.primaryForeground : colors.mutedForeground}
            />
          </Pressable>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 13,
  },
  removeBtn: {
    marginLeft: 6,
  },
});
