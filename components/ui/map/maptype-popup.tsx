import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Button, Pressable, Image, Switch} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { set } from "date-fns";
import { MapType } from "react-native-maps";



type Props = {
    visible: boolean;
    mapType: MapType;
    onSelect: (type: MapType) => void;
    onClose: () => void;
    crimeMarkersVisible: boolean;
    setCrimeMarkersVisible: (v: boolean) => void;
  };

  const OPTIONS: { type: MapType; label: string; image: any }[] = [
    { type: "standard", label: "Standard", image: require("@/assets/images/native-standard.png") },
    { type: "satellite", label: "Satellite", image: require("@/assets/images/native-satellite.png") },
    { type: "hybrid", label: "Hybrid", image: require("@/assets/images/native-hybrid.png") },
    { type: "terrain", label: "Terrain", image: require("@/assets/images/native-terrain.png") },
  ];

export default function MapTypePopUp({ visible, mapType, onSelect, onClose, crimeMarkersVisible, setCrimeMarkersVisible}: Props) {
    if (!visible) return null;

  return (
    <View style={styles.container}>
        <View style={styles.topRow}>
        <Text style={styles.title}>Map Display</Text>
         <Pressable onPress={onClose} style={styles.closebutton}>
            <Ionicons name="close-circle-outline" size={18} color="#4AAFFF" />
        </Pressable>
        </View>
        <View style={styles.menuRow}>
                {/* <Text style={{color: 'white'}}>Select Map Type: {mapType}</Text> */}
                {OPTIONS.map((opt) => {
                    const active = mapType === opt.type;
                    return (
                      <Pressable
                        key={opt.type}
                        onPress={() => onSelect(opt.type)}
                        style={[styles.card, active && styles.cardActive]}
                      >
                        <Image source={opt.image} style={styles.thumb} />
                        <Text style={[styles.label, active && styles.labelActive]}>{opt.label}</Text>
                      </Pressable>
                    );
        })}
        </View>

        <View style={styles.switchRow}>
        <Text style={styles.text}>Show Crimes</Text>
        <Switch
          value={crimeMarkersVisible}
          onValueChange={setCrimeMarkersVisible}
          thumbColor={crimeMarkersVisible ? "#39D89F" : "#f4f3f4"}
          trackColor={{ false: "#3b3b4f", true: "#1b8f61" }}
        />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.text}>Change Crime Preference Setting </Text>
          <Ionicons name="settings-outline" size={20} color="#4AAFFF" />
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
    alignItems: "center",
    justifyContent: "center",
    width: 380,
    borderColor: "#4AAFFF",
    borderWidth: 1,
    alignSelf: "center",
    bottom: 8,
    flexDirection: "column",
  },
  topRow:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: '100%',
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  title:{
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    left: 130,
  },
  closebutton:{
    position: "relative",
    backgroundColor: "#1C1F3A",
    borderRadius: 20,
    top:2,
    padding: 2,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 2,
  },
  
  card: {
    width: 92,
    alignItems: "center",
    padding: 8,
    borderRadius: 14,
    backgroundColor: "#1C1F3A",
    borderWidth: 1,
    borderColor: "transparent",
  },
  cardActive: {
    borderColor: "#4AAFFF",
    shadowColor: "#4AAFFF",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },

  thumb: {
    width: 76,
    height: 76,
    borderRadius: 12,
    marginBottom: 8,
  },
label: {
    color: "#CCCCCC",
    fontSize: 14,
    fontWeight: "500",
},
labelActive: {
    color: "#4AAFFF",
    fontWeight: "700",
},
text: { 
    color: "#4AAFFF", 
    fontWeight: "600",
    fontSize: 14,
    alignSelf: "center",
    marginHorizontal: 2,
},
switchRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  paddingHorizontal: 4,
  paddingVertical: 6,
}




});
