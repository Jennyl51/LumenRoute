import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const BG = "#0A0B1A";
const CARD = "#141A2E";
const TEXT = "#FFFFFF";
const SUB = "#9CA3AF";
const ACCENT = "#2EC5FF";
const DANGER = "#F6494D";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingBottom: 120, // ⬅️ EXTRA BOTTOM SPACE for future nav bar
          }}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity>
              <Feather name="chevron-left" size={26} color={TEXT} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Settings</Text>
            <View style={{ width: 26 }} />
          </View>

          {/* Cards */}
          <View style={styles.cardList}>
            {/* Dark Mode */}
            <View style={styles.cardRow}>
              <View style={styles.cardLeft}>
                <View style={styles.iconCircle}>
                  <Feather name="moon" size={18} color={ACCENT} />
                </View>
                <Text style={styles.cardLabel}>Dark Mode</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#1E293B", true: "#1E293B" }}
                thumbColor={darkMode ? ACCENT : "#64748B"}
              />
            </View>

            {/* Privacy */}
            <TouchableOpacity style={styles.cardRow} activeOpacity={0.75}>
              <View style={styles.cardLeft}>
                <View style={styles.iconCircle}>
                  <Feather name="shield" size={18} color={ACCENT} />
                </View>
                <Text style={styles.cardLabel}>Privacy & Data Sources</Text>
              </View>
              <Feather name="chevron-right" size={18} color={SUB} />
            </TouchableOpacity>

            {/* Notifications */}
            <View style={styles.cardRow}>
              <View style={styles.cardLeft}>
                <View style={styles.iconCircle}>
                  <Feather name="bell" size={18} color={ACCENT} />
                </View>
                <Text style={styles.cardLabel}>Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#1E293B", true: "#1E293B" }}
                thumbColor={notifications ? ACCENT : "#64748B"}
              />
            </View>

            {/* Location */}
            <TouchableOpacity style={styles.cardRow} activeOpacity={0.75}>
              <View style={styles.cardLeft}>
                <View style={styles.iconCircle}>
                  <Feather name="map-pin" size={18} color={ACCENT} />
                </View>
                <Text style={styles.cardLabel}>Location Permissions</Text>
              </View>
              <Feather name="chevron-right" size={18} color={SUB} />
            </TouchableOpacity>

            {/* Report */}
            <TouchableOpacity style={styles.cardRow} activeOpacity={0.75}>
              <View style={styles.cardLeft}>
                <View style={styles.iconCircle}>
                  <Feather name="message-square" size={18} color={ACCENT} />
                </View>
                <Text style={styles.cardLabel}>Report an Issue</Text>
              </View>
              <Feather name="chevron-right" size={18} color={SUB} />
            </TouchableOpacity>
          </View>

          {/* Log Out */}
          <TouchableOpacity style={styles.logoutButton} activeOpacity={0.9}>
            <Feather name="log-out" size={18} color={TEXT} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          {/* Version */}
          <Text style={styles.versionText}>LumenRoute v1.0 © 2025</Text>

          {/* Spacer for future bottom nav bar */}
          <View style={{ height: 50 }} /> 
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40, // ⬅️ EXTRA TOP SPACE
    paddingBottom: 20,
  },
  headerTitle: {
    color: TEXT,
    fontSize: 22,
    fontWeight: "700",
  },
  cardList: {
    paddingHorizontal: 16,
    marginTop: 10,
    gap: 16,
  },
  cardRow: {
    backgroundColor: CARD,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: ACCENT,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  cardLabel: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "500",
  },
  logoutButton: {
    marginTop: 32,
    marginHorizontal: 16,
    backgroundColor: DANGER,
    borderRadius: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  logoutText: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "600",
  },
  versionText: {
    marginTop: 16,
    textAlign: "center",
    color: SUB,
    fontSize: 12,
  },
});