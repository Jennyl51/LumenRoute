import csv
import sys
import os


# --- Fix Python module path ---
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "../../"))
sys.path.append(PROJECT_ROOT)

from server.services.api.scanner_module import get_article_urls, scrape_article


# 1. collect url
urls = get_article_urls()

# 2. scrape each article
articles = []
for url in urls:
    print(f"Scraping article: {url}")
    article = scrape_article(url)
    if article:
        articles.append(article)

print("\nDONE! Extracted articles:")
for a in articles:
    print(a["title"], "-", a["url"])


# 3. save data as CSV
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.abspath(os.path.join(CURRENT_DIR, "../../data"))
CSV_OUT = os.path.join(DATA_DIR, "berkeley_scanner_articles.csv")

output_file = CSV_OUT

fieldnames = [
    "url",
    "title",
    "author",
    "published_date",
    "image_url",
    "content_markdown"
]

with open(output_file, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(articles)

print(f"CSV saved to: {output_file}")
