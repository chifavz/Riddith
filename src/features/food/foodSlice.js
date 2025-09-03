import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API functions for food data
const fetchMealRecommendations = async (preferences = {}) => {
  // Mock API call - in real app this would call your backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Grilled Salmon with Quinoa",
          chef: "Chef Maria",
          rating: 4.8,
          price: 24.99,
          dietary: ["Gluten-Free", "High-Protein"],
          image: "https://via.placeholder.com/150",
          description: "Fresh Atlantic salmon with quinoa and seasonal vegetables"
        },
        {
          id: 2,
          name: "Vegan Buddha Bowl",
          chef: "Chef David",
          rating: 4.6,
          price: 19.99,
          dietary: ["Vegan", "Organic"],
          image: "https://via.placeholder.com/150",
          description: "Nutrient-packed bowl with quinoa, chickpeas, and avocado"
        },
        {
          id: 3,
          name: "Grass-Fed Beef Tacos",
          chef: "Chef Rosa",
          rating: 4.9,
          price: 22.99,
          dietary: ["Keto-Friendly", "Organic"],
          image: "https://via.placeholder.com/150",
          description: "Authentic tacos with grass-fed beef and fresh salsa"
        }
      ]);
    }, 1000);
  });
};

const fetchUserPreferences = async () => {
  // Mock user preferences
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        dietary_restrictions: ["Gluten-Free"],
        allergies: [],
        cuisine_preferences: ["Mediterranean", "Asian"],
        spice_level: "Medium",
        budget_range: "20-30"
      });
    }, 500);
  });
};

export const fetchRecommendations = createAsyncThunk(
  'food/fetchRecommendations',
  async (preferences = {}) => {
    return await fetchMealRecommendations(preferences);
  }
);

export const fetchPreferences = createAsyncThunk(
  'food/fetchPreferences',
  async () => {
    return await fetchUserPreferences();
  }
);

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    recommendations: [],
    preferences: {},
    status: 'idle',
    error: null,
    chatMessages: [
      {
        id: 1,
        sender: 'ai',
        message: "Hello! I'm your AI Food Waiter. I'm here to help you discover amazing meals based on your preferences. What are you in the mood for today?",
        timestamp: new Date().toISOString()
      }
    ],
  },
  reducers: {
    addChatMessage: (state, action) => {
      state.chatMessages.push({
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString()
      });
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    clearChat: (state) => {
      state.chatMessages = [
        {
          id: 1,
          sender: 'ai',
          message: "Hello! I'm your AI Food Waiter. I'm here to help you discover amazing meals based on your preferences. What are you in the mood for today?",
          timestamp: new Date().toISOString()
        }
      ];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRecommendations.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPreferences.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPreferences.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.preferences = action.payload;
      })
      .addCase(fetchPreferences.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addChatMessage, updatePreferences, clearChat } = foodSlice.actions;
export default foodSlice.reducer;