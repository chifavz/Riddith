import React from 'react';
import { Link } from 'react-router-dom';
import { getPostThumbnailUrl } from '../../utils/imageUtils';

const PostItem = ({ post }) => {
  const thumbnailUrl = getPostThumbnailUrl(post);

  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.subreddit}</p>  {/* Add subreddit display here */}
      {thumbnailUrl && (
        <div className="post-thumbnail-container">
          <img src={thumbnailUrl} alt={post.title} className="post-thumbnail" />
        </div>
      )}
      <p>{post.selftext?.slice(0, 150)}...</p>
      <Link to={`/posts/${post.id}`}>
        Read more →
      </Link>
    </div>
  );
};

export default PostItem;

