import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.subreddit}</p>  {/* Add subreddit display here */}
      {post.thumbnail && post.thumbnail.startsWith('http') && (
        <img src={post.thumbnail} alt={post.title} />
      )}
      <p>{post.selftext?.slice(0, 150)}...</p>
      <Link to={`/posts/${post.id}`}>
        Read more →
      </Link>
    </div>
  );
};

export default PostItem;

