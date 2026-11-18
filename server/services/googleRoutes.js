// Calls the Google Routes API from the server, never from the browser.
export async function getWalkingRoute({ origin, destination }) {
  const key = process.env.GOOGLE_MAPS_SERVER_API_KEY;
  if (!key) throw new Error("Missing GOOGLE_MAPS_SERVER_API_KEY in server/.env");

  const waypoint = ({ lat, lng }) => ({
    location: { latLng: { latitude: lat, longitude: lng } },
  });
  const response = await fetch(
    "https://routes.googleapis.com/directions/v2:computeRoutes",
    {
      method: "POST",
      signal: AbortSignal.timeout(12000),
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask":
          "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline",
      },
      body: JSON.stringify({
        origin: waypoint(origin),
        destination: waypoint(destination),
        travelMode: "WALK",
        computeAlternativeRoutes: false,
        polylineEncoding: "ENCODED_POLYLINE",
      }),
    }
  );
  if (!response.ok) {
    const detail = await response.text();
    console.error("Routes API failure", response.status, detail.slice(0, 400));
    throw new Error(`Routes API returned ${response.status}`);
  }
  const body = await response.json();
  const route = body.routes?.[0];
  if (!route?.polyline?.encodedPolyline) return null;
  return {
    distanceMeters: route.distanceMeters,
    duration: route.duration,
    encodedPolyline: route.polyline.encodedPolyline,
    routeType: "google_walking_baseline",
  };
}
