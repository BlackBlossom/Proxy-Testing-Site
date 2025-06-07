// src/contexts/SiteContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const SiteContext = createContext();

export function SiteProvider({ children }) {
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const { data } = await axios.get(`${API_BASE}/api/admin/basic`);
        setSiteData(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load site data');
      } finally {
        setLoading(false);
      }
    };
    fetchSiteData();
  }, []);

  return (
    <SiteContext.Provider value={{ siteData, loading, error }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}
