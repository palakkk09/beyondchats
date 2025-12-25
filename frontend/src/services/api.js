import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${API_BASE}/articles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};
