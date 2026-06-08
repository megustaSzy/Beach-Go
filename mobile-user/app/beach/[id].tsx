import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button } from '@/components/Button';
import { Toast } from '@/components/Toast';
import { RatingDisplay } from '@/components/RatingDisplay';
import { beachService, Beach } from '@/services/beach.service';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeStorage } from '@/utils/storage';

const { width } = Dimensions.get('window');

const getFacilityIcon = (facility: string): keyof typeof Ionicons.glyphMap => {
  const name = facility.toLowerCase();
  if (name.includes('parkir')) return 'car-outline';
  if (name.includes('mandi') || name.includes('bilas')) return 'water-outline';
  if (name.includes('makan') || name.includes('warung') || name.includes('kuliner')) return 'restaurant-outline';
  if (name.includes('perahu') || name.includes('boat')) return 'boat-outline';
  if (name.includes('masjid') || name.includes('mushola')) return 'business-outline';
  if (name.includes('camp') || name.includes('tenda')) return 'trail-sign-outline';
  if (name.includes('foto') || name.includes('spot')) return 'camera-outline';
  if (name.includes('stay') || name.includes('villa')) return 'home-outline';
  if (name.includes('cafe') || name.includes('bar') || name.includes('kopi')) return 'cafe-outline';
  if (name.includes('penyu')) return 'fish-outline';
  if (name.includes('sport') || name.includes('water')) return 'water-outline';
  return 'checkmark-circle-outline';
};

export default function BeachDetailScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const { id } = useLocalSearchParams();
  const beachId = parseInt(typeof id === 'string' ? id : '1', 10);

  const [beach, setBeach] = useState<Beach | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  useEffect(() => {
    async function loadData() {
      const data = await beachService.getBeachById(beachId);
      setBeach(data);
      try {
        const bookmarks = await SafeStorage.getItem<number[]>('@BeachGo:bookmarks');
        if (bookmarks) setIsBookmarked(bookmarks.includes(beachId));
      } catch (e) {
        console.warn('Failed to load bookmark status:', e);
      }
    }
    loadData();
  }, [beachId]);

  const handleToggleBookmark = async () => {
    if (!beach) return;
    try {
      let bookmarks = await SafeStorage.getItem<number[]>('@BeachGo:bookmarks') || [];
      if (isBookmarked) {
        bookmarks = bookmarks.filter((bid) => bid !== beachId);
        setIsBookmarked(false);
        showToast('Dihapus dari favorit', 'info');
      } else {
        bookmarks.push(beachId);
        setIsBookmarked(true);
        showToast('Ditambahkan ke favorit! ❤️', 'success');
      }
      await SafeStorage.setItem('@BeachGo:bookmarks', bookmarks);
    } catch (e) {
      showToast('Gagal memproses bookmark', 'error');
    }
  };

  if (!beach) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="light-content" />
        <View style={styles.loadingContainer}>
          <Ionicons name="hourglass-outline" size={40} color={colors.mutedForeground} />
          <Text style={[styles.loadingText, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
            Memuat informasi pantai...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >
        {/* Hero Image with Gradient Overlay */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: beach.imageUrl }}
            style={styles.heroImage}
            contentFit="cover"
            transition={400}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.55)', 'transparent', 'rgba(0,0,0,0.3)']}
            style={StyleSheet.absoluteFillObject}
          />

          {/* Back Button */}
          <Pressable
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <View style={styles.iconBtnCircle}>
              <Ionicons name="arrow-back" size={20} color="#fff" />
            </View>
          </Pressable>

          {/* Bookmark Button */}
          <Pressable
            onPress={handleToggleBookmark}
            style={styles.bookmarkBtn}
          >
            <View style={[styles.iconBtnCircle, isBookmarked && styles.bookmarkActive]}>
              <Ionicons
                name={isBookmarked ? 'heart' : 'heart-outline'}
                size={20}
                color={isBookmarked ? '#ef4444' : '#fff'}
              />
            </View>
          </Pressable>

          {/* Category Badge */}
          <View style={styles.heroBadgeContainer}>
            <View style={[styles.heroCategoryBadge]}>
              <Ionicons name="flag" size={11} color="#fff" />
              <Text style={styles.heroCategoryText}>{beach.category.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        {/* Content Card */}
        <View style={[styles.contentCard, { backgroundColor: colors.background }]}>
          {/* Title & Location */}
          <View style={styles.titleBlock}>
            <Text style={[styles.beachTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
              {beach.name}
            </Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={14} color="#0ea5e9" />
              <Text style={[styles.locationText, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
                {beach.location}
              </Text>
            </View>
          </View>

          {/* Stats Row */}
          <View style={[styles.statsRow, { borderColor: colors.border }]}>
            <View style={styles.statItem}>
              <RatingDisplay rating={beach.rating} maxRating={5} size={16} showValue={true} />
              <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Rating</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.foreground, fontFamily: Fonts.bold }]}>
                {beach.facilities.length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Fasilitas</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#0ea5e9', fontFamily: Fonts.bold }]}>
                Rp {(beach.ticketPrice / 1000).toFixed(0)}K
              </Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>Tiket</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
              Tentang Pantai
            </Text>
            <Text style={[styles.descText, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>
              {beach.description}
            </Text>
          </View>

          {/* Facilities */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
              Fasilitas Tersedia
            </Text>
            <View style={styles.facilitiesGrid}>
              {beach.facilities.map((fac, idx) => (
                <View
                  key={idx}
                  style={[styles.facilityChip, { borderColor: colors.border, backgroundColor: colors.card }]}
                >
                  <View style={[styles.facilityIconWrap, { backgroundColor: '#0ea5e914' }]}>
                    <Ionicons name={getFacilityIcon(fac)} size={16} color="#0ea5e9" />
                  </View>
                  <Text style={[styles.facilityLabel, { color: colors.foreground, fontFamily: Fonts.medium }]}>
                    {fac}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={[styles.bottomBar, { borderTopColor: colors.border, backgroundColor: colors.card }]}>
        <View>
          <Text style={[styles.priceLabel, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
            Harga Tiket / Orang
          </Text>
          <Text style={[styles.priceValue, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            Rp {beach.ticketPrice.toLocaleString('id-ID')}
          </Text>
        </View>
        <Button
          title="Pesan Tiket"
          variant="primary"
          size="md"
          onPress={() => router.push(`/booking/${beach.id}` as any)}
          style={styles.bookBtn}
        />
      </View>

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    marginTop: 8,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 44 : 16,
    left: 16,
  },
  bookmarkBtn: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 44 : 16,
    right: 16,
  },
  iconBtnCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(8px)',
  },
  bookmarkActive: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  heroBadgeContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  heroCategoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  heroCategoryText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: Fonts.bold,
    letterSpacing: 0.8,
  },
  contentCard: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  titleBlock: {
    marginBottom: 20,
  },
  beachTitle: {
    fontSize: 26,
    letterSpacing: -0.6,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 13,
  },
  statsRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 18,
  },
  statLabel: {
    fontSize: 11,
  },
  statDivider: {
    width: 1,
    marginVertical: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  descText: {
    fontSize: 14,
    lineHeight: 22,
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  facilityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 12,
    paddingVertical: 8,
    paddingLeft: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  facilityIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facilityLabel: {
    fontSize: 12,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    borderTopWidth: 1,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  priceLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 20,
    letterSpacing: -0.5,
  },
  bookBtn: {
    paddingHorizontal: 28,
  },
});
