/**
 * Reusable Rating Display Component
 * Renders stars and review count based on a number score.
 * Accepts both 'value'/'rating' and 'maxStars'/'maxRating' as aliases.
 */
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface RatingDisplayProps {
  value?: number;
  rating?: number;    // alias for value
  maxStars?: number;
  maxRating?: number; // alias for maxStars
  size?: number;
  showValue?: boolean;
  showCount?: boolean;
  reviewCount?: number;
  style?: ViewStyle;
}

export function RatingDisplay({
  value,
  rating,
  maxStars = 5,
  maxRating,
  size = 16,
  showValue = true,
  showCount = false,
  reviewCount = 0,
  style,
}: RatingDisplayProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  // Support both prop aliases safely — never crash on undefined
  const safeValue = typeof value === 'number' ? value : typeof rating === 'number' ? rating : 0;
  const safeMax = typeof maxRating === 'number' ? maxRating : maxStars;

  const starColor = '#eab308';
  const emptyStarColor = colors.border;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= safeMax; i++) {
      if (i <= Math.floor(safeValue)) {
        stars.push(
          <Ionicons key={i} name="star" size={size} color={starColor} style={styles.star} />
        );
      } else if (i === Math.ceil(safeValue) && safeValue % 1 !== 0) {
        stars.push(
          <Ionicons key={i} name="star-half" size={size} color={starColor} style={styles.star} />
        );
      } else {
        stars.push(
          <Ionicons key={i} name="star-outline" size={size} color={emptyStarColor} style={styles.star} />
        );
      }
    }
    return stars;
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>

      {showValue && (
        <Text
          style={[
            styles.valueText,
            {
              color: colors.foreground,
              fontFamily: Fonts.bold,
              fontSize: size * 0.85,
            },
          ]}
        >
          {safeValue.toFixed(1)}
        </Text>
      )}

      {showCount && reviewCount > 0 && (
        <Text
          style={[
            styles.countText,
            {
              color: colors.mutedForeground,
              fontFamily: Fonts.regular,
              fontSize: size * 0.7,
            },
          ]}
        >
          ({reviewCount})
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 2,
  },
  valueText: {
    marginLeft: 6,
  },
  countText: {
    marginLeft: 4,
  },
});
