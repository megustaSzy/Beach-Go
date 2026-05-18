import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { Fonts, Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button } from '@/components/Button';

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

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.semiBold }]}>
            Premium Button Variants
          </Text>
          
          <View style={styles.buttonGap}>
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

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.semiBold }]}>
            Sizes & States
          </Text>
          
          <View style={styles.buttonGap}>
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
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  buttonGap: {
    gap: 12,
  },
});
