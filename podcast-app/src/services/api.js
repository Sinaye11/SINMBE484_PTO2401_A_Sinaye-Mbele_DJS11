// ./services/api.js

/**
 * Fetches a list of shows from the API.
 * @returns {Promise<Array>} - A promise that resolves to an array of show objects.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export const fetchShows = async () => {
  const response = await fetch('https://podcast-api.netlify.app');
  if (!response.ok) throw new Error("Failed to fetch shows"); // Check if the response is OK
  return response.json(); // Parse and return the JSON data
};

/**
 * Fetches details for a specific show based on the provided show ID.
 * @param {string} showId - The ID of the show to fetch details for.
 * @returns {Promise<Object>} - A promise that resolves to the show object, including seasons and episodes.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export const fetchShowDetails = async (showId) => {
  const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
  if (!response.ok) throw new Error("Failed to fetch show details"); // Check if the response is OK
  return response.json(); // Parse and return the JSON data for the show
};
