import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useRouter } from "expo-router";

export default function SearchPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>

      <GooglePlacesAutocomplete
        placeholder="Search location"
        fetchDetails
        minLength={2}
        debounce={200}
        enablePoweredByContainer={false}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!,
          language: "en",
          components: "country:us",
        }}
        onPress={(data, details) => {
          const lat = details?.geometry?.location?.lat;
          const lng = details?.geometry?.location?.lng;

          if (typeof lat !== "number" || typeof lng !== "number") return;

          router.replace({
            pathname: "/(tabs)/map",
            params: { lat: String(lat), lng: String(lng), name: data.description },
          });
        }}
        onFail={(error) => {
          console.log("Places autocomplete error:", error);
        }}
        styles={{
          container: { flex: 0, zIndex: 9999 },
          textInput: styles.textInput,
          listView: styles.listView,
          row: styles.row,
          description: { color: "white" },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16,
    backgroundColor: "#020817",
  },
  title: { color: "white", fontSize: 20, fontWeight: "700", marginBottom: 12 },
  textInput: {
    height: 46,
    borderRadius: 25,
    backgroundColor: "#1C1F3A",
    color: "white",
    paddingHorizontal: 16,
    borderColor: "#4AAFFF",
    borderWidth: 1.5,
  },
  listView: {
    marginTop: 10,
    borderRadius: 14,
    backgroundColor: "#0b1229",
    overflow: "hidden",
  },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#0b1229",
  },
});
