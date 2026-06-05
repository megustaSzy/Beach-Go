import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, LayoutAnimation, UIManager, Platform } from "react-native";
import { Fonts, Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ExpandableCardProps {
  title: string;
  content: string;
}

export function ExpandableCard({ title, content }: ExpandableCardProps) {
  const [expanded, setExpanded] = useState(false);
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Pressable onPress={toggleExpand} style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: Fonts.bold }]}>{title}</Text>
        <Text style={[styles.arrow, { color: colors.mutedForeground }]}>{expanded ? "▲" : "▼"}</Text>
      </Pressable>
      
      {expanded && (
        <View style={styles.body}>
          <Text style={[styles.content, { color: colors.mutedForeground, fontFamily: Fonts.regular }]}>
            {content}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 6,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 15,
  },
  arrow: {
    fontSize: 12,
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  content: {
    fontSize: 13,
    lineHeight: 18,
  },
});
