import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  FlatList, 
  RefreshControl,
  StatusBar
} from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Avatar } from '@/components/Avatar';
import { SearchBar } from '@/components/SearchBar';
import { BannerCarousel } from '@/components/BannerCarousel';
import { CategoryMenu } from '@/components/CategoryMenu';
import { Card } from '@/components/Card';
import { CardSkeleton } from '@/components/SkeletonLoader';
import { EmptyState } from '@/components/EmptyState';
import { useAuth } from '@/context/auth';
import { beachService, Beach } from '@/services/beach.service';
import { router } from 'expo-router';

// Category structure for Lampung Beach discovery
const CATEGORIES = [
  { key: 'Semua', label: 'Semua', icon: 'compass-outline' as const },
  { key: 'Populer', label: 'Populer', icon: 'flame-outline' as const },
  { key: 'Keluarga', label: 'Keluarga', icon: 'people-outline' as const },
  { key: 'Petualangan', label: 'Petualangan', icon: 'bonfire-outline' as const },
  { key: 'Eksotis', label: 'Eksotis', icon: 'sparkles-outline' as const },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { user } = useAuth();

  // Screen States
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Load beaches from API / Mock
  const loadBeaches = async (showLoadingIndicator = true) => {
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
  };

  useEffect(() => {
    // Debounce/trigger search or category change
    loadBeaches(true);
  }, [searchQuery, selectedCategory]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadBeaches(false);
  };

  const handleCardPress = (id: number) => {
    router.push(`/beach/${id}` as any);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Greetings Block */}
      <View style={styles.welcomeRow}>
        <View>
          <Text style={[styles.greetingsText, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
            Selamat datang,
          </Text>
          <Text style={[styles.userNameText, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            {user?.name || 'Pengguna Beach-Go'} 👋
          </Text>
        </View>
        <Avatar name={user?.name || 'Guest'} size={48} />
      </View>

      {/* Promos Banner Slider */}
      <View style={styles.carouselWrapper}>
        <BannerCarousel />
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <SearchBar 
          placeholder="Cari pantai Lampung terindah..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories Horizontal Selector */}
      <CategoryMenu 
        categories={CATEGORIES}
        selectedKey={selectedCategory}
        onSelect={(key) => setSelectedCategory(key)}
      />

      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
          Destinasi Pantai
        </Text>
        <Text style={[styles.sectionSubtitle, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>
          {beaches.length} lokasi ditemukan
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {isLoading ? (
        <View style={styles.skeletonList}>
          {/* Skeleton representation of screen loading */}
          <View style={styles.skeletonHeader}>
            <CardSkeleton />
            <CardSkeleton style={{ marginTop: 24 }} />
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
                description="Coba cari dengan kata kunci lain atau pilih kategori pantai yang berbeda."
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
  listContent: {
    paddingBottom: 32,
  },
  headerContainer: {
    paddingTop: 16,
  },
  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greetingsText: {
    fontSize: 13,
  },
  userNameText: {
    fontSize: 20,
    letterSpacing: -0.4,
    marginTop: 2,
  },
  carouselWrapper: {
    marginBottom: 8,
  },
  searchWrapper: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
  },
  sectionSubtitle: {
    fontSize: 12,
  },
  cardWrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  skeletonList: {
    padding: 20,
  },
  skeletonHeader: {
    gap: 20,
  },
  emptyContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
});
