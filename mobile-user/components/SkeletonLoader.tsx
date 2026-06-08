import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, ViewStyle } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function SkeletonLoader({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
}: SkeletonLoaderProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: colors.muted,
          opacity: pulseAnim,
        },
        style,
      ]}
    />
  );
}

// Pre-built skeleton layouts for common use cases
export function CardSkeleton({ style }: { style?: ViewStyle }) {
  return (
    <View style={[skeletonStyles.cardContainer, style]}>
      <SkeletonLoader height={180} borderRadius={16} />
      <View style={skeletonStyles.cardContent}>
        <SkeletonLoader width={100} height={12} borderRadius={4} />
        <SkeletonLoader width="80%" height={16} borderRadius={4} style={{ marginTop: 8 }} />
        <SkeletonLoader width="60%" height={12} borderRadius={4} style={{ marginTop: 8 }} />
        <SkeletonLoader width={80} height={16} borderRadius={4} style={{ marginTop: 12 }} />
      </View>
    </View>
  );
}

export function ListItemSkeleton({ style }: { style?: ViewStyle }) {
  return (
    <View style={[skeletonStyles.listItem, style]}>
      <SkeletonLoader width={48} height={48} borderRadius={24} />
      <View style={skeletonStyles.listItemContent}>
        <SkeletonLoader width="70%" height={14} borderRadius={4} />
        <SkeletonLoader width="40%" height={12} borderRadius={4} style={{ marginTop: 6 }} />
      </View>
    </View>
  );
}

export function BannerSkeleton({ style }: { style?: ViewStyle }) {
  return (
    <SkeletonLoader
      height={180}
      borderRadius={12}
      style={[{ marginHorizontal: 16 }, style]}
    />
  );
}

const skeletonStyles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listItemContent: {
    flex: 1,
    marginLeft: 12,
  },
});
