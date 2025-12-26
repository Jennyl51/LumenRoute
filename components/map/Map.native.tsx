import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import InputBar from "../ui/Input/Input-bar";

export default function MapReact() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.8715, // UC Berkeley
          longitude: -122.2730,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.8715, longitude: -122.2730 }}
          title="UC Berkeley"
          description="Starting point"
        />
      </MapView>
      <InputBar
          placeholder="Search location"
          containerStyle={styles.searchbar}
          inputStyle={styles.searchbarInput}
      />
     
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  map: { flex: 1 },
  searchbar: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    zIndex: 10,
    borderColor: "#4AAFFF",
    borderWidth: 1.5,
  },
  searchbarInput: {
    color: "white",
  }
});
