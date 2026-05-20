import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Pressable 
} from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from '@/components/Header';
import { InputText } from '@/components/InputText';
import { Button } from '@/components/Button';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { router } from 'expo-router';

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Validation Error State
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Loading State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessLoader, setShowSuccessLoader] = useState(false);

  // Simple client-side validation
  const validateForm = () => {
    let isValid = true;
    
    // Validate Email
    if (!email.trim()) {
      setEmailError('Alamat email wajib diisi');
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Format alamat email tidak valid');
        isValid = false;
      } else {
        setEmailError('');
      }
    }

    // Validate Password
    if (!password) {
      setPasswordError('Kata sandi wajib diisi');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Kata sandi minimal harus 6 karakter');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = () => {
    if (!validateForm()) return;

    // Simulate login API call
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessLoader(true);
      
      // Simulate dashboard redirection after 1.5 seconds of secure verification
      setTimeout(() => {
        setShowSuccessLoader(false);
        console.log('Logged in successfully!');
        // router.replace('/dashboard');
      }, 1500);
    }, 1500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* HEADER WITH AUTO BACK TO SPLASH */}
      <Header title="Masuk Akun" showBackButton={true} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER WELCOME BANNER */}
          <View style={styles.welcomeSection}>
            <Text style={[styles.welcomeTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
              Selamat Datang Kembali 👋
            </Text>
            <Text style={[styles.welcomeSubtitle, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
              Silakan masuk untuk mengelola tiket dan menjelajahi pantai Lampung terindah.
            </Text>
          </View>

          {/* INPUT FORM FIELDS */}
          <View style={styles.formSection}>
            <InputText
              label="Alamat Email"
              placeholder="nama@email.com"
              leftIconName="mail-outline"
              value={email}
              onChangeText={setEmail}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <InputText
              label="Kata Sandi"
              placeholder="Masukkan kata sandi Anda"
              leftIconName="lock-closed-outline"
              value={password}
              onChangeText={setPassword}
              error={passwordError}
              isPassword={true}
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* FORGOT PASSWORD */}
            <Pressable 
              onPress={() => console.log('Forgot password clicked')}
              style={styles.forgotPasswordContainer}
            >
              <Text style={[styles.forgotPasswordText, { color: colors.primary, fontFamily: Fonts.medium }]}>
                Lupa Kata Sandi?
              </Text>
            </Pressable>
          </View>

          {/* ACTION BUTTONS */}
          <View style={styles.actionSection}>
            <Button
              title="Masuk Sekarang"
              variant="primary"
              size="lg"
              fullWidth={true}
              loading={isSubmitting}
              onPress={handleLogin}
              style={styles.loginBtn}
            />

            {/* REGISTER ACCOUNT LINK */}
            <View style={styles.registerContainer}>
              <Text style={[styles.registerText, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>
                Belum punya akun?{' '}
              </Text>
              <Pressable onPress={() => console.log('Navigate to register')}>
                <Text style={[styles.registerLink, { color: colors.primary, fontFamily: Fonts.bold }]}>
                  Daftar Sekarang
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* SECURE MOCK VERIFICATION MODAL OVERLAY */}
      <LoadingSpinner 
        visible={showSuccessLoader} 
        overlay={true} 
        message="Memverifikasi kredensial akun Anda..." 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    justifyContent: 'center',
    flexGrow: 1,
  },
  welcomeSection: {
    marginBottom: 32,
    marginTop: 8,
  },
  welcomeTitle: {
    fontSize: 28,
    letterSpacing: -0.8,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  formSection: {
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: -4,
    paddingVertical: 8,
  },
  forgotPasswordText: {
    fontSize: 13,
  },
  actionSection: {
    marginTop: 12,
  },
  loginBtn: {
    marginBottom: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  registerText: {
    fontSize: 13,
  },
  registerLink: {
    fontSize: 13,
  },
});
