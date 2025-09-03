import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRecommendations } from './features/food/foodSlice';
import Home from './pages/Home';
import ChefDashboard from './pages/ChefDashboard';
import Profile from './pages/Profile';
import Blueprint from './pages/Blueprint';
import Header from './components/Header';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize with some data on app start
    dispatch(fetchRecommendations());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ChefDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blueprint" element={<Blueprint />} />
        </Routes>
      </main>
    </div>
   
  );
}

export default App;

