import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from '@/components/Header';
import { EmptyState } from '@/components/EmptyState';

export default function HistoryScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Tiket Saya" showBackButton={false} />
      <View style={styles.content}>
        <EmptyState 
          title="Belum Ada Tiket" 
          description="Anda belum memiliki riwayat pemesanan tiket pantai. Mulai jelajahi pantai terindah di Lampung!"
          actionLabel="Jelajahi Pantai"
          onActionPress={() => console.log('Navigate to home')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});
