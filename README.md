# Project Title

## Overview

As someone deeply interested in philosophy and AI ethics, I've created a web application that explores the ethical dimensions of online discourse. This is a web application that analyzes content from Reddit subreddits using external APIs to detect toxicity levels and other linguistic attributes. The app helps users understand the nature of discussions in different subreddits by providing detailed sentiment analysis.

### Problem Space

Social media moderation is a significant challenge, and understanding the tone of discussions in different communities is crucial. Manual content review is time-consuming and subjective. This app provides automated, objective analysis of content toxicity, helping users and moderators make informed decisions about community engagement. My app serves as both a practical tool and a philosophical exploration.

### User Profile

- Reddit moderators looking to assess their community's content
- Researchers studying online discourse
- Users wanting to evaluate community tone before participating
- Community managers tracking content health
- Philosophy enthusiasts exploring digital ethics
- Researchers studying online discourse ethics
These users need thoughtful, nuanced analysis that goes beyond simple "good/bad" binaries and considers the philosophical implications of online communication.

### Features

1. Subreddit Analysis
   - Users can input a subreddit name
   - View toxicity scores for recent posts
   - See breakdown of different sentiment metrics

2. Single Text Analysis
   - Input custom text for analysis
   - Get detailed toxicity metrics
   - Compare results with community averages (in the future)

3. Batch Text Analysis
   - Analyze multiple texts simultaneously
   - View aggregate statistics (use of chart js)
   - Export results for further analysis (in the future)

4. Score Suggestions
   - Submit suggested scores for content if they disagree
   - Contribute to scoring accuracy

## Implementation

### Tech Stack

- Frontend: React, SCSS, Chart.js
- Backend: Node.js, Express
- Database: MySQL with Knex.js
- Deployment: TBD

### APIs

- Reddit API: Fetching subreddit content
- Perspective API: Content analysis
- Custom REST APIs: Backend services

### Sitemap

1. Home Page
   - Introduction
   - Navigation to tools
2. Subreddit Analysis Page
   - Subreddit input
   - Results dashboard
   - Button for Score submission form
   - Feedback submission
3. Text Analysis Page
   - Single text analysis input
   - Batch analysis option input
   - Results visualization

### Mockups

![MockUp Image](/src/assets/Images/mockup.png?raw=true "Mock Up Image")

### Data

MySQL will be primarily used to store data. It will save toxicity scores from analyzed Reddit posts and text analysis results to hopefully keep historical data for comparison and hopefully, avoid redundant API calls.

### Endpoints

1. GET /api/reddit/:subreddit
   - Parameters: limit (optional)
   - Response: Analyzed posts with scores

2. POST /api/analysis
   - Body: { text }
   - Response: Analysis scores

3. POST /api/analysis/batch
   - Body: { texts: string[] }
   - Response: Batch analysis results

4. POST /api/suggestions/score
   - Body: { text, suggestedScore, attributeName }
   - Response: Comparison results

## Roadmap

Nov 17th-21st: Back end up and running. Implement database migrations. Create basic API endpoints
Nov 22nd-24th: Build frontend components. Integrate APIs. Implement error handling.
Nov 25th-28th: Add data visualization. Polish UX-UI. User testing & bug fixes. 


## Future Implementations
1. User Authentication
   - Save analysis history
   - Personalized dashboards
   - Private analysis storage
2. Export Features
   - PDF reports
   - Data export options
   - Integration with moderation tools