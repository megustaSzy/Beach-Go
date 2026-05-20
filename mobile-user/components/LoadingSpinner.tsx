import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator, 
  Modal, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type SpinnerSize = 'small' | 'large';

interface LoadingSpinnerProps {
  visible?: boolean;
  overlay?: boolean;
  size?: SpinnerSize;
  color?: string;
  message?: string;
  style?: ViewStyle;
  messageStyle?: TextStyle;
}

export function LoadingSpinner({
  visible = true,
  overlay = false,
  size = 'large',
  color,
  message,
  style,
  messageStyle,
}: LoadingSpinnerProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const spinnerColor = color || colors.primary;

  if (!visible) return null;

  const spinnerContent = (
    <View style={[styles.innerContainer, !overlay && style]}>
      <ActivityIndicator size={size} color={spinnerColor} />
      {message && (
        <Text 
          style={[
            styles.messageText, 
            { 
              color: colors.mutedForeground, 
              fontFamily: Fonts.medium 
            },
            messageStyle
          ]}
        >
          {message}
        </Text>
      )}
    </View>
  );

  if (overlay) {
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        statusBarTranslucent={true}
      >
        <View 
          style={[
            styles.overlayContainer, 
            { 
              backgroundColor: colorScheme === 'dark' 
                ? 'rgba(30, 30, 30, 0.85)' 
                : 'rgba(255, 255, 255, 0.85)' 
            }
          ]}
        >
          <View style={[styles.overlayContent, style]}>
            {spinnerContent}
          </View>
        </View>
      </Modal>
    );
  }

  return spinnerContent;
}

const styles = StyleSheet.create({
  innerContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
