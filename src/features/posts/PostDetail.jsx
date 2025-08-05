// src/features/posts/PostDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./../../App.css";

const PostDetail = () => {
  const { subreddit, postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPostDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`);
      const data = await response.json();

      setPost(data[0].data.children[0].data);
      setComments(data[1].data.children.map((child) => child.data));
    } catch (err) {
      console.error("Failed to load post details:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPostDetail();
  }, [subreddit, postId]);

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="post-detail-container">
      <Link to="/" className="back-button">← Back</Link>

      <div className="post-detail">
        <h2>{post.title}</h2>
        {post.selftext && <p className="post-body">{post.selftext}</p>}
        {post.url && post.post_hint === "image" && (
          <img src={post.url} alt="Post visual" className="post-image" />
        )}
        <div className="post-meta">
          <span>👍 {post.ups}</span> • <span>{post.num_comments} comments</span>
        </div>
      </div>

      <div className="comment-section">
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p className="comment-author">{comment.author}</p>
              <p className="comment-body">{comment.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostDetail;
