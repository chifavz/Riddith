import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsBySubreddit, fetchPostsBySearch } from './postAPI';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit = 'popular') => {
    return await fetchPostsBySubreddit(subreddit);
  }
);

export const searchPosts = createAsyncThunk(
  'posts/searchPosts',
  async (query) => {
    return await fetchPostsBySearch(query);
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
    filter: 'subreddit',
    subreddit: 'popular',
    query: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSubreddit: (state, action) => {
      state.subreddit = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchPosts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilter, setSubreddit, setQuery } = postsSlice.actions;
export default postsSlice.reducer;
