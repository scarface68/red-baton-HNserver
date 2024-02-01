const axios = require("axios");
const cheerio = require("cheerio");

axios
  .get("https://news.ycombinator.com/")
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const newsItems = [];

    $("tr.athing").each(function () {
      // Extract the fields from each news item
      const url = $(this).find(".titleline a").attr("href");
      const hnUrl =
        "https://news.ycombinator.com/item?id=" + $(this).attr("id");
      const title = $(this).find(".titleline a").text();

      // The 'posted on', 'upvotes', and 'comments' fields are in the next 'tr' sibling
      const siblingTr = $(this).next("tr");
      const postedOn = siblingTr.find(".age a").text();
      const upvotes = siblingTr.find(".score").text();
      const comments = siblingTr.find(".subline a").last().text();

      // Add the news item to the array
      newsItems.push({ url, hnUrl, title, postedOn, upvotes, comments });
    });

    console.log(newsItems);
  })
  .catch(console.error);
