// src/features/posts/_test_/PostList.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostList from "../PostList";
import * as postAPI from "../postAPI";

// ✅ Mock the postAPI functions
jest.mock("../postAPI", () => ({
  fetchPostsBySubreddit: jest.fn(),
  fetchPostsBySearch: jest.fn(),
}));

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
  render(
    <MemoryRouter>
      <PostList />
    </MemoryRouter>
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
