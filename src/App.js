import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './features/posts/postsSlice';
import PostList from './features/posts/PostList';
import PostDetail from './features/posts/PostDetail';
import Header from './components/Header';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/r/:subreddit/comments/:postId" element={<PostDetail />} />
        </Routes>
      </main>
    </div>
   
  );
}

export default App;

