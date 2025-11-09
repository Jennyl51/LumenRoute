import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import useUserState from "@/hooks/useUserState";

export default function ProfileScreen() {
//   const { user } = useUserState();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://picsum.photos/400/300?random=5" }}
        style={{ width: 200, height: 200, borderRadius: 100}}
        resizeMode="cover"
    />
      <Text style={styles.name}>"Lumen_user1"</Text>
      <Text style={styles.userid}>@lumenlumenID</Text>
      <Text style={styles.bio}> UCB 27 | OP Inc | Lumne_my_bio </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add Friends</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0A0B1A" },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { color: "white", fontSize: 20, fontWeight: "bold" },
  userid: { color: "#aaa", marginBottom: 10 },
  bio: { color: "#aaa", fontSize: 15, marginBottom: 20 },
  button: { backgroundColor: "#1C1F3A", padding: 10, borderRadius: 10 },
  buttonText: { color: "white" },
});
