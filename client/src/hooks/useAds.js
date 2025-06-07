// hooks/useAds.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAds(placement) {
  const [state, setState] = useState({
    ads: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const params = { status: 'active' };
        // if (placement) params.placement = placement;
        const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        // Use axios for the request
        const response = await axios.get(`${API_BASE}/api/admin/ads/${placement}`, {params});

        setState({
          ads: response.data,
          isLoading: false,
          error: null
        });
      } catch (err) {
        setState({
          ads: [],
          isLoading: false,
          error: err.message
        });
      }
    };

    fetchAds();
  }, [placement]);

  return state;
}
