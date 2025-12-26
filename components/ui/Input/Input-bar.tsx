import React, { useState } from "react";
import { View, StyleSheet, TextInput, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type InputBarProps = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
};

export default function InputBar({
  placeholder = "Search...",
  onChangeText,
  value,
  containerStyle,
  inputStyle,
}: InputBarProps) {
  const [internalValue, setInternalValue] = useState("");

  const text = value ?? internalValue;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputRow}>
        <Ionicons name="search-outline" size={20} color="#888" />
        <TextInput
          style={[styles.textInput, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor="#888"
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
});
