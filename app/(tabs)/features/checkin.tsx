// app/(tabs)/features/checkin.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CheckInPage() {
  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="account-group-outline"
          size={26}
          color="#EEF2FF"
        />
        <Text style={styles.headerText}>Check in</Text>
      </View>

      {/* Request Section */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
            }}
            style={styles.avatar}
          />
          <Text style={styles.message}>
            <Text style={styles.bold}>Mariane</Text> wants to share location
            with you.
          </Text>
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity style={[styles.btn, styles.accept]}>
            <Text style={styles.btnText}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, styles.deny]}>
            <Text style={styles.btnText}>Deny</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subTitle}>Send a message to Mariane.</Text>

        <View style={styles.msgList}>
          <Text style={styles.msgBubble}>Stay where you are.</Text>
          <Text style={styles.msgBubble}>Help is coming.</Text>
          <Text style={styles.msgBubble}>I'm on my way.</Text>
        </View>
      </View>

      {/* Send a Message Section */}
      <View style={styles.section}>
        <View style={styles.row}>
          <MaterialCommunityIcons name="send" size={26} color="#EEF2FF" />
          <Text style={[styles.subTitle, { marginLeft: 12 }]}>
            Send a message.
          </Text>
        </View>

        <Text style={[styles.subTitle, { marginTop: 20 }]}>To:</Text>

        <View style={styles.msgList}>
          <Text style={[styles.msgBubble, styles.greenBubble]}>
            Share my location.
          </Text>
          <Text style={styles.msgBubble}>I need help.</Text>
          <Text style={styles.msgBubble}>I'm heading home.</Text>
          <Text style={styles.msgBubble}>I'm safe.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070B14",
    paddingHorizontal: 22,
    paddingTop: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 25,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#EEF2FF",
  },

  section: {
    marginBottom: 40,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },

  message: {
    color: "#EEF2FF",
    fontSize: 16,
    flexShrink: 1,
  },

  bold: {
    fontWeight: "700",
  },

  btnRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 18,
  },

  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  accept: {
    backgroundColor: "#7ED957",
  },
  deny: {
    backgroundColor: "#E3554E",
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  subTitle: {
    color: "#EEF2FF",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 14,
  },

  msgList: {
    gap: 10,
  },

  msgBubble: {
    backgroundColor: "#59BEE6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    color: "#09111B",
    fontWeight: "600",
    fontSize: 15,
    alignSelf: "flex-start",
  },

  greenBubble: {
    backgroundColor: "#7ED957",
  },
});
