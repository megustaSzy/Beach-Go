import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  ViewStyle, 
  TextStyle, 
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
  centerTitle?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

export function Header({
  title,
  showBackButton,
  onBackPress,
  rightAction,
  centerTitle = Platform.OS === 'ios',
  style,
  titleStyle,
}: HeaderProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  // Auto-detect back button visibility if not explicitly provided
  const canGoBack = showBackButton !== undefined ? showBackButton : router.canGoBack();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.background, 
          borderBottomColor: colors.border,
        },
        style
      ]}
    >
      {/* LEFT ACTION (BACK BUTTON) */}
      <View style={styles.leftContainer}>
        {canGoBack && (
          <Pressable 
            onPress={handleBack} 
            style={({ pressed }) => [
              styles.backButton,
              pressed && { opacity: 0.6 }
            ]}
          >
            <Ionicons name="arrow-back" size={24} color={colors.foreground} />
          </Pressable>
        )}
      </View>

      {/* CENTER / TITLE */}
      <View style={[
        styles.titleContainer,
        centerTitle ? styles.titleCenter : styles.titleLeft
      ]}>
        <Text 
          numberOfLines={1} 
          style={[
            styles.title, 
            { 
              color: colors.foreground, 
              fontFamily: Fonts.bold 
            },
            titleStyle
          ]}
        >
          {title}
        </Text>
      </View>

      {/* RIGHT ACTION */}
      <View style={styles.rightContainer}>
        {rightAction}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    ...Platform.select({
      web: {
        position: 'sticky',
        top: 0,
        zIndex: 100,
      },
    }),
  },
  leftContainer: {
    width: 48,
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100%',
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  titleContainer: {
    position: 'absolute',
    left: 64,
    right: 64,
    height: '100%',
    justifyContent: 'center',
  },
  titleCenter: {
    alignItems: 'center',
  },
  titleLeft: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    letterSpacing: -0.3,
  },
  rightContainer: {
    width: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100%',
  },
});
