// const axios = require("axios");

// /**
//  * Fetch latest article from Laravel API
//  */
// async function getLatestArticle() {
//   try {
//     const response = await axios.get("http://127.0.0.1:8000/api/articles/latest");
//     print (response.data)
//     return response.data; // latest article object
//   } catch (error) {
//     console.error("Error fetching latest article:", error.message);
//     return null;
//   }
// }

// module.exports = {
//   getLatestArticle
// };


const axios = require("axios");

async function getLatestArticle() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/articles/latest"
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching latest article:",
      error.response?.status,
      error.response?.data
    );
    return null;
  }
}

module.exports = { getLatestArticle };
