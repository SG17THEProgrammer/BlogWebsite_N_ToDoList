import scrapedBlog from "../models/scrapedBlogSchema.js";
import { googleSearch } from "../services/serpService.js";
import { scrapeArticles } from "../services/scraperService.js";
import { rewriteBlog } from "../services/aiService.js";

export const optimizeBlog = async (req, res) => {
  try {
    const { title, content , id} = req.body;

    const urls = await googleSearch(title);
    const scraped = await scrapeArticles(urls);

    const rewritten = await rewriteBlog(
      content.substring(12000),
      scraped.map(a => a.content),
      title
    );

    const blog = await scrapedBlog.create({
      ...rewritten,
      sourceBlogId:id,
      aiOptimized: true,
      competitorSources: urls.slice(0, 5)
    });

    res.json({blog , message:"Blog re-written successfully"});

  } catch (err) {
    
    console.error(err);
    res.status(500).json({ error: "AI optimization failed" });
  }
};
