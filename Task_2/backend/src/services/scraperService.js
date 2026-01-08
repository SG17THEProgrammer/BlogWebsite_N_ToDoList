import axios from "axios";

export const scrapeArticles = async (urls) => {
  const res = await axios.post("http://localhost:8000/scrape", {
    urls
  });

  return res.data.articles;
};
