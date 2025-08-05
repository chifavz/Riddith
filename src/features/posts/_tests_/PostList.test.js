// src/features/posts/_test_/PostList.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PostList from "../PostList";

// ✅ Setup mock fetch response
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          data: {
            children: [
              {
                data: {
                  id: "1",
                  title: "Test Post",
                  subreddit: "reactjs",
                  permalink: "/r/reactjs/comments/testpost",
                },
              },
              {
                data: {
                  id: "2",
                  title: "Another Post",
                  subreddit: "reactjs",
                  permalink: "/r/reactjs/comments/anotherpost",
                },
              },
            ],
          },
        }),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("allows switching to search filter and fetching search results", async () => {
  render(<PostList />);

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
