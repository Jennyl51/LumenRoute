import React, { useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";

export default function CommunityPage() {
  const posts = [
    {
      id: 1,
      name: "Mariane",
      handle: "@marianeee",
      date: "1/21/20",
      text: "Just saw a fire burning someone's house down at downtown Berkeley. Stay safe and avoid this area!",
      img: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=1200&auto=format&fit=crop",
      comments: 7,
      retweets: 1,
      likes: 3,
    },
    {
      id: 2,
      name: "Mariane",
      handle: "@marianeee",
      date: "1/21/20",
      text: "Just saw a fire burning someone's house down at downtown Berkeley. Stay safe and avoid this area!",
      img: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=1200&auto=format&fit=crop",
      comments: 7,
      retweets: 1,
      likes: 3,
    },
  ];

  return (
    <View style={styles.app}>
      {/* Top Bar */}
      <View style={styles.topbar}>
        <Text style={styles.globe}>🌐</Text>
        <Text style={styles.city}>Berkeley, CA</Text>
      </View>

      {/* Feed */}
      <ScrollView contentContainerStyle={styles.feed}>
        {posts.map((post) => (
          <View key={post.id} style={styles.post}>
            <View style={styles.row}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
                }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.name}>{post.name}</Text>
                <Text style={styles.handle}>
                  {post.handle} · {post.date}
                </Text>
              </View>
            </View>

            <Text style={styles.tweet}>{post.text}</Text>

            <Image source={{ uri: post.img }} style={styles.media} />

            <View style={styles.actions}>
              <Text style={styles.action}>💬 {post.comments}</Text>
              <Text style={[styles.action, { color: "#33c36b" }]}>
                🔁 {post.retweets}
              </Text>
              <Text style={[styles.action, { color: "#e25563" }]}>
                ❤️ {post.likes}
              </Text>
              <Text style={styles.action}>↗️</Text>
            </View>

            <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#0f1320",
    paddingTop: 60,
  },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  globe: {
    fontSize: 24,
  },
  city: {
    fontSize: 22,
    fontWeight: "700",
    color: "#eef2ff",
  },
  feed: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  post: {
    marginBottom: 28,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#d7dee8",
  },
  name: {
    fontWeight: "800",
    color: "#eef2ff",
  },
  handle: {
    color: "#8a94a6",
  },
  tweet: {
    color: "#d9e2ff",
    marginVertical: 8,
  },
  media: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    backgroundColor: "#000",
    marginVertical: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 6,
  },
  action: {
    color: "#8a94a6",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#2a3246",
    marginTop: 8,
  },
});
