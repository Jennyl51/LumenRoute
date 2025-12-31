import React, { useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity} from "react-native";
import MapView, { MapType, Marker } from "react-native-maps";
import InputBar from "../ui/Input/Input-bar";
import map_markers_data from "../../assets/Data/map_marker_data.json";


type MarkerRow = {
    Incident_Number: string;
    Latitude: number;
    Longitude: number;
    Call_Desc?: string;
    CreateDatetime: string;
  };


  export default function CrimeMapMarkers() {
    const data = map_markers_data as MarkerRow[];
  
    return (
      <>
        {data
            .filter((m) => typeof m.Latitude === "number" && typeof m.Longitude === "number")
            .map((m, idx) => (
            <Marker
            key={`${m.Incident_Number}-${m.Latitude}-${m.Longitude}-${m.CreateDatetime ?? ""}-${idx}`}
            coordinate={{ latitude: m.Latitude, longitude: m.Longitude }}
            title={m.Call_Desc ?? "Incident"}
            description={m.CreateDatetime}
            />
            ))}

      </>
    );
  }