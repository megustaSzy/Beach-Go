import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, SharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const SLIDE_WIDTH = width - 32;
const SLIDE_HEIGHT = 180;

interface CarouselSlideProps {
  src: string;
  index: number;
  progress: SharedValue<number>;
}

const CarouselSlide = ({ src, index, progress }: CarouselSlideProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        index * 200,
        withTiming(progress.value === index ? 1 : 0, { duration: 800 })
      ),
      transform: [
        {
          translateX: withTiming(progress.value === index ? 0 : -20, {
            duration: 800,
          }),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.slide, animatedStyle]}>
      <Image source={{ uri: src }} style={styles.image} contentFit="cover" />
    </Animated.View>
  );
};

export const BannerCarousel = ({
  images,
}: {
  images: string[];
}) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      progress.value = withTiming(
        (progress.value + 1) % images.length,
        { duration: 500 }
      );
    }, 4000);
    return () => clearInterval(id);
  }, [images.length, progress]);

  return (
    <View style={styles.wrapper}>
      {images.map((src, i) => (
        <CarouselSlide key={i} src={src} index={i} progress={progress} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: SLIDE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginHorizontal: 16,
    borderRadius: 12,
  },
  slide: {
    position: 'absolute',
    width: SLIDE_WIDTH,
    height: SLIDE_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

