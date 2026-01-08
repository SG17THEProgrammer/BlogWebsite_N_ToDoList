import axios from "axios";

export const googleSearch = async (query) => {
  const res = await axios.get("https://serpapi.com/search", {
    params: {
      engine: "google",
      q: query,
      api_key: process.env.SERPAPI_KEY,
      num: 10
    }
  });

  if (!res.data.organic_results) return [];

  return res.data.organic_results
    .slice(0, 10)
    .map(item => item.link);
};
