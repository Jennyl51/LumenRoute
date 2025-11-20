// server/services/googleRoutes.js
const axios = require("axios");
require("dotenv").config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Basic: shortest route by distance/time
async function getRoute({ origin, destination, travelMode = "WALK" }) {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error("GOOGLE_MAPS_API_KEY is not set in .env");
  }

  const url = "https://routes.googleapis.com/directions/v2:computeRoutes";

  // Body per Routes API v2 docs
  const body = {
    origin: {
      location: {
        latLng: {
          latitude: origin.lat,
          longitude: origin.lng,
        },
      },
    },
    destination: {
      location: {
        latLng: {
          latitude: destination.lat,
          longitude: destination.lng,
        },
      },
    },
    travelMode,            // e.g. "WALK"
    routingPreference: "TRAFFIC_AWARE",  // not super important for walking, but okay
    computeAlternativeRoutes: false,
    polylineEncoding: "ENCODED_POLYLINE",
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
        "X-Goog-FieldMask":
          "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
      },
    });

    return response.data.routes?.[0] || null;
  } catch (err) {
    console.error("Error calling Routes API:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = {
  getRoute,
};
