// src/utils/imageUtils.js
/**
 * Utility functions for detecting and handling images in Reddit posts
 */

/**
 * Checks if a URL points to an image based on file extension or known image hosting patterns
 * @param {string} url - The URL to check
 * @returns {boolean} - True if the URL likely points to an image
 */
export const isImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false;

  // Remove query parameters and fragments for extension checking
  const cleanUrl = url.split('?')[0].split('#')[0].toLowerCase();
  
  // Common image file extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
  const hasImageExtension = imageExtensions.some(ext => cleanUrl.endsWith(ext));
  
  if (hasImageExtension) return true;

  // Known image hosting patterns
  const imageHostPatterns = [
    /^https?:\/\/i\.redd\.it\//,           // Reddit's image hosting
    /^https?:\/\/i\.imgur\.com\//,        // Imgur direct image links
    /^https?:\/\/imgur\.com\/[a-zA-Z0-9]+$/, // Imgur gallery links (single image)
    /^https?:\/\/preview\.redd\.it\//,     // Reddit preview images
    /^https?:\/\/external-preview\.redd\.it\//, // Reddit external previews
  ];

  return imageHostPatterns.some(pattern => pattern.test(url));
};

/**
 * Converts an imgur gallery URL to a direct image URL
 * @param {string} url - The imgur URL
 * @returns {string} - Direct image URL or original URL
 */
export const getImgurDirectUrl = (url) => {
  if (!url) return url;
  
  // Convert imgur.com/xxxxx to i.imgur.com/xxxxx.jpg
  const imgurMatch = url.match(/^https?:\/\/imgur\.com\/([a-zA-Z0-9]+)$/);
  if (imgurMatch) {
    return `https://i.imgur.com/${imgurMatch[1]}.jpg`;
  }
  
  return url;
};

/**
 * Gets the best image URL for displaying from a Reddit post
 * @param {object} post - Reddit post object
 * @returns {string|null} - Image URL or null if no image found
 */
export const getPostImageUrl = (post) => {
  if (!post) return null;

  // Check if it's explicitly marked as an image
  if (post.post_hint === 'image' && post.url) {
    return getImgurDirectUrl(post.url);
  }

  // Check if the URL itself points to an image
  if (post.url && isImageUrl(post.url)) {
    return getImgurDirectUrl(post.url);
  }

  // Check for preview images
  if (post.preview && post.preview.images && post.preview.images.length > 0) {
    const preview = post.preview.images[0];
    if (preview.source && preview.source.url) {
      // Decode HTML entities in preview URLs
      return preview.source.url.replace(/&amp;/g, '&');
    }
  }

  return null;
};

/**
 * Gets the thumbnail URL for a post
 * @param {object} post - Reddit post object
 * @returns {string|null} - Thumbnail URL or null if no thumbnail found
 */
export const getPostThumbnailUrl = (post) => {
  if (!post) return null;

  // Use existing thumbnail if it's a valid HTTP URL
  if (post.thumbnail && post.thumbnail.startsWith('http')) {
    return post.thumbnail;
  }

  // Fall back to preview image if available
  if (post.preview && post.preview.images && post.preview.images.length > 0) {
    const preview = post.preview.images[0];
    if (preview.resolutions && preview.resolutions.length > 0) {
      // Use the smallest resolution for thumbnail
      const thumbnail = preview.resolutions[0];
      if (thumbnail.url) {
        return thumbnail.url.replace(/&amp;/g, '&');
      }
    }
  }

  // Check if the main URL is an image and use it as thumbnail
  const imageUrl = getPostImageUrl(post);
  return imageUrl;
};