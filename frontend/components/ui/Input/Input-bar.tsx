import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


export default function InputBar(placeholder: string) {
    const [input, setInput] = useState("");
    const placeholder_text = placeholder || "Search...";

  return (
    <View style={styles.container}>
    {/* Input bar */}
    <View style={styles.input}>
      <Ionicons name="search-outline" size={20} color="#888" />
      <TextInput
        style={styles.input}
        placeholder={placeholder_text}
        value={input}
        onChangeText={setInput}
      />
    </View>
    </View>
    )};


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1C1F3A",
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 8,
        margin: 10,
    },
    input: {
        flex: 1,
        color: "white",
        marginLeft: 10,
        fontSize: 16,
    },
});
