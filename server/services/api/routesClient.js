// routesClient.js
import axios from "axios";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function getFastestRoute({ origin, destination }) {
  const url = "https://routes.googleapis.com/directions/v2:computeRoutes";

  const body = {
    origin: {
      location: {
        latLng: { latitude: origin.lat, longitude: origin.lng },
      },
    },
    destination: {
      location: {
        latLng: { latitude: destination.lat, longitude: destination.lng },
      },
    },
    travelMode: "WALK",
    computeAlternativeRoutes: true,
    routingPreference: "TRAFFIC_AWARE_OPTIMAL",
  };

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
    "X-Goog-FieldMask": "routes.distanceMeters,routes.duration,routes.polyline",
  };

  const response = await axios.post(url, body, { headers });
  return response.data; // contains routes[]
}
