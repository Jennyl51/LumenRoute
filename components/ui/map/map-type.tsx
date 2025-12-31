import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Button} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { set } from "date-fns";
import { MapType } from "react-native-maps";
import MapTypePopUp from "./maptype-popup";


type Props = {
    mapType: MapType;
    onOpenPopUp: () => void;
  };

const MAP_TYPES: MapType[] = [
    "standard",
    "satellite",
    "hybrid",
    "terrain",
];

export default function MapTypeSwitch({ mapType, onOpenPopUp }: Props) {
    // const switchMapType = () => {
    //     const currentIndex = MAP_TYPES.indexOf(mapType);
    //     const nextIndex = (currentIndex + 1) % MAP_TYPES.length;
    //     setMapType(MAP_TYPES[nextIndex]);
    // };
    // const [isPopUpVisible, setPopUpVisible] = useState(false);

  return (
    <View style={styles.container}>
        <View style={styles.inputRow}>
            <TouchableOpacity
                // onPress={() => switchMapType()}
                onPress={onOpenPopUp}
                style={styles.functionButton}
            >
            <Ionicons name="map" size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    
        <View style={styles.line} />
        <View style={styles.inputRow}>
            <TouchableOpacity
                // onPress={() => switchMapType()}
                style={styles.functionButton}
            >
            <Ionicons name="navigate-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    </View>
    

    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C1F3A",
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: "absolute",
    top: 60,
    right: 20,
    borderColor: "#4AAFFF",
    borderWidth: 1.5,
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: "#455054",
    alignSelf: "center",
  },
  inputRow: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 2,
  },
  functionButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  typeButton: {
    backgroundColor: "#4AAFFF",
  },
  selectionPopup:{
    margin: 10,
    padding: 20,
    backgroundColor: "#455054",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 380,
  },
  closebutton:{
    position: "relative",
    top: 20,
    paddingHorizontal: 10,
    padding:10,
    backgroundColor: "#1C1F3A",
    borderRadius: 20,
  }
});
