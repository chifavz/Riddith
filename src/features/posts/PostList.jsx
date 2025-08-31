import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPostsBySubreddit, fetchPostsBySearch } from "./postAPI";



function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("subreddit");
  const [subreddit, setSubreddit] = useState("popular");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        let data;
        if (filter === "subreddit") {
          data = await fetchPostsBySubreddit(subreddit);
        } else {
          data = await fetchPostsBySearch(query);
        }
        setPosts(data);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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
            <Link to={`/r/${post.subreddit}/comments/${post.id}`}>
              {post.title}
            </Link>
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



