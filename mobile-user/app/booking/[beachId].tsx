import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  Pressable, 
  Platform,
  ActivityIndicator
} from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { Toast } from '@/components/Toast';
import { Ionicons } from '@expo/vector-icons';
import { beachService, Beach } from '@/services/beach.service';
import { bookingService } from '@/services/booking.service';
import { useLocalSearchParams, router } from 'expo-router';

const PAYMENT_METHODS = [
  { id: 'bca', label: 'BCA Virtual Account', icon: 'wallet-outline' },
  { id: 'gopay', label: 'GoPay / QRIS', icon: 'qr-code-outline' },
  { id: 'dana', label: 'DANA E-Wallet', icon: 'phone-portrait-outline' },
];

export default function BookingScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { beachId } = useLocalSearchParams();
  const id = parseInt(typeof beachId === 'string' ? beachId : '1', 10);

  // States
  const [beach, setBeach] = useState<Beach | null>(null);
  const [visitDate, setVisitDate] = useState('Pilih Tanggal');
  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('bca');
  
  // Additional Option States
  const [rentGazebo, setRentGazebo] = useState(false);
  const [hireGuide, setHireGuide] = useState(false);

  // Actions states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

  // Simple Custom Date List for mock selection (avoiding native datepicker errors)
  const [showDatesModal, setShowDatesModal] = useState(false);
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  useEffect(() => {
    async function loadBeach() {
      const data = await beachService.getBeachById(id);
      setBeach(data);
    }
    loadBeach();
  }, [id]);

  if (!beach) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Pesan Tiket" showBackButton={true} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // Calculate pricing
  const ticketCost = beach.ticketPrice * quantity;
  const gazeboCost = rentGazebo ? 50000 : 0;
  const guideCost = hireGuide ? 100000 : 0;
  const totalCost = ticketCost + gazeboCost + guideCost;

  const handleCheckout = async () => {
    if (visitDate === 'Pilih Tanggal') {
      showToast('Harap tentukan tanggal kunjungan Anda', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await bookingService.createBooking(
        beach.id,
        beach.name,
        visitDate,
        quantity,
        totalCost,
        selectedPayment
      );

      setIsSubmitting(false);
      showToast('Pemesanan tiket berhasil diproses!', 'success');
      
      // Redirect to success screen with parameters
      setTimeout(() => {
        router.replace({
          pathname: '/booking/success',
          params: {
            beachName: beach.name,
            totalPrice: totalCost.toString(),
            quantity: quantity.toString(),
            ticketId: result.id,
            visitDate
          }
        });
      }, 1000);
    } catch (e) {
      setIsSubmitting(false);
      showToast('Gagal memproses pembelian tiket.', 'error');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Pesan Tiket" showBackButton={true} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* BEACH SUMMARY SUMMARY */}
        <View style={[styles.card, { borderColor: colors.border, backgroundColor: colors.card }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            {beach.name}
          </Text>
          <Text style={[styles.cardLocation, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
            <Ionicons name="location-outline" size={12} /> {beach.location}
          </Text>
          <Text style={[styles.cardPrice, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            Rp {beach.ticketPrice.toLocaleString('id-ID')} / orang
          </Text>
        </View>

        {/* VISIT DATE SELECTOR */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            Tanggal Kunjungan
          </Text>
          <Pressable 
            style={[styles.selectorBtn, { borderColor: colors.border, backgroundColor: colors.card }]}
            onPress={() => setShowDatesModal(!showDatesModal)}
          >
            <Text style={[styles.selectorBtnText, { color: colors.foreground, fontFamily: Fonts.medium }]}>
              {visitDate}
            </Text>
            <Ionicons name="calendar-outline" size={20} color={colors.primary} />
          </Pressable>
          
          {showDatesModal && (
            <View style={[styles.datesModal, { borderColor: colors.border, backgroundColor: colors.card }]}>
              {availableDates.map((d, index) => (
                <Pressable
                  key={index}
                  style={[styles.dateItem, { borderBottomColor: colors.border }]}
                  onPress={() => {
                    setVisitDate(d);
                    setShowDatesModal(false);
                  }}
                >
                  <Text style={[styles.dateItemText, { color: colors.foreground, fontFamily: Fonts.regular }]}>{d}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* TICKET QUANTITY */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            Jumlah Tiket
          </Text>
          <View style={styles.qtyRow}>
            <Text style={[styles.qtyLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>
              Tiket Dewasa / Anak
            </Text>
            <View style={styles.qtyControls}>
              <Pressable 
                onPress={() => setQuantity(prev => Math.max(1, prev - 1))}
                style={[styles.qtyBtn, { borderColor: colors.border, backgroundColor: colors.card }]}
              >
                <Ionicons name="remove" size={18} color={colors.foreground} />
              </Pressable>
              <Text style={[styles.qtyText, { color: colors.foreground, fontFamily: Fonts.bold }]}>
                {quantity}
              </Text>
              <Pressable 
                onPress={() => setQuantity(prev => prev + 1)}
                style={[styles.qtyBtn, { borderColor: colors.border, backgroundColor: colors.card }]}
              >
                <Ionicons name="add" size={18} color={colors.foreground} />
              </Pressable>
            </View>
          </View>
        </View>

        {/* ADDITIONAL SERVICES */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            Fasilitas Tambahan (Opsional)
          </Text>
          
          {/* Gazebo Rent */}
          <Pressable 
            onPress={() => setRentGazebo(prev => !prev)}
            style={[
              styles.optionCard, 
              { 
                borderColor: rentGazebo ? colors.primary : colors.border,
                backgroundColor: colors.card
              }
            ]}
          >
            <View style={styles.optionInfo}>
              <Ionicons 
                name={rentGazebo ? "checkbox" : "square-outline"} 
                size={22} 
                color={rentGazebo ? colors.primary : colors.mutedForeground} 
              />
              <View>
                <Text style={[styles.optionLabel, { color: colors.foreground, fontFamily: Fonts.semiBold }]}>Sewa Pondok / Gazebo</Text>
                <Text style={[styles.optionSubLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Gazebo tepi laut untuk beristirahat</Text>
              </View>
            </View>
            <Text style={[styles.optionPrice, { color: colors.foreground, fontFamily: Fonts.bold }]}>+Rp 50.000</Text>
          </Pressable>

          {/* Tour Guide */}
          <Pressable 
            onPress={() => setHireGuide(prev => !prev)}
            style={[
              styles.optionCard, 
              { 
                borderColor: hireGuide ? colors.primary : colors.border,
                backgroundColor: colors.card,
                marginTop: 10
              }
            ]}
          >
            <View style={styles.optionInfo}>
              <Ionicons 
                name={hireGuide ? "checkbox" : "square-outline"} 
                size={22} 
                color={hireGuide ? colors.primary : colors.mutedForeground} 
              />
              <View>
                <Text style={[styles.optionLabel, { color: colors.foreground, fontFamily: Fonts.semiBold }]}>Pemandu Wisata Lokal</Text>
                <Text style={[styles.optionSubLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Temani perjalanan dan foto estetik</Text>
              </View>
            </View>
            <Text style={[styles.optionPrice, { color: colors.foreground, fontFamily: Fonts.bold }]}>+Rp 100.000</Text>
          </Pressable>
        </View>

        {/* PAYMENT METHOD SELECTOR */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            Metode Pembayaran
          </Text>
          {PAYMENT_METHODS.map((method) => {
            const isSelected = selectedPayment === method.id;
            return (
              <Pressable
                key={method.id}
                onPress={() => setSelectedPayment(method.id)}
                style={[
                  styles.paymentCard,
                  {
                    borderColor: isSelected ? colors.primary : colors.border,
                    backgroundColor: colors.card
                  }
                ]}
              >
                <View style={styles.paymentInfo}>
                  <Ionicons name={method.icon as any} size={20} color={colors.foreground} />
                  <Text style={[styles.paymentLabel, { color: colors.foreground, fontFamily: Fonts.medium }]}>
                    {method.label}
                  </Text>
                </View>
                <View style={[
                  styles.radioOuter,
                  { borderColor: isSelected ? colors.primary : colors.border }
                ]}>
                  {isSelected && <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* BILLING BREAKDOWN */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            Rincian Pembayaran
          </Text>
          <View style={[styles.billContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <View style={styles.billRow}>
              <Text style={[styles.billLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>
                Tiket Kunjungan ({quantity}x)
              </Text>
              <Text style={[styles.billValue, { color: colors.foreground, fontFamily: Fonts.medium }]}>
                Rp {ticketCost.toLocaleString('id-ID')}
              </Text>
            </View>
            
            {rentGazebo && (
              <View style={styles.billRow}>
                <Text style={[styles.billLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Gazebo Rental</Text>
                <Text style={[styles.billValue, { color: colors.foreground, fontFamily: Fonts.medium }]}>Rp 50.000</Text>
              </View>
            )}

            {hireGuide && (
              <View style={styles.billRow}>
                <Text style={[styles.billLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Pemandu Wisata</Text>
                <Text style={[styles.billValue, { color: colors.foreground, fontFamily: Fonts.medium }]}>Rp 100.000</Text>
              </View>
            )}

            <View style={[styles.billDivider, { backgroundColor: colors.border }]} />

            <View style={styles.billRow}>
              <Text style={[styles.totalLabel, { color: colors.foreground, fontFamily: Fonts.bold }]}>Total Pembayaran</Text>
              <Text style={[styles.totalValue, { color: colors.primary, fontFamily: Fonts.bold }]}>
                Rp {totalCost.toLocaleString('id-ID')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* STICKY BOTTOM BUTTON */}
      <View style={[styles.bottomActionBar, { borderTopColor: colors.border, backgroundColor: colors.card }]}>
        <Button 
          title="Konfirmasi & Bayar" 
          variant="primary" 
          size="lg"
          fullWidth={true}
          loading={isSubmitting}
          onPress={handleCheckout}
        />
      </View>

      {/* TOAST FEEDBACK */}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  cardLocation: {
    fontSize: 12,
    marginBottom: 12,
  },
  cardPrice: {
    fontSize: 15,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    marginBottom: 12,
  },
  selectorBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  selectorBtnText: {
    fontSize: 14,
  },
  datesModal: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  dateItem: {
    padding: 14,
    borderBottomWidth: 1,
  },
  dateItemText: {
    fontSize: 13,
  },
  qtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyLabel: {
    fontSize: 13,
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionLabel: {
    fontSize: 13,
  },
  optionSubLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  optionPrice: {
    fontSize: 13,
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentLabel: {
    fontSize: 13,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  billContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  billLabel: {
    fontSize: 13,
  },
  billValue: {
    fontSize: 13,
  },
  billDivider: {
    height: 1,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 14,
  },
  totalValue: {
    fontSize: 16,
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    ...Platform.select({
      ios: {
        paddingBottom: 32,
      },
    }),
  },
});
