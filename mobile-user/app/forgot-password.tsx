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
import { Toast } from '@/components/Toast';
import { router } from 'expo-router';

type Step = 'EMAIL' | 'CODE' | 'RESET';

export default function ForgotPasswordScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [step, setStep] = useState<Step>('EMAIL');

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const handleSendEmail = () => {
    if (!email.trim()) {
      setEmailError('Alamat email wajib diisi');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Format alamat email tidak valid');
      return;
    }
    setEmailError('');

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Kode verifikasi telah dikirim ke email Anda!', 'success');
      setStep('CODE');
    }, 1500);
  };

  const handleVerifyCode = () => {
    if (!code.trim()) {
      setCodeError('Kode verifikasi wajib diisi');
      return;
    }
    if (code.length !== 6) {
      setCodeError('Kode verifikasi harus 6 digit');
      return;
    }
    setCodeError('');

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Verifikasi berhasil!', 'success');
      setStep('RESET');
    }, 1500);
  };

  const handleResetPassword = () => {
    let isValid = true;

    if (!newPassword) {
      setNewPasswordError('Kata sandi baru wajib diisi');
      isValid = false;
    } else if (newPassword.length < 6) {
      setNewPasswordError('Kata sandi minimal harus 6 karakter');
      isValid = false;
    } else {
      setNewPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Konfirmasi kata sandi wajib diisi');
      isValid = false;
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordError('Kata sandi tidak cocok');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!isValid) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Kata sandi Anda berhasil diperbarui!', 'success');
      setTimeout(() => {
        router.replace('/login');
      }, 1500);
    }, 1500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header 
        title={step === 'EMAIL' ? 'Lupa Kata Sandi' : step === 'CODE' ? 'Verifikasi Kode' : 'Atur Ulang Sandi'} 
        showBackButton={true}
        onBackPress={() => {
          if (step === 'CODE') {
            setStep('EMAIL');
          } else if (step === 'RESET') {
            setStep('CODE');
          } else {
            router.back();
          }
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {step === 'EMAIL' && (
            <View>
              <View style={styles.welcomeSection}>
                <Text style={[styles.welcomeTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
                  Lupa Kata Sandi? 🔒
                </Text>
                <Text style={[styles.welcomeSubtitle, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
                  Masukkan alamat email akun Anda. Kami akan mengirimkan 6 digit kode keamanan untuk mengatur ulang kata sandi Anda.
                </Text>
              </View>

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
              </View>

              <View style={styles.actionSection}>
                <Button
                  title="Kirim Kode Keamanan"
                  variant="primary"
                  size="lg"
                  fullWidth={true}
                  loading={isSubmitting}
                  onPress={handleSendEmail}
                />
              </View>
            </View>
          )}

          {step === 'CODE' && (
            <View>
              <View style={styles.welcomeSection}>
                <Text style={[styles.welcomeTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
                  Masukkan Kode 🔑
                </Text>
                <Text style={[styles.welcomeSubtitle, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
                  Silakan masukkan 6 digit kode keamanan yang telah dikirim ke alamat email {email}.
                </Text>
              </View>

              <View style={styles.formSection}>
                <InputText
                  label="Kode Verifikasi"
                  placeholder="Contoh: 123456"
                  leftIconName="key-outline"
                  value={code}
                  onChangeText={setCode}
                  error={codeError}
                  keyboardType="number-pad"
                  maxLength={6}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.actionSection}>
                <Button
                  title="Verifikasi Kode"
                  variant="primary"
                  size="lg"
                  fullWidth={true}
                  loading={isSubmitting}
                  onPress={handleVerifyCode}
                  style={styles.actionBtn}
                />

                <Pressable 
                  onPress={handleSendEmail}
                  disabled={isSubmitting}
                  style={styles.resendContainer}
                >
                  <Text style={[styles.resendText, { color: colors.primary, fontFamily: Fonts.bold }]}>
                    Kirim Ulang Kode
                  </Text>
                </Pressable>
              </View>
            </View>
          )}

          {step === 'RESET' && (
            <View>
              <View style={styles.welcomeSection}>
                <Text style={[styles.welcomeTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
                  Atur Ulang Sandi 🛡️
                </Text>
                <Text style={[styles.welcomeSubtitle, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
                  Masukkan kata sandi baru Anda. Pastikan kata sandi aman dan mudah Anda ingat.
                </Text>
              </View>

              <View style={styles.formSection}>
                <InputText
                  label="Kata Sandi Baru"
                  placeholder="Masukkan kata sandi baru"
                  leftIconName="lock-closed-outline"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  error={newPasswordError}
                  isPassword={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <InputText
                  label="Konfirmasi Kata Sandi"
                  placeholder="Masukkan ulang kata sandi baru"
                  leftIconName="lock-closed-outline"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  error={confirmPasswordError}
                  isPassword={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.actionSection}>
                <Button
                  title="Perbarui Kata Sandi"
                  variant="primary"
                  size="lg"
                  fullWidth={true}
                  loading={isSubmitting}
                  onPress={handleResetPassword}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

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
  actionBtn: {
    marginBottom: 16,
  },
  resendContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  resendText: {
    fontSize: 13,
  },
});
