import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Fonts } from '@/constants/theme';

type Category = {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export const CategoryMenu = ({
  categories,
  selectedKey,
  onSelect,
}: {
  categories: Category[];
  selectedKey: string;
  onSelect: (key: string) => void;
}) => {
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map(cat => {
          const isActive = cat.key === selectedKey;
          return (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.item,
                { 
                  backgroundColor: isActive ? colors.primary : colors.card,
                  borderColor: colors.border,
                }
              ]}
              onPress={() => onSelect(cat.key)}
            >
              <Ionicons 
                name={cat.icon as any} 
                size={16} 
                color={isActive ? colors.primaryForeground : colors.foreground} 
              />
              <Text 
                style={[
                  styles.label, 
                  { 
                    color: isActive ? colors.primaryForeground : colors.foreground,
                    fontFamily: isActive ? Fonts.semiBold : Fonts.medium
                  }
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    fontSize: 13,
  },
});

