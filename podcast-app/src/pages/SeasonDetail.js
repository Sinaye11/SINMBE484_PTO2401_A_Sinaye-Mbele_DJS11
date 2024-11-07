// SeasonDetail page, displays detailed information about a specific season of a show

import React, { useEffect, useState } from 'react'; // Import React hooks
import { useParams } from 'react-router-dom'; // For accessing route parameters
import EpisodeCard from '../components/EpisodeCard'; // Import the EpisodeCard component to display episodes
import { fetchSeasonDetails } from '../services/api'; // Function to fetch season details from API

const SeasonDetail = () => {
  // Use useParams hook to retrieve show ID and season ID from the URL
  const { id, seasonId } = useParams();
  const [seasonDetails, setSeasonDetails] = useState(null); // State to store fetched season details

  useEffect(() => {
    // Fetch season details when the component mounts or when id or seasonId changes
    fetchSeasonDetails(id, seasonId)
      .then((data) => {
        setSeasonDetails(data); // Set the fetched data into state
      })
      .catch((error) => {
        console.error('Error fetching season details:', error); // Handle errors
        setSeasonDetails(null); // Reset season details on error
      });
  }, [id, seasonId]); // Re-run effect when id or seasonId changes

  // Display loading message while waiting for data
  if (!seasonDetails) return <div>Loading season details...</div>;

  return (
    <div className="season-detail">
      <h2>Season {seasonDetails.number}</h2> {/* Display the season number */}
      <p>{seasonDetails.description}</p> {/* Display season description if available */}
      <div className="episodes-list">
        {/* Map through episodes and display each one using EpisodeCard component */}
        {seasonDetails.episodes.length > 0 ? (
          seasonDetails.episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} /> // Pass each episode to the EpisodeCard
          ))
        ) : (
          <p>No episodes available for this season.</p> // Message if no episodes are found
        )}
      </div>
    </div>
  );
};

export default SeasonDetail;

