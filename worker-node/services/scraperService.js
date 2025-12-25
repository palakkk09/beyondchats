const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Scrape main article content from a URL
 */
async function scrapeArticleContent(url) {
  try {
    const response = await axios.get(url, {
      timeout: 10000
    });

    const $ = cheerio.load(response.data);

    // Try common article containers
    let content =
      $("article").text() ||
      $(".post-content").text() ||
      $(".entry-content").text();

    return content.replace(/\s+/g, " ").trim();
  } catch (error) {
    console.error("Failed to scrape:", url);
    return "";
  }
}

module.exports = {
  scrapeArticleContent
};
