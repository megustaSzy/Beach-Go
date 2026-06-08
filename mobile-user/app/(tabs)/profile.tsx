import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import { Toast } from '@/components/Toast';
import { useAuth } from '@/context/auth';
import { Ionicons } from '@expo/vector-icons';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sublabel?: string;
  color?: string;
  onPress?: () => void;
}

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const { user, logout, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [notelp, setNotelp] = useState(user?.notelp || '');

  const [nameError, setNameError] = useState('');
  const [notelpError, setNotelpError] = useState('');
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
    let hasError = false;
    if (!name.trim()) {
      setNameError('Nama tidak boleh kosong');
      hasError = true;
    } else {
      setNameError('');
    }
    if (hasError) return;

    setIsSaving(true);
    try {
      await updateUser({ name, notelp });
      setIsEditing(false);
      showToast('Profil berhasil diperbarui!', 'success');
    } catch {
      showToast('Gagal memperbarui profil.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const menuItems: MenuItem[] = [
    {
      icon: 'person-outline',
      label: 'Nama Lengkap',
      sublabel: user?.name || '-',
    },
    {
      icon: 'mail-outline',
      label: 'Alamat Email',
      sublabel: user?.email || '-',
    },
    {
      icon: 'call-outline',
      label: 'Nomor Telepon',
      sublabel: user?.notelp || 'Belum diatur',
    },
    {
      icon: 'shield-checkmark-outline',
      label: 'Status Akun',
      sublabel: user?.role || 'USER',
      color: '#0ea5e9',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0ea5e9" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <LinearGradient
          colors={['#0ea5e9', '#0284c7', '#0369a1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileHeader}
        >
          <View style={styles.avatarContainer}>
            <Avatar name={user?.name || 'Guest'} size={80} />
          </View>
          <Text style={styles.profileName}>{user?.name || 'Pengguna Demo'}</Text>
          <Text style={styles.profileEmail}>{user?.email || 'demo@beachgo.com'}</Text>
          <View style={styles.roleBadge}>
            <Ionicons name="checkmark-circle" size={12} color="#fff" />
            <Text style={styles.roleText}>{user?.role || 'USER'}</Text>
          </View>

          {!isEditing && (
            <Pressable
              onPress={() => setIsEditing(true)}
              style={styles.editProfileBtn}
            >
              <Ionicons name="create-outline" size={15} color="#0ea5e9" />
              <Text style={styles.editProfileBtnText}>Sunting Profil</Text>
            </Pressable>
          )}
        </LinearGradient>

        {/* Edit Form */}
        {isEditing ? (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
              Perbarui Informasi
            </Text>

            <View style={styles.formFields}>
              <InputText
                label="Nama Lengkap"
                placeholder="Masukkan nama lengkap"
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
            </View>

            <View style={styles.editActions}>
              <Button
                title="Batal"
                variant="outline"
                size="md"
                onPress={() => setIsEditing(false)}
                style={styles.cancelBtn}
              />
              <Button
                title="Simpan"
                variant="primary"
                size="md"
                loading={isSaving}
                onPress={handleSaveProfile}
                style={styles.saveBtn}
              />
            </View>
          </View>
        ) : (
          <>
            {/* Info Card */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
                Informasi Akun
              </Text>
              {menuItems.map((item, idx) => (
                <View key={idx}>
                  <View style={styles.menuRow}>
                    <View style={[styles.menuIconWrap, { backgroundColor: (item.color || '#0ea5e9') + '18' }]}>
                      <Ionicons name={item.icon} size={18} color={item.color || '#0ea5e9'} />
                    </View>
                    <View style={styles.menuTexts}>
                      <Text style={[styles.menuLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>
                        {item.label}
                      </Text>
                      <Text style={[styles.menuValue, { color: colors.foreground, fontFamily: Fonts.medium }]}>
                        {item.sublabel}
                      </Text>
                    </View>
                  </View>
                  {idx < menuItems.length - 1 && (
                    <View style={[styles.rowDivider, { backgroundColor: colors.border }]} />
                  )}
                </View>
              ))}
            </View>

            {/* About App Card */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
                Tentang Aplikasi
              </Text>
              <View style={styles.menuRow}>
                <View style={[styles.menuIconWrap, { backgroundColor: '#f59e0b18' }]}>
                  <Ionicons name="information-circle-outline" size={18} color="#f59e0b" />
                </View>
                <View style={styles.menuTexts}>
                  <Text style={[styles.menuLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Versi Aplikasi</Text>
                  <Text style={[styles.menuValue, { color: colors.foreground, fontFamily: Fonts.medium }]}>Beach-Go v1.0.0</Text>
                </View>
              </View>
            </View>

            {/* Logout Button */}
            <Button
              title="Keluar dari Akun"
              variant="destructive"
              size="lg"
              fullWidth={true}
              onPress={logout}
              style={styles.logoutBtn}
            />
          </>
        )}
      </ScrollView>

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
  container: { flex: 1 },
  scrollContent: {
    paddingBottom: 48,
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  avatarContainer: {
    borderRadius: 48,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
    marginBottom: 16,
    overflow: 'hidden',
  },
  profileName: {
    fontSize: 22,
    color: '#fff',
    fontFamily: Fonts.bold,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    fontFamily: Fonts.medium,
    marginBottom: 12,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 20,
  },
  roleText: {
    fontSize: 11,
    color: '#fff',
    fontFamily: Fonts.bold,
    letterSpacing: 0.5,
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editProfileBtnText: {
    fontSize: 13,
    color: '#0ea5e9',
    fontFamily: Fonts.semiBold,
  },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
  },
  cardTitle: {
    fontSize: 15,
    marginBottom: 16,
  },
  formFields: {
    gap: 4,
    marginBottom: 20,
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
  },
  saveBtn: {
    flex: 1,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 10,
  },
  menuIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTexts: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  menuValue: {
    fontSize: 14,
  },
  rowDivider: {
    height: 1,
    marginLeft: 52,
  },
  logoutBtn: {
    marginHorizontal: 16,
    marginTop: 24,
  },
});
