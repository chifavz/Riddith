import { API_CONFIG, AI_WAITRESS_ACCESS_LEVELS } from '../config/apiConfig';

class AIWaitressService {
  constructor() {
    this.accessToken = null;
    this.accessLevel = AI_WAITRESS_ACCESS_LEVELS.READ_ONLY;
  }

  /**
   * Authenticate with AI Waitress and get access token
   * @param {string} accessLevel - Requested access level
   * @returns {Promise<boolean>} - Whether authentication was successful
   */
  async authenticate(accessLevel = AI_WAITRESS_ACCESS_LEVELS.READ_ONLY) {
    try {
      const response = await fetch(
        `${API_CONFIG.AI_WAITRESS.BASE_URL}${API_CONFIG.AI_WAITRESS.ENDPOINTS.ACCESS_TOKEN}`,
        {
          method: 'POST',
          headers: API_CONFIG.DEFAULT_HEADERS,
          body: JSON.stringify({
            access_level: accessLevel,
            client_id: 'riddith-client'
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.status}`);
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.accessLevel = accessLevel;
      
      return true;
    } catch (error) {
      console.warn('AI Waitress authentication failed, using fallback mode:', error.message);
      return false;
    }
  }

  /**
   * Analyze content using AI Waitress
   * @param {Object} content - Content to analyze
   * @returns {Promise<Object>} - Analysis results
   */
  async analyzeContent(content) {
    if (!this.accessToken || this.accessLevel === AI_WAITRESS_ACCESS_LEVELS.READ_ONLY) {
      return { analyzed: false, message: 'AI analysis not available' };
    }

    try {
      const response = await fetch(
        `${API_CONFIG.AI_WAITRESS.BASE_URL}${API_CONFIG.AI_WAITRESS.ENDPOINTS.ANALYZE_CONTENT}`,
        {
          method: 'POST',
          headers: {
            ...API_CONFIG.DEFAULT_HEADERS,
            'Authorization': `Bearer ${this.accessToken}`
          },
          body: JSON.stringify(content)
        }
      );

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('AI content analysis failed:', error.message);
      return { analyzed: false, error: error.message };
    }
  }

  /**
   * Get AI recommendations for content
   * @param {Object} context - Context for recommendations
   * @returns {Promise<Array>} - Recommended content
   */
  async getRecommendations(context) {
    if (!this.accessToken || ![AI_WAITRESS_ACCESS_LEVELS.RECOMMEND, AI_WAITRESS_ACCESS_LEVELS.MODERATE].includes(this.accessLevel)) {
      return [];
    }

    try {
      const response = await fetch(
        `${API_CONFIG.AI_WAITRESS.BASE_URL}${API_CONFIG.AI_WAITRESS.ENDPOINTS.RECOMMEND}`,
        {
          method: 'POST',
          headers: {
            ...API_CONFIG.DEFAULT_HEADERS,
            'Authorization': `Bearer ${this.accessToken}`
          },
          body: JSON.stringify(context)
        }
      );

      if (!response.ok) {
        throw new Error(`Recommendations failed: ${response.status}`);
      }

      const data = await response.json();
      return data.recommendations || [];
    } catch (error) {
      console.warn('AI recommendations failed:', error.message);
      return [];
    }
  }

  /**
   * Check if user has sufficient access level
   * @param {string} requiredLevel - Required access level
   * @returns {boolean} - Whether user has access
   */
  hasAccess(requiredLevel) {
    const levels = Object.values(AI_WAITRESS_ACCESS_LEVELS);
    const currentIndex = levels.indexOf(this.accessLevel);
    const requiredIndex = levels.indexOf(requiredLevel);
    
    return currentIndex >= requiredIndex;
  }
}

// Export singleton instance
export const aiWaitress = new AIWaitressService();
export default AIWaitressService;