import React, { useEffect, useRef } from "react";

export default function MapGoogle() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const isWeb = typeof document !== "undefined";

  useEffect(() => {
    if (!isWeb) return;

    const loadMap = async () => {
      const { Map } = await (window as any).google.maps.importLibrary("maps");
      const map = new Map(mapRef.current, {
        center: { lat: 37.8715, lng: -122.2730 },
        zoom: 13,
      });
      new (window as any).google.maps.Marker({
        position: { lat: 37.8715, lng: -122.2730 },
        map,
        title: "UC Berkeley",
      });
    };

    if (!(window as any).google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}&v=weekly`;
      script.async = true;
      script.onload = loadMap;
      document.body.appendChild(script);
    } else {
      loadMap();
    }
  }, [isWeb]);

  if (!isWeb) return null;

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100vh",
        borderRadius: "12px",
        backgroundColor: "#f0f0f0",
      }}
    />
  );
}
