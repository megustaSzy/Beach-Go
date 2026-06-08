import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Pressable, 
  ScrollView,
  Platform,
  Switch,
  StatusBar
} from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from '@/components/Header';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import { Toast } from '@/components/Toast';
import { useAuth } from '@/context/auth';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { user, logout, updateUser } = useAuth();

  // States
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [notelp, setNotelp] = useState(user?.notelp || '');
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  // Input Errors
  const [nameError, setNameError] = useState('');
  const [notelpError, setNotelpError] = useState('');

  // Actions states
  const [isSaving, setIsSaving] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      setNameError('Nama lengkap tidak boleh kosong');
      return;
    }
    setNameError('');

    if (!notelp.trim()) {
      setNotelpError('Nomor telepon tidak boleh kosong');
      return;
    }
    setNotelpError('');

    setIsSaving(true);
    try {
      await updateUser({ name, notelp });
      setIsSaving(false);
      setIsEditing(false);
      showToast('Profil Anda berhasil diperbarui!', 'success');
    } catch {
      setIsSaving(false);
      showToast('Gagal memperbarui profil.', 'error');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <Header 
        title={isEditing ? 'Sunting Profil' : 'Profil Saya'} 
        showBackButton={false} 
        rightAction={
          isEditing ? (
            <Pressable onPress={() => setIsEditing(false)} style={styles.headerCancel}>
              <Text style={[styles.cancelText, { color: colors.foreground, fontFamily: Fonts.medium }]}>Batal</Text>
            </Pressable>
          ) : undefined
        }
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={[styles.profileCard, { borderColor: colors.border, backgroundColor: colors.card }]}>
          <Avatar 
            name={user?.name || 'Guest User'} 
            size={80} 
          />
          {!isEditing ? (
            <>
              <Text style={[styles.userName, { color: colors.foreground, fontFamily: Fonts.bold }]}>
                {user?.name || 'Pengguna Beach-Go'}
              </Text>
              <Text style={[styles.userEmail, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
                {user?.email || 'guest@beachgo.com'}
              </Text>
              <View style={[styles.badgeContainer, { backgroundColor: colors.secondary }]}>
                <Text style={[styles.badgeText, { color: colors.secondaryForeground, fontFamily: Fonts.semiBold }]}>
                  {user?.role || 'USER'}
                </Text>
              </View>
            </>
          ) : (
            <Text style={[styles.editInfoText, { color: colors.mutedForeground, fontFamily: Fonts.medium, marginTop: 12 }]}>
              Ubah foto profil melalui web-cms admin
            </Text>
          )}
        </View>

        {/* PROFILE EDIT FIELDS OR PROFILE VALUES */}
        {isEditing ? (
          <View style={styles.editForm}>
            <InputText 
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap Anda"
              leftIconName="person-outline"
              value={name}
              onChangeText={setName}
              error={nameError}
            />

            <InputText 
              label="Nomor Telepon"
              placeholder="Masukkan nomor telepon"
              leftIconName="call-outline"
              value={notelp}
              onChangeText={setNotelp}
              error={notelpError}
              keyboardType="phone-pad"
            />

            <Button 
              title="Simpan Pembaruan"
              variant="primary"
              size="lg"
              fullWidth={true}
              loading={isSaving}
              onPress={() => setIsEditing(false)}
              style={{ marginTop: 12 }}
            />
          </View>
        ) : (
          <>
            {/* Personal Details Section */}
            <View style={styles.infoSection}>
              <Text style={[styles.sectionHeading, { color: colors.mutedForeground, fontFamily: Fonts.bold }]}>
                Informasi Pribadi
              </Text>
              
              {/* Phone Number */}
              <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
                <Ionicons name="call-outline" size={20} color={colors.mutedForeground} />
                <View style={styles.infoTexts}>
                  <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Nomor Telepon</Text>
                  <Text style={[styles.infoValue, { color: colors.foreground, fontFamily: Fonts.medium }]}>
                    {user?.notelp || '-'}
                  </Text>
                </View>
              </View>

              {/* Email Address */}
              <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
                <Ionicons name="mail-outline" size={20} color={colors.mutedForeground} />
                <View style={styles.infoTexts}>
                  <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Alamat Email</Text>
                  <Text style={[styles.infoValue, { color: colors.foreground, fontFamily: Fonts.medium }]}>
                    {user?.email || '-'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Action Button */}
            <Button 
              title="Keluar Akun" 
              variant="destructive" 
              size="lg" 
              fullWidth={true}
              onPress={logout}
              style={styles.logoutBtn}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCancel: {
    padding: 6,
  },
  cancelText: {
    fontSize: 14,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
    alignItems: 'stretch',
  },
  profileCard: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  userName: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 12,
  },
  badgeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  editInfoText: {
    fontSize: 12,
  },
  editForm: {
    gap: 4,
  },
  infoSection: {
    marginBottom: 32,
  },
  sectionHeading: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    gap: 16,
  },
  infoTexts: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
  },
  logoutBtn: {
    marginTop: 36,
  },
});
