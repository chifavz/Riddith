// src/features/posts/_test_/PostList.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import PostList from "../PostList";
import postsReducer from "../postsSlice";
import * as postAPI from "../postAPI";

// ✅ Mock the postAPI functions
jest.mock("../postAPI", () => ({
  fetchPostsBySubreddit: jest.fn(),
  fetchPostsBySearch: jest.fn(),
}));

// ✅ Mock the AI Waitress service
jest.mock("../../../services/aiWaitressService", () => ({
  aiWaitress: {
    authenticate: jest.fn().mockResolvedValue(true),
    analyzeContent: jest.fn().mockResolvedValue({ analyzed: false }),
    getRecommendations: jest.fn().mockResolvedValue([]),
    hasAccess: jest.fn().mockReturnValue(true)
  }
}));

// ✅ Mock the API config
jest.mock("../../../config/apiConfig", () => ({
  API_CONFIG: {
    CHIEF_DASHBOARD: {
      BASE_URL: 'https://api.test.com',
      ENDPOINTS: { POSTS: '/posts', SEARCH: '/search' }
    }
  },
  AI_WAITRESS_ACCESS_LEVELS: {
    READ_ONLY: 'read_only',
    ANALYZE: 'analyze'
  }
}));

// Create a test store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      posts: postsReducer,
    },
    preloadedState: {
      posts: {
        posts: [],
        status: 'idle',
        error: null,
        filter: 'subreddit',
        subreddit: 'popular',
        query: '',
        ...initialState,
      },
    },
  });
};

// ✅ Setup mock API responses
beforeEach(() => {
  const mockPosts = [
    {
      id: "1",
      title: "Test Post",
      subreddit: "reactjs",
      permalink: "/r/reactjs/comments/testpost",
      author: "testuser",
      ups: 100,
      thumbnail: "https://example.com/thumbnail1.jpg",
    },
    {
      id: "2",
      title: "Another Post",
      subreddit: "reactjs",
      permalink: "/r/reactjs/comments/anotherpost",
      author: "testuser2",
      ups: 200,
    },
  ];

  postAPI.fetchPostsBySubreddit.mockResolvedValue(mockPosts);
  postAPI.fetchPostsBySearch.mockResolvedValue(mockPosts);
});

afterEach(() => {
  jest.clearAllMocks();
});

test("allows switching to search filter and fetching search results", async () => {
  const store = createTestStore();
  
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PostList />
      </MemoryRouter>
    </Provider>
  );

  // simulate filter change to "search"
  fireEvent.change(screen.getByLabelText(/filter/i), {
    target: { value: "search" },
  });

  // simulate entering a search query
  fireEvent.change(screen.getByPlaceholderText(/search reddit/i), {
    target: { value: "react" },
  });

  // no need to submit the form since fetch triggers on query change

  // wait for posts to appear
  await waitFor(() => {
    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("Another Post")).toBeInTheDocument();
  });
});

test("renders images as clickable links when thumbnails are available", async () => {
  const store = createTestStore();
  
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PostList />
      </MemoryRouter>
    </Provider>
  );

  // wait for posts to appear
  await waitFor(() => {
    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });

  // check that the image is rendered and is clickable
  const image = screen.getByAltText("Test Post");
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute("src", "https://example.com/thumbnail1.jpg");
  
  // check that the image is wrapped in a link
  const imageLink = image.closest('a');
  expect(imageLink).toBeInTheDocument();
  expect(imageLink).toHaveAttribute("href", "/r/reactjs/comments/1");
});
