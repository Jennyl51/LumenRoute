import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// THEME COLORS (match Profile / Add Friends)
const BG = "#0A0B1A";
const CARD = "#14172A";
const ACCENT = "#4AAFFF";
const TEXT = "#FFFFFF";
const SUB = "#9BA1B9";
const DANGER = "#F24E4E";
const MUTED_TEXT = "#7B8192";

type SettingRowProps = {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
};

function SettingRow({ icon, title, subtitle, rightElement, onPress }: SettingRowProps) {
  const isPressable = Boolean(onPress);

  return (
    <TouchableOpacity
      activeOpacity={isPressable ? 0.7 : 1}
      disabled={!isPressable}
      onPress={onPress}
      style={styles.row}
    >
      <View style={styles.rowLeft}>
        <View style={styles.iconCircle}>
          <Feather name={icon} size={20} color={ACCENT} />
        </View>

        <View style={styles.rowText}>
          <Text style={styles.rowTitle}>{title}</Text>
          {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
        </View>
      </View>

      {rightElement ? <View>{rightElement}</View> : null}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/user")}
        >
          <Feather name="chevron-left" size={24} color={TEXT} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Settings</Text>

        {/* Spacer to balance flex row */}
        <View style={styles.headerRightSpacer} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Dark Mode */}
        <SettingRow
          icon="moon"
          title="Dark Mode"
          rightElement={
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              thumbColor={darkMode ? "#39D89F" : "#f4f3f4"}
              trackColor={{ false: "#3b3b4f", true: "#1b8f61" }}
            />
          }
        />

        {/* Privacy */}
        <SettingRow
          icon="shield"
          title="Privacy & Data Sources"
          rightElement={
            <Feather name="chevron-right" size={20} color={SUB} />
          }
          onPress={() => {
            // hook up later
          }}
        />

        {/* Notifications */}
        <SettingRow
          icon="bell"
          title="Notifications"
          subtitle="Alerts for check-ins, reports, and friend activity"
          rightElement={
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              thumbColor={notificationsEnabled ? "#39D89F" : "#f4f3f4"}
              trackColor={{ false: "#3b3b4f", true: "#1b8f61" }}
            />
          }
        />

        {/* Location */}
        <SettingRow
          icon="map-pin"
          title="Location Permissions"
          rightElement={
            <Feather name="chevron-right" size={20} color={SUB} />
          }
          onPress={() => {
            // hook up later
          }}
        />

        {/* Report Issue */}
        <SettingRow
          icon="message-square"
          title="Report an Issue"
          rightElement={
            <Feather name="chevron-right" size={20} color={SUB} />
          }
          onPress={() => {
            // hook up later
          }}
        />

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            // add real logout later
          }}
        >
          <Feather name="log-out" size={20} color={TEXT} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Footer text */}
        <Text style={styles.footerText}>LumenRoute v1.0 © 2025</Text>
      </ScrollView>
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
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: TEXT,
    fontSize: 22,
    fontWeight: "700",
  },
  headerRightSpacer: {
    width: 24, // matches back icon area
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 120, // space for bottom nav bar
  },

  row: {
    backgroundColor: CARD,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "flex-start", // aligns title+subtitle from top
    gap: 12,
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: ACCENT,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  rowText: {
    flexShrink: 1,
  },
  rowTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  rowSubtitle: {
    color: SUB,
    fontSize: 13,
  },

  logoutButton: {
    marginTop: 8,
    backgroundColor: DANGER,
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  logoutText: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "700",
  },
  footerText: {
    marginTop: 16,
    textAlign: "center",
    color: MUTED_TEXT,
    fontSize: 12,
  },
});
