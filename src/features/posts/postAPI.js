// src/features/posts/postAPI.js

const BASE_URL = 'https://www.reddit.com';

/**
 * Fetch posts from a given subreddit
 * @param {string} subreddit
 */
export const fetchPostsBySubreddit = async (subreddit = 'popular') => {
  const response = await fetch(`${BASE_URL}/r/${subreddit}.json`);
  const json = await response.json();
  return json.data.children.map((child) => child.data);
};

/**
 * Search Reddit posts by query
 * @param {string} query
 */
export const fetchPostsBySearch = async (query) => {
  const response = await fetch(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=25`);
  const json = await response.json();
  return json.data.children.map((child) => child.data);
};

/**
 * Fetch a single post and its comments
 * @param {string} subreddit
 * @param {string} postId
 */
export const fetchPostWithComments = async (subreddit, postId) => {
  const response = await fetch(`${BASE_URL}/r/${subreddit}/comments/${postId}.json`);
  const json = await response.json();
  return {
    post: json[0].data.children[0].data,
    comments: json[1].data.children.map((child) => child.data),
  };
};
