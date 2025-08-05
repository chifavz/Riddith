import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostItem from '../PostItem';

const mockPost = {
  id: 'abc123',
  title: 'Test Post',
  subreddit: 'reactjs',
  permalink: '/r/reactjs/comments/abc123/test_post',
};

describe('PostItem', () => {
  test('renders post title and subreddit', () => {
    render(
      <MemoryRouter>
        <PostItem post={mockPost} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('reactjs')).toBeInTheDocument();
  });

  test('links to the post detail page', () => {
    render(
      <MemoryRouter>
        <PostItem post={mockPost} />
      </MemoryRouter>
    );

    // Assuming the link text is "Read more →"
    const link = screen.getByRole('link', { name: /read more/i });
    expect(link).toHaveAttribute('href', `/posts/${mockPost.id}`);
  });
});

