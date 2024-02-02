const mongoose = require("mongoose");

const newsItemSchema = new mongoose.Schema({
  id: String,
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
