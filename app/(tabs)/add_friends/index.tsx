import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BG = "#0A0B1A";
const CARD = "#141A2E";
const TEXT = "#FFFFFF";
const SUB = "#9CA3AF";
const ACCENT = "#2EC5FF";
const BADGE = "#111827";

type Suggestion = {
  id: string;
  name: string;
  handle: string;
  status: string;
  color: string;
};

type Request = {
  id: string;
  name: string;
  handle: string;
  relation: string; // "Sent you a request", "Mutual friend", etc.
  color: string;
};

const SUGGESTIONS: Suggestion[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    handle: "@sarahj",
    status: "Recently active",
    color: "#57d26a",
  },
  {
    id: "2",
    name: "Michael Chen",
    handle: "@mchen",
    status: "Active now",
    color: "#ffd166",
  },
  {
    id: "3",
    name: "Emma Davis",
    handle: "@emmad",
    status: "Active 2h ago",
    color: "#c792ea",
  },
];

const REQUESTS: Request[] = [
  {
    id: "r1",
    name: "Lena Park",
    handle: "@lenap",
    relation: "Sent you a request",
    color: "#57d26a",
  },
  {
    id: "r2",
    name: "Noah Green",
    handle: "@noahg",
    relation: "Mutual friend",
    color: "#ffd166",
  },
  {
    id: "r3",
    name: "Daniel Brown",
    handle: "@danb",
    relation: "Sent you a request",
    color: "#f97373",
  },
];

export default function AddFriendsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"suggestions" | "requests">(
    "suggestions"
  );
  const [query, setQuery] = useState("");

  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [acceptedIds, setAcceptedIds] = useState<string[]>([]);
  const [ignoredIds, setIgnoredIds] = useState<string[]>([]);

  const isSuggestions = activeTab === "suggestions";

  const filteredSuggestions = SUGGESTIONS.filter((s) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      s.name.toLowerCase().includes(q) ||
      s.handle.toLowerCase().includes(q) ||
      s.status.toLowerCase().includes(q)
    );
  });

  const filteredRequests = REQUESTS.filter((r) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      r.name.toLowerCase().includes(q) ||
      r.handle.toLowerCase().includes(q) ||
      r.relation.toLowerCase().includes(q)
    );
  });

  const handleAdd = (id: string) => {
    setAddedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAccept = (id: string) => {
    setAcceptedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setIgnoredIds((prev) => prev.filter((x) => x !== id));
  };

  const handleIgnore = (id: string) => {
    setIgnoredIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setAcceptedIds((prev) => prev.filter((x) => x !== id));
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push("/user")}>
              <Feather name="chevron-left" size={24} color={TEXT} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Friends</Text>
            {/* spacer for symmetry */}
            <View style={{ width: 24 }} />
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Feather name="search" size={18} color={SUB} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search by name or username"
              placeholderTextColor={SUB}
              style={styles.searchInput}
            />
          </View>

          {/* Tabs */}
          <View style={styles.tabsRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.tabButton,
                isSuggestions && styles.tabButtonActive,
              ]}
              onPress={() => setActiveTab("suggestions")}
            >
              <Text
                style={[
                  styles.tabText,
                  isSuggestions && styles.tabTextActive,
                ]}
              >
                Suggestions
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.tabButton,
                !isSuggestions && styles.tabButtonActive,
              ]}
              onPress={() => setActiveTab("requests")}
            >
              <Text
                style={[
                  styles.tabText,
                  !isSuggestions && styles.tabTextActive,
                ]}
              >
                Requests
              </Text>
            </TouchableOpacity>
          </View>

          {/* List */}
          <View style={{ marginTop: 16 }}>
            {isSuggestions
              ? filteredSuggestions.map((item) => {
                  const isAdded = addedIds.includes(item.id);
                  return (
                    <View key={item.id} style={styles.card}>
                      <View
                        style={[
                          styles.avatarCircle,
                          { backgroundColor: item.color },
                        ]}
                      />
                      <View style={styles.textColumn}>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text style={styles.metaText} numberOfLines={1}>
                          {item.handle} • {item.status}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.primaryAction,
                          isAdded && styles.primaryActionAdded,
                        ]}
                        onPress={() => handleAdd(item.id)}
                        activeOpacity={0.9}
                      >
                        {isAdded ? (
                          <Feather
                            name="check"
                            size={16}
                            color={TEXT}
                            style={{ marginRight: 4 }}
                          />
                        ) : (
                          <Feather
                            name="user-plus"
                            size={16}
                            color={TEXT}
                            style={{ marginRight: 4 }}
                          />
                        )}
                        <Text style={styles.primaryActionText}>
                          {isAdded ? "Added" : "Add"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })
              : filteredRequests.map((item) => {
                  const isAccepted = acceptedIds.includes(item.id);
                  const isIgnored = ignoredIds.includes(item.id);

                  return (
                    <View key={item.id} style={styles.card}>
                      <View
                        style={[
                          styles.avatarCircle,
                          { backgroundColor: item.color },
                        ]}
                      />
                      <View style={styles.textColumn}>
                        <Text style={styles.nameText}>{item.name}</Text>
                        {/* handle and relation on separate lines, no dot */}
                        <Text style={styles.metaText}>{item.handle}</Text>
                        <Text style={styles.metaText}>{item.relation}</Text>
                      </View>

                      <View style={styles.requestButtons}>
                        <TouchableOpacity
                          style={[
                            styles.primaryAction,
                            isAccepted && styles.acceptedButton,
                          ]}
                          onPress={() => handleAccept(item.id)}
                          disabled={isAccepted}
                          activeOpacity={0.9}
                        >
                          <Text style={styles.primaryActionText}>
                            {isAccepted ? "Accepted" : "Accept"}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.secondaryAction,
                            isIgnored && styles.secondaryActionDisabled,
                          ]}
                          onPress={() => handleIgnore(item.id)}
                          disabled={isIgnored}
                          activeOpacity={0.9}
                        >
                          <Text style={styles.secondaryActionText}>
                            {isIgnored ? "Ignored" : "Ignore"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG,
  },
  contentContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 120, // space for bottom nav later
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    justifyContent: "space-between",
  },
  headerTitle: {
    color: TEXT,
    fontSize: 20,
    fontWeight: "700",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BADGE,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#202640",
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: TEXT,
    fontSize: 14,
  },
  tabsRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonActive: {
    backgroundColor: ACCENT,
  },
  tabText: {
    color: SUB,
    fontWeight: "600",
    fontSize: 14,
  },
  tabTextActive: {
    color: TEXT,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#202640",
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  textColumn: {
    flex: 1,
    marginRight: 10,
  },
  nameText: {
    color: TEXT,
    fontSize: 15,
    fontWeight: "600",
  },
  metaText: {
    color: SUB,
    fontSize: 12,
    marginTop: 2,
  },
  primaryAction: {
    backgroundColor: ACCENT,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  primaryActionAdded: {
    backgroundColor: "#1D4ED8",
  },
  primaryActionText: {
    color: TEXT,
    fontSize: 13,
    fontWeight: "600",
  },
  requestButtons: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  secondaryAction: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: SUB,
    backgroundColor: "transparent",
  },
  secondaryActionDisabled: {
    borderColor: "#4B5563",
    opacity: 0.6,
  },
  secondaryActionText: {
    color: SUB,
    fontSize: 13,
    fontWeight: "500",
  },
  acceptedButton: {
    backgroundColor: "#1D4ED8",
  },
});
