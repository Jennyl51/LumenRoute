import React, { useState } from "react";
import { View, StyleSheet, TextInput, ViewStyle, TextStyle, Text,TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { on } from "events";
import { useRouter } from "expo-router";

type InputBarProps = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  onSearch?: boolean;
  setSearch?: (v: boolean) => void;
};

export default function InputBar({
  placeholder = "Search...",
  onChangeText,
  value,
  containerStyle,
  inputStyle,
  onSearch,
  setSearch

}: InputBarProps) {
  const [internalValue, setInternalValue] = useState("");

  const text = value ?? internalValue;
  const router = useRouter();
  if (!onSearch) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          setSearch?.(true);
          router.push("/(tabs)/map/search");
        }}
        style={[styles.container, containerStyle]}
      >
        <View style={styles.inputRow}>
          <Ionicons name="search-outline" size={20} color="#FFFFFF" />
          <Text style={[styles.placeholderText, inputStyle]}>
            {placeholder}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputRow}>
        <Ionicons name="search-outline" size={20} color="#FFFFFF" />
        <TextInput
          style={[styles.textInput, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor="#FFFFFF"
          value={text}
          onChangeText={(t) => {
            setInternalValue(t);
            onChangeText?.(t);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C1F3A",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
  searchtrigger:{
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.85,
  }
});
