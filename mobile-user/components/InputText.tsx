import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  Text, 
  Pressable, 
  TextInputProps, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface InputTextProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIconName?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

export function InputText({
  label,
  error,
  leftIconName,
  isPassword = false,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  onFocus,
  onBlur,
  ...props
}: InputTextProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const isSecure = isPassword && !showPassword;

  // Dynamic Border styling
  const getBorderColor = () => {
    if (error) return colors.destructive;
    if (isFocused) return colors.ring;
    return colors.border;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[
          styles.label, 
          { 
            color: colors.foreground, 
            fontFamily: Fonts.medium 
          }, 
          labelStyle
        ]}>
          {label}
        </Text>
      )}
      
      <View 
        style={[
          styles.inputContainer, 
          { 
            borderColor: getBorderColor(),
            backgroundColor: colors.background,
          }
        ]}
      >
        {leftIconName && (
          <Ionicons 
            name={leftIconName} 
            size={20} 
            color={colors.icon} 
            style={styles.leftIcon} 
          />
        )}
        
        <TextInput
          style={[
            styles.input, 
            { 
              color: colors.foreground,
              fontFamily: Fonts.regular,
            }, 
            inputStyle
          ]}
          placeholderTextColor={colors.mutedForeground}
          secureTextEntry={isSecure}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {isPassword && (
          <Pressable 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.rightIcon}
          >
            <Ionicons 
              name={showPassword ? 'eye-off' : 'eye'} 
              size={20} 
              color={colors.icon} 
            />
          </Pressable>
        )}
      </View>
      
      {error && (
        <Text style={[
          styles.errorText, 
          { 
            color: colors.destructive, 
            fontFamily: Fonts.regular 
          }, 
          errorStyle
        ]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  leftIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    padding: 0,
  },
  rightIcon: {
    paddingLeft: 8,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});
