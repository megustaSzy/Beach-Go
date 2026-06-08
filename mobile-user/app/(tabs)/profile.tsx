import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, ScrollView, StatusBar } from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from '@/components/Header';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { useAuth } from '@/context/auth';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <Header title="Profil Saya" showBackButton={false} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={[styles.profileCard, { borderColor: colors.border, backgroundColor: colors.card }]}>
          <Avatar 
            name={user?.name || 'Guest User'} 
            size={72} 
          />
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
        </View>

        {/* Info List */}
        <View style={styles.infoSection}>
          <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
            <Ionicons name="call-outline" size={20} color={colors.mutedForeground} />
            <View style={styles.infoTexts}>
              <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Nomor Telepon</Text>
              <Text style={[styles.infoValue, { color: colors.foreground, fontFamily: Fonts.medium }]}>
                {user?.notelp || '-'}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  infoSection: {
    marginBottom: 32,
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
