import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import { Card } from '@/components/Card';
import { Header } from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';

export default function IndexScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  // Premium right-side navigation action
  const rightActionIcon = (
    <Pressable 
      onPress={() => console.log('Notification clicked')}
      style={({ pressed }) => [
        { padding: 4 },
        pressed && { opacity: 0.6 }
      ]}
    >
      <Ionicons name="notifications-outline" size={24} color={colors.foreground} />
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* FLOATING HEADER SHOWCASE */}
      <Header 
        title="Beach-Go Components" 
        showBackButton={false} // Home screen does not show back button
        rightAction={rightActionIcon}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            Beach-Go
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
            Mobile UI Components Demo
          </Text>
        </View>

        {/* DESTINATION CARDS SECTION */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            Premium Destination Cards
          </Text>
          
          <View style={styles.gap}>
            <Text style={[styles.subSectionTitle, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
              Vertical Layout (Grid / Highlight)
            </Text>
            
            <Card 
              title="Pantai Sari Ringgung"
              description="Pantai indah dengan pasir putih bersih, masjid terapung Al-Aminah, dan deretan spot foto ayunan estetik di tepi laut."
              location="Pesawaran, Lampung"
              rating={4.8}
              price="Rp 25.000"
              badgeText="Populer"
              imageUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80"
              onPress={() => console.log('Sari Ringgung clicked')}
            />

            <Text style={[styles.subSectionTitle, { color: colors.mutedForeground, fontFamily: Fonts.medium, marginTop: 12 }]}>
              Horizontal Layout (Compact List)
            </Text>
            
            <Card 
              title="Pantai Klara Indah"
              description="Terkenal dengan air lautnya yang sangat tenang dan dangkal, barisan pohon kelapa rindang, serta sangat ramah untuk berenang anak-anak."
              location="Pesawaran, Lampung"
              rating={4.5}
              price="Rp 15.000"
              badgeText="Terdekat"
              layout="horizontal"
              imageUrl="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&auto=format&fit=crop&q=80"
              onPress={() => console.log('Klara clicked')}
            />
          </View>
        </View>

        {/* INPUT FIELDS SECTION */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            Premium Text Inputs
          </Text>
          
          <View style={styles.gap}>
            <InputText 
              label="Email Address"
              placeholder="admin@example.com"
              leftIconName="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <InputText 
              label="Password"
              placeholder="••••••••"
              leftIconName="lock-closed-outline"
              isPassword={true}
              autoCapitalize="none"
            />
            
            <InputText 
              label="Invalid Input (Error State)"
              placeholder="Enter something..."
              leftIconName="alert-circle-outline"
              error="Format email yang dimasukkan tidak valid!"
              defaultValue="salah-email@"
            />
          </View>
        </View>

        {/* BUTTONS SECTION */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            Premium Button Variants
          </Text>
          
          <View style={styles.gap}>
            <Button 
              title="Primary Button" 
              variant="primary"
              onPress={() => console.log('Primary pressed')}
            />
            
            <Button 
              title="Secondary Button" 
              variant="secondary"
              onPress={() => console.log('Secondary pressed')}
            />
            
            <Button 
              title="Outline Button" 
              variant="outline"
              onPress={() => console.log('Outline pressed')}
            />
            
            <Button 
              title="Ghost Button" 
              variant="ghost"
              onPress={() => console.log('Ghost pressed')}
            />
          </View>
        </View>

        {/* SIZES & STATES */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            Button Sizes & States
          </Text>
          
          <View style={styles.gap}>
            <Button 
              title="Small Button" 
              size="sm"
              variant="primary"
            />
            
            <Button 
              title="Loading State" 
              loading={true}
              variant="primary"
            />
            
            <Button 
              title="Disabled State" 
              disabled={true}
              variant="primary"
            />
          </View>
        </View>
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
    alignItems: 'stretch',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 36,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  section: {
    marginBottom: 36,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  subSectionTitle: {
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gap: {
    gap: 12,
  },
});
