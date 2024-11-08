# 🎵 PODCAST APP | PORTFOLIO PIECE 💿

## Introduction
The Podcast App is a fully responsive web application that allows users to browse, listen to, and manage their favorite podcast episodes. With features like genre filtering, fuzzy search, and tracking of listening progress, this app provides an immersive experience for podcast lovers. Key functionalities include a persistent audio player, favorites management, sorting options, and an interactive UI.

---

## Features

- **Browse and Filter Shows**: View all available podcasts, sorted alphabetically, with options to filter by genre.
- **Interactive Audio Player**: Listen to episodes with a persistent audio player that shows playback progress.
- **Favorites Management**: Mark episodes as favorites with options to view, sort, and remove them as desired.
- **Search**: Use fuzzy search to quickly find shows by title.
- **Resume Playback**: Automatically saves the last played timestamp, allowing users to resume playback.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Data Persistence**: Favorites and playback history are saved in `localStorage` for a seamless experience.

---

## Technologies Used

- **Frontend**: React, CSS for responsive design.
- **API**: Fetches podcast data from an external API.
- **State Management**: Context API for managing global state (e.g., favorites).
- **Libraries**: `react-slick` for carousels, `Fuse.js` for fuzzy search.

---

## Setup

Follow these steps to set up and run the project locally.

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd podcast-app
  
2. **Install Dependencies**:
	npm install

3. **Start the Application**:
	npm start
The app will run on http://localhost:3000 by default.

4. **Build for Production: To create an optimized build for production:**
	npm run build

---

**Usage**
	
Browsing Shows: View a list of all available podcast shows, sorted alphabetically. Use the genre filter to refine the list.

Listening to Episodes: Select a show to view its episodes, then click an episode to start playback in the audio player. The player shows progress and saves the playback position for resumption.

Managing Favorites: Mark episodes as favorites, accessible from the favorites section, with options to view, sort, and remove episodes.

Searching for Shows: Use the search bar to find shows by title with fuzzy matching.

Resetting Progress: Clear all favorites and playback history using the "Reset All Progress" button in the favorites section.

---

**Project Structure**

This overview of the project structure helps developers navigate the codebase effectively:

src/
├── assets/                  # Images, icons, etc.
├── components/              # Reusable UI components (AudioPlayer, ShowCard, etc.)
├── context/                 # Context API for managing global state (e.g., Favorites)
├── hooks/                   # Custom React hooks for shared logic
├── pages/                   # Main page components (Home, Favourites, ShowDetail, etc.)
├── services/                # API request functions and other service-related code
├── utils/                   # Utility functions (helpers for formatting, etc.)
├── App.css                  # Main styling for the app
├── App.js                   # Main app component
├── App.test.js              # Tests for the main app component
├── index.css                # Global styling
├── index.js                 # React entry point
.gitignore                   # Git ignore configuration
package-lock.json            # Dependency lock file
package.json                 # Project metadata and dependencies

---

Contact Information
For any inquiries or further information, please contact:

Name: Sinaye Mbele
Email: sinaye.mbele@gmail.com
Check out the live app here: [Podcast App on Netlify](https://cheerful-swan-d16b66.netlify.app)



