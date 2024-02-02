const cheerio = require("cheerio");
const axios = require("axios");
const NewsItem = require("./models/NewsItem");

// URLs to scrape
const urls = [
  "https://news.ycombinator.com",
  "https://news.ycombinator.com/?p=2",
  "https://news.ycombinator.com/?p=3",
];

// Function to convert 'postedOn' string to a timestamp
function postedOnToTimestamp(postedOn) {
  const units = postedOn.split(" ")[1];
  const value = parseInt(postedOn.split(" ")[0]);

  let multiplier;
  switch (units) {
    case "minute":
    case "minutes":
      multiplier = 60;
      break;
    case "hour":
    case "hours":
      multiplier = 60 * 60;
      break;
    case "day":
    case "days":
      multiplier = 60 * 60 * 24;
      break;
    default:
      multiplier = 1;
  }

  return Date.now() - value * multiplier * 1000;
}

// Function to scrape a URL
async function scrapeUrl(url) {
  // Send a GET request to the URL
  const response = await axios.get(url);

  // Load the HTML into Cheerio
  const $ = cheerio.load(response.data);

  // Select all elements with the class 'athing'
  $("tr.athing").each(async function () {
    // Extract the fields from each news item
    const url = $(this).find(".titleline a").attr("href");
    const hnUrl = "https://news.ycombinator.com/item?id=" + $(this).attr("id");
    const title = $(this).find(".titleline a:first").text();
    const id = $(this).attr("id");
    // The 'posted on', 'upvotes', and 'comments' fields are in the next 'tr' sibling
    const siblingTr = $(this).next("tr");
    const postedOn = postedOnToTimestamp(siblingTr.find(".age a").text());
    const postedOnText = siblingTr.find(".age a").text();
    const upvotes = siblingTr.find(".score").text();
    const comments = siblingTr.find(".subline a").last().text();

    // check if item already exists in the database here (based on the 'id' field) if exists, update it, else create it
    const existingItem = await NewsItem.findOne({ id });

    if (existingItem) {
      // If the item exists, update it
      existingItem.upvotes = upvotes;
      existingItem.comments = comments;
      await existingItem.save();
    } else {
      // If the item does not exist, create it
      const newsItem = new NewsItem({
        id,
        url,
        hnUrl,
        title,
        postedOn,
        postedOnText,
        upvotes,
        comments,
      });
      await newsItem.save();
    }
  });
}

// Function to scrape all URLs
async function scrapeAllUrls() {
  // Scrape each URL
  for (const url of urls) {
    await scrapeUrl(url);
  }
}

module.exports = scrapeAllUrls;
