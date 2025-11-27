# safe_route_service.py
from fastapi import FastAPI
from pydantic import BaseModel
from graphparts import Graph

app = FastAPI()
g = Graph()  # load from CSV

class RouteRequest(BaseModel):
    start_id: int
    end_id: int

@app.post("/safe-route")
def safe_route(req: RouteRequest):
    total_cost, path = g.dijkstra(req.start_id, req.end_id)
    return {
        "total_cost": total_cost,
        "path": [
            {"node_id": node_id, "edge_weight": weight}
            for (node_id, weight) in path
        ]
    }
