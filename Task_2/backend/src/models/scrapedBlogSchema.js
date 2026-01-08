const mongoose = require('mongoose');

const scrapedBlogSchema = new mongoose.Schema({
  sourceBlogId:String,
  title: String,
  slug: String,
  metaTitle: String,
  metaDescription: String,
  content: String,
  aiOptimized: Boolean,
  competitorSources: [String]
}, { timestamps: true });

const scrapedBlog = mongoose.model("scrapedBlog", scrapedBlogSchema);

module.exports = scrapedBlog;