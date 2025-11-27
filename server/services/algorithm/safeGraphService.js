// server/services/algorithm/safeGraphService.js
import { Graph } from "./graph.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// If you want a different CSV, change it here:
const GRAPH_CSV_PATH = path.resolve(
  __dirname,
  "../../../assets/dummie-data/algorithm/real_data.csv"
  // or "../../../assets/dummie-data/algorithm/berkeley_adj_list.csv"
);

// Build graph once at startup
const graph = new Graph(GRAPH_CSV_PATH);

/**
 * Get safe route by node IDs.
 * Returns { totalCost, path }
 */
export function getSafeRouteByNodeId(startId, endId) {
  return graph.dijkstra(startId, endId);
}
