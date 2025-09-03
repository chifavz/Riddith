import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import foodReducer from '../features/food/foodSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    food: foodReducer,
  },
});
