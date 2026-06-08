import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  Pressable, 
  Platform,
  StatusBar
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { Toast } from '@/components/Toast';
import { RatingDisplay } from '@/components/RatingDisplay';
import { beachService, Beach } from '@/services/beach.service';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeStorage } from '@/utils/storage';

// Helper to map facilities to standard icons
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
  return 'checkmark-circle-outline';
};

export default function BeachDetailScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { id } = useLocalSearchParams();
  const beachId = parseInt(typeof id === 'string' ? id : '1', 10);

  // States
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
    // Load beach data
    async function loadData() {
      const data = await beachService.getBeachById(beachId);
      setBeach(data);
      
      // Load bookmark status
      try {
        const bookmarks = await SafeStorage.getItem<number[]>('@BeachGo:bookmarks');
        if (bookmarks) {
          setIsBookmarked(bookmarks.includes(beachId));
        }
      } catch (e) {
        console.warn('Failed to load bookmark status:', e);
      }
    }
    loadData();
  }, [beachId]);

  // Toggle local bookmark storage
  const handleToggleBookmark = async () => {
    if (!beach) return;
    try {
      let bookmarks = await SafeStorage.getItem<number[]>('@BeachGo:bookmarks') || [];

      if (isBookmarked) {
        bookmarks = bookmarks.filter(id => id !== beachId);
        setIsBookmarked(false);
        showToast('Pantai dihapus dari favorit', 'info');
      } else {
        bookmarks.push(beachId);
        setIsBookmarked(true);
        showToast('Pantai ditambahkan ke favorit!', 'success');
      }

      await SafeStorage.setItem('@BeachGo:bookmarks', bookmarks);
    } catch (e) {
      console.warn('Failed to save bookmark:', e);
      showToast('Gagal memproses bookmark', 'error');
    }
  };

  if (!beach) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Detail Pantai" showBackButton={true} />
        <View style={styles.loadingContainer}>
          <Text style={{ color: colors.foreground, fontFamily: Fonts.medium }}>Memuat info pantai...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Right side header action (Bookmark / Heart Icon)
  const bookmarkAction = (
    <Pressable onPress={handleToggleBookmark} style={styles.bookmarkHeaderBtn}>
      <Ionicons 
        name={isBookmarked ? 'heart' : 'heart-outline'} 
        size={24} 
        color={isBookmarked ? colors.destructive : colors.foreground} 
      />
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <Header title={beach.name} showBackButton={true} rightAction={bookmarkAction} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Cover image of beach */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: beach.imageUrl }} 
            style={styles.coverImage}
            contentFit="cover"
          />
          {/* Badge overlays */}
          <View style={[styles.categoryBadge, { backgroundColor: colors.primary }]}>
            <Text style={[styles.categoryText, { color: colors.primaryForeground, fontFamily: Fonts.bold }]}>
              {beach.category}
            </Text>
          </View>
        </View>

        {/* Info detail content */}
        <View style={styles.infoWrapper}>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color={colors.primary} />
            <Text style={[styles.locationText, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
              {beach.location}
            </Text>
          </View>

          <Text style={[styles.titleText, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            {beach.name}
          </Text>

          {/* Ratings Display */}
          <View style={styles.ratingRow}>
            <RatingDisplay rating={beach.rating} maxRating={5} />
            <Text style={[styles.ratingCountText, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>
              ({beach.rating.toFixed(1)} / 5.0 Rating Destinasi)
            </Text>
          </View>

          {/* Description Section */}
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionHeading, { color: colors.foreground, fontFamily: Fonts.bold }]}>
              Deskripsi Pantai
            </Text>
            <Text style={[styles.descriptionText, { color: colors.foreground, fontFamily: Fonts.regular }]}>
              {beach.description}
            </Text>
          </View>

          {/* Facilities Section */}
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionHeading, { color: colors.foreground, fontFamily: Fonts.bold }]}>
              Fasilitas Destinasi
            </Text>
            <View style={styles.facilitiesGrid}>
              {beach.facilities.map((fac, idx) => (
                <View 
                  key={idx} 
                  style={[
                    styles.facilityItem, 
                    { 
                      borderColor: colors.border, 
                      backgroundColor: colors.card 
                    }
                  ]}
                >
                  <Ionicons name={getFacilityIcon(fac)} size={18} color={colors.foreground} />
                  <Text style={[styles.facilityLabel, { color: colors.foreground, fontFamily: Fonts.medium }]}>
                    {fac}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View style={[styles.bottomActionBar, { borderTopColor: colors.border, backgroundColor: colors.card }]}>
        <View>
          <Text style={[styles.priceLabel, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
            Harga Tiket Masuk
          </Text>
          <Text style={[styles.priceValue, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            Rp {beach.ticketPrice.toLocaleString('id-ID')}
            <Text style={[styles.priceSubText, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}> /orang</Text>
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

      {/* Toast Feedback */}
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
  bookmarkHeaderBtn: {
    padding: 6,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 13,
  },
  titleText: {
    fontSize: 24,
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  ratingCountText: {
    fontSize: 12,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 16,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  facilityLabel: {
    fontSize: 12,
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    ...Platform.select({
      ios: {
        paddingBottom: 32,
      },
    }),
  },
  priceLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 18,
  },
  priceSubText: {
    fontSize: 11,
  },
  bookBtn: {
    paddingHorizontal: 24,
  },
});
