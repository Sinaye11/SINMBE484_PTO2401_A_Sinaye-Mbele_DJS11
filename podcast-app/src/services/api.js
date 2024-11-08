// ./services/api.js

export const fetchShows = async () => {
  const response = await fetch('https://podcast-api.netlify.app');
  if (!response.ok) throw new Error("Failed to fetch shows");
  return response.json();
};

export const fetchShowDetails = async (showId) => {
  const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
  if (!response.ok) throw new Error("Failed to fetch show details");
  return response.json(); // Returns the show object, including seasons and episodes
};
