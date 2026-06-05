import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  FlatList, 
  Pressable, 
  RefreshControl,
  StatusBar
} from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from '@/components/Header';
import { EmptyState } from '@/components/EmptyState';
import { Badge } from '@/components/Badge';
import { bookingService, Booking } from '@/services/booking.service';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type ActiveTab = 'ACTIVE' | 'PAST';

export default function HistoryScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  // States
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('ACTIVE');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadBookings = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    try {
      const data = await bookingService.getBookings();
      setBookings(data);
    } catch (e) {
      console.error('Failed to load bookings:', e);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadBookings(true);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadBookings(false);
  };

  // Filter bookings based on selected Tab
  // PAID/PENDING go to ACTIVE, COMPLETED/CANCELLED go to PAST
  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'ACTIVE') {
      return b.status === 'PAID' || b.status === 'PENDING';
    } else {
      return b.status === 'COMPLETED' || b.status === 'CANCELLED';
    }
  });

  const getStatusBadgeVariant = (status: Booking['status']) => {
    switch (status) {
      case 'PAID': return 'default';
      case 'COMPLETED': return 'secondary';
      case 'PENDING': return 'outline';
      case 'CANCELLED': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: Booking['status']) => {
    switch (status) {
      case 'PAID': return 'Aktif';
      case 'COMPLETED': return 'Selesai';
      case 'PENDING': return 'Belum Bayar';
      case 'CANCELLED': return 'Batal';
      default: return status;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <Header title="Tiket Saya" showBackButton={false} />

      {/* Tabs Selector Header */}
      <View style={[styles.tabsRow, { borderBottomColor: colors.border }]}>
        <Pressable 
          onPress={() => setActiveTab('ACTIVE')}
          style={[
            styles.tabItem, 
            activeTab === 'ACTIVE' && [styles.activeTabItem, { borderBottomColor: colors.primary }]
          ]}
        >
          <Text 
            style={[
              styles.tabLabel, 
              { 
                color: activeTab === 'ACTIVE' ? colors.foreground : colors.mutedForeground,
                fontFamily: activeTab === 'ACTIVE' ? Fonts.bold : Fonts.medium
              }
            ]}
          >
            Aktif
          </Text>
        </Pressable>
        <Pressable 
          onPress={() => setActiveTab('PAST')}
          style={[
            styles.tabItem, 
            activeTab === 'PAST' && [styles.activeTabItem, { borderBottomColor: colors.primary }]
          ]}
        >
          <Text 
            style={[
              styles.tabLabel, 
              { 
                color: activeTab === 'PAST' ? colors.foreground : colors.mutedForeground,
                fontFamily: activeTab === 'PAST' ? Fonts.bold : Fonts.medium
              }
            ]}
          >
            Riwayat
          </Text>
        </Pressable>
      </View>

      {/* Tickets List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={{ color: colors.mutedForeground, fontFamily: Fonts.medium }}>Memuat riwayat tiket...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredBookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable 
              onPress={() => router.push(`/history/${item.id}` as any)}
              style={[
                styles.ticketCard, 
                { 
                  borderColor: colors.border, 
                  backgroundColor: colors.card 
                }
              ]}
            >
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <View>
                  <Text style={[styles.beachName, { color: colors.foreground, fontFamily: Fonts.bold }]}>
                    {item.beachName}
                  </Text>
                  <View style={styles.metaRow}>
                    <Ionicons name="calendar-outline" size={13} color={colors.mutedForeground} />
                    <Text style={[styles.metaText, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>
                      {item.visitDate}
                    </Text>
                  </View>
                </View>
                <Badge 
                  variant={getStatusBadgeVariant(item.status)}
                  style={styles.statusBadge}
                >
                  {getStatusLabel(item.status)}
                </Badge>
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              {/* Card Footer */}
              <View style={styles.cardFooter}>
                <View>
                  <Text style={[styles.footerLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>ID Transaksi</Text>
                  <Text style={[styles.footerValue, { color: colors.foreground, fontFamily: Fonts.semiBold }]}>{item.id}</Text>
                </View>
                <View style={styles.footerRight}>
                  <Text style={[styles.footerLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular, textAlign: 'right' }]}>Total Bayar</Text>
                  <Text style={[styles.footerValue, { color: colors.primary, fontFamily: Fonts.bold }]}>
                    Rp {item.totalPrice.toLocaleString('id-ID')}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <EmptyState 
                title={activeTab === 'ACTIVE' ? "Tidak Ada Tiket Aktif" : "Belum Ada Riwayat Tiket"}
                description={
                  activeTab === 'ACTIVE' 
                    ? "Anda tidak memiliki tiket pantai yang aktif saat ini. Yuk, pesan tiket sekarang!"
                    : "Anda belum memiliki riwayat pembelian tiket di masa lampau."
                }
                actionLabel={activeTab === 'ACTIVE' ? "Beli Tiket" : undefined}
                onActionPress={activeTab === 'ACTIVE' ? () => router.replace('/(tabs)') : undefined}
              />
            </View>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={isRefreshing} 
              onRefresh={handleRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomWidth: 2,
  },
  tabLabel: {
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  ticketCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  beachName: {
    fontSize: 16,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  footerValue: {
    fontSize: 13,
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
});
