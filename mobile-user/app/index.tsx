import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Animated, 
  Image, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button } from '@/components/Button';
import { router } from 'expo-router';

export default function SplashScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Run gorgeous parallel entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 30,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* ANIMATED TOP & MIDDLE HERO SECTION */}
      <Animated.View 
        style={[
          styles.heroContainer, 
          { 
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim }
            ]
          }
        ]}
      >
        {/* LOGO SHADCN INSPIRED FRAME */}
        <View style={[styles.logoFrame, { borderColor: colors.border, backgroundColor: colors.card }]}>
          <Image 
            source={require('../assets/images/icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.title, { color: colors.foreground, fontFamily: Fonts.bold }]}>
          Beach-Go
        </Text>
        
        <Text style={[styles.subtitle, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
          Temukan Surga Wisata Pantai di Lampung
        </Text>
      </Animated.View>

      {/* ANIMATED BOTTOM ACTIONS */}
      <Animated.View 
        style={[
          styles.actionContainer, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Button 
          title="Mulai Sekarang" 
          variant="primary" 
          size="lg"
          fullWidth={true}
          style={styles.primaryBtn}
          onPress={() => {
            console.log('Navigating to login...');
            // In the future, this will navigate to /login
          }}
        />

        <Button 
          title="Lihat Demo Komponen" 
          variant="outline" 
          size="md"
          fullWidth={true}
          onPress={() => {
            router.push('/demo');
          }}
        />

        <Text style={[styles.footerText, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>
          © 2026 Beach-Go Team. All rights reserved.
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
  },
  logoFrame: {
    width: 120,
    height: 120,
    borderRadius: 28,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 3,
  },
  logo: {
    width: 72,
    height: 72,
  },
  title: {
    fontSize: 40,
    letterSpacing: -1.5,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  actionContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 24,
  },
  primaryBtn: {
    marginBottom: 12,
  },
  footerText: {
    fontSize: 11,
    marginTop: 32,
    letterSpacing: 0.2,
  },
});
