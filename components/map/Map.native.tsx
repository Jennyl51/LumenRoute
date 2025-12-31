import React, { useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity} from "react-native";
import MapView, { MapType, Marker } from "react-native-maps";
import InputBar from "../ui/Input/Input-bar";
import MapTypeSwitch from "../ui/map/map-type";
import MapTypePopUp from "../ui/map/maptype-popup";
import CrimeMapMarkers from "./map-markers";

export default function MapReact() {
  const [mapType, setMapType] = useState<MapType>("standard");
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [crimeMarkersVisible, setCrimeMarkersVisible] = useState(false);

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
        mapType={mapType}
      >
        {/* Zoom? */}
        <Marker
          coordinate={{ latitude: 37.8715, longitude: -122.2730 }}
          title="UC Berkeley"
          description="Starting point"
        />
        {crimeMarkersVisible && <CrimeMapMarkers />}
      </MapView>
      <InputBar
          placeholder="Search"
          containerStyle={styles.searchbar}
          inputStyle={styles.searchbarInput}
      />
      <MapTypeSwitch mapType={mapType} onOpenPopUp={() => setPopUpVisible(true)} />
      <MapTypePopUp 
        visible={isPopUpVisible} 
        mapType={mapType} 
        onSelect={(type) => {
          setMapType(type);
        }}
        onClose={() => setPopUpVisible(false)} 
        crimeMarkersVisible={crimeMarkersVisible}
        setCrimeMarkersVisible={setCrimeMarkersVisible}/>
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
    right: 100,
    zIndex: 10,
    borderColor: "#4AAFFF",
    borderWidth: 1.5,
  },
  searchbarInput: {
    color: "white",
  }
});
