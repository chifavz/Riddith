import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './features/posts/postsSlice';
import PostList from './features/posts/PostList';
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
        <PostList />
      </main>
    </div>
   
  );
}

export default App;

