import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
// import useUserState from "@/hooks/useUserState";

// You can move these out into a separate constants file later if you want
const AVATAR = "https://picsum.photos/400/300?random=5";

const stats = [
  { label: "Friends", value: 24, icon: "account-multiple" as const },
  { label: "Check-ins", value: 156, icon: "map-marker-radius" as const },
  { label: "Reports", value: 8, icon: "file-document" as const },
];

const friends = [
  {
    name: "Sarah Johnson",
    handle: "@sarahj",
    status: "Recently active",
    color: "#57d26a",
  },
  {
    name: "Mike Chen",
    handle: "@mikechen",
    status: "Checked in 2h ago",
    color: "#ffd166",
  },
  {
    name: "Emma Davis",
    handle: "@emmad",
    status: "Online now",
    color: "#c792ea",
  },
];

export default function ProfileScreen() {
  // const { user } = useUserState();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer} // leaves space for top + bottom nav
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Profile</Text>
        <TouchableOpacity>
          <Feather name="settings" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* Avatar + name/handle/bio */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarOutline}>
            <Image
              source={{ uri: AVATAR }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.name}>Lumen_user1</Text>
          <Text style={styles.bio}>@lumenlumenID</Text>
          <Text style={styles.bio}>UCB 27 | OP Inc | Lumen_my_bio</Text>
          <Text style={styles.bio}>Safe traveler since 2025</Text>
        </View>

        {/* Stats bar */}
        <View style={styles.statsBar}>
          {stats.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <MaterialCommunityIcons
                name={s.icon}
                size={18}
                color="#8FB4FF"
              />
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Feather name="user-plus" size={16} color="#FFFFFF" />
            <Text style={styles.buttonText}>Add Friend</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonOutline}>
            <Feather name="share-2" size={16} color="#1C1F3A" />
            <Text style={styles.buttonOutlineText}>Share Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Friends list */}
        <View style={styles.friendsSection}>
          <Text style={styles.sectionTitle}>Friends</Text>
          <View style={{ marginTop: 12 }}>
            {friends.map((f, index) => (
              <View key={index} style={styles.friendItem}>
                <View
                  style={[
                    styles.friendAvatar,
                    { backgroundColor: f.color },
                  ]}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.friendName}>{f.name}</Text>
                  <Text style={styles.friendMeta}>
                    {f.handle} • {f.status}
                  </Text>
                </View>
                <Feather name="chevron-right" size={18} color={SUB} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const BG = "#0A0B1A";
const PRIMARY = "#1C1F3A";
const TEXT = "#FFFFFF";
const SUB = "#AAAAAA";
const CARD = "#141A2E";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG,
  },
  contentContainer: {
    paddingTop: 56, // more space at the top
    paddingBottom: 120, // space for bottom nav bar
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 6,
  },
  headerText: {
    color: TEXT,
    fontSize: 18,
    fontWeight: "700",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  avatarOutline: {
    borderWidth: 3,
    borderColor: "#3D6EFF",
    borderRadius: 110,
    padding: 6,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  name: {
    color: TEXT,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 12,
  },
  bio: {
    color: SUB,
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
  },
  statsBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    marginBottom: 16,
    marginTop: 6,
  },
  statCard: {
    flex: 1,
    backgroundColor: CARD,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#223055",
  },
  statValue: {
    color: TEXT,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6,
  },
  statLabel: {
    color: SUB,
    fontSize: 12,
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  button: {
    flex: 1,
    backgroundColor: PRIMARY,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginRight: 6,
  },
  buttonText: {
    color: TEXT,
    fontWeight: "700",
  },
  buttonOutline: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginLeft: 6,
    borderWidth: 1.5,
    borderColor: PRIMARY,
    backgroundColor: "transparent",
  },
  buttonOutlineText: {
    color: PRIMARY,
    fontWeight: "700",
  },
  friendsSection: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 18,
  },
  sectionTitle: {
    color: TEXT,
    fontWeight: "700",
    fontSize: 16,
    alignSelf: "flex-start",
  },
  friendItem: {
    backgroundColor: "#12172A",
    borderWidth: 1,
    borderColor: "#223055",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  friendAvatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
  friendName: {
    color: TEXT,
    fontWeight: "700",
  },
  friendMeta: {
    color: SUB,
    marginTop: 2,
    fontSize: 12,
  },
});
