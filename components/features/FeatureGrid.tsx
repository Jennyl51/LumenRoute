import React from "react";
import { View, StyleSheet } from "react-native";
import FeatureButton from "./FeatureButton";

const features = [
  { name: "Check In", icon: "location-outline", route: "/features/checkin" },
  { name: "Upload", icon: "camera-outline", route: "/features/uploadPic" },
  { name: "Lumen", icon: "flashlight-outline", route: "/features/lumen" },
  { name: "Status", icon: "happy-outline", route: "/features/emojiStatus" },
] as const; // 👈 tells TypeScript this is read-only + preserves literal types

export default function FeatureGrid() {
  return (
    <View style={styles.container}>
      {features.map((f, i) => (
        <FeatureButton
          key={i}
          label={f.name}
          icon={f.icon as any} // 👈 fix 1: simplest way
          route={f.route}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignContent: "space-around",
    flexDirection: "row",
  },
});
