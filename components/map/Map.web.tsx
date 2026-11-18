import React, { useEffect, useRef, useState } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

type Point = { lat: number; lng: number; label: string };
type RouteInfo = {
  distanceMeters: number;
  duration: string;
  encodedPolyline: string;
  routeType: "google_walking_baseline";
};
type Incident = {
  id: number;
  category: string;
  reported_at: string;
  latitude: number;
  longitude: number;
};

const BERKELEY = { lat: 37.8715, lng: -122.2730 };
const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000";
let loaderInitialized = false;

export default function MapGoogle() {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const startElement = useRef<HTMLDivElement | null>(null);
  const destinationElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any>(null);
  const routeLine = useRef<any>(null);
  const locationMarkers = useRef<any[]>([]);
  const incidentMarkers = useRef<any[]>([]);
  const chosen = useRef<{ origin: Point | null; destination: Point | null }>({
    origin: null,
    destination: null,
  });
  const [origin, setOrigin] = useState<Point | null>(null);
  const [destination, setDestination] = useState<Point | null>(null);
  const [ready, setReady] = useState(false);
  const [working, setWorking] = useState(false);
  const [route, setRoute] = useState<RouteInfo | null>(null);
  const [showIncidents, setShowIncidents] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let canceled = false;
    async function initialize() {
      const key = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!key) {
        setNotice("Missing EXPO_PUBLIC_GOOGLE_MAPS_API_KEY in your root .env");
        return;
      }
      try {
        if (!loaderInitialized) {
          setOptions({ key, v: "weekly" });
          loaderInitialized = true;
        }
        const mapsLibrary: any = await importLibrary("maps");
        const placesLibrary: any = await importLibrary("places");
        if (canceled || !mapElement.current) return;
        const map = new mapsLibrary.Map(mapElement.current, {
          center: BERKELEY,
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });
        mapInstance.current = map;
        const GoogleMarker = (window as any).google.maps.Marker;
        new GoogleMarker({ position: BERKELEY, map, title: "UC Berkeley" });

        function mountAutocomplete(
          node: HTMLDivElement | null,
          placeholder: string,
          which: "origin" | "destination"
        ) {
          if (!node) return;
          const autocomplete = new placesLibrary.PlaceAutocompleteElement({
            locationBias: { center: BERKELEY, radius: 10000 },
            includedRegionCodes: ["us"],
          });
          autocomplete.placeholder = placeholder;
          autocomplete.style.width = "100%";
          autocomplete.addEventListener("gmp-select", async (event: any) => {
            try {
              const place = event.placePrediction.toPlace();
              await place.fetchFields({ fields: ["location", "displayName", "formattedAddress"] });
              if (canceled || !place.location) return;
              const point: Point = {
                lat: place.location.lat(),
                lng: place.location.lng(),
                label: place.formattedAddress || place.displayName || "Selected location",
              };
              chosen.current[which] = point;
              if (which === "origin") setOrigin(point);
              else setDestination(point);
              setRoute(null);
              routeLine.current?.setMap(null);
              locationMarkers.current.forEach(marker => marker.setMap(null));
              locationMarkers.current = Object.values(chosen.current)
                .filter((x): x is Point => Boolean(x))
                .map(p => new GoogleMarker({ position: { lat: p.lat, lng: p.lng }, map, title: p.label }));
              map.panTo({ lat: point.lat, lng: point.lng });
              map.setZoom(15);
              setNotice("");
            } catch (error) {
              setNotice(error instanceof Error ? error.message : "Could not load place details.");
            }
          });
          node.replaceChildren(autocomplete);
        }

        mountAutocomplete(startElement.current, "Starting location", "origin");
        mountAutocomplete(destinationElement.current, "Destination", "destination");
        setReady(true);
      } catch (error) {
        if (!canceled) setNotice(error instanceof Error ? error.message : "Google Maps failed to load.");
      }
    }
    initialize();
    return () => {
      canceled = true;
      routeLine.current?.setMap(null);
      locationMarkers.current.forEach(marker => marker.setMap(null));
      incidentMarkers.current.forEach(marker => marker.setMap(null));
      startElement.current?.replaceChildren();
      destinationElement.current?.replaceChildren();
    };
  }, []);

  async function planRoute() {
    if (!origin || !destination || !mapInstance.current) return;
    setWorking(true);
    setNotice("");
    try {
      const response = await fetch(`${API_URL}/api/route`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: { lat: origin.lat, lng: origin.lng },
          destination: { lat: destination.lat, lng: destination.lng },
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
      const currentRoute = data.route as RouteInfo;
      const geometry: any = await importLibrary("geometry");
      const path = geometry.encoding.decodePath(currentRoute.encodedPolyline);
      if (!path.length) throw new Error("The routing provider returned an empty path.");
      routeLine.current?.setMap(null);
      const Google = (window as any).google.maps;
      routeLine.current = new Google.Polyline({
        map: mapInstance.current,
        path,
        strokeColor: "#35A9F4",
        strokeOpacity: 0.95,
        strokeWeight: 6,
      });
      const bounds = new Google.LatLngBounds();
      path.forEach((point: any) => bounds.extend(point));
      mapInstance.current.fitBounds(bounds, 60);
      setRoute(currentRoute);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not generate route.");
    } finally { setWorking(false); }
  }

  async function toggleIncidents() {
    if (showIncidents) {
      incidentMarkers.current.forEach(marker => marker.setMap(null));
      incidentMarkers.current = [];
      setShowIncidents(false);
      return;
    }
    setWorking(true);
    try {
      const response = await fetch(`${API_URL}/api/incidents`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Incident API unavailable");
      const GoogleMarker = (window as any).google.maps.Marker;
      const items = payload.incidents as Incident[];
      incidentMarkers.current = items.filter(item =>
        Number.isFinite(item.latitude) && Number.isFinite(item.longitude)
      ).map(item => new GoogleMarker({
        map: mapInstance.current,
        position: { lat: item.latitude, lng: item.longitude },
        title: `${item.category} · historical report ${item.reported_at?.slice(0, 10) || ""}`,
        icon: { path: (window as any).google.maps.SymbolPath.CIRCLE,
          fillColor: "#B88BFF", fillOpacity: 0.8,
          strokeColor: "#ffffff", strokeWeight: 1, scale: 5 },
      }));
      setShowIncidents(true);
      setNotice(`Showing ${incidentMarkers.current.length} historical incidents (not live alerts).`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not load incidents.");
    } finally { setWorking(false); }
  }

  return (
    <div className="lr-planner">
      <style>{`
        .lr-planner { display:flex; width:100%; height:calc(100dvh - 70px); background:#080c1e; color:#f6f8ff; font-family:system-ui, sans-serif; overflow:hidden; }
        .lr-panel {box-sizing:border-box;flex:0 0 345px; max-width:345px; padding:24px; background:#0b1024; border-right:1px solid #29314c; z-index:2; overflow:auto;}
        .lr-title {font-size:24px;font-weight:750;margin:0 0 6px;}
        .lr-muted {color:#9eabc6;font-size:13px;line-height:1.5;}
        .lr-field-label {display:block;font-size:13px;font-weight:700;margin:22px 0 8px;}
        .lr-search-slot {min-height:46px;width:100%;}
        .lr-route-button,.lr-secondary {width:100%;border:0;border-radius:12px;padding:13px 12px;margin-top:18px;font-weight:700;cursor:pointer;}
        .lr-route-button {background:#4aaFFF;color:#020817;}
        .lr-route-button:disabled {opacity:0.45;cursor:not-allowed;}
        .lr-secondary {background:#1a2440;color:#d7e7ff;margin-top:10px;}
        .lr-result {margin-top:20px;padding:14px;background:#17213b;border-radius:12px;font-size:14px;line-height:1.7;}
        .lr-error {color:#ffb4ad;font-size:13px;margin-top:12px;word-wrap:break-word;}
        .lr-map-panel {min-width:0;flex:1;height:100%;}
        @media(max-width:899px) { .lr-planner {display:block;position:relative;} .lr-panel {position:absolute;top:12px;left:12px;right:12px;max-width:none;padding:14px;border:1px solid #29314c;border-radius:16px;max-height:54%;box-shadow:0 12px 30px #0005;} .lr-title {font-size:18px;} .lr-field-label {margin:10px 0 4px;} .lr-route-button {margin-top:12px;} .lr-map-panel {height:100%;width:100%;} }
      `}</style>
      <aside className="lr-panel">
        <h1 className="lr-title">LumenRoute</h1>
        <div className="lr-muted">Berkeley walking route planner · MVP</div>
        <label className="lr-field-label">From</label>
        <div className="lr-search-slot" ref={startElement}/>
        <label className="lr-field-label">To</label>
        <div className="lr-search-slot" ref={destinationElement}/>
        <button className="lr-route-button" onClick={planRoute} disabled={!ready || !origin || !destination || working}>
          {working ? "Loading..." : "Find walking route"}
        </button>
        <button className="lr-secondary" onClick={toggleIncidents} disabled={!ready || working}>
          {showIncidents ? "Hide historical incidents" : "Show historical incidents"}
        </button>
        {route && <div className="lr-result">
          <strong>Walking route</strong><br/>
          Distance: {(route.distanceMeters / 1000).toFixed(2)} km<br/>
          Approx. time: {Math.round(Number.parseFloat(route.duration) / 60)} min<br/>
          <span className="lr-muted">Baseline Google route — safety scoring comes next.</span>
        </div>}
        {notice && <div className="lr-error" role="status">{notice}</div>}
        <p className="lr-muted">Demo only. Incident locations are historical and do not predict personal safety.</p>
      </aside>
      <div className="lr-map-panel" ref={mapElement} aria-label="Interactive Berkeley map" />
    </div>
  );
}
