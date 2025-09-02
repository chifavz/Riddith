// src/components/ImageTestPage.jsx
import React from 'react';
import PostItem from '../features/posts/PostItem';
import PostDetail from '../features/posts/PostDetail';
import { getPostImageUrl, getPostThumbnailUrl } from '../utils/imageUtils';

const ImageTestPage = () => {
  // Mock Reddit posts with various image scenarios
  const mockPosts = [
    {
      id: 'test1',
      title: 'Direct Reddit Image Post',
      subreddit: 'test',
      url: 'https://i.redd.it/sample123.jpg',
      post_hint: 'image',
      selftext: '',
      ups: 100,
      num_comments: 5,
      author: 'testuser'
    },
    {
      id: 'test2', 
      title: 'Imgur Gallery Link',
      subreddit: 'test',
      url: 'https://imgur.com/abc123',
      selftext: '',
      ups: 250,
      num_comments: 12,
      author: 'testuser2'
    },
    {
      id: 'test3',
      title: 'Direct Image URL',
      subreddit: 'test', 
      url: 'https://example.com/photo.jpg',
      selftext: '',
      ups: 75,
      num_comments: 3,
      author: 'testuser3'
    },
    {
      id: 'test4',
      title: 'Post with Preview Image',
      subreddit: 'test',
      url: 'https://example.com/article',
      selftext: '',
      ups: 50,
      num_comments: 8,
      author: 'testuser4',
      preview: {
        images: [{
          source: {
            url: 'https://preview.redd.it/preview123.jpg'
          },
          resolutions: [{
            url: 'https://preview.redd.it/thumb123.jpg'
          }]
        }]
      }
    },
    {
      id: 'test5',
      title: 'Text Post Without Images',
      subreddit: 'test',
      url: 'https://reddit.com/r/test/comments/abc123',
      selftext: 'This is a text post without any images',
      ups: 25,
      num_comments: 2,
      author: 'testuser5'
    }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Image Display Test Page</h1>
      <p>This page demonstrates the enhanced image display functionality.</p>
      
      <h2>Post Items (List View)</h2>
      <div style={{ marginBottom: '40px' }}>
        {mockPosts.map(post => (
          <div key={post.id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <PostItem post={post} />
            <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
              <strong>Debug Info:</strong><br/>
              Thumbnail URL: {getPostThumbnailUrl(post) || 'None'}<br/>
              Image URL: {getPostImageUrl(post) || 'None'}
            </div>
          </div>
        ))}
      </div>

      <h2>Post Detail Examples</h2>
      <div>
        {mockPosts.slice(0, 3).map(post => (
          <div key={`detail-${post.id}`} style={{ marginBottom: '40px', border: '2px solid #ff4500', padding: '20px', borderRadius: '8px' }}>
            <h3>Detail View: {post.title}</h3>
            <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
              Original URL: {post.url}<br/>
              Detected Image URL: {getPostImageUrl(post) || 'None'}
            </div>
            <PostDetail mockPost={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageTestPage;