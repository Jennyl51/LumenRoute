import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// THEME COLORS (same palette as other screens)
const BG = "#0A0B1A";
const CARD = "#14172A";
const ACCENT = "#4AAFFF";
const TEXT = "#FFFFFF";
const SUB = "#98A1B9";

export default function ProfileScreen() {
  const router = useRouter();

  const stats = [
    { label: "Friends", value: 24, icon: "users" as const },
    { label: "Check-ins", value: 156, icon: "map-pin" as const },
    { label: "Reports", value: 8, icon: "file-text" as const },
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

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Profile</Text>

        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Feather name="settings" size={22} color={TEXT} />
        </TouchableOpacity>
      </View>

      {/* Avatar */}
      <Image
        source={{ uri: "https://picsum.photos/400/300?random=5" }}
        style={styles.avatar}
        resizeMode="cover"
      />

      {/* Name + bio */}
      <Text style={styles.name}>"Lumen_user1"</Text>
      <Text style={styles.userid}>@lumenlumenID</Text>
      <Text style={styles.bio}>UCB 27 | OP Inc | Lumne_my_bio</Text>
      <Text style={styles.subtitle}>Safe traveler since 2025</Text>

      {/* Stats row */}
      <View style={styles.statsRow}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statBox}>
            <Feather name={stat.icon} size={18} color={ACCENT} />
            <Text style={styles.statNumber}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Buttons row – Add Friend + Share Profile match style */}
      <View style={styles.buttonsRow}>
        {/* Add Friend */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/add_friends")}
        >
          <Feather name="user-plus" size={18} color={TEXT} />
          <Text style={styles.buttonText}>Add Friend</Text>
        </TouchableOpacity>

        {/* Share Profile – same style as Add Friend */}
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Feather name="share-2" size={18} color={TEXT} />
          <Text style={styles.buttonText}>Share Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Friends list */}
      <View style={styles.friendsSection}>
        <Text style={styles.friendsHeader}>Friends</Text>

        {friends.map((friend) => (
          <View key={friend.handle} style={styles.friendCard}>
            <View
              style={[
                styles.friendAvatar,
                { backgroundColor: friend.color },
              ]}
            >
              <Feather name="user" size={20} color={BG} />
            </View>

            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{friend.name}</Text>
              <Text style={styles.friendMeta}>
                {friend.handle} • {friend.status}
              </Text>
            </View>

            <Feather name="chevron-right" size={18} color={SUB} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG,
    paddingTop: 60,
  },
  contentContainer: {
    paddingBottom: 80,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTitle: {
    color: TEXT,
    fontSize: 22,
    fontWeight: "700",
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: ACCENT,
    alignSelf: "center",
    marginTop: 10,
  },

  name: {
    color: TEXT,
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
  },
  userid: {
    color: SUB,
    textAlign: "center",
    marginTop: 4,
  },
  bio: {
    color: SUB,
    textAlign: "center",
    marginTop: 4,
  },
  subtitle: {
    color: SUB,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 16,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 4,
  },
  statBox: {
    flex: 1,
    backgroundColor: CARD,
    marginHorizontal: 6,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
  },
  statNumber: {
    color: TEXT,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 6,
  },
  statLabel: {
    color: SUB,
    marginTop: 2,
    fontSize: 12,
  },

  // 👉 this is the one that was red before
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 24,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ACCENT,
    paddingVertical: 12,
    borderRadius: 999,
    marginHorizontal: 6,
  },
  buttonText: {
    color: TEXT,
    marginLeft: 8,
    fontWeight: "700",
    fontSize: 15,
  },

  friendsSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  friendsHeader: {
    color: TEXT,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  friendCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    color: TEXT,
    fontSize: 15,
    fontWeight: "600",
  },
  friendMeta: {
    color: SUB,
    fontSize: 12,
    marginTop: 2,
  },
});
