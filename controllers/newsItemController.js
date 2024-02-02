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
  const newsItem = await NewsItem.findOne({ id: req.params.id }).exec();
  if (!newsItem.read.includes(req.user.userId)) {
    newsItem.read.push(req.user.userId);
    await newsItem.save();
  }
  res.json({ message: "Marked as read" });
};

exports.markAsDeleted = async (req, res) => {
  const newsItem = await NewsItem.findOne({ id: req.params.id }).exec();
  if (!newsItem.deleted.includes(req.user.userId)) {
    newsItem.deleted.push(req.user.userId);
    await newsItem.save();
  }
  res.json({ message: "Deleted" });
};
