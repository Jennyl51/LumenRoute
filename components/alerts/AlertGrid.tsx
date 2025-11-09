import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AlertCard from "./AlertCards";
import alert from "@/assets/dummie-data/dummie-alerts.json";
import { Ionicons } from "@expo/vector-icons";



const features = [
  { name: "Check In", icon: "location-outline", route: "/features/checkin" },
  { name: "Upload", icon: "camera-outline", route: "/features/uploadPic" },
  { name: "Lumen", icon: "flashlight-outline", route: "/features/lumen" },
  { name: "Status", icon: "happy-outline", route: "/features/emojiStatus" },
] as const; // 👈 tells TypeScript this is read-only + preserves literal types

const categoryIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
    "Traffic Incident": "car-outline",
    "Hate Crime": "warning-outline",
    "Weapons Arrest": "hand-left-outline",
    "Crime Log": "document-text-outline",
    "Earthquake": "earth-outline",
    default: "alert-circle-outline",
  };


export default function AlertGrid() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {alert.map((a: any, i: number) => (
        <AlertCard
          key={i}
          label={a.source}
          title={a.title}
          category={a.category}
          icon={categoryIcons[a.category] || categoryIcons.default}
          route={`/alerts/${a.id}`} 
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: 10,
  },
});
