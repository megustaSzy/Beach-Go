import React, { useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  Animated, 
  ViewStyle, 
  Platform 
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type CardLayout = 'vertical' | 'horizontal';

interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  price?: string;
  rating?: number;
  location?: string;
  badgeText?: string;
  layout?: CardLayout;
  onPress?: () => void;
  style?: ViewStyle;
}

export function Card({
  title,
  description,
  imageUrl = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60',
  price,
  rating,
  location,
  badgeText,
  layout = 'vertical',
  onPress,
  style,
}: CardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  // Spring interaction animation
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!onPress) return;
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 24,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    if (!onPress) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 24,
      bounciness: 4,
    }).start();
  };

  const isHorizontal = layout === 'horizontal';

  const cardContent = (
    <View style={[
      styles.cardInner, 
      { 
        backgroundColor: colors.card,
        borderColor: colors.border,
        flexDirection: isHorizontal ? 'row' : 'column',
      }
    ]}>
      {/* CARD IMAGE */}
      <View style={[
        styles.imageContainer,
        { 
          width: isHorizontal ? 110 : '100%', 
          height: isHorizontal ? 110 : 180,
          borderTopRightRadius: isHorizontal ? 0 : 16,
          borderBottomLeftRadius: isHorizontal ? 16 : 0,
        }
      ]}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        
        {badgeText && (
          <View style={[styles.badge, { backgroundColor: colors.primary }]}>
            <Text style={[styles.badgeText, { color: colors.primaryForeground, fontFamily: Fonts.bold }]}>
              {badgeText}
            </Text>
          </View>
        )}
      </View>

      {/* CARD INFO */}
      <View style={[styles.infoContainer, { flex: 1 }]}>
        <View style={styles.topInfo}>
          {location && (
            <View style={styles.locationWrapper}>
              <Ionicons name="location-outline" size={14} color={colors.icon} />
              <Text 
                numberOfLines={1} 
                style={[styles.locationText, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}
              >
                {location}
              </Text>
            </View>
          )}
          
          {rating !== undefined && (
            <View style={styles.ratingWrapper}>
              <Ionicons name="star" size={14} color="#eab308" />
              <Text style={[styles.ratingText, { color: colors.foreground, fontFamily: Fonts.bold }]}>
                {rating.toFixed(1)}
              </Text>
            </View>
          )}
        </View>

        <Text 
          numberOfLines={1} 
          style={[styles.title, { color: colors.foreground, fontFamily: Fonts.bold }]}
        >
          {title}
        </Text>

        {description && (
          <Text 
            numberOfLines={isHorizontal ? 2 : 2} 
            style={[styles.description, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}
          >
            {description}
          </Text>
        )}

        {price && (
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: colors.foreground, fontFamily: Fonts.bold }]}>
              {price}
            </Text>
            {isHorizontal && <Text style={[styles.priceSub, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>/ tiket</Text>}
          </View>
        )}
      </View>
    </View>
  );

  return (
    <Animated.View
      style={[
        styles.container,
        { 
          transform: [{ scale: scaleAnim }],
          shadowColor: '#000000',
        },
        style,
      ]}
    >
      {onPress ? (
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.pressable}
        >
          {cardContent}
        </Pressable>
      ) : (
        cardContent
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
      web: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        transition: 'transform 0.2s ease',
      },
    }),
  },
  pressable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardInner: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoContainer: {
    padding: 16,
    justifyContent: 'space-between',
  },
  topInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  locationText: {
    fontSize: 11,
    marginLeft: 4,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
  },
  title: {
    fontSize: 16,
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 'auto',
  },
  price: {
    fontSize: 15,
  },
  priceSub: {
    fontSize: 11,
    marginLeft: 2,
  },
});
