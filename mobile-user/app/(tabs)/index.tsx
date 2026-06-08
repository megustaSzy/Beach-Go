import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
  StatusBar,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Avatar } from '@/components/Avatar';
import { SearchBar } from '@/components/SearchBar';
import { BannerCarousel } from '@/components/BannerCarousel';
import { Card } from '@/components/Card';
import { CardSkeleton } from '@/components/SkeletonLoader';
import { EmptyState } from '@/components/EmptyState';
import { useAuth } from '@/context/auth';
import { beachService, Beach } from '@/services/beach.service';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { key: 'Semua', label: 'Semua', icon: 'compass-outline' as const },
  { key: 'Populer', label: 'Populer', icon: 'flame-outline' as const },
  { key: 'Keluarga', label: 'Keluarga', icon: 'people-outline' as const },
  { key: 'Petualangan', label: 'Petualangan', icon: 'bonfire-outline' as const },
  { key: 'Eksotis', label: 'Eksotis', icon: 'sparkles-outline' as const },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const { user } = useAuth();

  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const loadBeaches = useCallback(async (showLoadingIndicator = true) => {
    if (showLoadingIndicator) setIsLoading(true);
    try {
      const data = await beachService.getBeaches(searchQuery, selectedCategory);
      setBeaches(data);
    } catch (e) {
      console.error('Failed to load beaches:', e);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    loadBeaches(true);
  }, [loadBeaches]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadBeaches(false);
  };

  const handleCardPress = (id: number) => {
    router.push(`/beach/${id}` as any);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  const renderHeader = () => (
    <View>
      {/* Hero Welcome Section */}
      <LinearGradient
        colors={['#0ea5e9', '#0284c7', '#0369a1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroGradient}
      >
        <View style={styles.welcomeRow}>
          <View style={styles.welcomeLeft}>
            <Text style={styles.greetingText}>{getGreeting()} 👋</Text>
            <Text style={styles.userNameText} numberOfLines={1}>
              {user?.name || 'Pengguna Demo'}
            </Text>
            <Text style={styles.subTagline}>Temukan pantai terbaik Lampung</Text>
          </View>
          <View style={styles.avatarWrapper}>
            <Avatar name={user?.name || 'Guest'} size={52} />
          </View>
        </View>

        {/* Search Bar inside hero */}
        <View style={styles.searchWrapper}>
          <SearchBar
            placeholder="Cari pantai Lampung terindah..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </LinearGradient>

      {/* Banner Carousel */}
      <View style={styles.carouselSection}>
        <BannerCarousel />
      </View>

      {/* Category Filter */}
      <View style={styles.categorySection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <Pressable
                key={cat.key}
                onPress={() => setSelectedCategory(cat.key)}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: isActive ? '#0ea5e9' : colors.card,
                    borderColor: isActive ? '#0ea5e9' : colors.border,
                  },
                ]}
              >
                <Ionicons
                  name={cat.icon}
                  size={15}
                  color={isActive ? '#fff' : colors.mutedForeground}
                />
                <Text
                  style={[
                    styles.categoryLabel,
                    {
                      color: isActive ? '#fff' : colors.mutedForeground,
                      fontFamily: isActive ? Fonts.bold : Fonts.medium,
                    },
                  ]}
                >
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Section title */}
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
          Destinasi Pantai
        </Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{beaches.length} lokasi</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0ea5e9" />

      {isLoading ? (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={[styles.heroGradient, { height: 200 }]} />
          <View style={styles.skeletonPad}>
            <CardSkeleton />
            <CardSkeleton style={{ marginTop: 20 }} />
          </View>
        </View>
      ) : (
        <FlatList
          data={beaches}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <Card
                title={item.name}
                description={item.description}
                location={item.location}
                rating={item.rating}
                price={`Rp ${item.ticketPrice.toLocaleString('id-ID')}`}
                imageUrl={item.imageUrl}
                badgeText={item.category}
                onPress={() => handleCardPress(item.id)}
              />
            </View>
          )}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <EmptyState
                title="Pantai Tidak Ditemukan"
                description="Coba cari dengan kata kunci lain atau pilih kategori yang berbeda."
                actionLabel="Reset Pencarian"
                onActionPress={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                }}
              />
            </View>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#0ea5e9']}
              tintColor={'#0ea5e9'}
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
  heroGradient: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  welcomeLeft: {
    flex: 1,
    marginRight: 12,
  },
  greetingText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: Fonts.medium,
    marginBottom: 2,
  },
  userNameText: {
    fontSize: 22,
    color: '#ffffff',
    fontFamily: Fonts.bold,
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  subTagline: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    fontFamily: Fonts.regular,
  },
  avatarWrapper: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
  },
  searchWrapper: {
    marginTop: 4,
  },
  carouselSection: {
    marginTop: -16,
    marginHorizontal: 16,
    marginBottom: 4,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  categorySection: {
    marginTop: 16,
    marginBottom: 4,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryLabel: {
    fontSize: 13,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    letterSpacing: -0.3,
  },
  countBadge: {
    backgroundColor: '#0ea5e914',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontSize: 12,
    color: '#0ea5e9',
    fontFamily: Fonts.semiBold,
  },
  listContent: {
    paddingBottom: 40,
  },
  cardWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  skeletonPad: {
    padding: 20,
    gap: 20,
  },
  emptyContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
});
