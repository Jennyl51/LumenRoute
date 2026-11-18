import { Platform } from "react-native";
import { supabase } from "./supabase";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

// Web-only redirect for this MVP; native deep links can be added later.
// Evaluated inside auth actions (never while Expo statically renders screens).
function webRedirect(path: string): string | undefined {
  if (Platform.OS !== "web" || typeof window === "undefined") return undefined;
  return `${window.location.origin}${path}`;
}

export async function signUpWithEmail(email: string, password: string) {
  const emailRedirectTo = webRedirect("/login");
  const { data, error } = await supabase.auth.signUp({
    email: normalizeEmail(email),
    password,
    ...(emailRedirectTo ? { options: { emailRedirectTo } } : {}),
  });
  if (error) throw error;
  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizeEmail(email),
    password,
  });
  if (error) throw error;
  return data;
}

// Sends Supabase's DEFAULT password-reset EMAIL LINK, not a code.
export async function requestPasswordReset(email: string) {
  const redirectTo = webRedirect("/reset-password");
  const { error } = await supabase.auth.resetPasswordForEmail(
    normalizeEmail(email),
    redirectTo ? { redirectTo } : undefined
  );
  if (error) throw error;
}

// Only call after the recovery link has established a valid session.
export async function changePassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Existing phone authentication preserved for a future version.
export async function requestPhoneCode(phone: string) {
  const { error } = await supabase.auth.signInWithOtp({ phone: phone.trim() });
  if (error) throw error;
}

export async function verifyPhoneCode(phone: string, code: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    phone: phone.trim(),
    token: code.trim(),
    type: "sms",
  });
  if (error) throw error;
  return data.session;
}
