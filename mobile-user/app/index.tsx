import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';

export default function IndexScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.foreground, fontFamily: Fonts.bold }]}>
            Beach-Go
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground, fontFamily: Fonts.medium }]}>
            Mobile UI Components Demo
          </Text>
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
  gap: {
    gap: 12,
  },
});
