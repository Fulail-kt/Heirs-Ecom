
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Spinner from '../components/Spinner/Spinner';


const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    try {
      if (!token) {   
        navigate('/login');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  if (loading) {
    return <p>loadding</p>;
  }
  if (token) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;