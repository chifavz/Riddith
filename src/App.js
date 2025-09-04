import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './features/posts/postsSlice';
import { aiWaitress } from './services/aiWaitressService';
import { AI_WAITRESS_ACCESS_LEVELS } from './config/apiConfig';
import PostList from './features/posts/PostList';
import PostDetail from './features/posts/PostDetail';
import Header from './components/Header';
import ImageTestPage from './components/ImageTestPage';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize AI Waitress service
    const initializeAIWaitress = async () => {
      try {
        const authenticated = await aiWaitress.authenticate(AI_WAITRESS_ACCESS_LEVELS.ANALYZE);
        console.log('AI Waitress authentication:', authenticated ? 'successful' : 'failed, using fallback mode');
      } catch (error) {
        console.warn('AI Waitress initialization failed:', error);
      }
    };

    initializeAIWaitress();
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/test-images" element={<ImageTestPage />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/r/:subreddit/comments/:postId" element={<PostDetail />} />
        </Routes>
      </main>
    </div>
   
  );
}

export default App;

