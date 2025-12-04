// app/(tabs)/features/index.tsx
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FeaturesPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.header}>
        <Feather name="file-text" size={22} color="#EEF2FF" />
        <Text style={styles.headerText}>Features</Text>
      </View>

      {/* Main content */}
      <View style={styles.main}>
        <View style={styles.orbit}>
          {/* 5 normal dots */}
          <View style={[styles.dot, styles.dot1]} />
          <View style={[styles.dot, styles.dot2]} />
          <View style={[styles.dot, styles.dot3]} />
          <View style={[styles.dot, styles.dot4]} />
          <View style={[styles.dot, styles.dot5]} />

          {/* 🔴 clickable red dot → checkin page */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/features/checkin" as const)}
            style={[styles.dot, styles.dot6]}
          />

          {/* Center blue circle */}
          <View style={styles.center}>
            <MaterialCommunityIcons
              name="account-group-outline"
              size={70}
              color="#09111B"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070B14",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerText: {
    color: "#EEF2FF",
    fontSize: 20,
    fontWeight: "600",
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  orbit: {
    width: 360,
    height: 360,
    position: "relative",
  },
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 190,
    height: 190,
    backgroundColor: "#5CB3DF",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateX: -95 }, { translateY: -95 }],
  },
  dot: {
    position: "absolute",
    width: 65,
    height: 65,
    borderRadius: 33,
  },
  dot1: {
    backgroundColor: "#F4EB6A",
    top: "10%",
    left: "50%",
    transform: [{ translateX: -32.5 }],
  },
  dot2: {
    backgroundColor: "#82D374",
    top: "25%",
    right: "10%",
  },
  dot3: {
    backgroundColor: "#B891FF",
    bottom: "25%",
    right: "10%",
  },
  dot4: {
    backgroundColor: "#E9B06F",
    bottom: "10%",
    left: "50%",
    transform: [{ translateX: -32.5 }],
  },
  dot5: {
    backgroundColor: "#D9DBDE",
    bottom: "25%",
    left: "10%",
  },
  dot6: {
    backgroundColor: "#E15C54",
    top: "25%",
    left: "10%",
  },
});
