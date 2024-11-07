// Importing necessary hooks from React
import { useEffect, useState } from 'react';

// Custom hook for fetching data from a given URL
const useFetch = (url) => {
  // State variables to manage the fetched data, loading status, and errors
  const [data, setData] = useState(null);  // Stores the fetched data
  const [loading, setLoading] = useState(true); // Indicates whether the data is being loaded
  const [error, setError] = useState(null);  // Stores any error encountered during fetch

  useEffect(() => {
    // Function to fetch data asynchronously
    const fetchData = async () => {
      setLoading(true); // Ensure loading state is true when starting to fetch
      try {
        // Making the fetch request to the provided URL
        const response = await fetch(url);

        // Checking if the response is ok (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`); // Throw an error if response is not ok
        }

        // Parsing the response data as JSON
        const result = await response.json();

        // Setting the fetched data into state
        setData(result);
      } catch (error) {
        // Handling any errors that occur during the fetch
        setError(error.message || "An unexpected error occurred");
      } finally {
        // Setting loading to false after data fetch attempt
        setLoading(false);
      }
    };

    // Initiating the data fetch when the component mounts or the URL changes
    fetchData();

    // Re-running the effect if the URL changes
  }, [url]);

  // Returning an object containing data, loading, and error to be used by components
  return { data, loading, error };
};

export default useFetch;
