import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import type { Session } from "@supabase/supabase-js";
import {
  requestPasswordReset,
  signInWithEmail,
  signOut,
  signUpWithEmail,
} from "@/lib/auth";
import { supabase } from "@/lib/supabase";

type Mode = "signIn" | "signUp" | "forgotPassword";

function errorText(error: unknown) {
  if (!(error instanceof Error)) return "Something went wrong. Please try again.";
  if (/invalid login credentials/i.test(error.message)) {
    return "Email or password didn't match. Try Forgot password if needed.";
  }
  return error.message;
}

export default function LoginScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [message, setMessage] = useState("");
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) setMessage(error.message);
      setSession(data.session);
      setCheckingSession(false);
    }).catch((error) => {
      if (!mounted) return;
      setMessage(errorText(error));
      setCheckingSession(false);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) setSession(nextSession);
    });
    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  function changeMode(next: Mode) {
    setMode(next);
    setMessage("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
  }

  async function submit() {
    if (busy) return;
    setMessage("");
    const cleanEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setMessage("Enter a valid email address.");
      return;
    }
    if (mode !== "forgotPassword" && !password) {
      setMessage("Enter a password.");
      return;
    }
    if (mode === "signUp" && (password.length < 8 || password !== confirmPassword)) {
      setMessage(password.length < 8
        ? "Choose a password with at least 8 characters."
        : "Passwords don't match.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "signIn") {
        await signInWithEmail(cleanEmail, password);
        setPassword("");
        setMessage("You're signed in!");
      } else if (mode === "signUp") {
        const result = await signUpWithEmail(cleanEmail, password);
        setPassword("");
        setConfirmPassword("");
        if (result.session) {
          setMessage("Account created and signed in!");
        } else {
          setMode("signIn");
          setMessage("Check your inbox for a confirmation link, then come back and sign in.");
        }
      } else {
        await requestPasswordReset(cleanEmail);
        setMode("signIn");
        setMessage("If that email has an account, a password-reset link will arrive shortly. Open it in this browser.");
      }
    } catch (error) {
      setMessage(errorText(error));
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    setBusy(true);
    try {
      await signOut();
      changeMode("signIn");
      setMessage("Signed out.");
    } catch (error) {
      setMessage(errorText(error));
    } finally {
      setBusy(false);
    }
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <Text style={styles.title}>LumenRoute</Text>
        {checkingSession ? (
          <ActivityIndicator size="large" color="#4AAFFF" />
        ) : session ? (
          <>
            <Text style={styles.subtitle}>You're signed in</Text>
            <Text style={styles.signedInEmail}>{session.user.email ?? "Your account"}</Text>
            {!!message && <Text accessibilityRole="alert" style={styles.message}>{message}</Text>}
            <TouchableOpacity style={styles.button} onPress={() => router.replace("/map")}>
              <Text style={styles.buttonText}>Go to map</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={busy} onPress={handleSignOut} style={styles.secondaryButton}>
              <Text style={styles.link}>{busy ? "Signing out..." : "Sign out"}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>
              {mode === "signIn" ? "Sign in to your account" : mode === "signUp" ? "Create your account" : "Reset your password"}
            </Text>
            {mode === "forgotPassword" && (
              <Text style={styles.description}>We'll email you a password-reset link.</Text>
            )}
            <TextInput
              accessibilityLabel="Email address"
              value={email}
              onChangeText={setEmail}
              editable={!busy}
              placeholder="Email address"
              placeholderTextColor="#8993ad"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              keyboardType="email-address"
              style={styles.input}
            />
            {mode !== "forgotPassword" && (
              <>
                <View style={styles.passwordRow}>
                  <TextInput
                    accessibilityLabel="Password"
                    value={password}
                    onChangeText={setPassword}
                    editable={!busy}
                    placeholder="Password"
                    placeholderTextColor="#8993ad"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete={mode === "signIn" ? "current-password" : "new-password"}
                    style={styles.passwordInput}
                    onSubmitEditing={submit}
                  />
                  <TouchableOpacity accessibilityRole="button" accessibilityLabel={showPassword ? "Hide password" : "Show password"} onPress={() => setShowPassword(!showPassword)} style={styles.showButton}>
                    <Text style={styles.link}>{showPassword ? "Hide" : "Show"}</Text>
                  </TouchableOpacity>
                </View>
                {mode === "signUp" && (
                  <TextInput
                    accessibilityLabel="Confirm password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    editable={!busy}
                    placeholder="Confirm password"
                    placeholderTextColor="#8993ad"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="new-password"
                    style={styles.input}
                    onSubmitEditing={submit}
                  />
                )}
              </>
            )}
            {!!message && <Text accessibilityRole="alert" style={styles.message}>{message}</Text>}
            <TouchableOpacity disabled={busy} onPress={submit} style={[styles.button, busy && styles.disabled]}>
              {busy ? <ActivityIndicator color="#020817" /> : <Text style={styles.buttonText}>
                {mode === "signIn" ? "Sign in" : mode === "signUp" ? "Create account" : "Send reset link"}
              </Text>}
            </TouchableOpacity>
            {mode === "signIn" && (
              <TouchableOpacity disabled={busy} onPress={() => changeMode("forgotPassword")} style={styles.secondaryButton}>
                <Text style={styles.link}>Forgot password?</Text>
              </TouchableOpacity>
            )}
            {mode === "signIn" || mode === "signUp" ? (
              <TouchableOpacity disabled={busy} onPress={() => changeMode(mode === "signIn" ? "signUp" : "signIn")} style={styles.secondaryButton}>
                <Text style={styles.link}>{mode === "signIn" ? "New here? Create an account" : "Already have an account? Sign in"}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity disabled={busy} onPress={() => changeMode("signIn")} style={styles.secondaryButton}>
                <Text style={styles.link}>Back to sign in</Text>
              </TouchableOpacity>
            )}
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
  subtitle: { color: "#B8C3D8", fontSize: 16, marginBottom: 18 },
  description: { color: "#B8C3D8", marginBottom: 16, lineHeight: 20 },
  signedInEmail: { color: "white", fontSize: 16, marginBottom: 24 },
  input: { backgroundColor: "#1C2545", borderWidth: 1, borderColor: "#4AAFFF", borderRadius: 12, color: "white", padding: 14, marginBottom: 12 },
  passwordRow: { backgroundColor: "#1C2545", borderWidth: 1, borderColor: "#4AAFFF", borderRadius: 12, flexDirection: "row", alignItems: "center", marginBottom: 12 },
  passwordInput: { color: "white", flex: 1, minWidth: 0, padding: 14 },
  showButton: { paddingHorizontal: 14, paddingVertical: 14 },
  message: { color: "#B3D6FF", marginBottom: 16, lineHeight: 20 },
  button: { backgroundColor: "#4AAFFF", padding: 15, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#020817", fontWeight: "700", fontSize: 16 },
  disabled: { opacity: 0.6 },
  secondaryButton: { paddingTop: 16, paddingBottom: 4, alignItems: "center" },
  link: { color: "#4AAFFF", textAlign: "center", fontWeight: "600" },
});
