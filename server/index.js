// server/index.js (or wherever you set up your API)
const express = require("express");
const cors = require("cors");
const { getRoute } = require("./services/googleRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/route", async (req, res) => {
  try {
    const { origin, destination } = req.body;
    // origin = { lat, lng }, destination = { lat, lng }

    const route = await getRoute({ origin, destination, travelMode: "WALK" });

    if (!route) {
      return res.status(404).json({ error: "No route found" });
    }

    res.json(route);
  } catch (err) {
    res.status(500).json({ error: "Failed to compute route" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
