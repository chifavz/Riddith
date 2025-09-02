import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, searchPosts, setFilter, setSubreddit, setQuery } from "./postsSlice";



function PostList() {
  const dispatch = useDispatch();
  const { posts, status, error, filter, subreddit, query } = useSelector(state => state.posts);
  const loading = status === 'loading';

  useEffect(() => {
    if (filter === "subreddit") {
      dispatch(fetchPosts(subreddit));
    } else if (query.trim()) {
      dispatch(searchPosts(query));
    }
  }, [dispatch, filter, subreddit, query]);

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  const handleSubredditChange = (newSubreddit) => {
    dispatch(setSubreddit(newSubreddit));
  };

  const handleQueryChange = (newQuery) => {
    dispatch(setQuery(newQuery));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Filter:
          <select value={filter} onChange={(e) => handleFilterChange(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="subreddit">Subreddit</option>
            <option value="search">Search</option>
          </select>
        </label>

        {filter === "subreddit" ? (
          <input
            type="text"
            value={subreddit}
            onChange={(e) => handleSubredditChange(e.target.value)}
            placeholder="Enter subreddit"
            style={{ marginLeft: 12, padding: 6 }}
          />
        ) : (
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
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
            {post.thumbnail && post.thumbnail.startsWith('http') && (
              <div style={{ marginTop: "0.5rem" }}>
                <Link to={`/r/${post.subreddit}/comments/${post.id}`}>
                  <img 
                    src={post.thumbnail} 
                    alt={post.title} 
                    style={{ 
                      maxWidth: "150px", 
                      maxHeight: "150px", 
                      display: "block",
                      cursor: "pointer"
                    }} 
                  />
                </Link>
              </div>
            )}
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



