import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FeatureGrid from "@/components/features/FeatureGrid";

export default function FeaturesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Features</Text>
      <FeatureGrid />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0A0B1A" },
  title: { color: "white", fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
