import React, { useEffect, useState } from "react";
import { fetchArticles } from "../services/api";
import "../index.css";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  return (
    <div className="container">
      <h1>Articles</h1>
      <div className="grid">
        {articles.map((article) => (
          <div key={article.id} className="card">
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p className={article.is_updated ? "updated" : "original"}>
              {article.is_updated ? "Updated Article" : "Original Article"}
            </p>
            <a href={article.source_url} target="_blank" rel="noopener noreferrer">
              Source
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
