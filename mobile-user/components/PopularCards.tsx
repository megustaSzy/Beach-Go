import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card } from '@/components/Card';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

type Destination = {
  id: string;
  title: string;
  image: string;
  badge?: string;
  rating: number;
  price: string;
};

export const PopularCards = ({
  data,
  onPress,
}: {
  data: Destination[];
  onPress: (id: string) => void;
}) => {
  const scheme = useColorScheme();
  const colors = Colors[scheme];

  const renderItem = ({ item }: { item: Destination }) => (
    <TouchableOpacity onPress={() => onPress(item.id)} style={styles.itemWrapper}>
      <Card
        variant="vertical"
        title={item.title}
        image={item.image}
        badge={item.badge}
        rating={item.rating}
        price={item.price}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: colors.foreground }]}>Destinasi Populer</Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  heading: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  list: {
    paddingHorizontal: 8,
  },
  itemWrapper: {
    marginRight: 12,
  },
});
