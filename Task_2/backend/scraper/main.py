from flask import Flask, request, jsonify
from scraper import scrape_url

app = Flask(__name__)

@app.route("/scrape", methods=["POST"])
def scrape():
    data = request.json
    urls = data.get("urls", [])

    articles = []

    for url in urls:
        try:
            content = scrape_url(url)
            if content:
                articles.append({
                    "url": url,
                    "content": content
                })
            if len(articles) == 5:
                break
        except:
            continue

    return jsonify({"articles": articles})

if __name__ == "__main__":
    app.run(port=8000)
