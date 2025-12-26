// app/(tabs)/features/index.tsx
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "@react-navigation/elements";

export default function FeaturesPage() {
  const router = useRouter();
  const navigation = useNavigation();

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
          <View style={[styles.dot, styles.dot1]}>
            <Feather name="calendar" size={28} color="#071018" />
          </View>
          <View style={[styles.dot, styles.dot2]}>
            <Feather name="map" size={28} color="#071018" />
          </View>

          {/* dot3 */}
          <View style={[styles.dot, styles.dot3]}>
            <Feather name="bell" size={28} color="#071018" />
          </View>

          {/* dot4 */}
          <View style={[styles.dot, styles.dot4]}>
            <Feather name="settings" size={28} color="#071018" />
          </View>


          {/* dot5 */}
          <View style={[styles.dot, styles.dot5]}>
            <Feather name="heart" size={28} color="#071018" />
          </View>

          {/* 🔴 clickable red dot → checkin page */}
          <TouchableOpacity
          onPress={() => router.push("/(tabs)/features/checkin" as const)}
          style={[styles.dot, styles.dot6]}
        >
          <Feather name="check-circle" size={28} color="#fff" />
        </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/settings" as const)}
            style={[styles.dot, styles.dot4]}
          >
            <Feather name="settings" size={28} color="#071018" />
          </TouchableOpacity>

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
    paddingTop: 60,
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
    width: 142,
    height: 142,
    backgroundColor: "#5CB3DF",
    borderRadius: 71,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateX: -71 }, { translateY: -71 }],
  },
  dot: {
    position: "absolute",
    width: 65,
    height: 65,
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
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
  button: {
    backgroundColor: "#E9B06F",
    bottom: "10%",
    left: "50%",
    transform: [{ translateX: -32.5 }],
  },
  buttonText: {
    color: '#000000',
    marginLeft: 8,
    fontWeight: "700",
    fontSize: 15,
  },
});
