// src/utils/__tests__/imageUtils.test.js
import { isImageUrl, getImgurDirectUrl, getPostImageUrl, getPostThumbnailUrl } from '../imageUtils';

describe('imageUtils', () => {
  describe('isImageUrl', () => {
    test('detects common image file extensions', () => {
      expect(isImageUrl('https://example.com/image.jpg')).toBe(true);
      expect(isImageUrl('https://example.com/image.jpeg')).toBe(true);
      expect(isImageUrl('https://example.com/image.png')).toBe(true);
      expect(isImageUrl('https://example.com/image.gif')).toBe(true);
      expect(isImageUrl('https://example.com/image.webp')).toBe(true);
    });

    test('detects Reddit image hosting patterns', () => {
      expect(isImageUrl('https://i.redd.it/abc123.jpg')).toBe(true);
      expect(isImageUrl('https://preview.redd.it/abc123.jpg')).toBe(true);
      expect(isImageUrl('https://external-preview.redd.it/abc123.jpg')).toBe(true);
    });

    test('detects Imgur patterns', () => {
      expect(isImageUrl('https://i.imgur.com/abc123.jpg')).toBe(true);
      expect(isImageUrl('https://imgur.com/abc123')).toBe(true);
    });

    test('returns false for non-image URLs', () => {
      expect(isImageUrl('https://example.com/page.html')).toBe(false);
      expect(isImageUrl('https://reddit.com/r/programming')).toBe(false);
      expect(isImageUrl('')).toBe(false);
      expect(isImageUrl(null)).toBe(false);
    });

    test('handles URLs with query parameters', () => {
      expect(isImageUrl('https://example.com/image.jpg?v=123')).toBe(true);
      expect(isImageUrl('https://example.com/page.html?param=value')).toBe(false);
    });
  });

  describe('getImgurDirectUrl', () => {
    test('converts imgur gallery URLs to direct image URLs', () => {
      expect(getImgurDirectUrl('https://imgur.com/abc123'))
        .toBe('https://i.imgur.com/abc123.jpg');
    });

    test('leaves direct imgur URLs unchanged', () => {
      const directUrl = 'https://i.imgur.com/abc123.jpg';
      expect(getImgurDirectUrl(directUrl)).toBe(directUrl);
    });

    test('leaves non-imgur URLs unchanged', () => {
      const otherUrl = 'https://example.com/image.jpg';
      expect(getImgurDirectUrl(otherUrl)).toBe(otherUrl);
    });

    test('handles null/undefined input', () => {
      expect(getImgurDirectUrl(null)).toBe(null);
      expect(getImgurDirectUrl(undefined)).toBe(undefined);
    });
  });

  describe('getPostImageUrl', () => {
    test('returns image URL when post_hint is image', () => {
      const post = {
        post_hint: 'image',
        url: 'https://i.redd.it/abc123.jpg'
      };
      expect(getPostImageUrl(post)).toBe('https://i.redd.it/abc123.jpg');
    });

    test('returns image URL when URL is detected as image', () => {
      const post = {
        url: 'https://example.com/photo.jpg'
      };
      expect(getPostImageUrl(post)).toBe('https://example.com/photo.jpg');
    });

    test('converts imgur gallery URLs', () => {
      const post = {
        url: 'https://imgur.com/abc123'
      };
      expect(getPostImageUrl(post)).toBe('https://i.imgur.com/abc123.jpg');
    });

    test('returns preview image when available', () => {
      const post = {
        url: 'https://example.com/article',
        preview: {
          images: [{
            source: {
              url: 'https://preview.redd.it/abc123.jpg'
            }
          }]
        }
      };
      expect(getPostImageUrl(post)).toBe('https://preview.redd.it/abc123.jpg');
    });

    test('returns null for posts without images', () => {
      const post = {
        url: 'https://example.com/article',
        post_hint: 'link'
      };
      expect(getPostImageUrl(post)).toBe(null);
    });

    test('handles null/undefined post', () => {
      expect(getPostImageUrl(null)).toBe(null);
      expect(getPostImageUrl(undefined)).toBe(null);
    });
  });

  describe('getPostThumbnailUrl', () => {
    test('returns existing valid thumbnail', () => {
      const post = {
        thumbnail: 'https://b.thumbs.redditmedia.com/abc123.jpg'
      };
      expect(getPostThumbnailUrl(post)).toBe('https://b.thumbs.redditmedia.com/abc123.jpg');
    });

    test('ignores invalid thumbnails', () => {
      const post = {
        thumbnail: 'default',
        url: 'https://example.com/image.jpg'
      };
      expect(getPostThumbnailUrl(post)).toBe('https://example.com/image.jpg');
    });

    test('returns preview thumbnail when available', () => {
      const post = {
        preview: {
          images: [{
            resolutions: [{
              url: 'https://preview.redd.it/thumb123.jpg'
            }]
          }]
        }
      };
      expect(getPostThumbnailUrl(post)).toBe('https://preview.redd.it/thumb123.jpg');
    });

    test('falls back to main image URL', () => {
      const post = {
        url: 'https://i.redd.it/abc123.jpg',
        post_hint: 'image'
      };
      expect(getPostThumbnailUrl(post)).toBe('https://i.redd.it/abc123.jpg');
    });

    test('handles null/undefined post', () => {
      expect(getPostThumbnailUrl(null)).toBe(null);
      expect(getPostThumbnailUrl(undefined)).toBe(null);
    });
  });
});