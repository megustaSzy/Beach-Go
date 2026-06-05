import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Animated, 
  Platform,
  StatusBar
} from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button } from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

export default function SuccessScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const params = useLocalSearchParams();

  // Extraction of checkout details
  const beachName = params.beachName as string || 'Destinasi Pantai';
  const totalPrice = parseInt(params.totalPrice as string || '0', 10);
  const quantity = params.quantity as string || '1';
  const ticketId = params.ticketId as string || 'TX-XXXXXX';
  const visitDate = params.visitDate as string || 'Tanggal Kunjungan';

  // Animation values
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Parallel animations for checkmark and text
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <View style={styles.content}>
        {/* Animated Checkmark Circle */}
        <Animated.View 
          style={[
            styles.iconCircle, 
            { 
              backgroundColor: colors.primary,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Ionicons name="checkmark" size={48} color={colors.primaryForeground} />
        </Animated.View>

        {/* Animated Titles */}
        <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', width: '100%' }}>
          <Text style={[styles.title, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            Pembayaran Berhasil!
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
            Tiket Anda telah aktif dan siap digunakan.
          </Text>

          {/* Ticket Summary Card */}
          <View style={[styles.receiptCard, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <View style={styles.receiptRow}>
              <Text style={[styles.receiptLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>ID Tiket</Text>
              <Text style={[styles.receiptValue, { color: colors.foreground, fontFamily: Fonts.bold }]}>{ticketId}</Text>
            </View>
            <View style={styles.receiptRow}>
              <Text style={[styles.receiptLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Pantai</Text>
              <Text style={[styles.receiptValue, { color: colors.foreground, fontFamily: Fonts.semiBold }]}>{beachName}</Text>
            </View>
            <View style={styles.receiptRow}>
              <Text style={[styles.receiptLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Tanggal Kunjungan</Text>
              <Text style={[styles.receiptValue, { color: colors.foreground, fontFamily: Fonts.medium }]}>{visitDate}</Text>
            </View>
            <View style={styles.receiptRow}>
              <Text style={[styles.receiptLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Jumlah Pengunjung</Text>
              <Text style={[styles.receiptValue, { color: colors.foreground, fontFamily: Fonts.medium }]}>{quantity} orang</Text>
            </View>
            
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            
            <View style={styles.receiptRow}>
              <Text style={[styles.receiptTotalLabel, { color: colors.foreground, fontFamily: Fonts.bold }]}>Total Bayar</Text>
              <Text style={[styles.receiptTotalValue, { color: colors.primary, fontFamily: Fonts.bold }]}>
                Rp {totalPrice.toLocaleString('id-ID')}
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Action Redirect Buttons */}
      <View style={styles.buttonContainer}>
        <Button 
          title="Lihat Tiket Saya" 
          variant="primary" 
          size="lg"
          fullWidth={true}
          onPress={() => router.replace('/(tabs)/history')}
          style={styles.actionBtn}
        />
        <Button 
          title="Kembali ke Beranda" 
          variant="outline" 
          size="lg"
          fullWidth={true}
          onPress={() => router.replace('/(tabs)')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  receiptCard: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  receiptLabel: {
    fontSize: 12,
  },
  receiptValue: {
    fontSize: 13,
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  receiptTotalLabel: {
    fontSize: 13,
  },
  receiptTotalValue: {
    fontSize: 15,
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 12 : 0,
  },
  actionBtn: {
    marginBottom: 12,
  },
});
