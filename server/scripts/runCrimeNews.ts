import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __filename / __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});

import { crimeNewsService } from "../services/api/crimeNewsAPI.ts";
import * as fs from "fs";

async function main() {
  try {
    console.log("🔍 Fetching latest Berkeley crime news...");

    // Get articles
    const data = await crimeNewsService.searchCrimeNews("Berkeley");
    const articles = data.articles;

    if (!articles || articles.length === 0) {
      console.log("⚠️ No articles found.");
      return;
    }

    // Extract useful fields + categorize crime
    const formatted = crimeNewsService.extractUsefulFields(articles);

    // Convert to CSV
    const csv = crimeNewsService.toCSV(formatted);

    // Save file
    const filePath = "../../data/crime_news.csv";
    fs.writeFileSync(filePath, csv);

    console.log(`✅ Crime news saved to ${filePath}`);
    console.log(`📄 ${formatted.length} articles processed.`);
  } catch (err: any) {
    console.error("❌ Error running crime news fetch:");
    console.error(err.message || err);
  }
}

main();
