import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

type Category = {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export const CategoryMenu = ({
  categories,
  onSelect,
}: {
  categories: Category[];
  onSelect: (key: string) => void;
}) => {
  const scheme = useColorScheme();
  const colors = Colors[scheme];

  return (
    <View style={styles.container}>
      {categories.map(cat => (
        <TouchableOpacity
          key={cat.key}
          style={styles.item}
          onPress={() => onSelect(cat.key)}
        >
          <Ionicons name={cat.icon as any} size={24} color={colors.primary} />
          <Text style={[styles.label, { color: colors.foreground }]}>{cat.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginVertical: 12,
  },
  item: {
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
});
