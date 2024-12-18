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
   - Users can input and look up a subreddit account
   - View toxicity scores for 10 recent posts
   - See breakdown of different sentiment metrics 

   1.2. Score Suggestions
   - Submit suggested scores for content if they disagree with the analysis provided by Perspective
   - Contribute to scoring accuracy

2. Single Text/Post Analysis
   - Input custom text for analysis
   - Get detailed toxicity metrics



## Implementation

### Tech Stack

- Frontend: React, SCSS, Chart.js
- Backend: Node.js, Express
- Database: MySQL with Knex.js
- Deployment: TBD

### APIs

- Reddit API: Fetching subreddit content
- Perspective API: Content analysis
- Custom REST APIs: Backend services to analyze the subbreddit and text

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

### Mockups and Functionality 

Figma Mock-Up:

![MockUp Image](/src/assets/Images/mockup.png?raw=true "Mock Up Image")

404 Mock-Up:

![404 Image](/src/assets/Images/404.png?raw=true "404 Image")

Demo Video Mock-Up: 
[![Demo Video](http://img.youtube.com/vi/aAR5YsxWeY4/0.jpg)](https://youtu.be/aAR5YsxWeY4)

### Data

MySQL will be primarily used to store data. It will save toxicity scores from analyzed SubReddit accounts (posts) and text analysis results to hopefully keep historical data for comparison and hopefully, avoid redundant API calls if it has been looked up before.

### Endpoints

1. GET /api/reddit/:subreddit
   - Parameters: limit (optional)
   - Response: Analyzed posts with scores

2. POST /api/analysis
   - Body: { text }
   - Response: Analysis scores

3. POST /api/suggestion/score
   - Body: { suggestedScore, attributeName }
   - Response:  Results

## Roadmap

Nov 17th-21st: Back end up and running. Implement database migrations. Create basic API endpoints
Nov 22nd-24th: Build frontend components. Integrate APIs. Implement error handling.
Nov 25th-28th: Perfect data visualization. Polish UX-UI. User testing & bug fixes. 


## Future Implementations
1. User Authentication (Login)
   - Save analysis history
   - Personalized dashboards
   - Private analysis storage
2. Export Features
   - PDF reports
   - Data export options
   - Compare results with community averages (in the future)
3. Favorites
   -Saving featured posts or analysis
4. Comments analysis
   - Reddit's real dynamics often play out in the comments section - that's where most heated discussions and potential toxicity occurs.
