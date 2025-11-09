import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CommunityScreen() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([
    {
      id: "1",
      user: "Emma Davis",
      location: "Downtown Berkeley",
      image: "https://picsum.photos/400/300?random=1",
      likes: 18,
      comments: 4,
    },
    {
      id: "2",
      user: "Michael Chen",
      location: "UC Berkeley Campus",
      image: "https://picsum.photos/400/300?random=2",
      likes: 22,
      comments: 5,
    },
  ]);

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.userName}>{item.user}</Text>
      <Text style={styles.location}>{item.location}</Text>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.actions}>
        <View style={styles.iconGroup}>
          <Ionicons name="heart-outline" size={20} color="#ff4d4d" />
          <Text style={styles.count}>{item.likes}</Text>
        </View>
        <View style={styles.iconGroup}>
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.count}>{item.comments}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Search posts..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Post list */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating add button */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingVertical: 50 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
    paddingVertical: 6,
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    paddingTop: 8,
    paddingHorizontal: 10,
  },
  location: {
    color: "#888",
    fontSize: 13,
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  postImage: { width: "100%", height: 200 },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
  },
  iconGroup: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  count: { marginLeft: 5, fontSize: 14, color: "#555" },
  addButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#3b82f6",
    borderRadius: 50,
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
