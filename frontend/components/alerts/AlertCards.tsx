import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type AlertCardProps = {
  label: string; // e.g., "UC Berkeley"
  title: string; // the alert headline
  category: string; // "Traffic Incident", etc.
  icon: keyof typeof Ionicons.glyphMap;
  route: string; // navigation path
};

export default function AlertCard({
  label,
  title,
  category,
  icon,
  route,
}: AlertCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(route as any);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {/* Top Row: Icon + Label */}
      <View style={styles.headerRow}>
        <Ionicons name={icon} size={22} color="white" />
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* Image Section */}
      <Image
        source={{ uri: "https://picsum.photos/400/300?random=4" }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Title Section */}
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>

      {/* Category tag */}
      <View style={styles.tag}>
        <Text style={styles.tagText}>{category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 350,
    borderRadius: 10,
    backgroundColor: "#1C1F3A",
    padding: 15,
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    color: "white",
    fontSize: 12,
    marginLeft: 8,
    fontWeight: "500",
  },
  image: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: "#3A3F63",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    color: "white",
    fontSize: 10,
  },
});
