import { useState, useEffect } from 'react';
import api from '../services/api';

/**
 * Custom hook for API data fetching
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {object} { data, loading, error, refetch }
 */
export default function useApi(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(endpoint, options);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [endpoint]);
  
  const refetch = () => {
    fetchData();
  };
  
  return { data, loading, error, refetch };
}