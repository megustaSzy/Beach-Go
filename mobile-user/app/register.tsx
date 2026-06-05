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
import { Toast } from '@/components/Toast';
import { useAuth } from '@/context/auth';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { register } = useAuth();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notelp, setNotelp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Validation Error State
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [notelpError, setNotelpError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  // Loading State & Toast State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  // Client-side validation
  const validateForm = () => {
    let isValid = true;

    // Validate Name
    if (!name.trim()) {
      setNameError('Nama lengkap wajib diisi');
      isValid = false;
    } else {
      setNameError('');
    }
    
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

    // Validate No Telp
    if (!notelp.trim()) {
      setNotelpError('Nomor telepon wajib diisi');
      isValid = false;
    } else if (notelp.length < 10) {
      setNotelpError('Nomor telepon minimal 10 digit');
      isValid = false;
    } else {
      setNotelpError('');
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

    // Validate Confirm Password
    if (!confirmPassword) {
      setConfirmPasswordError('Konfirmasi kata sandi wajib diisi');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Kata sandi tidak cocok');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const result = await register(name, email, password, notelp);
      setIsSubmitting(false);

      if (result.success) {
        showToast('Akun Anda berhasil terdaftar!', 'success');
        // Redirect to Login page after showing success feedback
        setTimeout(() => {
          router.replace('/login');
        }, 1500);
      } else {
        showToast(result.message, 'error');
      }
    } catch (error) {
      setIsSubmitting(false);
      showToast('Gagal menghubungkan ke server.', 'error');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* HEADER WITH BACK BUTTON */}
      <Header title="Daftar Akun" showBackButton={true} />

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
              Buat Akun Baru ✨
            </Text>
            <Text style={[styles.welcomeSubtitle, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
              Mulai perjalanan Anda menjelajahi keindahan pantai di Lampung.
            </Text>
          </View>

          {/* INPUT FORM FIELDS */}
          <View style={styles.formSection}>
            <InputText
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap Anda"
              leftIconName="person-outline"
              value={name}
              onChangeText={setName}
              error={nameError}
              autoCapitalize="words"
              autoCorrect={false}
            />

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
              label="Nomor Telepon"
              placeholder="Contoh: 081234567890"
              leftIconName="call-outline"
              value={notelp}
              onChangeText={setNotelp}
              error={notelpError}
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <InputText
              label="Kata Sandi"
              placeholder="Masukkan kata sandi baru"
              leftIconName="lock-closed-outline"
              value={password}
              onChangeText={setPassword}
              error={passwordError}
              isPassword={true}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <InputText
              label="Konfirmasi Kata Sandi"
              placeholder="Ketik ulang kata sandi Anda"
              leftIconName="lock-closed-outline"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={confirmPasswordError}
              isPassword={true}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* ACTION BUTTONS */}
          <View style={styles.actionSection}>
            <Button
              title="Daftar Sekarang"
              variant="primary"
              size="lg"
              fullWidth={true}
              loading={isSubmitting}
              onPress={handleRegister}
              style={styles.registerBtn}
            />

            {/* LOGIN ACCOUNT LINK */}
            <View style={styles.loginContainer}>
              <Text style={[styles.loginText, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>
                Sudah punya akun?{' '}
              </Text>
              <Pressable onPress={() => router.push('/login')}>
                <Text style={[styles.loginLink, { color: colors.primary, fontFamily: Fonts.bold }]}>
                  Masuk Sekarang
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* SUCCESS/ERROR TOAST FEEDBACK */}
      <Toast 
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        onHide={() => setToastVisible(false)}
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
    paddingBottom: 40,
    justifyContent: 'center',
    flexGrow: 1,
  },
  welcomeSection: {
    marginBottom: 28,
    marginTop: 8,
  },
  welcomeTitle: {
    fontSize: 26,
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
  actionSection: {
    marginTop: 8,
  },
  registerBtn: {
    marginBottom: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  loginText: {
    fontSize: 13,
  },
  loginLink: {
    fontSize: 13,
  },
});
