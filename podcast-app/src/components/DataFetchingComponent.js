// src/components/DataFetchingComponent.js

import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner'; // Loading spinner component

/**
 * DataFetchingComponent
 *
 * Fetches data from an external API and displays a loading spinner until the data is available.
 */
const DataFetchingComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data when the component mounts
  useEffect(() => {
    fetch('https://podcast-api.netlify.app')  // API URL
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false); // Stop loading if there’s an error
        console.error('Error fetching data:', error);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display fetched data */}
    </div>
  );
};

export default DataFetchingComponent;
