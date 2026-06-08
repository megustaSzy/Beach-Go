import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  ActivityIndicator
} from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Divider } from '@/components/Divider';
import { bookingService, Booking } from '@/services/booking.service';
import { useLocalSearchParams, router } from 'expo-router';

export default function TicketDetailScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { id } = useLocalSearchParams();
  const ticketId = typeof id === 'string' ? id : '';

  // States
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTicket() {
      setIsLoading(true);
      const data = await bookingService.getBookingById(ticketId);
      setBooking(data);
      setIsLoading(false);
    }
    loadTicket();
  }, [ticketId]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Detail Tiket" showBackButton={true} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!booking) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Detail Tiket" showBackButton={true} />
        <View style={styles.loadingContainer}>
          <Text style={{ color: colors.foreground, fontFamily: Fonts.bold }}>Tiket tidak ditemukan</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="E-Tiket Masuk" showBackButton={true} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* TICKET STUB FRAME */}
        <View style={[styles.ticketStub, { borderColor: colors.border, backgroundColor: colors.card }]}>
          {/* Header */}
          <View style={styles.ticketHeader}>
            <Text style={[styles.beachName, { color: colors.foreground, fontFamily: Fonts.bold }]}>
              {booking.beachName}
            </Text>
            <Badge variant="default" style={styles.statusBadge}>LUNAS</Badge>
          </View>

          <Divider style={{ marginVertical: 14 }} />

          {/* Ticket Information */}
          <View style={styles.infoGrid}>
            <View style={styles.infoCol}>
              <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>ID Transaksi</Text>
              <Text style={[styles.infoVal, { color: colors.foreground, fontFamily: Fonts.semiBold }]}>{booking.id}</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Pengunjung</Text>
              <Text style={[styles.infoVal, { color: colors.foreground, fontFamily: Fonts.semiBold }]}>{booking.quantity} Orang</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Tanggal Masuk</Text>
              <Text style={[styles.infoVal, { color: colors.foreground, fontFamily: Fonts.semiBold }]}>{booking.visitDate}</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Metode Bayar</Text>
              <Text style={[styles.infoVal, { color: colors.foreground, fontFamily: Fonts.semiBold, textTransform: 'uppercase' }]}>{booking.paymentMethod}</Text>
            </View>
          </View>

          {/* Perforated dashed separator line */}
          <View style={styles.perforationRow}>
            <View style={[styles.perforationCircleLeft, { backgroundColor: colors.background, borderColor: colors.border }]} />
            <View style={[styles.dashedLine, { borderStyle: 'dashed', borderColor: colors.border }]} />
            <View style={[styles.perforationCircleRight, { backgroundColor: colors.background, borderColor: colors.border }]} />
          </View>

          {/* HIGH FIDELITY SIMULATED QR CODE GRID */}
          <View style={styles.qrSection}>
            <View style={[styles.qrFrame, { borderColor: colors.foreground }]}>
              {/* Outer scanner guides */}
              <View style={[styles.scannerCorner, styles.topRight, { borderColor: colors.primary }]} />
              <View style={[styles.scannerCorner, styles.topLeft, { borderColor: colors.primary }]} />
              <View style={[styles.scannerCorner, styles.bottomRight, { borderColor: colors.primary }]} />
              <View style={[styles.scannerCorner, styles.bottomLeft, { borderColor: colors.primary }]} />
              
              {/* Custom CSS design block mimicking real QR code matrix */}
              <View style={[styles.qrPatternGrid, { backgroundColor: colors.foreground }]}>
                {/* Simulated QR block details */}
                <View style={[styles.qrBlockAnchor, styles.topL, { backgroundColor: colors.background, borderColor: colors.foreground }]} />
                <View style={[styles.qrBlockAnchor, styles.topR, { backgroundColor: colors.background, borderColor: colors.foreground }]} />
                <View style={[styles.qrBlockAnchor, styles.botL, { backgroundColor: colors.background, borderColor: colors.foreground }]} />
                {/* Center visual scanner laser bar */}
                <View style={[styles.qrCenterDot, { backgroundColor: colors.background }]} />
              </View>
            </View>

            <Text style={[styles.qrCodeText, { color: colors.foreground, fontFamily: Fonts.bold }]}>
              {booking.qrCode}
            </Text>
            <Text style={[styles.qrTipText, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
              Tunjukkan kode QR ini ke petugas tiket di pintu gerbang masuk pantai Lampung.
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <Button 
          title="Kembali ke Riwayat" 
          variant="outline" 
          size="lg" 
          fullWidth={true}
          onPress={() => router.replace('/(tabs)/history')}
          style={styles.backBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  ticketStub: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
    overflow: 'hidden',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  beachName: {
    fontSize: 18,
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    rowGap: 20,
    paddingVertical: 6,
  },
  infoCol: {
    width: '46%',
  },
  infoLabel: {
    fontSize: 10,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  infoVal: {
    fontSize: 13,
  },
  perforationRow: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -25,
    marginVertical: 12,
  },
  perforationCircleLeft: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: -10,
  },
  perforationCircleRight: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: -10,
  },
  dashedLine: {
    flex: 1,
    borderWidth: 0.5,
    height: 1,
    marginHorizontal: 12,
  },
  qrSection: {
    alignItems: 'center',
    paddingTop: 12,
  },
  qrFrame: {
    position: 'relative',
    width: 170,
    height: 170,
    padding: 16,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scannerCorner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 16,
  },
  topRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopRightRadius: 16,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 16,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 16,
  },
  qrPatternGrid: {
    width: 120,
    height: 120,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  qrBlockAnchor: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderWidth: 8,
    borderRadius: 6,
  },
  topL: {
    top: 6,
    left: 6,
  },
  topR: {
    top: 6,
    right: 6,
  },
  botL: {
    bottom: 6,
    left: 6,
  },
  qrCenterDot: {
    position: 'absolute',
    top: 48,
    left: 48,
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  qrCodeText: {
    fontSize: 14,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  qrTipText: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 8,
  },
  backBtn: {
    marginTop: 24,
  },
});
