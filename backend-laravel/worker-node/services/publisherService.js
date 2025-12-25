const axios = require("axios");

/**
 * Publish updated article to Laravel API
 */
async function publishUpdatedArticle(article) {
  try {
    await axios.post("http://localhost:8000/api/articles", {
      title: article.title,
      content: article.content,
      is_updated: true,
      source_url: article.source_url
    });

    console.log("Updated article published successfully");
  } catch (error) {
    console.error("Failed to publish article:", error.message);
  }
}

module.exports = {
  publishUpdatedArticle
};
