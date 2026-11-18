
import "react-native-url-polyfill/auto";

import { AppState, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase configuration in root .env"
  );
}

// Expo Web can render pages in Node.js, where window doesn't exist.
const isWeb = Platform.OS === "web";
const isServer = isWeb && typeof window === "undefined";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      // Native: AsyncStorage
      // Browser: Supabase's default localStorage
      // Server: No persistent browser storage
      ...(!isWeb ? { storage: AsyncStorage } : {}),

      autoRefreshToken: !isServer,
      persistSession: !isServer,
      detectSessionInUrl: false,
    },
  }
);

// Keep native sessions refreshed while the app is active.
if (!isWeb) {
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}
