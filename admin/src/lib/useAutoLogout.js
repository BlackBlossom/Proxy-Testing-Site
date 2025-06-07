import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function autoLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const expiry = decoded.exp * 1000; // JWT `exp` is in seconds
      const now = Date.now();

      if (now >= expiry) {
        console.log('Token expired, redirecting to login');
        localStorage.removeItem('adminName');
        localStorage.removeItem('adminToken');
        navigate('/login');
      } else {
        console.log(`Token expires in ${Math.round((expiry - now) / 1000)} seconds`);
        const timeout = expiry - now;
        const timer = setTimeout(() => {
          console.log('Token expired, redirecting to login');
          localStorage.removeItem('adminName');
          localStorage.removeItem('adminToken');
          navigate('/login');
        }, timeout);
        return () => clearTimeout(timer);
      }
    } catch (err) {
      console.error('Invalid token:', err);
      console.log('Removing invalid token and redirecting to login');
      localStorage.removeItem('adminName');
      localStorage.removeItem('adminToken');
      navigate('/login');
    }
  }, [navigate]);
}
