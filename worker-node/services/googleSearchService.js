const SerpApi = require("google-search-results-nodejs");

async function searchGoogleArticles(query) {
  const search = new SerpApi.GoogleSearch(process.env.SERP_API_KEY);

  return new Promise((resolve, reject) => {
    search.json({ q: query, num: 5 }, (result) => {
      if (!result || !result.organic_results) return reject("No results");
      const links = result.organic_results
        .filter(r => r.link.includes("blog") || r.link.includes("article"))
        .slice(0,2)
        .map(r => ({ title: r.title, link: r.link }));
      resolve(links);
    });
  });
}

module.exports = { searchGoogleArticles };
