//Fetch data from the API

// src/services/api.js

const API_URL = 'https://podcast-api.netlify.app'; // Base URL for the podcast API

// Fetch all shows
// This function retrieves the list of all available shows from the API
export const fetchShows = async () => {
  try {
    const response = await fetch(`${API_URL}/shows`);
    if (!response.ok) {
      throw new Error(`Failed to fetch shows: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Returns the list of shows
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw error; // Propagate the error to the caller
  }
};

// Fetch details for a specific show
// This function retrieves detailed information about a single show, including its episodes
export const fetchShowDetails = async (id) => {
  try {
    const response = await fetch(`${API_URL}/id/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch show details: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Fetched Show Details:', data); // Log the data for inspection
    return data; // Returns detailed information about the show
  } catch (error) {
    console.error('Error fetching show details:', error);
    throw error; // Propagate the error to the caller
  }
};

// Fetch details for a specific season in a show
// This function retrieves detailed information about a specific season within a show
export const fetchSeasonDetails = async (showId, seasonId) => {
  try {
    const response = await fetch(`${API_URL}/shows/${showId}/seasons/${seasonId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch season details: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Returns details of the specified season
  } catch (error) {
    console.error('Error fetching season details:', error);
    throw error; // Propagate the error to the caller
  }
};

// Fetch a list of a user's favourite shows
// This function retrieves the list of shows that the user has marked as favourites
export const getFavourites = async () => {
  try {
    const response = await fetch(`${API_URL}/favourites`);
    if (!response.ok) {
      throw new Error(`Failed to fetch favourites: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Returns the list of favourite shows
  } catch (error) {
    console.error('Error fetching favourites:', error);
    throw error; // Propagate the error to the caller
  }
};

