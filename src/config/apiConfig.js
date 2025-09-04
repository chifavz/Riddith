// API Configuration for Chief Dashboard and AI Waitress
export const API_CONFIG = {
  // Chief Dashboard API endpoints
  CHIEF_DASHBOARD: {
    BASE_URL: process.env.REACT_APP_CHIEF_DASHBOARD_URL || 'https://api.chiefdashboard.com/v1',
    ENDPOINTS: {
      POSTS: '/posts',
      SEARCH: '/posts/search',
      POST_DETAILS: '/posts/{id}',
      COMMENTS: '/posts/{id}/comments'
    }
  },
  
  // AI Waitress API endpoints
  AI_WAITRESS: {
    BASE_URL: process.env.REACT_APP_AI_WAITRESS_URL || 'https://api.chiefdashboard.com/ai-waitress/v1',
    ENDPOINTS: {
      ACCESS_TOKEN: '/auth/token',
      ANALYZE_CONTENT: '/analyze',
      RECOMMEND: '/recommend',
      MODERATE: '/moderate'
    }
  },
  
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'User-Agent': 'Riddith-Client/1.0'
  }
};

// AI Waitress access levels
export const AI_WAITRESS_ACCESS_LEVELS = {
  READ_ONLY: 'read_only',
  ANALYZE: 'analyze',
  RECOMMEND: 'recommend',
  MODERATE: 'moderate'
};