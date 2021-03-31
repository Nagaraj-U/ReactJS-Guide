import "./styles.css";
import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

const App = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("react");
  const [url, setUrl] = useState(
    "http://hn.algolia.com/api/v1/search?query=react"
  );
  const [loading, setLoading] = useState(false);
  const fetchNews = () => {
    setLoading(true);
    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setNews(data.hits);
      })
      .then(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchNews();
  }, [url]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const searchForm = () => {
    return (
      <div>
        <form
          style={{ marginLeft: "20px", marginBottom: "20px" }}
          onSubmit={handleSubmit}
        >
          <input type="text" value={query} onChange={handleChange}></input>
          <button>search</button>
        </form>
      </div>
    );
  };

  const displayNews = () => {
    return news.map((n, i) => {
      return (
        <ul>
          <li>
            <p>{n.title}</p>
          </li>
        </ul>
      );
    });
  };
  const showLoading = () => {
    return loading ? <h2>loading</h2> : null;
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Hacker news API</h1>
      {searchForm()}
      {showLoading()}
      {displayNews()}
    </div>
  );
};
export default App;
