import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

def scrape_url(url):
    res = requests.get(url, headers=HEADERS, timeout=10)
    if res.status_code != 200:
        return None

    soup = BeautifulSoup(res.text, "html.parser")

    article = soup.find("article") or soup.find("main")
    if not article:
        return None

    paragraphs = article.find_all("p")
    text = " ".join(p.get_text(strip=True) for p in paragraphs)

    if len(text) < 600:
        return None

    return text
