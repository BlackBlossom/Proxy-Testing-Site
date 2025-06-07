// src/services/proxyService.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export async function testProxies(proxies) {
  try {
    // post(`${API_BASE}/api/proxies/test`, { proxies: proxyList })
    const response = await axios.post(`${API_BASE}/api/proxies/test`, 
      { proxies },  // Request body
      {
        headers: { 
          'Content-Type': 'application/json',
          // Add any authentication headers if needed
          // 'Authorization': `Bearer ${token}`
        }
      }
    );
    
    return response.data;
    
  } catch (err) {
    let errorMessage = 'Proxy test failed';
    
    if (err.response) {
      // Server responded with 4xx/5xx status
      console.error('Server Error:', err.response.data);
      errorMessage = err.response.data?.error || `Server error: ${err.response.status}`;
    } else if (err.request) {
      // Request made but no response received
      console.error('Network Error:', err.message);
      errorMessage = 'Network connection failed';
    } else {
      // Request setup error
      console.error('Configuration Error:', err.message);
      errorMessage = 'Invalid request configuration';
    }
    
    throw new Error(errorMessage);
  }
};
