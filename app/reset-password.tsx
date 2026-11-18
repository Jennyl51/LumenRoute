import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { changePassword, signOut } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

type Stage = "checking" | "ready" | "error" | "done";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("checking");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") {
      setStage("error");
      setMessage("For now, open the password-reset link in your web browser.");
      return;
    }
    let active = true;

    async function completeRecovery() {
      // Supabase's default implicit recovery link sends credentials in #fragment.
      // Our Supabase client uses detectSessionInUrl:false for Expo SSR safety,
      // so exchange/restore the session explicitly on THIS recovery screen.
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const query = new URLSearchParams(window.location.search);
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");
      const errorMessage = hash.get("error_description") ?? query.get("error_description");
      const authCode = query.get("code");

      try {
        if (errorMessage) throw new Error(errorMessage.replace(/\+/g, " "));

        if (accessToken && refreshToken) {
          if (hash.get("type") !== "recovery") {
            throw new Error("This link is not a password-recovery link.");
          }
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;
        } else if (authCode) {
          // Handles PKCE flow if the project's client configuration changes.
          const { error } = await supabase.auth.exchangeCodeForSession(authCode);
          if (error) throw error;
        } else {
          throw new Error("Open the password-reset link from your email. The link may have expired.");
        }

        if (active) setStage("ready");
      } catch (error) {
        if (active) {
          setMessage(error instanceof Error ? error.message : "Unable to verify recovery link.");
          setStage("error");
        }
      } finally {
        // Prevent recovery tokens remaining visible in the address bar/history.
        window.history.replaceState(window.history.state, "", "/reset-password");
      }
    }

    void completeRecovery();
    return () => { active = false; };
  }, []);

  async function update() {
    if (busy) return;
    setMessage("");
    if (password.length < 8) {
      setMessage("Choose a password of at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords don't match.");
      return;
    }
    setBusy(true);
    try {
      await changePassword(password);
      await signOut();
      setPassword("");
      setConfirmPassword("");
      setStage("done");
      setMessage("Password updated! Sign in with your new password.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <Text style={styles.title}>LumenRoute</Text>
        <Text style={styles.subtitle}>Reset your password</Text>
        {stage === "checking" && <ActivityIndicator color="#4AAFFF" />}
        {stage === "ready" && (
          <>
            <Text style={styles.description}>Your reset link is verified. Choose a new password.</Text>
            <View style={styles.passwordRow}>
              <TextInput
                accessibilityLabel="New password"
                value={password}
                onChangeText={setPassword}
                placeholder="New password"
                placeholderTextColor="#8993ad"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="new-password"
                style={styles.passwordInput}
              />
              <TouchableOpacity accessibilityRole="button" accessibilityLabel={showPassword ? "Hide password" : "Show password"} onPress={() => setShowPassword(!showPassword)} style={styles.showButton}>
                <Text style={styles.link}>{showPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              accessibilityLabel="Confirm new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              placeholderTextColor="#8993ad"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
              style={styles.input}
            />
            {!!message && <Text accessibilityRole="alert" style={styles.message}>{message}</Text>}
            <TouchableOpacity disabled={busy} style={styles.button} onPress={update}>
              {busy ? <ActivityIndicator color="#020817" /> : <Text style={styles.buttonText}>Save new password</Text>}
            </TouchableOpacity>
          </>
        )}
        {(stage === "done" || stage === "error") && (
          <>
            <Text accessibilityRole="alert" style={styles.message}>{message}</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.replace("/login")}>
              <Text style={styles.buttonText}>Back to sign in</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#020817" },
  content: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  card: { width: "100%", maxWidth: 440, padding: 24, borderRadius: 18, backgroundColor: "#0F1630" },
  title: { color: "#FFFFFF", fontSize: 32, fontWeight: "700", marginBottom: 8 },
  subtitle: { color: "#B8C3D8", fontSize: 16, marginBottom: 20 },
  description: { color: "#B8C3D8", marginBottom: 16, lineHeight: 20 },
  input: { backgroundColor: "#1C2545", borderWidth: 1, borderColor: "#4AAFFF", borderRadius: 12, color: "white", padding: 14, marginBottom: 12 },
  passwordRow: { backgroundColor: "#1C2545", borderWidth: 1, borderColor: "#4AAFFF", borderRadius: 12, flexDirection: "row", alignItems: "center", marginBottom: 12 },
  passwordInput: { color: "white", flex: 1, minWidth: 0, padding: 14 },
  showButton: { paddingHorizontal: 14, paddingVertical: 14 },
  message: { color: "#B3D6FF", marginBottom: 16, lineHeight: 20 },
  button: { backgroundColor: "#4AAFFF", padding: 15, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#020817", fontWeight: "700", fontSize: 16 },
  link: { color: "#4AAFFF", textAlign: "center", fontWeight: "600" },
});
