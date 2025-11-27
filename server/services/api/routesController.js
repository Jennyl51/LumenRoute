// server/services/api/routesController.js
import express from "express";
import { getFastestRoute } from "./routesClient.js";      // your Google Routes wrapper
import { getSafeRouteByNodeId } from "../algorithm/safeGraphService.js";

const router = express.Router();

router.post("/route", async (req, res) => {
  try {
    const { startId, endId, safetyAlpha = 0.5 } = req.body;

    // 1. Safe route (Dijkstra on your crime-weighted graph)
    const safeRoute = getSafeRouteByNodeId(startId, endId);

    // 2. Fastest route from Google (if you already have lat/lng)
    //    You'll likely also send start/end lat/lng from the client.
    const { start, end } = req.body; // start = {lat, lng}, end = {lat, lng}
    const fastResp = await getFastestRoute({ origin: start, destination: end });
    const routes = fastResp.routes || [];
    const fastestRoute = routes[0] || null;

    // 3. Simple blending stub – you can flesh out the scoring later
    const blendedRoute = {
      // This is where you'd combine safeRoute + fastestRoute
      // for now, just echo one of them so your API works end-to-end
      chosen: safetyAlpha >= 0.5 ? safeRoute : fastestRoute,
      safetyAlpha,
    };

    res.json({
      safeRoute,
      fastestRoute,
      blendedRoute,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to compute routes" });
  }
});

export default router;
