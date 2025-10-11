// src/features/posts/__tests__/postAPI.test.js
import { fetchPostsBySubreddit, fetchPostsBySearch, fetchPostWithComments } from '../postAPI';

// Mock fetch globally
global.fetch = jest.fn();

describe('postAPI', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('fetchPostsBySubreddit', () => {
    test('successfully fetches posts when JSON is returned', async () => {
      const mockData = {
        data: {
          children: [
            { data: { id: '1', title: 'Test Post 1' } },
            { data: { id: '2', title: 'Test Post 2' } },
          ],
        },
      };

      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue('application/json'),
        },
        json: jest.fn().mockResolvedValue(mockData),
      });

      const result = await fetchPostsBySubreddit('test');
      
      expect(result).toEqual([
        { id: '1', title: 'Test Post 1' },
        { id: '2', title: 'Test Post 2' },
      ]);
      expect(fetch).toHaveBeenCalledWith('https://www.reddit.com/r/test.json');
    });

    test('throws error when HTML is returned instead of JSON', async () => {
      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue('text/html'),
        },
      });

      await expect(fetchPostsBySubreddit('test')).rejects.toThrow('Expected JSON response, but received: text/html');
    });

    test('throws error when content-type header is missing', async () => {
      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue(null),
        },
      });

      await expect(fetchPostsBySubreddit('test')).rejects.toThrow('Expected JSON response, but received: null');
    });

    test('uses default subreddit when no argument is provided', async () => {
      const mockData = {
        data: {
          children: [{ data: { id: '1', title: 'Popular Post' } }],
        },
      };

      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue('application/json'),
        },
        json: jest.fn().mockResolvedValue(mockData),
      });

      await fetchPostsBySubreddit();
      
      expect(fetch).toHaveBeenCalledWith('https://www.reddit.com/r/popular.json');
    });

    test('accepts content-type with charset parameter', async () => {
      const mockData = {
        data: {
          children: [{ data: { id: '1', title: 'Test Post' } }],
        },
      };

      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue('application/json; charset=utf-8'),
        },
        json: jest.fn().mockResolvedValue(mockData),
      });

      const result = await fetchPostsBySubreddit('test');
      expect(result).toEqual([{ id: '1', title: 'Test Post' }]);
    });

    test('accepts content-type in uppercase', async () => {
      const mockData = {
        data: {
          children: [{ data: { id: '1', title: 'Test Post' } }],
        },
      };

      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue('APPLICATION/JSON'),
        },
        json: jest.fn().mockResolvedValue(mockData),
      });

      const result = await fetchPostsBySubreddit('test');
      expect(result).toEqual([{ id: '1', title: 'Test Post' }]);
    });

    test('accepts content-type with leading/trailing whitespace', async () => {
      const mockData = {
        data: {
          children: [{ data: { id: '1', title: 'Test Post' } }],
        },
      };

      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue('  application/json  '),
        },
        json: jest.fn().mockResolvedValue(mockData),
      });

      const result = await fetchPostsBySubreddit('test');
      expect(result).toEqual([{ id: '1', title: 'Test Post' }]);
    });
  });

  describe('fetchPostsBySearch', () => {
    test('successfully fetches search results when JSON is returned', async () => {
      const mockData = {
        data: {
          children: [
            { data: { id: '1', title: 'Search Result 1' } },
            { data: { id: '2', title: 'Search Result 2' } },
          ],
        },
      };

      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue('application/json'),
        },
        json: jest.fn().mockResolvedValue(mockData),
      });

      const result = await fetchPostsBySearch('test query');
      
      expect(result).toEqual([
        { id: '1', title: 'Search Result 1' },
        { id: '2', title: 'Search Result 2' },
      ]);
      expect(fetch).toHaveBeenCalledWith('https://www.reddit.com/search.json?q=test%20query&limit=25');
    });

    test('throws error when HTML is returned instead of JSON', async () => {
      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue('text/html'),
        },
      });

      await expect(fetchPostsBySearch('test')).rejects.toThrow('Expected JSON response, but received: text/html');
    });

    test('throws error when content-type header is missing', async () => {
      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue(null),
        },
      });

      await expect(fetchPostsBySearch('test')).rejects.toThrow('Expected JSON response, but received: null');
    });

    test('properly encodes search query', async () => {
      const mockData = {
        data: {
          children: [],
        },
      };

      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue('application/json'),
        },
        json: jest.fn().mockResolvedValue(mockData),
      });

      await fetchPostsBySearch('test & query');
      
      expect(fetch).toHaveBeenCalledWith('https://www.reddit.com/search.json?q=test%20%26%20query&limit=25');
    });

    test('accepts content-type with charset parameter', async () => {
      const mockData = {
        data: {
          children: [{ data: { id: '1', title: 'Search Result' } }],
        },
      };

      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue('application/json; charset=utf-8'),
        },
        json: jest.fn().mockResolvedValue(mockData),
      });

      const result = await fetchPostsBySearch('test');
      expect(result).toEqual([{ id: '1', title: 'Search Result' }]);
    });

    test('accepts content-type in mixed case', async () => {
      const mockData = {
        data: {
          children: [{ data: { id: '1', title: 'Search Result' } }],
        },
      };

      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue('Application/Json'),
        },
        json: jest.fn().mockResolvedValue(mockData),
      });

      const result = await fetchPostsBySearch('test');
      expect(result).toEqual([{ id: '1', title: 'Search Result' }]);
    });
  });

  describe('fetchPostWithComments', () => {
    test('successfully fetches post and comments when JSON is returned', async () => {
      const mockData = [
        {
          data: {
            children: [{ data: { id: '1', title: 'Test Post' } }],
          },
        },
        {
          data: {
            children: [
              { data: { id: 'c1', body: 'Comment 1' } },
              { data: { id: 'c2', body: 'Comment 2' } },
            ],
          },
        },
      ];

      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue('application/json'),
        },
        json: jest.fn().mockResolvedValue(mockData),
      });

      const result = await fetchPostWithComments('test', 'post123');
      
      expect(result).toEqual({
        post: { id: '1', title: 'Test Post' },
        comments: [
          { id: 'c1', body: 'Comment 1' },
          { id: 'c2', body: 'Comment 2' },
        ],
      });
      expect(fetch).toHaveBeenCalledWith('https://www.reddit.com/r/test/comments/post123.json');
    });

    test('throws error with preview when HTML is returned', async () => {
      const htmlText = '<body class="error-page">Error 404</body>';

      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue('text/html'),
        },
        text: jest.fn().mockResolvedValue(htmlText),
      });

      await expect(fetchPostWithComments('test', 'post123')).rejects.toThrow(
        'Expected JSON response, but received: <body class="error-page">Error 404</body>'
      );
    });

    test('throws error when content-type header is missing', async () => {
      const htmlText = '<html><body>Error</body></html>';

      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue(null),
        },
        text: jest.fn().mockResolvedValue(htmlText),
      });

      await expect(fetchPostWithComments('test', 'post123')).rejects.toThrow(
        'Expected JSON response, but received: <html><body>Error</body></html>'
      );
    });

    test('accepts content-type with charset parameter', async () => {
      const mockData = [
        {
          data: {
            children: [{ data: { id: '1', title: 'Test Post' } }],
          },
        },
        {
          data: {
            children: [{ data: { id: 'c1', body: 'Comment' } }],
          },
        },
      ];

      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue('application/json; charset=utf-8'),
        },
        json: jest.fn().mockResolvedValue(mockData),
      });

      const result = await fetchPostWithComments('test', 'post123');
      expect(result.post).toEqual({ id: '1', title: 'Test Post' });
    });

    test('accepts content-type in uppercase', async () => {
      const mockData = [
        {
          data: {
            children: [{ data: { id: '1', title: 'Test Post' } }],
          },
        },
        {
          data: {
            children: [{ data: { id: 'c1', body: 'Comment' } }],
          },
        },
      ];

      fetch.mockResolvedValueOnce({
        headers: {
          get: jest.fn().mockReturnValue('APPLICATION/JSON'),
        },
        json: jest.fn().mockResolvedValue(mockData),
      });

      const result = await fetchPostWithComments('test', 'post123');
      expect(result.post).toEqual({ id: '1', title: 'Test Post' });
    });
  });
});
