import React from "react";
import ReactDOM from "react-dom/client";
import ArticleList from "./components/ArticleList";
import "./index.css"; // optional for styling

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ArticleList />
  </React.StrictMode>
);
