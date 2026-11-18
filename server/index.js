import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { getWalkingRoute } from "./services/googleRoutes.js";

const here = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(here, ".env") });

const app = express();
const allowedOrigins = (process.env.FRONTEND_ORIGINS ?? "http://localhost:8081,http://localhost:3000")
  .split(",").map(x => x.trim()).filter(Boolean);
app.use(cors({ origin(origin, cb) {
  if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
  return cb(new Error("Origin not allowed"));
} }));
app.use(express.json({ limit: "16kb" }));

function getSupabase() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_PUBLISHABLE_KEY) return null;
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY,
    { auth: { persistSession: false } });
}
const supabase = getSupabase();

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "lumenroute-api" }));

app.get("/api/incidents", async (_req, res) => {
  if (!supabase) return res.status(503).json({ error: "Supabase not configured" });
  try {
    const { data, error } = await supabase.from("incidents")
      .select("id,category,reported_at,latitude,longitude,severity")
      .order("reported_at", { ascending: false }).limit(500);
    if (error) throw error;
    return res.json({ incidents: data, dataset: "historical_demo" });
  } catch (err) {
    console.error("Incidents lookup failed:", err.message);
    return res.status(500).json({ error: "Could not load incidents" });
  }
});

function validPoint(point) {
  return point && typeof point.lat === "number" && typeof point.lng === "number" &&
    Number.isFinite(point.lat) && Number.isFinite(point.lng) &&
    point.lat >= -90 && point.lat <= 90 && point.lng >= -180 && point.lng <= 180;
}

// Restrict this demo to the Berkeley area to reduce accidental quota usage.
function inDemoArea(point) {
  return point.lat >= 37.7 && point.lat <= 38.0 &&
    point.lng >= -122.45 && point.lng <= -122.1;
}

app.post("/api/route", async (req, res) => {
  const { origin, destination } = req.body ?? {};
  if (!validPoint(origin) || !validPoint(destination)) {
    return res.status(400).json({ error: "Provide origin and destination as {lat, lng}" });
  }
  if (!inDemoArea(origin) || !inDemoArea(destination)) {
    return res.status(400).json({ error: "MVP routes are currently limited to Berkeley" });
  }
  try {
    const route = await getWalkingRoute({ origin, destination });
    if (!route) return res.status(404).json({ error: "No walking route found" });
    return res.json({ route });
  } catch (err) {
    console.error("Routing failed:", err.message);
    return res.status(502).json({ error: "Routing provider unavailable" });
  }
});

app.listen(Number(process.env.PORT) || 4000, () => {
  console.log(`LumenRoute API listening on http://localhost:${Number(process.env.PORT) || 4000}`);
});
