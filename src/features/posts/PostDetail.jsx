// src/features/posts/PostDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostWithComments } from "./postAPI";
import { getPostImageUrl } from "../../utils/imageUtils";
import "./../../App.css";

const PostDetail = ({ mockPost }) => {
  const { subreddit, postId } = useParams();
  const [post, setPost] = useState(mockPost || null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(!mockPost);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mockPost) {
      // Skip API call if mock data is provided
      setPost(mockPost);
      setComments([
        { id: 'mock1', author: 'user1', body: 'Great post!' },
        { id: 'mock2', author: 'user2', body: 'Thanks for sharing!' }
      ]);
      setLoading(false);
      return;
    }

    const fetchPostDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPostWithComments(subreddit, postId);
        setPost(data.post);
        setComments(data.comments);
      } catch (err) {
        console.error("Failed to load post details:", err);
        setError(err.message || "Failed to load post details");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [subreddit, postId, mockPost]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!post) return <p>Post not found.</p>;

  // Get the best image URL for this post
  const imageUrl = getPostImageUrl(post);

  return (
    <div className="post-detail-container">
      <Link to="/" className="back-button">← Back</Link>

      <div className="post-detail">
        <h2>{post.title}</h2>
        {post.selftext && <p className="post-body">{post.selftext}</p>}
        {imageUrl && (
          <div className="post-image-container">
            <img src={imageUrl} alt="Post visual" className="post-image" />
          </div>
        )}
        {post.url && !imageUrl && (
          <div className="post-link">
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="external-link">
              🔗 {post.url}
            </a>
          </div>
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
