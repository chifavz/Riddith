import React, { useEffect, useState } from "react";



function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("subreddit");
  const [subreddit, setSubreddit] = useState("popular");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url =
      filter === "subreddit"
        ? `https://www.reddit.com/r/${subreddit}.json`
        : `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        const items = data.data.children.map((child) => child.data);
        setPosts(items);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setLoading(false);
      });
  }, [filter, subreddit, query]);

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="subreddit">Subreddit</option>
            <option value="search">Search</option>
          </select>
        </label>

        {filter === "subreddit" ? (
          <input
            type="text"
            value={subreddit}
            onChange={(e) => setSubreddit(e.target.value)}
            placeholder="Enter subreddit"
            style={{ marginLeft: 12, padding: 6 }}
          />
        ) : (
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Reddit"
            style={{ marginLeft: 12, padding: 6 }}
          />
        )}
      </div>

      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "1rem" }}>
            <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noreferrer">
              {post.title}
            </a>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>
              by {post.author} | {post.ups} upvotes
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;



