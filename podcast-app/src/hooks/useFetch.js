// Import necessary hooks from React
import { useEffect, useState } from 'react';

/**
 * Custom hook for fetching data from a specified URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {object} An object containing:
 * - data: The fetched data or null if not yet fetched.
 * - loading: Boolean indicating if data is currently being fetched.
 * - error: Error message if the fetch fails, otherwise null.
 */
const useFetch = (url) => {
  const [data, setData] = useState(null);  // Stores fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false); // Stop loading after fetch attempt
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error }; // Return fetched data, loading, and error states
};

export default useFetch;
