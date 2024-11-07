const API_URL = 'https://podcast-api.netlify.app'; 

export const fetchShows = async () => {
  const response = await fetch(`${API_URL}/shows`);
  const data = await response.json();
  return data;
};

export const fetchShowDetails = async (id) => {
  const response = await fetch(`${API_URL}/shows/${id}`);
  const data = await response.json();
  return data;
};

export const fetchSeasonDetails = async (showId, seasonId) => {
  const response = await fetch(`${API_URL}/shows/${showId}/seasons/${seasonId}`);
  const data = await response.json();
  return data;
};

export const getFavourites = async () => {
  const response = await fetch(`${API_URL}/favourites`);
  const data = await response.json();
  return data;
};
