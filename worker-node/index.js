require("dotenv").config();

const { getLatestArticle } = require("./services/articleService");
const { searchGoogleArticles } = require("./services/googleSearchService");
const { scrapeArticleContent } = require("./services/scraperService");
const { rewriteArticle } = require("./services/rewriterService");
const { publishUpdatedArticle } = require("./services/publisherService");

async function run() {
  console.log("Starting Phase 2 automation...");

  // 1. Get latest article
  const article = await getLatestArticle();
  if (!article) return;

  console.log("Latest article:", article.title);

  // 2. Google search
  const results = await searchGoogleArticles(article.title);
  console.log("Found reference articles");

  // 3. Scrape reference articles
  const ref1 = await scrapeArticleContent(results[0].link);
  const ref2 = await scrapeArticleContent(results[1].link);

  // 4. Rewrite article
  const updatedContent = await rewriteArticle(
    article.content,
    ref1,
    ref2,
    [results[0].link, results[1].link]
  );

  // 5. Publish updated article
  await publishUpdatedArticle({
    title: article.title + " (Updated)",
    content: updatedContent,
    source_url: article.source_url
  });

  console.log("Phase 2 completed successfully");
}

run();
