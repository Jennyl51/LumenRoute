// DIJKSTRA'S, BUT WITH THE MAPS API

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default CSV path (adjust if needed)
const DATA_PATH = path.resolve(
  __dirname,
  "../../../assets/dummie-data/algorithm/real_data.csv"
  // or "../../../assets/dummie-data/algorithm/berkeley_adj_list.csv"
);

// ---------- Helper Functions ----------

export function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371.0088; // km
  const toRad = (deg) => (deg * Math.PI) / 180;

  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const dphi = phi2 - phi1;
  const dl = toRad(lon2 - lon1);

  const a =
    Math.sin(dphi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dl / 2) ** 2;

  return R * (2 * Math.asin(Math.sqrt(a)));
}

export function recencyScore(date, now = new Date(), halfLifeDays = 7.0) {
  // date: JS Date
  const ageMs = Math.max(now - date, 0);
  const ageDays = ageMs / (1000 * 60 * 60 * 24);
  return Math.pow(0.5, ageDays / halfLifeDays); // in [0,1]
}

// ---------- Core Classes ----------

export class Graph {
  /**
   * @param {string} csvPath path to adjacency list CSV: src,dst,weight
   */
  constructor(csvPath = DATA_PATH) {
    /** @type {Map<number, Array<{neighborId:number, weight:number}>>} */
    this.adjList = new Map();
    this.loadFromCsv(csvPath);
  }

  loadFromCsv(csvPath) {
    const raw = fs.readFileSync(csvPath, "utf8");
    const lines = raw.trim().split("\n");

    // Skip header
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const parts = line.split(",");
      if (parts.length < 3) continue;

      const node1 = Number(parts[0]);
      const node2 = Number(parts[1]);
      const weight = Number(parts[2]);

      if (!this.adjList.has(node1)) this.adjList.set(node1, []);
      if (!this.adjList.has(node2)) this.adjList.set(node2, []);

      this.adjList.get(node1).push({ neighborId: node2, weight });
      this.adjList.get(node2).push({ neighborId: node1, weight });
    }
  }

  getNeighbors(nodeId) {
    return this.adjList.get(nodeId) || [];
  }

  /**
   * Dijkstra from start → target.
   * Returns: { totalCost: number, path: Array<{nodeId:number, edgeWeight:number}> }
   */
  dijkstra(start, target) {
    // Min-heap implemented with a simple array + sort (fine for now).
    const heap = [{ dist: 0, node: start }];
    const distances = new Map([[start, 0]]);
    const previous = new Map([[start, null]]);

    while (heap.length > 0) {
      heap.sort((a, b) => a.dist - b.dist);
      const { dist: currentDist, node: currentNode } = heap.shift();

      if (currentNode === target) break;

      if (currentDist > (distances.get(currentNode) ?? Infinity)) continue;

      for (const { neighborId, weight } of this.getNeighbors(currentNode)) {
        const newDist = currentDist + weight;
        if (newDist < (distances.get(neighborId) ?? Infinity)) {
          distances.set(neighborId, newDist);
          previous.set(neighborId, { node: currentNode, edgeWeight: weight });
          heap.push({ dist: newDist, node: neighborId });
        }
      }
    }

    if (!previous.has(target) && start !== target) {
      return { totalCost: Infinity, path: [] };
    }

    // Reconstruct path
    const path = [];
    let node = target;
    while (node != null) {
      const prev = previous.get(node);
      if (!prev) {
        path.push({ nodeId: node, edgeWeight: 0 });
        break;
      }
      path.push({ nodeId: node, edgeWeight: prev.edgeWeight });
      node = prev.node;
    }
    path.reverse();

    const totalCost = distances.get(target) ?? Infinity;
    return { totalCost, path };
  }
}

export class Node {
  constructor(lat, lon, id, graph) {
    this.lat = lat;
    this.lon = lon;
    this.id = id;
    this.graph = graph;
  }

  getLat() {
    return this.lat;
  }

  setLat(newLat) {
    this.lat = newLat;
  }

  getLon() {
    return this.lon;
  }

  setLon(newLon) {
    this.lon = newLon;
  }

  getId() {
    return this.id;
  }

  getNeighbours() {
    return this.graph.getNeighbors(this.id);
  }

  toString() {
    return `Node(id=${this.id}, lat=${this.lat.toFixed(
      6
    )}, lon=${this.lon.toFixed(6)})`;
  }
}

export class Crime extends Node {
  /**
   * @param {number} lat
   * @param {number} lon
   * @param {Graph} graph
   * @param {Date} dt
   * @param {number} priority
   * @param {number} magnitude
   * @param {object} [opts]
   */
  constructor(
    lat,
    lon,
    graph,
    dt,
    priority,
    magnitude,
    opts = {}
  ) {
    const {
      priorityMax = 5,
      magnitudeMax = 5.0,
      recencyHalfLifeDays = 7.0,
      nodeId = -1,
    } = opts;

    super(lat, lon, nodeId, graph);
    this.dt = dt;
    this.priority = Number(priority);
    this.magnitude = Number(magnitude);
    this.priorityMax = Number(priorityMax);
    this.magnitudeMax = Number(magnitudeMax);
    this.recencyHalfLifeDays = Number(recencyHalfLifeDays);
  }

  calcWeight(now = new Date()) {
    const clamp01 = (x) => Math.min(Math.max(x, 0), 1);

    const priorityNorm = clamp01(this.priority / this.priorityMax);
    const magnitudeNorm = clamp01(this.magnitude / this.magnitudeMax);
    const recencyNorm = recencyScore(this.dt, now, this.recencyHalfLifeDays);

    return (priorityNorm + magnitudeNorm + recencyNorm) / 3.0;
  }

  /**
   * Distance from this crime to the closer of n1 or n2 (km)
   */
  calcDistanceKm(n1, n2) {
    const d1 = haversineKm(this.lat, this.lon, n1.lat, n1.lon);
    const d2 = haversineKm(this.lat, this.lon, n2.lat, n2.lon);
    return Math.min(d1, d2);
  }

  updateWeightOnce(now = new Date()) {
    return this.calcWeight(now);
  }
}
