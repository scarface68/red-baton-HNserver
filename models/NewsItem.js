const mongoose = require("mongoose");

const newsItemSchema = new mongoose.Schema({
  url: String,
  hnUrl: String,
  title: String,
  postedOn: Date,
  postedOnText: String,
  upvotes: String,
  comments: String,
});

const NewsItem = mongoose.model("NewsItem", newsItemSchema);

module.exports = NewsItem;
