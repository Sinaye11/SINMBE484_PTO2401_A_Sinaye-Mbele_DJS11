
// src/components/DataFetchingComponent.js

import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner'; // Correct path to spinner

const DataFetchingComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app')  // Update URL as needed
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching data:', error);  // Log errors if the API call fails
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Show loading spinner while data is being fetched
  }

  return (
    <div>
      {/* Render the fetched data once loading is complete */}
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataFetchingComponent;
