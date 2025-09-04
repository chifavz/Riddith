# Chief Dashboard & AI Waitress Integration

This document explains the Chief Dashboard API and AI Waitress integration that has replaced the previous Reddit API.

## Overview

The application now uses:
- **Chief Dashboard API** for content management
- **AI Waitress Service** for intelligent content analysis and recommendations

## Configuration

Copy `.env.example` to `.env` and configure the following variables:

```bash
# Chief Dashboard API Configuration
REACT_APP_CHIEF_DASHBOARD_URL=https://api.chiefdashboard.com/v1
REACT_APP_AI_WAITRESS_URL=https://api.chiefdashboard.com/ai-waitress/v1

# AI Waitress Configuration
REACT_APP_AI_WAITRESS_ENABLED=true
REACT_APP_AI_WAITRESS_DEFAULT_ACCESS_LEVEL=analyze
```

## AI Waitress Access Levels

The AI Waitress supports different access levels:

- `read_only`: Basic read access (default fallback)
- `analyze`: Content analysis capabilities
- `recommend`: Content recommendations
- `moderate`: Full moderation features

## Features

### Content Management
- Fetch posts by category (formerly subreddit)
- Search posts with AI-enhanced queries
- Retrieve post details and comments

### AI Waitress Features
- **Automatic Authentication**: Handles API authentication automatically
- **Content Analysis**: Analyzes posts and comments for insights
- **Smart Recommendations**: Enhances search queries with AI suggestions
- **Graceful Degradation**: Falls back to basic functionality if AI services are unavailable

## API Endpoints

### Chief Dashboard
- `GET /posts?category={category}` - Fetch posts by category
- `GET /posts/search?q={query}` - Search posts
- `GET /posts/{id}` - Get post details
- `GET /posts/{id}/comments` - Get post comments

### AI Waitress
- `POST /auth/token` - Authenticate and get access token
- `POST /analyze` - Analyze content
- `POST /recommend` - Get recommendations
- `POST /moderate` - Content moderation

## Error Handling

The integration includes robust error handling:
- Network failures fall back to sample data
- AI service failures gracefully degrade to basic functionality
- All errors are logged for debugging

## Development

The application maintains backward compatibility with existing UI components while providing enhanced functionality through the new APIs.