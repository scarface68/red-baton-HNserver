const NewsItem = require("../models/NewsItem");
const scrapeAllUrls = require("../scraper");

exports.getAll = async (req, res) => {
  const newsItems = await NewsItem.find({}).exec();
  res.json(newsItems);
};

exports.crawlAndAddOrUpdate = async (req, res) => {
  scrapeAllUrls();
  res.json({ message: "Crawling completed" });
};

exports.markAsRead = async (req, res) => {
  // Implement logic to mark a news item as read here
};

exports.markAsDeleted = async (req, res) => {
  // Implement logic to mark a news item as deleted here
};
