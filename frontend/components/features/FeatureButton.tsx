import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type FeatureButtonProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string; // <- explicitly declare it's a string
};

export default function FeatureButton({ label, icon, route }: FeatureButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(route as any); // 👈 quick fix: cast as any to silence TS
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Ionicons name={icon} size={30} color="white" />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#1C1F3A",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { color: "white", fontSize: 12, marginTop: 5 },
});
